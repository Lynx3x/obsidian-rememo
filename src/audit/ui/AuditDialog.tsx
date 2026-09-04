// 数据体检报告弹窗 v2：以"文件 → memo 行"分组（用户修复的对象是 memo，不是单个问题）。
// - 文件卡片可折叠；行内容默认单行缩略，点击展开看原文与修复预览
// - 修复粒度为行：该行所有可修问题循环修复到干净（备份在 .rememo-backup/audit-<ts>/）
// - 忽略粒度也是行；修复/忽略状态本地持久化
import React, { useEffect, useMemo, useState } from 'react';
import { applyFixes, runAudit } from '../engine';
import { ruleById } from '../rules';
import { AuditResult, Issue, RuleSeverity } from '../types';
import { storage } from '../../helpers/storage';
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
  const [busy, setBusy] = useState(false); // 扫描或修复中
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [ignored, setIgnored] = useState<IgnoredMap>(loadIgnored);
  const [collapsedFiles, setCollapsedFiles] = useState<Record<string, boolean>>({});
  const [expandedLines, setExpandedLines] = useState<Record<string, boolean>>({});
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

  // ---- 修复：目标过滤 → 循环跑"扫描+应用"直到该行/全部无剩余可修 ----
  const runFixLoop = async (pred: (i: Issue) => boolean, scopeLabel: string) => {
    setBusy(true);
    setMsg('');
    let appliedTotal = 0;
    try {
      for (let round = 0; round < 6; round++) {
        const res = await runAudit();
        setResult(res);
        const targets = res.issues.filter((i) => i.fixedLine && pred(i) && !ignored[lineKey(i.path, i.line)]);
        if (targets.length === 0) {
          setMsg(appliedTotal > 0 ? `${scopeLabel}：已修复 ${appliedTotal} 处 ✅` : `${scopeLabel}：没有可自动修复的问题`);
          return;
        }
        const out = await applyFixes(targets);
        appliedTotal += out.applied;
        if (out.applied === 0) {
          setMsg(`${scopeLabel}：无法继续自动修复（剩余问题需人工/迁移），已修 ${appliedTotal} 处`);
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

  // ---- 树：文件 → 行 → 问题 ----
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
      .sort((a, b) => a.path.localeCompare(b.path));
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
        {busy && <div className="audit-busy">{progress ? `扫描中… ${progress.done}/${progress.total}` : '处理中…'}</div>}

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
                    (n, l) => n + l.issues.filter((i) => ruleById[i.ruleId]?.severity === 'error').length,
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
                        {errCount > 0 && <span className="audit-file-err">{errCount} 处错误</span>}
                        <span className="audit-file-count">{file.lines.length} 条 memo</span>
                      </header>

                      {!collapsed && (
                        <div className="audit-line-list">
                          {file.lines.map(({ line, issues }) => {
                            const exKey = lineKey(file.path, line);
                            const expanded = !!expandedLines[exKey];
                            const fixable = issues.some((i) => i.fixedLine);
                            const raw = issues[0].raw;
                            const fixed = issues.find((i) => i.fixedLine)?.fixedLine;
                            return (
                              <div className="audit-line" key={exKey}>
                                <div className="audit-line-head">
                                  <button
                                    className="btn expand-btn"
                                    onClick={() =>
                                      setExpandedLines({ ...expandedLines, [exKey]: !expanded })
                                    }
                                    title={expanded ? '收起' : '展开原文'}
                                  >
                                    <span className="chevron">{expanded ? '▾' : '▸'}</span>
                                  </button>
                                  <span className="audit-line-no">L{line}</span>
                                  <div
                                    className="audit-line-preview"
                                    onClick={() =>
                                      setExpandedLines({ ...expandedLines, [exKey]: !expanded })
                                    }
                                    title="点击展开/收起"
                                  >
                                    {raw}
                                  </div>
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

                                {expanded && (
                                  <div className="audit-line-detail">
                                    <pre className="audit-code audit-code-raw">{raw}</pre>
                                    {issues
                                      .filter((i) => i.fixedLine && i.fixedLine !== raw)
                                      .map((i) => (
                                        <div key={`fix-${i.ruleId}`}>
                                          <div className="audit-fix-label">
                                            「{ruleById[i.ruleId]?.name ?? i.ruleId}」修复为：
                                          </div>
                                          <pre className="audit-code audit-code-fixed">{i.fixedLine}</pre>
                                        </div>
                                      ))}
                                  </div>
                                )}

                                <div className="audit-line-actions">
                                  {fixable && (
                                    <button
                                      className="btn fix-one-btn"
                                      onClick={() => fixOneLine(file.path, line)}
                                      disabled={busy}
                                    >
                                      修复这条 memo
                                    </button>
                                  )}
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
