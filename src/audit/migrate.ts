// 数据体检：整文件"旧→新"迁移（P1b，P1.5 前哨 · v1 保真规则）
// 背景：读取端行级只认新格式卡片块，旧单行数据不渲染也不在回收站——恢复可见的唯一入口在此。
// 转换语义（v1，偏差记录见文件尾）：
//  - 旧单位 = 顶层 old-top-row 行 + 其下全部缩进子树行（旧格式的缩进评论）。
//  - 父行 → 新卡片块：头行 = 任务标记 + 时间（<time> 剥除、HH:mm 补 :00、14 位→HH:mm:ss）
//    + deletedAt（值原样保留）+ ^id（缺则补 6 位随机）；正文 = 行内容 <br> 解码为真实换行，
//    逐行 4 空格缩进。
//  - 缩进评论子树行 → 折叠进父卡正文末尾（逐行剥 4 空格，保行序保相对层级 → 渲染为嵌套列表）；
//    <br> 字面保留（渲染端整卡统一解码）；含 deletedAt 标记的已删评论行丢弃并计数。
//  - 无时间等无法映射的父行 → 该单位原样保留并计数（不臆造时间，不静默丢数据）。
//  - 已是纯标识头的新块、非 bullet 段落行、处理区外内容 → 逐字节原样保留。
// 备份：.rememo-backup/migrate-<ts>/（文件名带目录路径，防不同目录同名文件互相覆盖）。
import { TFile, normalizePath, moment } from 'obsidian';
import appStore from '../stores/appStore';
import { classifyMemoRow, extractDeletedAt, extractMemoTime, unindentContentLine } from '../helpers/memoLine';
import { computeScope } from './engine';

export interface MigrateReport {
  converted: number;
  skipped: number;
  droppedComments: number;
  changed: boolean;
}

const TIME_TAG_REG = /<\/?time>/gi;
const BR_REG = /<br\s*\/?>/gi;
const DELETED_AT_IN_LINE_REG = /\sdeletedAt:\s*(\d{14}|\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/;

const randomId6 = () => Math.random().toString(36).slice(-6);

const indentOf = (line: string): number => line.length - line.trimStart().length;

/** <br> 编码正文 → 真实换行的内容段（首尾空段丢弃、中间空段保留 = 段落分隔） */
function decodeLegacyContent(text: string): string[] {
  const segs = text.replace(BR_REG, '\n').split('\n');
  while (segs.length > 0 && segs[0].trim() === '') segs.shift();
  while (segs.length > 0 && segs[segs.length - 1].trim() === '') segs.pop();
  return segs;
}

/**
 * 迁移单个旧单位（顶层旧行 + 缩进子树）为一个新卡片块（头行 + 4 空格正文）。
 * 无法映射（无时间）返回 null。
 */
function convertLegacyUnit(parent: string, subtree: string[], report: { droppedComments: number }): string[] | null {
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

  // 时间归一 HH:mm:ss（落盘统一带秒）
  const timeText = /^\d{1,2}:\d{2}$/.test(time) ? `${time}:00` : time;

  // 正文（<br> 解码）+ deletedAt + ^id（都在正文串尾部，先剥标识再解码）
  let tail = contentRest;
  const idM = /\^([A-Za-z0-9]{6})\s*$/.exec(tail);
  const id = idM ? idM[1] : randomId6();
  if (idM) tail = tail.slice(0, idM.index).trimEnd();
  let deletedAt = '';
  const del = extractDeletedAt(tail);
  if (del.isDeleted) {
    deletedAt = del.deletedAt;
    tail = del.rest;
  }

  const body: string[] = [];
  if (tail.trim() !== '') {
    for (const seg of decodeLegacyContent(tail)) {
      body.push(seg === '' ? '' : '    ' + seg);
    }
  }

  // 缩进子树折叠进正文末尾（嵌套列表保行序保层级）；已删评论行丢弃
  let pendingBlank = 0;
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
    for (let b = 0; b < pendingBlank; b++) body.push('');
    pendingBlank = 0;
    body.push('    ' + unindentContentLine(row));
  }

  const header = `${mark !== '' ? `- [${mark}] ` : '- '}${timeText}${deletedAt ? ` deletedAt: ${deletedAt}` : ''} ^${id}`;
  return [header, ...body];
}

function migrateContent(lines: string[], inScope: boolean[]): { out: string[]; converted: number; skipped: number; droppedComments: number } {
  const out: string[] = [];
  let converted = 0;
  let skipped = 0;
  let droppedComments = 0;
  const report = { droppedComments: 0 };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const inside = !!inScope[i];
    if (!inside || classifyMemoRow(line) !== 'old-top-row') {
      out.push(line);
      i++;
      continue;
    }

    // 收集旧单位：父行后连续的空行 / 缩进 >0 行（缩进 = 0 的非空行是下一顶层，结束）
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

    report.droppedComments = 0;
    const block = convertLegacyUnit(line, unitLines.slice(1), report);
    if (block === null) {
      // 无时间等不可映射：整单位原样保留（不静默丢）
      out.push(...unitLines);
      skipped++;
    } else {
      out.push(...block);
      converted++;
    }
    droppedComments += report.droppedComments;
    i = j;
  }
  return { out, converted, skipped, droppedComments };
}

/**
 * 迁移一个日记文件为最新格式。成功后文件内容 = 新旧混合重排（旧单位全转块），
 * 处理区外内容不动。changed=false 时不做任何写（无备份目录产生）。
 */
export async function migrateFile(file: TFile): Promise<MigrateReport> {
  const app = appStore.getState().dailyNotesState.app;
  const lines = (await file.vault.cachedRead(file)).split(/\r?\n/);
  const inScope = computeScope(lines, appStore.getState().settingsState.settings.ProcessEntriesBelow ?? '');
  const { out, converted, skipped, droppedComments } = migrateContent(lines, inScope);

  const changed = converted > 0 || droppedComments > 0;
  if (!changed) return { converted, skipped, droppedComments, changed };
  if (out.join('\n') === lines.join('\n')) return { converted, skipped, droppedComments, changed: false };

  // 备份：.rememo-backup/migrate-<ts>/（文件名带目录防同名覆盖）
  const adapter = app.vault.adapter;
  const ts = moment().format('YYYYMMDD-HHmmss');
  const backupDir = normalizePath('.rememo-backup/migrate-' + ts);
  try {
    await adapter.mkdir(normalizePath('.rememo-backup'));
  } catch {
    /* 已存在 */
  }
  await adapter.mkdir(backupDir);
  const safeName = file.path.replace(/\//g, '__');
  await adapter.write(normalizePath(`${backupDir}/${safeName}`), lines.join('\n'));

  await app.vault.modify(file, out.join('\n'));
  return { converted, skipped, droppedComments, changed };
}

// 已知 v1 偏差（P3 引用卡重建前接受）：
//  - 旧评论行折叠进父卡正文嵌套列表，不再有 linkId 关联；其已删/未删语义与父卡脱钩
//    （父卡在回收站恢复时，折叠的评论文本随正文一起回来）。
//  - 折叠行的 <br> 以字面保留（渲染端统一解码）；编辑该卡会把它们固化为真实换行。
