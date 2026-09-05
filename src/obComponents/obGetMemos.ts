import { moment, normalizePath, Notice, TFile, TFolder } from 'obsidian';
import { getAllDailyNotes, getDateFromFile } from 'obsidian-daily-notes-interface';
import appStore from '../stores/appStore';
import { ProcessEntriesBelow } from '../memos';
import { t } from '../translations/helper';
import { getDailyNotePath } from '../helpers/utils';
import {
    classifyMemoRow,
    extractDeletedAt,
    extractMemoTaskTypeFromLine,
    extractMemoTime,
    getIndentWidth,
    getTaskType,
    unindentContentLine,
} from '../helpers/memoLine';

export class DailyNotesFolderMissingError extends Error { }

/**
 * 从单个日记文件读取全部 memo。
 *
 * P1b 起**行级只认新格式卡片块**（PLAN-FORMAT 2026-09-05）：
 * 顶层 bullet 行 classify 为 pure-header（纯标识头 `- [ ]? 时间 [deletedAt:…]? ^id`，行内无正文）
 * → 渲染为卡片；其后的 ≥4 空格缩进行（含内部空行）为正文，剥 4 前缀（额外缩进保留给 md 嵌套）。
 * 旧数据行（old-top-row：带正文的旧单行 / 缺时间等）**跳过不渲染**——留给数据体检整文件迁移；
 * 旧行后缀的缩进残留行在无 current 时一律忽略。
 * 缺 ^id 的纯头行只生成内存随机 id 支撑本会话（编辑/删除可用），落盘修复交数据体检（missing-id）。
 * 块尾空行不并入正文（bodyEnd 停在最后一个非空正文行），读回 content 与写入端 roundtrip 精确一致。
 */
export async function getMemosFromDailyNote(dailyNote: TFile | null, allMemos: Model.Memo[]): Promise<Model.Memo[]> {
    if (!dailyNote) {
        return [];
    }
    const { vault } = appStore.getState().dailyNotesState.app;
    let fileContents = await vault.read(dailyNote);
    let fileLines = getAllLinesFromFile(fileContents);
    const baseDate = getDateFromFile(dailyNote as any, 'day');
    parseMemosFromNote(fileLines, dailyNote, allMemos, baseDate);
    fileLines = null;
    fileContents = null;
    return allMemos;
}

interface PendingBlock {
    idx: number;
    hasId: string;
    time: string;
    deletedAt: string;
    isDeleted: boolean;
    memoType: string;
    body: string[];
    /** 最后一个非空正文行的行号（无正文 = 头行号） */
    bodyEnd: number;
}

/**
 * 新卡片块格式解析（行级，P1b）：
 * 处理区语义照旧（ProcessEntriesBelow token 激活 / 标题退出），区内：
 *  - pure-header → 新卡（头字段：任务标记/时间/HH:mm(:ss) 或 14 位/deletedAt/^id）
 *  - old-top-row → 关闭当前块并跳过（旧数据，不渲染）
 *  - 缩进 ≥4 非空行 → 正文（空行押后计数：内容间空行保留、块尾空行丢弃）
 *  - 缩进 <4 非空行（段落/手写行）→ 关闭当前块，该行本身忽略
 */
function parseMemosFromNote(
    fileLines: string[],
    dailyNote: TFile,
    allMemos: Model.Memo[],
    baseDate: string,
): void {
    const tokenRe = ProcessEntriesBelow
        ? new RegExp(ProcessEntriesBelow.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'))
        : null;
    let active = !tokenRe;
    let current: PendingBlock | null = null;
    let pendingBlanks = 0;

    const flush = () => {
        if (!current) {
            pendingBlanks = 0;
            return;
        }
        const memoDate = moment(baseDate);
        if (current.time) {
            const [h, m, s] = current.time.split(':').map((x) => parseInt(x));
            memoDate.hours(h).minutes(m);
            if (!isNaN(s)) memoDate.seconds(s);
        }
        const content = current.body.join('\n');
        allMemos.push({
            id: memoDate.format('YYYYMMDDHHmmss') + current.idx,
            content,
            user_id: 1,
            createdAt: memoDate.format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: memoDate.format('YYYY/MM/DD HH:mm:ss'),
            memoType: current.memoType,
            hasId: current.hasId,
            linkId: '',
            isDeleted: current.isDeleted,
            deletedAt: current.deletedAt,
            path: dailyNote.path,
            blockStart: current.idx,
            blockEnd: current.bodyEnd,
        });
        current = null;
        pendingBlanks = 0;
    };

    /** 解析纯标识头行字段（时间/删除标记/^id 均在正则约束内，正文必为空） */
    const parseHeader = (line: string, i: number): PendingBlock => {
        const memoType = /^[-*]\s\[(.{1})\]\s?/.test(line)
            ? getTaskType(extractMemoTaskTypeFromLine(line))
            : 'JOURNAL';
        const stripped = line.replace(/^[-*]\s(\[[^\]]{1}\]\s?)?/, '');
        const { time, rest } = extractMemoTime(stripped);
        let content = rest;
        let hasId = '';
        const idMatch = /\^([A-Za-z0-9]{6})\s*$/.exec(content);
        if (idMatch) {
            hasId = idMatch[1];
            content = content.slice(0, idMatch.index).trimEnd();
        } else {
            // 缺 ^id：先用内存随机 id 支撑本会话；落盘修复交给数据体检（missing-id）
            hasId = Math.random().toString(36).slice(-6);
        }
        const delMatch = extractDeletedAt(content);
        let isDeleted = false;
        let deletedAt = '';
        if (delMatch.isDeleted) {
            isDeleted = true;
            deletedAt = delMatch.deletedAt;
        }
        return {
            idx: i,
            hasId,
            time: time || '',
            deletedAt,
            isDeleted,
            memoType,
            body: [],
            bodyEnd: i,
        };
    };

    for (let i = 0; i < fileLines.length; i++) {
        const line = fileLines[i];
        if (tokenRe && !active && tokenRe.test(line)) {
            active = true;
            continue;
        }
        if (active && /^#{1,} /.test(line)) {
            active = false;
            flush();
            continue;
        }
        if (!active) continue;

        const cls = classifyMemoRow(line);
        if (cls === 'pure-header') {
            flush();
            current = parseHeader(line, i);
            continue;
        }
        if (cls === 'old-top-row') {
            // 旧数据行 = 块边界：关闭当前块并跳过（含其后无主缩进残留行）
            flush();
            continue;
        }
        // 'other'：空行 / 缩进正文 / 段落等
        if (!current) {
            continue;
        }
        if (line.trim() === '') {
            // 空行押后：可能夹在正文中（分段），也可能只是块尾装饰
            pendingBlanks++;
            continue;
        }
        if (getIndentWidth(line) >= 4) {
            if (pendingBlanks > 0) {
                for (let b = 0; b < pendingBlanks; b++) current.body.push('');
                pendingBlanks = 0;
            }
            current.body.push(unindentContentLine(line));
            current.bodyEnd = i;
            continue;
        }
        // 缩进 <4 的非空行结束本卡（该行本身非 memo，忽略）
        flush();
    }
    flush();
}

export async function getMemos(
    onBatch?: (memos: Model.Memo[]) => void | Promise<void>,
): Promise<Model.Memo[]> {
    const memos: Model.Memo[] = [];
    const { vault } = appStore.getState().dailyNotesState.app;
    const folder = getDailyNotePath();

    if (folder === '' || folder === undefined) {
        new Notice(t('Please check your daily note plugin OR periodic notes plugin settings'));
        return memos;
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
        await getMemosFromDailyNote(files[i][1] as any, memos);
        if (onBatch && (i + 1) % BATCH_SIZE === 0) {
            await onBatch([...memos]);
        }
    }
    if (onBatch && files.length > 0) {
        await onBatch([...memos]);
    }

    return memos;
}

const getAllLinesFromFile = (cache: string) => cache.split(/\r?\n/);
