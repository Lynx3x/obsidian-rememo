import { moment } from 'obsidian';
import type { TFile } from 'obsidian';
import { getDailyNote } from 'obsidian-daily-notes-interface';
import dailyNotesService from '../services/dailyNotesService';
import appStore from '../stores/appStore';
import { getIndentWidth } from '../helpers/memoLine';

/**
 * 隐藏（软删除）一条 memo：在行尾（^id 前）加 `deletedAt: <14位时间戳>` 标记。
 * 数据保留在日记原处，正式视图过滤不显示，回收站读取标记行。
 * 评论子树不标记——父级被标记后，读取时整棵子树隐藏。
 * @returns 修改的日记文件 TFile（调用方可重读同步 store），未改动返回 null
 */
export async function obHideMemo(memoid: string): Promise<TFile | null> {
  const { dailyNotes } = dailyNotesService.getState();
  if (/\d{14,}/.test(memoid)) {
    const { vault } = appStore.getState().dailyNotesState.app;
    const timeString = memoid.slice(0, 13);
    const idString = parseInt(memoid.slice(14));
    const changeDate = moment(timeString, 'YYYYMMDDHHmmSS');
    const dailyNote = getDailyNote(changeDate, dailyNotes);
    if (!dailyNote) return null;

    const fileContent = await vault.read(dailyNote);
    const fileLines = getAllLinesFromFile(fileContent);

    // 定位父行
    const targetIdx = idString < fileLines.length ? idString : -1;
    if (targetIdx === -1) return null;

    const line = fileLines[targetIdx];
    const now = moment();
    const now14 = now.format('YYYYMMDDHHmmss');
    const deletedAtStr = ' deletedAt: ' + now14;

    // 在 ^id 前插入 deletedAt 标记；无 ^id 则追加
    let newLine: string;
    if (/\s*\^(\S{6})\s*$/.test(line)) {
      newLine = line.replace(/\s*\^(\S{6})\s*$/, deletedAtStr + ' ^$1');
    } else {
      newLine = line.trimEnd() + deletedAtStr;
    }
    if (newLine === line) return null; // 已是删除状态，不重复标记

    fileLines[targetIdx] = newLine;
    await vault.modify(dailyNote, fileLines.join('\n'));

    return dailyNote;
  }
  return null;
}

const getAllLinesFromFile = (cache: string) => cache.split(/\r?\n/);

/**
 * 恢复一条已删除的 memo：去掉行内的 `deletedAt: xxx` 标记。
 * @returns 修改的日记文件 TFile，未改动返回 null
 */
export async function restoreMemoFromLine(memoid: string): Promise<TFile | null> {
  const { dailyNotes } = dailyNotesService.getState();
  if (!/\d{14,}/.test(memoid)) return null;
  const { vault } = appStore.getState().dailyNotesState.app;
  const timeString = memoid.slice(0, 13);
  const idString = parseInt(memoid.slice(14));
  const changeDate = moment(timeString, 'YYYYMMDDHHmmSS');
  const dailyNote = getDailyNote(changeDate, dailyNotes);
  if (!dailyNote) return null;

  const fileContent = await vault.read(dailyNote);
  const fileLines = getAllLinesFromFile(fileContent);
  const targetIdx = idString < fileLines.length ? idString : -1;
  if (targetIdx === -1) return null;

  const line = fileLines[targetIdx];
  const newLine = line.replace(/\s*deletedAt:\s*\d{14}/, '');
  if (newLine === line) return null;

  fileLines[targetIdx] = newLine;
  await vault.modify(dailyNote, fileLines.join('\n'));

  return dailyNote;
}

/**
 * 永久删除一条 memo：从日记中删除父行及其评论子树（缩进更深且连续的区间）。
 * @returns 修改的日记文件 TFile，未改动返回 null
 */
export async function deleteMemoFromLine(memoid: string): Promise<TFile | null> {
  const { dailyNotes } = dailyNotesService.getState();
  if (!/\d{14,}/.test(memoid)) return null;
  const { vault } = appStore.getState().dailyNotesState.app;
  const timeString = memoid.slice(0, 13);
  const idString = parseInt(memoid.slice(14));
  const changeDate = moment(timeString, 'YYYYMMDDHHmmSS');
  const dailyNote = getDailyNote(changeDate, dailyNotes);
  if (!dailyNote) return null;

  const fileContent = await vault.read(dailyNote);
  const fileLines = getAllLinesFromFile(fileContent);
  const targetIdx = idString < fileLines.length ? idString : -1;
  if (targetIdx === -1) return null;

  const parentIndent = getIndentWidth(fileLines[targetIdx]);
  let endIdx = targetIdx;
  for (let i = targetIdx + 1; i < fileLines.length; i++) {
    const l = fileLines[i];
    if (l.trim() === '' || /^#{1,}/.test(l)) break;
    if (getIndentWidth(l) <= parentIndent) break;
    endIdx = i;
  }

  const newLines = [...fileLines.slice(0, targetIdx), ...fileLines.slice(endIdx + 1)];
  await vault.modify(dailyNote, newLines.join('\n'));

  return dailyNote;
}
