import { moment } from 'obsidian';
import { getAllDailyNotes, getDailyNote } from 'obsidian-daily-notes-interface';
import appStore from '../stores/appStore';
import { MemoHeading } from '../memos';
import utils from '../helpers/utils';
import { getMemoSectionRule, isMemoHeadingLine, isMemoSectionBoundary } from '../helpers/memoSection';
import { contentToBodyLines } from './locateMemo';

/**
 * 新建 memo（P1b：只写新格式卡片块）。
 *
 * 落盘文本 = 纯标识头行 `- [ ]? HH:mm:ss ^id` + 正文（content 逐行 4 空格缩进，空行留空）。
 * 真实换行直落文件——旧的 "\n→<br> 单行编码" 管道已退役。memo.content 存与文件一致的
 * 真实换行文本（发送首帧 = 之后 vault 重读，防文字二次变化抖动）。
 */
export async function waitForInsert(MemoContent: string, isTASK: boolean, insertDate?: unknown): Promise<Model.Memo> {
    const date = insertDate ? insertDate : moment();
    const timeText = date.format('HH:mm:ss');
    // 创建时生成持久 ^id，写入文件，避免新建与重读产生重复
    const generatedId = Math.random().toString(36).slice(-6);
    const header = `${isTASK ? '- [ ] ' : '- '}${timeText} ^${generatedId}`;
    // 只去尾部空行（防块尾空行漂移）；正文内部换行/缩进原样保留
    const content = (MemoContent ?? '').replace(/\n+$/, '');
    const bodyLines = contentToBodyLines(content);
    const blockText = bodyLines.length > 0 ? [header, ...bodyLines].join('\n') : header;
    const memoType = isTASK ? 'TASK-TODO' : 'JOURNAL';
    const memo: Model.Memo = {
        id: '',
        content,
        deletedAt: '',
        createdAt: date.format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: date.format('YYYY/MM/DD HH:mm:ss'),
        memoType: memoType,
        path: '',
        hasId: generatedId,
        linkId: '',
    };
    await writeBlockToDailyNote(date, blockText, memo);
    return memo;
}

async function writeBlockToDailyNote(date: moment.Moment, blockText: string, memo: Model.Memo) {
    const { vault } = appStore.getState().dailyNotesState.app;
    let headerIdx: number;
    const dailyNotes = getAllDailyNotes();
    const existingFile = getDailyNote(date, dailyNotes);
    if (!existingFile) {
        const file = await utils.createDailyNoteCheck(date);
        const fileContents = (await vault.read(file)) || '';
        const inserted = insertMemoBlock(MemoHeading, blockText, fileContents);
        await vault.modify(file, inserted.content);
        headerIdx = inserted.headerIdx;
        memo.path = file.path;
    } else {
        const fileContents = (await vault.read(existingFile)) || '';
        const inserted = insertMemoBlock(MemoHeading, blockText, fileContents);
        await vault.modify(existingFile, inserted.content);
        headerIdx = inserted.headerIdx;
        memo.path = existingFile.path;
    }
    // id 数字段 = 头行 0-based 行号（读取端按行索引生成 id，双向一致）
    memo.id = date.format('YYYYMMDDHHmmss') + headerIdx;
}

/**
 * 把卡片块插入日记（2026-09-10 与读取端成对）：
 * - 标题存在：插到「Memo 区标题」小节尾部（下一个同级或更高级标题前；无边界则文件尾）
 * - 标题不存在：自动创建该标题并**追加到文件末尾**，新卡插其下——原有旧内容留在标题外，
 *   不会被新标题"收编"进处理区（2026-09-10 owner 定：同日日记里文件头补标题曾把旧卡卷入）
 * 返回整文件新文本 + 头行 0-based 行号。
 */
function insertMemoBlock(targetString: string, blockText: string, fileContent: string): { content: string; headerIdx: number } {
    const lines = fileContent.split(/\r?\n/);
    const blockLines = blockText.split('\n');
    const rule = getMemoSectionRule(targetString);

    // 空文件：先建标题再落块（空日记也保证「Memo 区标题」存在，读写一致；2026-09-10 owner 验收修复）
    if (lines.length === 1 && lines[0].trim() === '') {
        const out = [rule.title, ...blockLines];
        return { content: out.join('\n'), headerIdx: 1 };
    }

    const targetIdx = lines.findIndex((line) => isMemoHeadingLine(line, rule));
    if (targetIdx === -1) {
        return insertWithNewHeading(lines, blockLines, rule.title);
    }

    // 节尾 = 目标之后的下一同级或更高级标题（更深的子标题仍属本区）
    let nextHeading = -1;
    for (let i = targetIdx + 1; i < lines.length; i++) {
        if (isMemoSectionBoundary(lines[i], rule)) {
            nextHeading = i;
            break;
        }
    }
    if (nextHeading !== -1) {
        // 从标题向上跳过空行，插到该节最后一条非空行后；节内全空则插在 target 行后
        let anchor = targetIdx;
        for (let i = nextHeading - 1; i > targetIdx; i--) {
            if (lines[i].trim() !== '') {
                anchor = i;
                break;
            }
        }
        const out = [...lines.slice(0, anchor + 1), ...blockLines, ...lines.slice(anchor + 1)];
        return { content: out.join('\n'), headerIdx: anchor + 1 };
    }
    return appendAtEnd(lines, blockLines);
}

/** 标题不存在时自动创建：追加到**文件末尾**（新卡插标题下；原有内容留在标题外，不进处理区） */
function insertWithNewHeading(lines: string[], blockLines: string[], title: string): { content: string; headerIdx: number } {
    let end = lines.length;
    while (end > 0 && lines[end - 1].trim() === '') end--;
    const out = [...lines.slice(0, end), '', title, ...blockLines, ''];
    return { content: out.join('\n'), headerIdx: end + 1 };
}

/** 文件尾追加（保留尾换行/无尾换行两种形态；headerIdx = 追加前行数） */
function appendAtEnd(lines: string[], blockLines: string[]): { content: string; headerIdx: number } {
    const last = lines.length - 1;
    if (lines[last] === '') {
        const out = [...lines.slice(0, last), ...blockLines, ''];
        return { content: out.join('\n'), headerIdx: last };
    }
    const out = [...lines, ...blockLines];
    return { content: out.join('\n'), headerIdx: lines.length };
}
