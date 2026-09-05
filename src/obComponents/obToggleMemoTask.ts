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

/**
 * 任务卡类型切换（三点菜单「切换任务卡」）：普通 memo ⇄ 任务卡。
 * 按头行实际形态切换：`- HH:mm …` → `- [ ] HH:mm …`（JOURNAL→TASK-TODO）；
 * 带任务标记（含 [x] 已完成）→ 去掉标记回普通 memo。
 * @returns 修改的日记文件 TFile，未改动返回 null
 */
export async function toggleMemoTaskType(memoid: string, hasId?: string, path?: string): Promise<TFile | null> {
    if (!/\d{14,}/.test(memoid)) return null;
    const loc = await openMemoFile(memoid, path);
    if (!loc) return null;

    const hint = parseInt(memoid.slice(14));
    const headerIdx = findHeaderLineIdx(loc.lines, hasId, isNaN(hint) ? 0 : hint);
    if (headerIdx === -1) return null;

    const line = loc.lines[headerIdx];
    let newLine: string;
    if (/^[-*]\s\[[ xX]\]/.test(line)) {
        // 任务卡（含已完成）→ 普通 memo
        newLine = line.replace(/^([-*]\s)\[[ xX]\]\s?/, '$1');
    } else if (/^[-*]\s(?=\d)/.test(line)) {
        // 普通 memo → 任务卡（头行时间后插 [ ]）
        newLine = line.replace(/^([-*]\s)(?=\d)/, '$1[ ] ');
    } else {
        return null; // 无法识别的头行形态不动
    }
    if (newLine === line) return null;

    loc.lines[headerIdx] = newLine;
    const { vault } = appStore.getState().dailyNotesState.app;
    await vault.modify(loc.file, loc.lines.join('\n'));
    return loc.file;
}
