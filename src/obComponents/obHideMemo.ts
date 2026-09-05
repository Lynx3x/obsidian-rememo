import { moment } from 'obsidian';
import type { TFile } from 'obsidian';
import appStore from '../stores/appStore';
import { findHeaderLineIdx, openMemoFile, scanBodyEnd } from './locateMemo';

/**
 * 软删除/恢复/永久删除（P1b：只作用于新格式卡片块，定位优先持久 ^id）。
 * 数据保留在日记原处；正式视图过滤不显示，回收站读取标记行。子树概念随旧评论链退役。
 */

const DELETED_AT_VALUE_REG = /\s+deletedAt:\s*(\d{14}|\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/;

const lineHintOf = (memoid: string): number => {
    const n = parseInt(memoid.slice(14));
    return isNaN(n) ? 0 : n;
};

/**
 * 软删除一条 memo：在头行 `^id` 前加 `deletedAt: YYYY-MM-DD HH:mm:ss` 标记。
 * @returns 修改的日记文件 TFile（调用方重读同步 store），未改动返回 null
 */
export async function obHideMemo(memoid: string, hasId?: string, path?: string): Promise<TFile | null> {
    if (!/\d{14,}/.test(memoid)) return null;
    const loc = await openMemoFile(memoid, path);
    if (!loc) return null;

    const headerIdx = findHeaderLineIdx(loc.lines, hasId, lineHintOf(memoid));
    if (headerIdx === -1) return null;

    const line = loc.lines[headerIdx];
    // 已删除的不重复标记
    if (DELETED_AT_VALUE_REG.test(line)) return null;

    const now = moment();
    // 可读时间格式：deletedAt: YYYY-MM-DD HH:mm:ss；读取端新旧格式都兼容
    const deletedAtStr = ' deletedAt: ' + now.format('YYYY-MM-DD HH:mm:ss');

    // 在 ^id 前插入 deletedAt 标记；无 ^id 则追加（纯头行理论必有 id，防御）
    let newLine: string;
    if (/\s*\^[A-Za-z0-9]{6}\s*$/.test(line)) {
        newLine = line.replace(/\s*\^([A-Za-z0-9]{6})\s*$/, deletedAtStr + ' ^$1');
    } else {
        newLine = line.trimEnd() + deletedAtStr;
    }
    if (newLine === line) return null;

    loc.lines[headerIdx] = newLine;
    const { vault } = appStore.getState().dailyNotesState.app;
    await vault.modify(loc.file, loc.lines.join('\n'));
    return loc.file;
}

/**
 * 恢复一条已删除的 memo：去掉头行内的 `deletedAt: xxx` 标记。
 * @returns 修改的日记文件 TFile，未改动返回 null
 */
export async function restoreMemo(memoid: string, hasId?: string, path?: string): Promise<TFile | null> {
    if (!/\d{14,}/.test(memoid)) return null;
    const loc = await openMemoFile(memoid, path);
    if (!loc) return null;

    const headerIdx = findHeaderLineIdx(loc.lines, hasId, lineHintOf(memoid));
    if (headerIdx === -1) return null;

    const line = loc.lines[headerIdx];
    const newLine = line.replace(DELETED_AT_VALUE_REG, '');
    if (newLine === line) return null;

    loc.lines[headerIdx] = newLine;
    const { vault } = appStore.getState().dailyNotesState.app;
    await vault.modify(loc.file, loc.lines.join('\n'));
    return loc.file;
}

/**
 * 永久删除一条 memo：从头行开始删整个卡片块（含块内空行；块尾装饰空行保留）。
 * @returns 修改的日记文件 TFile，未改动返回 null
 */
export async function deleteMemo(memoid: string, hasId?: string, path?: string): Promise<TFile | null> {
    if (!/\d{14,}/.test(memoid)) return null;
    const loc = await openMemoFile(memoid, path);
    if (!loc) return null;

    const headerIdx = findHeaderLineIdx(loc.lines, hasId, lineHintOf(memoid));
    if (headerIdx === -1) return null;

    const bodyEnd = scanBodyEnd(loc.lines, headerIdx);
    const newLines = [...loc.lines.slice(0, headerIdx), ...loc.lines.slice(bodyEnd + 1)];
    if (newLines.length === loc.lines.length) return null;

    const { vault } = appStore.getState().dailyNotesState.app;
    await vault.modify(loc.file, newLines.join('\n'));
    return loc.file;
}
