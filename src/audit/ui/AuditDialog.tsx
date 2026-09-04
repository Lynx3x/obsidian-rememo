// 数据体检报告弹窗 v2.1：文件 → memo 行分组，新日期文件在上。
// - 行内容只做单行缩略（hover 可看全文），要看具体内容点「查看」跳到日记文件对应行
// - 修复粒度为行：该行所有可修问题循环修复到干净（备份 .rememo-backup/audit-<ts>/）
// - 忽略粒度为行；状态本地持久化
import React, { useEffect, useMemo, useState } from 'react';
import { TFile } from 'obsidian';
import { applyFixes, runAudit } from '../engine';
import { ruleById } from '../rules';
import { AuditResult, Issue, RuleSeverity } from '../types';
import { storage } from '../../helpers/storage';
import appStore from '../../stores/appStore';
import { showDialog } from '../../components/Dialog';
import '../../less/audit-dialog.less';

const IGNORED_KEY = 'auditIgnoredLines';
type IgnoredMap = Record<string, boolean>;
const lineKey = (path: string, line: number) => `${path}#${line}`;

const loadIgnored = (): IgnoredMap => storage.get([IGNORED_KEY])[IGNORED_KEY] ?? {};
const saveIgnored = (map: IgnoredMap) => storage.set({ [IGNORED_KEY]: map });

interface Props {
  destroy: () => void;
}

const SEVERITY_ORDER: Record<RuleSeverity, number> = { error: 0, warning: 1, info: 2 };

const AuditDialog: React.FC<Props> = ({ destroy }) => {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [ignored, setIgnored] = useState<IgnoredMap>(loadIgnored());
  const [collapsedFiles, setCollapsedFiles] = useState<Record<string, boolean>>({});
  const [msg, setMsg] = useState('');

  const scan = async () => {
    setBusy(true);
    setMsg('');
    try {
      const res = await runAudit((done, total) => setProgress({ done, total }));
      setResult(res);
    } catch (e: any) {
      setMsg(`扫描失败：${e?.message ?? e}`);
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  useEffect(() => {
    scan();
  }, []);

  // ---- 修复：循环"扫描+应用"直到目标行/全部无可修 ----
  const runFixLoop = async (pred: (i: Issue) => boolean, scopeLabel: string) => {
    setBusy(true);
    setMsg('');
    let appliedTotal = 0;
    try {
      for (let round = 0; round < 6; round++) {
        const res = await runAudit();
        setResult(res);
        const targets = res.issues.filter(
          (i) => i.fixedLine && pred(i) && !ignored[lineKey(i.path, i.line)],
        );
        if (targets.length === 0) {
          setMsg(
            appliedTotal > 0
              ? `${scopeLabel}：已修复 ${appliedTotal} 处 ✅`
              : `${scopeLabel}：没有可自动修复的问题`,
          );
          return;
        }
        const out = await applyFixes(targets);
        appliedTotal += out.applied;
        if (out.applied === 0) {
          setMsg(
            `${scopeLabel}：无法继续自动修复（剩余问题需人工/迁移），已修 ${appliedTotal} 处`,
          );
          return;
        }
      }
      setMsg(`${scopeLabel}：已达修复轮次上限，请再点一次「重新体检」确认剩余项`);
    } finally {
      setBusy(false);
    }
    await scan();
  };

  const fixOneLine = (path: string, line: number) =>
    runFixLoop((i) => i.path === path && i.line === line, `第 ${line} 行`);

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
        lines: tree.reduce((n, f) => n + f.lines.length, 0),
        issues: result.issues.filter((i) => !ignored[lineKey(i.path, i.line)]).length,
        fixableLines: tree.reduce(
          (n, f) => n + f.lines.filter((l) => l.issues.some((i) => i.fixedLine)).length,
          0,
        ),
      }
    : null;

  const shortName = (path: string) => path.split('/').pop() ?? path;

  return (
    <>
      <div className="dialog-header-container">
        <p className="title-text">
          <span className="icon-text">🩺</span> 数据体检
        </p>
        <button className="btn close-btn" onClick={destroy}>
          ✕
        </button>
      </div>

      <div className="dialog-content-container audit-content">
        {busy && (
          <div className="audit-busy">
            {progress ? `扫描中… ${progress.done}/${progress.total}` : '处理中…'}
          </div>
        )}

        {!busy && result && (
          <>
            <div className="audit-toolbar">
              <span className="audit-stats">
                有问题文件 {stats?.files} · memo {stats?.lines} 条 · 问题 {stats?.issues} 个
                {stats && stats.fixableLines > 0 ? `（可修 ${stats.fixableLines} 条）` : ''}
              </span>
              <button className="btn refresh-btn" onClick={scan}>
                重新体检
              </button>
              {stats && stats.fixableLines > 0 && (
                <button className="btn fix-all-btn" onClick={fixAll} disabled={busy}>
                  一键修复全部（{stats.fixableLines} 条）
                </button>
              )}
            </div>
            {msg && <div className="audit-msg">{msg}</div>}

            {tree.length === 0 ? (
              <div className="audit-empty">没发现问题 🎉</div>
            ) : (
              <div className="audit-file-list">
                {tree.map((file) => {
                  const collapsed = !!collapsedFiles[file.path];
                  const errCount = file.lines.reduce(
                    (n, l) =>
                      n +
                      l.issues.filter((i) => ruleById[i.ruleId]?.severity === 'error').length,
                    0,
                  );
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
                        {errCount > 0 && (
                          <span className="audit-file-err">{errCount} 处错误</span>
                        )}
                        <span className="audit-file-count">{file.lines.length} 条 memo</span>
                      </header>

                      {!collapsed && (
                        <div className="audit-line-list">
                          {file.lines.map(({ line, issues }) => {
                            const key = lineKey(file.path, line);
                            const fixable = issues.some((i) => i.fixedLine);
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
                                <div className="audit-line-actions">
                                  {fixable && (
                                    <button
                                      className="btn fix-one-btn"
                                      onClick={() => fixOneLine(file.path, line)}
                                      disabled={busy}
                                    >
                                      修复这条
                                    </button>
                                  )}
                                  <button
                                    className="btn view-btn"
                                    onClick={() => openFile(file.path, line)}
                                  >
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
          </>
        )}
      </div>
    </>
  );
};

export default function showAuditDialog(): void {
  showDialog({ className: 'audit-dialog' }, AuditDialog);
}
