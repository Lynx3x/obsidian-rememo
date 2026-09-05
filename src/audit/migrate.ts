// 数据体检：整文件"旧→新"迁移 v2（P3 引用模型，ADR-0003，2026-09-05）
// v2 相对 v1：旧缩进评论行不再折叠进父卡正文，而是**直转引用卡**（MEMO_LINK 指向父卡）；
//   跨天评论（14 位时间戳日期 ≠ 父文件日期）落到评论当天日记 → 迁移为跨文件两阶段。
// v1 折叠仅保留给非评论缩进行（附件等）。已折叠数据拆不出，dev 重测用 bak 原件。
//
// 转换语义：
//  - 旧单位 = 顶层 old-top-row 行 + 其下全部缩进子树行。
//  - 父行 → 新卡片块：头行 = 任务标记 + 时间（<time> 剥除、HH:mm 补 :00、14 位→HH:mm:ss）
//    + deletedAt（值原样）+ ^id（缺则补 6 位随机）；正文 = <br> 解码为真实换行，逐行 4 空格缩进。
//  - 子树行分类：
//    * 评论行（4 空格 + `- ` + 14 位时间戳）→ 引用卡：头行 `- HH:mm:ss ^随机id`，
//      正文首行 `[@父卡标签](父文件名#^父id)` + 评论内容（<br> 解码）。
//      同文件日期 → 原地紧随父卡；跨日期 → 进跨文件队列（目标日期日记存在且含处理区才写入；
//      否则回退到父文件处理区尾——不丢数据）
//    * 含 deletedAt 的行（已删评论）→ 丢弃并计数
//    * 其余缩进行（附件/深层）→ 折叠进父卡正文末尾（剥 4 空格、保行序保层级）
//  - 无时间等无法映射的父行 → 整单位原样保留并计数（不臆造、不静默丢）。
//  - 新块（pure-header）/非 bullet 段落/处理区外内容 → 逐字节原样。
// 备份：.rememo-backup/migrate-<ts>/（文件名带目录路径防同名覆盖）。
import { TFile, normalizePath, moment } from 'obsidian';
import appStore from '../stores/appStore';
import { classifyMemoRow, extractDeletedAt, extractMemoTime, unindentContentLine } from '../helpers/memoLine';
import { computeScope } from './engine';

export interface MigrateReport {
  /** 实际写盘的文件数 */
  files: number;
  converted: number;
  skipped: number;
  droppedComments: number;
  /** 落到评论当天日记的引用卡数 */
  crossMoved: number;
  failed: string[];
}

const TIME_TAG_REG = /<\/?time>/gi;
const BR_REG = /<br\s*\/?>/gi;
const DELETED_AT_IN_LINE_REG = /\sdeletedAt:\s*(\d{14}|\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/;
/** 旧评论行：恰 4 空格缩进 + `- `(+任务前缀) + 14 位时间戳 */
const COMMENT_ROW_REG = /^ {4}- (?:\[[ xX]\] )?\d{14}/;
const FILE_DATE_REG = /(\d{4})-(\d{2})-(\d{2})\.md$/;

const randomId6 = () => Math.random().toString(36).slice(-6);
const indentOf = (line: string) => line.length - line.trimStart().length;

/** <br> 编码正文 → 真实换行的内容段（首尾空段丢弃、中间空段保留 = 段落分隔） */
function decodeLegacyContent(text: string): string[] {
  const segs = text.replace(BR_REG, '\n').split('\n');
  while (segs.length > 0 && segs[0].trim() === '') segs.shift();
  while (segs.length > 0 && segs[segs.length - 1].trim() === '') segs.pop();
  return segs;
}

/** 跨日期评论：待写到目标日期日记的引用卡 */
interface CrossCard {
  date: string;
  block: string[];
  parentPath: string;
  parentFileName: string;
}

interface FilePlan {
  path: string;
  out: string[];
  converted: number;
  skipped: number;
  droppedComments: number;
  cross: CrossCard[];
}

/** 单个旧单位 → 父卡（+ 同文件评论引用卡直接并入返回块；跨日期评论进 cross） */
function convertLegacyUnit(
  parent: string,
  subtree: string[],
  fileDate: string,
  parentPath: string,
  parentFileName: string,
  report: { droppedComments: number },
  cross: CrossCard[],
): string[] | null {
  let rest = parent.replace(/^[-*]\s/, '');
  let mark = '';
  const tm = /^\[([^\]]{1})\]\s?/.exec(rest);
  if (tm) {
    mark = tm[1];
    rest = rest.slice(tm[0].length);
  }
  rest = rest.replace(TIME_TAG_REG, '');
  const { time, rest: contentRest } = extractMemoTime(rest);
  if (!time) return null; // 缺时间：无法构成合法头行，留给人工

  const timeText = /^\d{1,2}:\d{2}$/.test(time) ? `${time}:00` : time;

  // 正文（<br> 解码）+ deletedAt + ^id（在正文串尾部，先剥标识再解码）
  let tail = contentRest;
  const idM = /\^([A-Za-z0-9]{6})\s*$/.exec(tail);
  const parentId = idM ? idM[1] : randomId6();
  if (idM) tail = tail.slice(0, idM.index).trimEnd();
  let deletedAt = '';
  const del = extractDeletedAt(tail);
  if (del.isDeleted) {
    deletedAt = del.deletedAt;
    tail = del.rest;
  }

  // 父卡正文（<br> 解码为真实换行，逐行 4 空格缩进）
  const parentBody: string[] = [];
  if (tail.trim() !== '') {
    for (const seg of decodeLegacyContent(tail)) {
      parentBody.push(seg === '' ? '' : '    ' + seg);
    }
  }
  const parentLabel = (decodeLegacyContent(tail).join(' ').trim() || timeText).slice(0, 24);
  let pendingBlank = 0;
  const flushBlank = () => {
    for (let b = 0; b < pendingBlank; b++) parentBody.push('');
    pendingBlank = 0;
  };

  // 子树行：评论行 → 独立引用卡；已删行 → 丢弃；其余 → 折叠进父卡正文
  for (const row of subtree) {
    if (row.trim() === '') {
      pendingBlank++;
      continue;
    }
    if (DELETED_AT_IN_LINE_REG.test(row)) {
      report.droppedComments++;
      pendingBlank = 0;
      continue;
    }
    const cm = COMMENT_ROW_REG.exec(row);
    if (cm) {
      flushBlank();
      const cRest = row.replace(COMMENT_ROW_REG, '').trimStart(); // 剥 14 位时间戳后的分隔空格
      const cTime = row.trimStart().replace(/^- (?:\[[ xX]\] )?/, '').slice(0, 14);
      const dateStr = `${cTime.slice(0, 4)}-${cTime.slice(4, 6)}-${cTime.slice(6, 8)}`;
      const timeStr = `${cTime.slice(8, 10)}:${cTime.slice(10, 12)}:${cTime.slice(12, 14)}`;
      const block = [
        `- ${timeStr} ^${randomId6()}`,
        `    [@${parentLabel}](${parentFileName}#^${parentId})`,
        ...decodeLegacyContent(cRest).map((seg) => (seg === '' ? '' : '    ' + seg)),
      ];
      if (dateStr === fileDate) {
        // 同文件：独立卡片块紧随父卡（前置空行分隔；父卡与评论间加空行由上层单位分隔统一处理）
        parentBody.push('', ...block);
      } else {
        cross.push({ date: dateStr, block, parentPath, parentFileName });
      }
      continue;
    }
    flushBlank();
    parentBody.push('    ' + unindentContentLine(row));
  }
  flushBlank();

  const header = `${mark !== '' ? `- [${mark}] ` : '- '}${timeText}${deletedAt ? ` deletedAt: ${deletedAt}` : ''} ^${parentId}`;
  return [header, ...parentBody];
}

/** 把一组卡片块插入到 lines 处理区末尾（区尾=最后一个 inScope 行之后；无区返回 null） */
function insertAtScopeEnd(lines: string[], blocks: string[][], processBelow: string): string[] | null {
  const scope = computeScope(lines, processBelow);
  const idx = scope.lastIndexOf(true);
  if (idx < 0) return null;
  let insertAt = idx + 1;
  // 越过尾部空行
  while (insertAt < lines.length && lines[insertAt].trim() === '') insertAt++;
  const flat: string[] = [];
  for (const b of blocks) {
    if (flat.length > 0) flat.push('');
    flat.push(...b);
  }
  const next = [...lines];
  // 插入点前若非空行，先补一个空行分隔
  const needLead = insertAt > 0 && next[insertAt - 1] !== '';
  if (needLead) next.splice(insertAt, 0, '', ...flat);
  else next.splice(insertAt, 0, ...flat);
  return next;
}

/**
 * 迁移一组日记文件（跨文件两阶段）：
 * 1) 全部文件纯计算（planContent，不写盘）；
 * 2) 统一提交：先备份每个将写文件到 .rememo-backup/migrate-<ts>/，再写回。
 * 跨天评论：目标日期日记存在于日记目录且处理区非空 → 追加到该文件处理区尾；
 *   否则回退到父文件处理区尾（父文件将写盘，数据不丢）。
 */
export async function migrateFiles(files: TFile[]): Promise<MigrateReport> {
  const app = appStore.getState().dailyNotesState.app;
  const processBelow = appStore.getState().settingsState.settings.ProcessEntriesBelow ?? '';
  const report: MigrateReport = { files: 0, converted: 0, skipped: 0, droppedComments: 0, crossMoved: 0, failed: [] };
  if (files.length === 0) return report;

  // ---- 阶段 1：纯计算 ----
  const plans: FilePlan[] = [];
  for (const file of files) {
    try {
      const lines = (await file.vault.cachedRead(file)).split(/\r?\n/);
      const inScope = computeScope(lines, processBelow);
      const fd = FILE_DATE_REG.exec(file.name);
      const fileDate = fd ? `${fd[1]}-${fd[2]}-${fd[3]}` : '';
      const out: string[] = [];
      let converted = 0;
      let skipped = 0;
      let droppedComments = 0;
      const cross: CrossCard[] = [];
      let i = 0;
      while (i < lines.length) {
        const line = lines[i];
        if (!inScope[i] || classifyMemoRow(line) !== 'old-top-row') {
          out.push(line);
          i++;
          continue;
        }
        const unitLines: string[] = [line];
        let j = i + 1;
        while (j < lines.length && inScope[j]) {
          const l = lines[j];
          if (l.trim() === '' || indentOf(l) > 0) {
            unitLines.push(l);
            j++;
            continue;
          }
          break;
        }
        const rpt = { droppedComments: 0 };
        const block = convertLegacyUnit(line, unitLines.slice(1), fileDate, file.path, file.name, rpt, cross);
        if (block === null) {
          out.push(...unitLines);
          skipped++;
        } else {
          out.push(...block);
          converted++;
        }
        droppedComments += rpt.droppedComments;
        i = j;
      }
      plans.push({ path: file.path, out, converted, skipped, droppedComments, cross });
      report.converted += converted;
      report.skipped += skipped;
      report.droppedComments += droppedComments;
    } catch {
      report.failed.push(file.name);
    }
  }

  // ---- 阶段 2：跨日期评论落地（目标文件或回退父文件）----
  const planByPath = new Map(plans.map((p) => [p.path, p]));
  const fileByName = new Map(app.vault.getFiles().filter((f) => f.extension === 'md').map((f) => [f.name, f]));
  const dirPrefix = (p: string) => (p.includes('/') ? p.slice(0, p.lastIndexOf('/') + 1) : '');
  const appendWrites = new Map<string, string[][]>(); // 追加目标（本批外文件）路径 → 块组

  for (const plan of plans) {
    if (plan.cross.length === 0) continue;
    const fallback: string[][] = [];
    const targetBlocks = new Map<string, string[][]>(); // 目标文件路径 → 块组
    for (const c of plan.cross) {
      const targetPath = `${dirPrefix(plan.path)}${c.date}.md`;
      const target = fileByName.get(`${c.date}.md`);
      // 目标必须在同一日记目录
      const sameDir = !plan.path.includes('/') || dirPrefix(targetPath) === dirPrefix(plan.path);
      if (target && sameDir && target.path === targetPath) {
        const list = targetBlocks.get(targetPath) ?? [];
        list.push(c.block);
        targetBlocks.set(targetPath, list);
      } else {
        fallback.push(c.block); // 目标日记不存在/目录不符 → 留父文件
      }
    }
    // 目标文件处理区非空才追加，否则也回退
    for (const [tPath, blocks] of targetBlocks) {
      const t = fileByName.get(tPath.split('/').pop() ?? '');
      if (!t || t.path !== tPath) {
        fallback.push(...blocks);
        continue;
      }
      const tLines = (await t.vault.cachedRead(t)).split(/\r?\n/);
      const scope = computeScope(tLines, processBelow);
      if (scope.lastIndexOf(true) < 0) {
        fallback.push(...blocks);
        continue;
      }
      const p = planByPath.get(tPath);
      if (p) {
        // 目标文件本批也要迁移：合并进它的 plan.out（区尾）
        const merged = insertAtScopeEnd(p.out, blocks, processBelow);
        if (merged) p.out = merged;
        else fallback.push(...blocks);
      } else {
        const list = appendWrites.get(tPath) ?? [];
        list.push(...blocks);
        appendWrites.set(tPath, list);
      }
      report.crossMoved += blocks.length;
    }
    if (fallback.length > 0) {
      // 回退：追加到父 plan.out 区尾
      const merged = insertAtScopeEnd(plan.out, fallback, processBelow);
      if (merged) plan.out = merged;
    }
  }

  // ---- 阶段 3：写盘任务（本批变化文件 + 追加目标），统一备份 ----
  const changed = plans.filter((p) => p.converted > 0 || p.droppedComments > 0);
  const writeTasks: { file: TFile; lines: string[] }[] = [];
  const seen = new Set<string>();
  for (const plan of changed) {
    seen.add(plan.path);
    const f = fileByName.get(plan.path.split('/').pop() ?? '') ?? app.vault.getAbstractFileByPath(plan.path);
    if (f instanceof TFile && f.path === plan.path) writeTasks.push({ file: f, lines: plan.out });
  }
  for (const [tPath, blocks] of appendWrites) {
    if (seen.has(tPath)) continue;
    const f = fileByName.get(tPath.split('/').pop() ?? '');
    if (!(f instanceof TFile) || f.path !== tPath) continue;
    const original = (await f.vault.cachedRead(f)).split(/\r?\n/);
    const merged = insertAtScopeEnd(original, blocks, processBelow);
    if (merged) {
      seen.add(tPath);
      writeTasks.push({ file: f, lines: merged });
    }
  }

  if (writeTasks.length > 0) {
    const adapter = app.vault.adapter;
    const ts = moment().format('YYYYMMDD-HHmmss');
    const backupDir = normalizePath('.rememo-backup/migrate-' + ts);
    try {
      await adapter.mkdir(normalizePath('.rememo-backup'));
    } catch {
      /* 已存在 */
    }
    await adapter.mkdir(backupDir);
    for (const task of writeTasks) {
      try {
        const original = (await task.file.vault.cachedRead(task.file)).split(/\r?\n/);
        const safeName = task.file.path.replace(/\//g, '__');
        await adapter.write(normalizePath(`${backupDir}/${safeName}`), original.join('\n'));
        await task.file.vault.modify(task.file, task.lines.join('\n'));
      } catch {
        report.failed.push(task.file.name);
      }
    }
  }
  report.files = writeTasks.length;
  return report;
}
