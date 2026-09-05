import { moment, normalizePath, TFile } from 'obsidian';
import { getDailyNote } from 'obsidian-daily-notes-interface';
import dailyNotesService from '../services/dailyNotesService';
import appStore from '../stores/appStore';

/**
 * 写入端公共定位（P1b 起写入只针对新格式卡片块）。
 *
 * memo.id = YYYYMMDDHHmmss + 头行 0-based 行号（读取端按行索引生成）。
 * 定位策略：优先持久 ^id（顶层 bullet 行尾锚定，重号取离行号提示最近者）；
 * 无 hasId/未命中时退回 memo.id 内嵌的行号直取（校验该行确为顶层 bullet）。
 * 打开文件：优先 memo.path（组件持有），兜底按 id 日期段找当日笔记。
 */

export interface OpenMemoResult {
    file: TFile;
    lines: string[];
}

/** 打开 memo 所在日记文件；找不到返回 null。 */
export async function openMemoFile(memoId: string, path?: string): Promise<OpenMemoResult | null> {
    const { vault } = appStore.getState().dailyNotesState.app;
    let file: TFile | null = null;
    if (path) {
        const f = vault.getAbstractFileByPath(normalizePath(path));
        if (f instanceof TFile) file = f;
    }
    if (!file && /^\d{14,}/.test(memoId)) {
        const date = moment(memoId.slice(0, 14), 'YYYYMMDDHHmmss');
        const dailyNote = getDailyNote(date, dailyNotesService.getState().dailyNotes);
        if (dailyNote instanceof TFile) file = dailyNote;
    }
    if (!file) return null;
    const content = await vault.read(file);
    return { file, lines: content.split(/\r?\n/) };
}

/** 定位卡片头行：hasId 优先（顶层 bullet 尾 ^id 锚定，重号取离 lineHint 最近）；否则行号直取并校验。返回 0-based 行号或 -1。 */
export function findHeaderLineIdx(lines: string[], hasId?: string, lineHint = 0): number {
    if (hasId) {
        const want = '^' + hasId;
        let best = -1;
        let bestDist = Infinity;
        for (let i = 0; i < lines.length; i++) {
            const l = lines[i];
            if (/^[-*]\s.*\^[A-Za-z0-9]{6}\s*$/.test(l) && l.trimEnd().endsWith(want)) {
                const d = Math.abs(i - lineHint);
                if (d < bestDist) {
                    bestDist = d;
                    best = i;
                }
            }
        }
        if (best !== -1) return best;
    }
    if (lineHint >= 0 && lineHint < lines.length && /^[-*]\s/.test(lines[lineHint])) {
        return lineHint;
    }
    return -1;
}

/**
 * 扫描卡片块尾（与读取端 parseMemosFromNote 块尾语义一致）：
 * 头行之后的空行与 ≥4 空格缩进行都属于本块；返回最后一个正文行的 0-based 行号（空正文 = 头行号）。
 * 块尾（非空缩进 <4 行/标题/文件尾前的）空行不计入——它们不是内容。
 */
export function scanBodyEnd(lines: string[], headerIdx: number): number {
    let last = headerIdx;
    for (let i = headerIdx + 1; i < lines.length; i++) {
        const l = lines[i];
        if (l.trim() === '') continue;
        if (l.length - l.trimStart().length >= 4) {
            last = i;
            continue;
        }
        break;
    }
    return last;
}

/** 行首空格宽度 */
export function indentWidth(line: string): number {
    let w = 0;
    for (const ch of line) {
        if (ch === ' ') w += 1;
        else if (ch === '\t') w += 4;
        else break;
    }
    return w;
}

/** 正文 content → 文件正文行（空行留空、其余 4 空格缩进；与读取端剥 4 前缀互逆）。 */
export function contentToBodyLines(content: string): string[] {
    if (content === '') return [];
    return content.split('\n').map((l) => (l === '' ? '' : '    ' + l));
}
