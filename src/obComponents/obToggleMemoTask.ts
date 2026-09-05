import type { TFile } from 'obsidian';
import appStore from '../stores/appStore';
import { findHeaderLineIdx, openMemoFile } from './locateMemo';

/**
 * 任务卡整卡勾选切换（PLAN-FORMAT 解析规则 5）：任务态在头行 `- [ ] 时间 ^id`。
 * 点击勾选框 [ ] ↔ [x] 直接写回头行；自定义任务标记（非 空格/x/X）不视为任务卡，不动作。
 * @returns 修改的日记文件 TFile，未改动返回 null
 */
export async function toggleMemoTask(memoid: string, hasId?: string, path?: string): Promise<TFile | null> {
    if (!/\d{14,}/.test(memoid)) return null;
    const loc = await openMemoFile(memoid, path);
    if (!loc) return null;

    const hint = parseInt(memoid.slice(14));
    const headerIdx = findHeaderLineIdx(loc.lines, hasId, isNaN(hint) ? 0 : hint);
    if (headerIdx === -1) return null;

    const line = loc.lines[headerIdx];
    const mark = /^[-*]\s\[([ xX])\]/.exec(line);
    if (!mark) return null;

    const nextMark = mark[1] === ' ' ? 'x' : ' ';
    const newLine = line.replace(/^([-*]\s)\[[ xX]\]/, `$1[${nextMark}]`);
    if (newLine === line) return null;

    loc.lines[headerIdx] = newLine;
    const { vault } = appStore.getState().dailyNotesState.app;
    await vault.modify(loc.file, loc.lines.join('\n'));
    return loc.file;
}
