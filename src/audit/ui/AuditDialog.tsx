// 数据体检报告弹窗：eslint 式——按规则分组、每条展示原因(why)与原行/修复预览，
// 支持逐条修复/忽略与一键全修（修复前自动备份到 .rememo-backup/audit-<ts>/）。
import React, { useEffect, useState } from 'react';
import { applyFixes, runAudit } from '../engine';
import { rules, ruleById } from '../rules';
import { AuditResult, Issue } from '../types';
import { storage } from '../../helpers/storage';
import { showDialog } from '../../components/Dialog';
import '../../less/audit-dialog.less';

const IGNORED_KEY = 'auditIgnored';
type IgnoredMap = Record<string, boolean>;

const ignoredKey = (issue: Issue) => `${issue.ruleId}:${issue.path}:${issue.line}`;

const loadIgnored = (): IgnoredMap => storage.get([IGNORED_KEY])[IGNORED_KEY] ?? {};
const saveIgnored = (map: IgnoredMap) => storage.set({ [IGNORED_KEY]: map });

interface Props {
  destroy: () => void;
}

const AuditDialog: React.FC<Props> = ({ destroy }) => {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [ignored, setIgnored] = useState<IgnoredMap>(loadIgnored);
  const [fixing, setFixing] = useState(false);
  const [fixMsg, setFixMsg] = useState('');

  const scan = async () => {
    setScanning(true);
    setFixMsg('');
    setResult(null);
    try {
      const res = await runAudit((done, total) => setProgress({ done, total }));
      setResult(res);
    } catch (e: any) {
      setFixMsg(`扫描失败：${e?.message ?? e}`);
    } finally {
      setScanning(false);
      setProgress(null);
    }
  };

  useEffect(() => {
    scan();
  }, []);

  const toggleIgnore = (issue: Issue) => {
    const key = ignoredKey(issue);
    const next = { ...ignored };
    if (next[key]) delete next[key];
    else next[key] = true;
    setIgnored(next);
    saveIgnored(next);
  };

  const visibleIssues = result ? result.issues.filter((i) => !ignored[ignoredKey(i)]) : [];

  const fixAll = async () => {
    if (!result) return;
    const targets = result.issues.filter((i) => i.fixedLine && !ignored[ignoredKey(i)]);
    setFixing(true);
    try {
      const out = await applyFixes(targets);
      const tip =
        out.applied === 0
          ? '没有可自动修复的问题'
          : `已修复 ${out.applied} 处（改动 ${out.changedFiles} 个文件）。原文件备份在 ${out.backupDir}。`;
      const extra =
        out.skipped > 0
          ? `另有 ${out.skipped} 处与已修问题同行，需重新体检后再修（同一行一次只修一种）。`
          : '';
      setFixMsg(`${tip}${extra}`);
    } finally {
      setFixing(false);
    }
    await scan(); // 修复后重扫，报告实时收敛
  };

  const fixOne = async (issue: Issue) => {
    setFixing(true);
    try {
      const out = await applyFixes([issue]);
      setFixMsg(`已修复 ${out.applied} 处。`);
    } finally {
      setFixing(false);
    }
    await scan();
  };

  const stats = result
    ? {
        total: visibleIssues.length,
        fixable: visibleIssues.filter((i) => i.fixedLine).length,
      }
    : null;

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
        {scanning && (
          <div className="audit-scanning">
            {progress ? `扫描中… ${progress.done}/${progress.total}` : '准备中…'}
          </div>
        )}

        {!scanning && result && (
          <>
            <div className="audit-toolbar">
              <span className="audit-stats">
                共扫描 {result.scannedFiles} 个日记文件 · {stats?.total} 个问题
                {stats && stats.fixable > 0 ? `（可自动修复 ${stats.fixable} 个）` : ''}
              </span>
              <button className="btn refresh-btn" onClick={scan}>
                重新体检
              </button>
              {stats && stats.fixable > 0 && (
                <button className="btn fix-all-btn" onClick={fixAll} disabled={fixing}>
                  一键修复全部（{stats.fixable}）
                </button>
              )}
            </div>
            {fixMsg && <div className="audit-fix-msg">{fixMsg}</div>}

            {visibleIssues.length === 0 ? (
              <div className="audit-empty">没发现问题 🎉</div>
            ) : (
              <div className="audit-rule-list">
                {rules
                  .filter((r) => result.byRule[r.id]?.some((i) => !ignored[ignoredKey(i)]))
                  .map((rule) => {
                    const ruleIssues = result.byRule[rule.id].filter((i) => !ignored[ignoredKey(i)]);
                    return (
                      <section className="audit-rule" key={rule.id}>
                        <header className="audit-rule-header">
                          <span className={`severity severity-${rule.severity}`}>{rule.name}</span>
                          <span className="audit-rule-count">{ruleIssues.length}</span>
                        </header>
                        <p className="audit-rule-why">{rule.why}</p>
                        <ul className="audit-issue-list">
                          {ruleIssues.map((issue) => (
                            <li className="audit-issue" key={ignoredKey(issue)}>
                              <div className="audit-issue-meta">
                                <span className="audit-file">{issue.path}</span>
                                <span className="audit-line">L{issue.line}</span>
                                {issue.note && <span className="audit-note">{issue.note}</span>}
                              </div>
                              <pre className="audit-code audit-code-raw">{issue.raw}</pre>
                              {issue.fixedLine && (
                                <>
                                  <div className="audit-arrow">↓ 修复为</div>
                                  <pre className="audit-code audit-code-fixed">{issue.fixedLine}</pre>
                                </>
                              )}
                              <div className="audit-issue-actions">
                                {issue.fixedLine && (
                                  <button
                                    className="btn fix-one-btn"
                                    onClick={() => fixOne(issue)}
                                    disabled={fixing}
                                  >
                                    修复这一条
                                  </button>
                                )}
                                <button className="btn ignore-btn" onClick={() => toggleIgnore(issue)}>
                                  忽略
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
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
