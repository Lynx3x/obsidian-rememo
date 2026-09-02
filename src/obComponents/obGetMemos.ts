import { moment, normalizePath, Notice, TFile, TFolder } from 'obsidian';
import { getAllDailyNotes, getDateFromFile } from 'obsidian-daily-notes-interface';
import appStore from '../stores/appStore';
import {
    DefaultMemoComposition,
    ProcessEntriesBelow,
} from '../memos';
import { t } from '../translations/helper';
import { getDailyNotePath } from '../helpers/utils';
import { extractDeletedAt, extractMemoTaskTypeFromLine, extractMemoTime, getIndentLevel, getIndentWidth, getTaskType } from '../helpers/memoLine';

export class DailyNotesFolderMissingError extends Error { }

interface allKindsofMemos {
    memos: Model.Memo[];
    commentMemos: Model.Memo[];
}

export async function getRemainingMemos(note: TFile): Promise<number> {
    if (!note) {
        return 0;
    }
    const { vault } = appStore.getState().dailyNotesState.app;
    let fileContents = await vault.read(note);
    let regexMatch;
    if (
        DefaultMemoComposition != '' &&
        /{TIME}/g.test(DefaultMemoComposition) &&
        /{CONTENT}/g.test(DefaultMemoComposition)
    ) {
        //eslint-disable-next-line
        regexMatch =
            '(-|\\*) (\\[(.{1})\\]\\s)?' +
            DefaultMemoComposition.replace(/{TIME}/g, '((\\<time\\>)?\\d{1,2}:\\d{2}(:\\d{2})?(\\<\\/time\\>)?)?').replace(/ {CONTENT}/g, '(.*)$');
    } else {
        //eslint-disable-next-line
        regexMatch = '(-|\\*) (\\[(.{1})\\]\\s)?((\\<time\\>)?\\d{1,2}\\:\\d{2}(\\:\\d{2})?)?';
    }
    const regexMatchRe = new RegExp(regexMatch, 'gm'); // m: 逐行匹配，否则带尾换行的文件一行都数不到（Memos===0 → 跳过整个文件）
    //eslint-disable-next-line
    const matchLength = (fileContents.match(regexMatchRe) || []).length;
    // const matchLength = (fileContents.match(/(-|\*) (\[ \]\s)?((\<time\>)?\d{1,2}\:\d{2})?/g) || []).length;
    const re = new RegExp(ProcessEntriesBelow.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g');
    const processEntriesHeader = (fileContents.match(re) || []).length;
    fileContents = null;
    if (processEntriesHeader) {
        return matchLength;
    }
    return 0;
}

export async function getCommentMemosFromDailyNote(dailyNote: TFile | null, commentMemos: any[]): Promise<any[]> {
    if (!dailyNote) {
        return commentMemos;
    }
}

export async function getMemosFromDailyNote(
    dailyNote: TFile | null,
    allMemos: any[],
    commentMemos: any[],
): Promise<any[]> {
    if (!dailyNote) {
        return [];
    }
    const { vault } = appStore.getState().dailyNotesState.app;
    const Memos = await getRemainingMemos(dailyNote);
    // 收集缺 ^id 的 memo 行，读完统一回写（持久 ^id）
    const toBackfill: { path: string; lineIndex: number; generatedId: string }[] = [];
    // 收集旧时间格式的行，统一回写为 HH:mm:ss
    const toFixTime: { path: string; lineIndex: number }[] = [];

    if (Memos === 0) return;

    let fileContents = await vault.read(dailyNote);
    let fileLines = getAllLinesFromFile(fileContents);
    const baseDate = getDateFromFile(dailyNote as any, 'day');
    let processHeaderFound = ProcessEntriesBelow === '';
    // 缩进栈：记录各层级最近一行的 hasId，用于多级评论父关联
    const indentStack: { level: number; hasId: string }[] = [];

    for (let i = 0; i < fileLines.length; i++) {
        const line = fileLines[i];
        if (line.length === 0) continue;
        // 标题过滤（ProcessEntriesBelow）：匹配标题进入处理区，遇到其它标题退出
        if (lineContainsParseBelowToken(line)) {
            processHeaderFound = true;
            indentStack.length = 0;
            continue;
        }
        if (processHeaderFound && /^#{1,} /g.test(line)) {
            processHeaderFound = false;
            continue;
        }
        if (!processHeaderFound) continue;
        // 只处理列表项（顶层 memo 或缩进评论）
        if (!/^\s*[-*]\s/.test(line)) continue;

        const indent = getIndentLevel(getIndentWidth(line));
        // 去列表标记（- [ ] / - / * + 缩进）
        const stripped = line.replace(/^\s*[-*]\s(\[(?:.{1})\]\s?)?/, '');
        // 时间：支持新 HH:mm(:ss) 和旧 14 位时间戳，统一标准化
        const { time, isOld, rest } = extractMemoTime(stripped);
        const memoDate = moment(baseDate);
        if (time) {
            const [h, m, s] = time.split(':').map((x) => parseInt(x));
            memoDate.hours(h).minutes(m);
            if (!isNaN(s)) memoDate.seconds(s);
            if (isOld) toFixTime.push({ path: dailyNote.path, lineIndex: i });
        }
        // 块 id
        let content = rest;
        let hasId = '';
        const idMatch = /\^(\S{6})\s*$/.exec(content);
        if (idMatch) {
            hasId = idMatch[1];
            content = content.slice(0, -8).trim();
        } else {
            hasId = Math.random().toString(36).slice(-6);
            toBackfill.push({ path: dailyNote.path, lineIndex: i, generatedId: hasId });
        }
        // 删除标记：检测 deletedAt（剥掉 id 后位于内容末尾）
        let isDeleted = false;
        let deletedAt = '';
        const delMatch = extractDeletedAt(content);
        if (delMatch.isDeleted) {
            isDeleted = true;
            deletedAt = delMatch.deletedAt;
            content = delMatch.rest;
        }
        // 父关联：缩进 > 0 时找最近的低层级父行
        let linkId = '';
        if (indent > 0) {
            while (indentStack.length > 0 && indentStack[indentStack.length - 1].level >= indent) {
                indentStack.pop();
            }
            const parent = indentStack.length > 0 ? indentStack[indentStack.length - 1] : null;
            if (parent) linkId = parent.hasId;
        } else {
            indentStack.length = 0;
        }
        indentStack.push({ level: indent, hasId });

        const memoType = /^\s*[-*]\s\[(.{1})\]\s/.test(line)
            ? getTaskType(extractMemoTaskTypeFromLine(line))
            : 'JOURNAL';
        allMemos.push({
            id: memoDate.format('YYYYMMDDHHmmss') + i,
            content,
            user_id: 1,
            createdAt: memoDate.format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: memoDate.format('YYYY/MM/DD HH:mm:ss'),
            memoType,
            hasId,
            linkId,
            isDeleted,
            deletedAt,
            path: dailyNote.path,
        });
    }
    fileLines = null;
    fileContents = null;
    // 持久 ^id：补写缺 id 的 memo 行（一次性迁移，之后稳定）
    if (toBackfill.length > 0) {
        await backfillMemoIds(vault, toBackfill);
    }
    // 时间格式统一：旧格式回写为 HH:mm:ss
    if (toFixTime.length > 0) {
        await backfillMemoTimes(vault, toFixTime);
    }
}

/**
 * 给缺 ^id 的 memo 行补写持久块 id。
 * 只在行尾追加 ` ^xxxxxx`，不改动其它内容；按文件分组批量读写。
 */
async function backfillMemoIds(
    vault: any,
    toBackfill: { path: string; lineIndex: number; generatedId: string }[],
): Promise<void> {
    // 按文件分组，避免重复读同一文件
    const byPath = new Map<string, { lineIndex: number; generatedId: string }[]>();
    for (const item of toBackfill) {
        const arr = byPath.get(item.path) || [];
        arr.push({ lineIndex: item.lineIndex, generatedId: item.generatedId });
        byPath.set(item.path, arr);
    }
    for (const [path, items] of byPath) {
        const file = vault.getAbstractFileByPath(path) as TFile;
        if (!file) continue;
        const content = await vault.read(file);
        const lines = getAllLinesFromFile(content);
        let changed = false;
        for (const { lineIndex, generatedId } of items) {
            const line = lines[lineIndex];
            // 行尾已无 id（防并发/重复），追加
            if (line !== undefined && !/\^\S{6}\s*$/.test(line)) {
                lines[lineIndex] = line.trimEnd() + ' ^' + generatedId;
                changed = true;
            }
        }
        if (changed) {
            await vault.modify(file, lines.join('\n'));
        }
    }
}

/**
 * 统一旧时间格式为 `HH:mm:ss`（迁移）：
 *   - `HH:mm` → `HH:mm:00`
 *   - 14 位时间戳（旧评论）→ `HH:mm:ss`
 * 只改行内时间部分，不动其它内容。
 */
async function backfillMemoTimes(vault: any, toFix: { path: string; lineIndex: number }[]): Promise<void> {
    const byPath = new Map<string, number[]>();
    for (const item of toFix) {
        const arr = byPath.get(item.path) || [];
        arr.push(item.lineIndex);
        byPath.set(item.path, arr);
    }
    for (const [path, indices] of byPath) {
        const file = vault.getAbstractFileByPath(path) as TFile;
        if (!file) continue;
        const content = await vault.read(file);
        const lines = getAllLinesFromFile(content);
        let changed = false;
        for (const lineIndex of indices) {
            const line = lines[lineIndex];
            if (line === undefined) continue;
            // 去缩进 + 列表标记后处理
            // group1 已含任务标记（group2 嵌套在内），只取 group1，避免 `[ ] [ ]` 重复
            const m = /^(\s*[-*]\s(\[(?:.{1})\]\s?)?)(.*)$/.exec(line);
            if (!m) continue;
            const prefix = m[1];
            const rest = m[3];
            // 旧 14 位时间戳
            const ts = /^(\d{14})\s?(.*)$/.exec(rest);
            if (ts) {
                const hh = ts[1].slice(8, 10), mm = ts[1].slice(10, 12), ss = ts[1].slice(12, 14);
                lines[lineIndex] = prefix + `${hh}:${mm}:${ss} ` + ts[2];
                changed = true;
                continue;
            }
            // HH:mm 无秒 → 补 :00
            const t = /^(\d{1,2}:\d{2})(?!:\d{2})(\s|$)/.exec(rest);
            if (t) {
                lines[lineIndex] = prefix + rest.replace(/^\d{1,2}:\d{2}/, t[1] + ':00');
                changed = true;
            }
        }
        if (changed) {
            await vault.modify(file, lines.join('\n'));
        }
    }
}

export async function getMemos(
    onBatch?: (memos: Model.Memo[]) => void | Promise<void>,
): Promise<allKindsofMemos> {
    const memos: any[] | PromiseLike<any[]> = [];
    const { vault } = appStore.getState().dailyNotesState.app;
    const folder = getDailyNotePath();

    if (folder === '' || folder === undefined) {
        new Notice(t('Please check your daily note plugin OR periodic notes plugin settings'));
        return;
    }
    const dailyNotesFolder = vault.getAbstractFileByPath(normalizePath(folder)) as TFolder;

    if (!dailyNotesFolder) {
        throw new DailyNotesFolderMissingError('Failed to find daily notes folder');
    }

    const dailyNotes = getAllDailyNotes();

    // 按日期降序（最新在前），支持分批回调让 UI 优先显示最新
    const files = Object.entries(dailyNotes)
        .filter(([, f]) => f instanceof TFile && f.extension === 'md')
        .sort((a, b) => b[0].localeCompare(a[0]));

    const BATCH_SIZE = 5;
    for (let i = 0; i < files.length; i++) {
        await getMemosFromDailyNote(files[i][1] as any, memos, []);
        if (onBatch && (i + 1) % BATCH_SIZE === 0) {
            await onBatch([...memos]);
        }
    }
    if (onBatch && files.length > 0) {
        await onBatch([...memos]);
    }

    // 评论已统一在 memos 中（linkId 非空表示评论），不再单独返回 commentMemos
    return { memos, commentMemos: [] };
}

const getAllLinesFromFile = (cache: string) => cache.split(/\r?\n/);
// const lineIsValidTodo = (line: string) => {
// //eslint-disable-next-line
//   return /^\s*[\-\*]\s\[(\s|x|X|\\|\-|\>|D|\?|\/|\+|R|\!|i|B|P|C)\]\s?\s*\S/.test(line)
// }
const lineContainsParseBelowToken = (line: string) => {
    // ProcessEntriesBelow 为空 = 无需标题过滤，任何行都不触发"进入处理区"
    if (ProcessEntriesBelow === '') {
        return false;
    }
    const re = new RegExp(ProcessEntriesBelow.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), '');
    return re.test(line);
};

// Get comment Id
const extractCommentFromLine = (line: string) => {
    const regex = '#\\^(\\S{6})';
    const regexMatchRe = new RegExp(regex, '');
    const match = regexMatchRe.exec(line);
    return match ? match[1] : '';
};

