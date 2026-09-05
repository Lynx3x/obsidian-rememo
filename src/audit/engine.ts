// audit 引擎：遍历日记文件跑规则表 → 报告；修复 = 备份 → 逐文件写回。
// 修复语义（对齐 eslint --fix 需要多次运行的现实）：同一行若命中多条可修规则，
// 只先应用注册顺序的第一条（legacy-time → dup-id → missing-id），UI 会提示"修复后请重新体检"。
import { TFile, normalizePath, moment } from 'obsidian';
import { getAllDailyNotes } from 'obsidian-daily-notes-interface';
import appStore from '../stores/appStore';
import { rules } from './rules';
import { AuditResult, Issue } from './types';

function readLines(file: TFile): Promise<string[]> {
  return file.vault.cachedRead(file).then((content) => content.split('\n'));
}

/**
 * memo 处理区标记（复制读取器语义，见 obGetMemos.parseMemosFromNote）：
 * - ProcessEntriesBelow 为空：从文件头开始处理，遇到第一个标题（/^#{1,} /）后退出
 * - 非空：从匹配 token 的行开始，遇到下一个标题退出
 */
export function computeScope(lines: string[], processBelow: string): boolean[] {
  const inScope = new Array<boolean>(lines.length).fill(false);
  const tokenRe = processBelow ? new RegExp(processBelow.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')) : null;
  let active = !tokenRe;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (tokenRe && !active && tokenRe.test(line)) {
      active = true;
      continue; // 与读取器一致：token 行只开门、不入区（否则标题型 token 如 "## Memo" 会被下方标题判定当场熄灭，处理区恒空）
    }
    if (active && /^#{1,} /.test(line)) active = false;
    if (active) inScope[i] = true;
  }
  return inScope;
}

export async function runAudit(
  onProgress?: (done: number, total: number) => void,
): Promise<AuditResult> {
  const app = appStore.getState().dailyNotesState.app;
  const vault = app.vault;
  const dailyNotes = getAllDailyNotes();

  const files = Object.entries(dailyNotes)
    .filter(([, f]) => f instanceof TFile && f.extension === 'md')
    .map(([, f]) => f as TFile)
    .sort((a, b) => b.path.localeCompare(a.path));

  const issues: Issue[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i + 1, files.length);
    let lines: string[];
    try {
      lines = await readLines(file);
    } catch {
      continue; // 读取失败（文件被删等）跳过
    }
    const ctx = { path: file.path, lines, inScope: computeScope(lines, appStore.getState().settingsState.settings.ProcessEntriesBelow ?? '') };
    for (const rule of rules) {
      issues.push(...rule.detect(ctx));
    }
  }

  const byRule: Record<string, Issue[]> = {};
  for (const rule of rules) byRule[rule.id] = [];
  for (const issue of issues) byRule[issue.ruleId]?.push(issue);

  return { issues, byRule, scannedFiles: files.length };
}

/**
 * 修复一批 issue（仅行级可修 fixedLine）。
 * 返回 { applied, skipped, backupDir, changedFiles, appliedLines }
 * skipped = 同 path+line 撞了多条可修规则、只取了第一条的其余条数（重扫可继续修）。
 * appliedLines = 本次实际修复的行明细（供 UI 展示"最近修复"）。
 */
export async function applyFixes(
  issues: Issue[],
): Promise<{
  applied: number;
  skipped: number;
  backupDir: string;
  changedFiles: number;
  appliedLines: { path: string; line: number; raw: string }[];
}> {
  const empty = { applied: 0, skipped: 0, backupDir: '', changedFiles: 0, appliedLines: [] };
  const fixable = issues.filter((i) => i.fixedLine);
  if (fixable.length === 0) return empty;

  const app = appStore.getState().dailyNotesState.app;
  const vault = app.vault;
  const adapter = vault.adapter;

  // 同 path+line 多条：只取第一条（按注册顺序）；其余计入 skipped
  const picked = new Map<string, Issue>();
  let skipped = 0;
  for (const issue of fixable) {
    const key = `${issue.path}#${issue.line}`;
    if (picked.has(key)) skipped++;
    else picked.set(key, issue);
  }
  const pickedIssues = [...picked.values()];

  // 备份目录：.rememo-backup/audit-<ts>/
  const ts = moment().format('YYYYMMDD-HHmmss');
  const backupDir = normalizePath('.rememo-backup/audit-' + ts);
  try {
    await adapter.mkdir(normalizePath('.rememo-backup'));
  } catch {
    /* 已存在 */
  }
  await adapter.mkdir(backupDir);

  const byPath = new Map<string, Issue[]>();
  for (const issue of pickedIssues) {
    const list = byPath.get(issue.path) ?? [];
    list.push(issue);
    byPath.set(issue.path, list);
  }

  let applied = 0;
  let changedFiles = 0;
  const appliedLines: { path: string; line: number; raw: string }[] = [];
  for (const [path, pathIssues] of byPath) {
    const file = vault.getAbstractFileByPath(path);
    if (!(file instanceof TFile)) continue;
    const lines = await readLines(file);
    // 备份原文
    const fileName = file.name;
    await adapter.write(normalizePath(`${backupDir}/${fileName}`), lines.join('\n'));

    let changed = false;
    // 行升序；每行只应用一次
    const handledLines = new Set<number>();
    for (const issue of pathIssues) {
      const lineIdx = issue.line - 1;
      if (lineIdx < 0 || lineIdx >= lines.length) continue;
      if (handledLines.has(lineIdx)) continue;
      handledLines.add(lineIdx);
      lines[lineIdx] = issue.fixedLine as string;
      applied++;
      appliedLines.push({ path, line: issue.line, raw: issue.raw });
      changed = true;
    }
    if (changed) {
      await vault.modify(file, lines.join('\n'));
      changedFiles++;
    }
  }

  return { applied, skipped, backupDir, changedFiles, appliedLines };
}
