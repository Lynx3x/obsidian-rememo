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
    // 注：旧"读取时自动补 ^id / 补秒回写"已移除（见 getMemosFromDailyNote 尾部）——
    // 缺 id、旧时间戳等问题统一交给"数据体检"(audit) 检测与修复，读取不再隐式改写文件。

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
        // 时间：支持新 HH:mm(:ss) 和旧 14 位时间戳；两者都解析，不在此回写
        const { time, rest } = extractMemoTime(stripped);
        const memoDate = moment(baseDate);
        if (time) {
            const [h, m, s] = time.split(':').map((x) => parseInt(x));
            memoDate.hours(h).minutes(m);
            if (!isNaN(s)) memoDate.seconds(s);
        }
        // 块 id
        let content = rest;
        let hasId = '';
        const idMatch = /\^(\S{6})\s*$/.exec(content);
        if (idMatch) {
            hasId = idMatch[1];
            // 只去掉 id 前的尾部空白（trimEnd），保留行首空格——否则"写入→重读"往返丢行首空格，发送后文字抖一下
            content = content.slice(0, -8).trimEnd();
        } else {
            // 缺 ^id：先用内存随机 id 支撑本会话（编辑/评论/引用可用）；
            // 落盘修复交给"数据体检"(audit missing-id)，读取不再自动补写
            hasId = Math.random().toString(36).slice(-6);
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

