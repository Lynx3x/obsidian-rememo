// 数据体检页（路由 /audit，整页视图，非弹窗）：文件 → memo 行分组，新日期文件在上。
// - 行内容单行缩略（hover 全文）；可修行显示"修复为"预览
// - 修复粒度为行（该行可修问题循环修到干净）；修复成功的行上浮到"最近修复"区（置顶，可清空）
// - 「查看」跳转到日记文件对应行；忽略粒度为行，本地持久化
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TFile } from 'obsidian';
import { applyFixes, runAudit } from '../engine';
import { migrateFile } from '../migrate';
import { ruleById } from '../rules';
import { AuditResult, Issue, RuleSeverity } from '../types';
import { storage } from '../../helpers/storage';
import appStore from '../../stores/appStore';
import { memoService } from '../../services';
import Pagination from '../../components/Pagination';
import '../../less/audit-page.less';

const IGNORED_KEY = 'auditIgnoredLines';
type IgnoredMap = Record<string, boolean>;
const lineKey = (path: string, line: number) => `${path}#${line}`;

const loadIgnored = (): IgnoredMap => storage.get([IGNORED_KEY])[IGNORED_KEY] ?? {};
const saveIgnored = (map: IgnoredMap) => storage.set({ [IGNORED_KEY]: map });

interface FixedFlash {
  path: string;
  line: number;
  raw: string;
}

const SEVERITY_ORDER: Record<RuleSeverity, number> = { error: 0, warning: 1, info: 2 };
const FLASH_MAX = 8;

const AuditPage: React.FC = () => {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [ignored, setIgnored] = useState<IgnoredMap>(loadIgnored());
  const [collapsedFiles, setCollapsedFiles] = useState<Record<string, boolean>>({});
  const [fixedFlash, setFixedFlash] = useState<FixedFlash[]>([]);
  const [msg, setMsg] = useState('');
  const [page, setPage] = useState(1);
  const FILE_PAGE_SIZE = 8; // 每页文件数

  const scan = useCallback(async (options?: { silent?: boolean }) => {
    setBusy(true);
    if (!options?.silent) setMsg('');
    try {
      const res = await runAudit((done, total) => setProgress({ done, total }));
      setResult(res);
    } catch (e: any) {
      setMsg(`扫描失败：${e?.message ?? e}`);
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }, []);

  useEffect(() => {
    scan();
  }, [scan]);

  const pushFlash = (lines: FixedFlash[]) => {
    if (lines.length === 0) return;
    setFixedFlash((prev) => {
      const seen = new Set(prev.map((f) => lineKey(f.path, f.line)));
      const merged = [...prev];
      for (const f of lines) {
        if (!seen.has(lineKey(f.path, f.line))) {
          merged.push(f);
          seen.add(lineKey(f.path, f.line));
        }
      }
      return merged.slice(-FLASH_MAX);
    });
  };

  // ---- 修复：循环"扫描+应用"直到目标行/全部无可修 ----
  const runFixLoop = async (pred: (i: Issue) => boolean, scopeLabel: string) => {
    setBusy(true);
    setMsg('');
    try {
      for (let round = 0; round < 6; round++) {
        const res = await runAudit();
        setResult(res);
        const targets = res.issues.filter(
          (i) => i.fixedLine && pred(i) && !ignored[lineKey(i.path, i.line)],
        );
        if (targets.length === 0) {
          if (round === 0) setMsg(`${scopeLabel}：没有可自动修复的问题`);
          return;
        }
        const out = await applyFixes(targets);
        if (out.appliedLines.length > 0) pushFlash(out.appliedLines);
        if (out.applied === 0) {
          setMsg(`${scopeLabel}：无法继续自动修复（剩余问题需人工/迁移）`);
          return;
        }
      }
      setMsg(`${scopeLabel}：已达修复轮次上限，请再点「重新体检」确认剩余项`);
    } finally {
      setBusy(false);
    }
    await scan({ silent: true });
  };

  const fixOneLine = (path: string, line: number) =>
    runFixLoop((i) => i.path === path && i.line === line, `L${line}`);

  const fixAll = () => runFixLoop(() => true, '一键修复');

  const toggleIgnore = (path: string, line: number) => {
    const key = lineKey(path, line);
    const next = { ...ignored };
    if (next[key]) delete next[key];
    else next[key] = true;
    setIgnored(next);
    saveIgnored(next);
  };

  const openFile = async (path: string, line: number) => {
    const app = appStore.getState().dailyNotesState.app;
    const file = app.vault.getAbstractFileByPath(path);
    if (file instanceof TFile) {
      const leaf = app.workspace.getLeaf(false);
      await leaf.openFile(file, { active: true, eState: { line: Math.max(line - 1, 0) } });
    }
  };

  // ---- 整文件迁移（旧格式行 → 新卡片块）：文件级操作，与行级修复循环分开 ----
  const [migratingPath, setMigratingPath] = useState('');
  const migrateOneFile = async (path: string) => {
    const app = appStore.getState().dailyNotesState.app;
    const file = app.vault.getAbstractFileByPath(path);
    if (!(file instanceof TFile)) return;
    setBusy(true);
    setMigratingPath(path);
    setMsg('');
    try {
      const rep = await migrateFile(file);
      if (rep.changed) {
        setMsg(
          `迁移完成：转换 ${rep.converted} 个旧单位${rep.droppedComments > 0 ? `，丢弃已删评论 ${rep.droppedComments} 行` : ''}` +
            (rep.skipped > 0 ? `，${rep.skipped} 个单位无法映射已原样保留` : '') +
            '。备份在 .rememo-backup/migrate-*，旧数据已恢复为新卡片块。',
        );
      } else {
        setMsg(
          rep.skipped > 0
            ? `没有可迁移的旧单位（${rep.skipped} 行缺时间等，需人工处理）。`
            : '这个文件没有旧格式行，无需迁移。',
        );
      }
      await scan({ silent: true });
      // 迁移改变了整文件行结构，vault 2s debounce 会吞事件 → 显式全量回读
      await memoService.fetchAllMemos();
    } catch (e: any) {
      setMsg(`迁移失败：${e?.message ?? e}`);
    } finally {
      setBusy(false);
      setMigratingPath('');
    }
  };

  // ---- 一键迁移全部含旧格式行的文件（逐个迁移，最后统一回读）----
  const migrateAllLegacy = async () => {
    if (!result) return;
    const app = appStore.getState().dailyNotesState.app;
    const paths = [
      ...new Set(
        result.issues
          .filter((i) => i.ruleId === 'legacy-row' && !ignored[lineKey(i.path, i.line)])
          .map((i) => i.path),
      ),
    ];
    if (paths.length === 0) return;
    setBusy(true);
    setMsg('');
    let files = 0;
    let converted = 0;
    let skipped = 0;
    let dropped = 0;
    const failed: string[] = [];
    try {
      for (const path of paths) {
        const file = app.vault.getAbstractFileByPath(path);
        if (!(file instanceof TFile)) continue;
        try {
          const rep = await migrateFile(file);
          if (rep.changed) {
            files++;
            converted += rep.converted;
            skipped += rep.skipped;
            dropped += rep.droppedComments;
          }
        } catch (e: any) {
          failed.push(shortName(path));
        }
      }
      setMsg(
        `全部迁移完成：${files} 个文件 · 转换 ${converted} 个旧单位` +
          (dropped > 0 ? ` · 丢弃已删评论 ${dropped} 行` : '') +
          (skipped > 0 ? ` · ${skipped} 个单位无法映射已原样保留` : '') +
          (failed.length > 0 ? ` · 失败：${failed.join('、')}` : '') +
          '。备份在 .rememo-backup/migrate-*。',
      );
      await scan({ silent: true });
      await memoService.fetchAllMemos();
    } catch (e: any) {
      setMsg(`迁移失败：${e?.message ?? e}`);
    } finally {
      setBusy(false);
    }
  };

  // ---- 树：文件 → 行（新日期文件在上：路径字典序倒排）----
  const tree = useMemo(() => {
    if (!result) return [];
    const byPath = new Map<string, Map<number, Issue[]>>();
    for (const issue of result.issues) {
      if (ignored[lineKey(issue.path, issue.line)]) continue;
      let byLine = byPath.get(issue.path);
      if (!byLine) {
        byLine = new Map();
        byPath.set(issue.path, byLine);
      }
      const list = byLine.get(issue.line) ?? [];
      list.push(issue);
      byLine.set(issue.line, list);
    }
    return [...byPath.entries()]
      .map(([path, byLine]) => ({
        path,
        lines: [...byLine.entries()]
          .sort((a, b) => a[0] - b[0])
          .map(([line, issues]) => ({
            line,
            issues: issues.sort(
              (a, b) =>
                SEVERITY_ORDER[ruleById[a.ruleId]?.severity ?? 'info'] -
                  SEVERITY_ORDER[ruleById[b.ruleId]?.severity ?? 'info'] ||
                a.ruleId.localeCompare(b.ruleId),
            ),
          })),
      }))
      .sort((a, b) => b.path.localeCompare(a.path)); // 新日期文件在上
  }, [result, ignored]);

  const stats = result
    ? {
        files: tree.length,
        legacyFiles: tree.filter((f) =>
          f.lines.some((l) => l.issues.some((i) => i.ruleId === 'legacy-row')),
        ).length,
        lines: tree.reduce((n, f) => n + f.lines.length, 0),
        issues: result.issues.filter((i) => !ignored[lineKey(i.path, i.line)]).length,
        fixableLines: tree.reduce(
          (n, f) => n + f.lines.filter((l) => l.issues.some((i) => i.fixedLine)).length,
          0,
        ),
      }
    : null;

  const shortName = (path: string) => path.split('/').pop() ?? path;

  // ---- 分页（按文件，每页 FILE_PAGE_SIZE 个）----
  const totalPages = Math.max(1, Math.ceil(tree.length / FILE_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageFiles = tree.slice((safePage - 1) * FILE_PAGE_SIZE, safePage * FILE_PAGE_SIZE);

  return (
    <div className="audit-page-wrapper">
      <div className="audit-page-inner">
        {/* 页头 */}
        <div className="audit-page-header">
          <p className="title-text">🩺 数据体检</p>
          <p className="sub-text">
            检测日记文件中的数据结构问题。修复前自动备份到 .rememo-backup/audit-时间戳/，可放心操作。
          </p>
        </div>

        {/* 最近修复（置顶反馈） */}
        {fixedFlash.length > 0 && (
          <div className="audit-flash">
            <div className="audit-flash-head">
              <span>✅ 最近修复</span>
              <button className="btn clear-flash-btn" onClick={() => setFixedFlash([])}>
                清空
              </button>
            </div>
            {fixedFlash.map((f) => (
              <div className="audit-flash-item" key={lineKey(f.path, f.line)}>
                <span className="audit-file-mini">{shortName(f.path)}</span>
                <span className="audit-line-mini">L{f.line}</span>
                <span className="audit-flash-raw" title={f.raw}>
                  {f.raw}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 工具条 */}
        <div className="audit-toolbar">
          <span className="audit-stats">
            有问题文件 {stats?.files ?? 0} · memo {stats?.lines ?? 0} 条 · 问题 {stats?.issues ?? 0} 个
            {stats && stats.legacyFiles > 0 ? `（含旧格式文件 ${stats.legacyFiles} 个）` : ''}
            {stats && stats.fixableLines > 0 ? `（可修 ${stats.fixableLines} 条）` : ''}
          </span>
          <button className="btn refresh-btn" onClick={() => scan()} disabled={busy}>
            重新体检
          </button>
          {stats && stats.legacyFiles > 0 && (
            <button className="btn migrate-all-btn" onClick={migrateAllLegacy} disabled={busy}>
              一键迁移全部旧文件（{stats.legacyFiles} 个）
            </button>
          )}
          {stats && stats.fixableLines > 0 && (
            <button className="btn fix-all-btn" onClick={fixAll} disabled={busy}>
              一键修复全部（{stats.fixableLines} 条）
            </button>
          )}
        </div>
        {busy && (
          <div className="audit-busy">{progress ? `扫描中… ${progress.done}/${progress.total}` : '处理中…'}</div>
        )}
        {msg && <div className="audit-msg">{msg}</div>}

        {!busy && result && tree.length === 0 && <div className="audit-empty">没发现问题 🎉</div>}

        {!busy && pageFiles.length > 0 && (
          <div className="audit-file-list">
            {pageFiles.map((file) => {
              const collapsed = !!collapsedFiles[file.path];
              const errCount = file.lines.reduce(
                (n, l) =>
                  n + l.issues.filter((i) => ruleById[i.ruleId]?.severity === 'error').length,
                0,
              );
              const hasLegacy = file.lines.some((l) => l.issues.some((i) => i.ruleId === 'legacy-row'));
              return (
                <section className="audit-file" key={file.path}>
                  <header
                    className="audit-file-header"
                    onClick={() =>
                      setCollapsedFiles({ ...collapsedFiles, [file.path]: !collapsed })
                    }
                  >
                    <span className="chevron">{collapsed ? '▸' : '▾'}</span>
                    <span className="audit-file-name" title={file.path}>
                      {shortName(file.path)}
                    </span>
                    {errCount > 0 && <span className="audit-file-err">{errCount} 处错误</span>}
                    <span className="audit-file-count">{file.lines.length} 条 memo</span>
                    {hasLegacy && (
                      <button
                        className="btn migrate-btn"
                        title="把本文件的旧格式行整体迁移为新卡片块（自动备份），迁移后旧数据恢复渲染"
                        onClick={(e) => {
                          e.stopPropagation();
                          migrateOneFile(file.path);
                        }}
                        disabled={busy}
                      >
                        {migratingPath === file.path ? '迁移中…' : '整文件迁移'}
                      </button>
                    )}
                  </header>

                  {!collapsed && (
                    <div className="audit-line-list">
                      {file.lines.map(({ line, issues }) => {
                        const key = lineKey(file.path, line);
                        const fixableIssues = issues.filter(
                          (i) => i.fixedLine && i.fixedLine !== issues[0].raw,
                        );
                        const raw = issues[0].raw;
                        return (
                          <div className="audit-line" key={key}>
                            <div className="audit-line-head">
                              <span className="audit-line-no">L{line}</span>
                              <span className="audit-line-preview" title={raw}>
                                {raw}
                              </span>
                            </div>
                            <div className="audit-line-badges">
                              {issues.map((issue) => {
                                const rule = ruleById[issue.ruleId];
                                return (
                                  <span
                                    key={issue.ruleId}
                                    className={`badge badge-${rule?.severity ?? 'info'}`}
                                    title={rule?.why}
                                  >
                                    {rule?.name ?? issue.ruleId}
                                  </span>
                                );
                              })}
                            </div>
                            {fixableIssues.length > 0 &&
                              fixableIssues.map((issue) => (
                                <div
                                  className="audit-fix-preview"
                                  key={`fix-${issue.ruleId}`}
                                  title={issue.fixedLine}
                                >
                                  <span className="audit-fix-label">
                                    「{ruleById[issue.ruleId]?.name ?? issue.ruleId}」修复为：
                                  </span>
                                  {issue.fixedLine}
                                </div>
                              ))}
                            <div className="audit-line-actions">
                              {fixableIssues.length > 0 && (
                                <button
                                  className="btn fix-one-btn"
                                  onClick={() => fixOneLine(file.path, line)}
                                  disabled={busy}
                                >
                                  修复这条
                                </button>
                              )}
                              <button className="btn view-btn" onClick={() => openFile(file.path, line)}>
                                查看
                              </button>
                              <button
                                className="btn ignore-btn"
                                onClick={() => toggleIgnore(file.path, line)}
                              >
                                忽略
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}

        {/* 分页（文件多于一页时显示） */}
        {!busy && (
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default AuditPage;
