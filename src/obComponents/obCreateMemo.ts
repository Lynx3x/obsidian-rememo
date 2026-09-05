import { moment } from 'obsidian';
import type { TFile } from 'obsidian';
import { getAllDailyNotes, getDailyNote } from 'obsidian-daily-notes-interface';
import appStore from '../stores/appStore';
import { InsertAfter } from '../memos';
import utils from '../helpers/utils';
import { contentToBodyLines } from './locateMemo';

/**
 * 新建 memo（P1b：只写新格式卡片块）。
 *
 * 落盘文本 = 纯标识头行 `- [ ]? HH:mm:ss ^id` + 正文（content 逐行 4 空格缩进，空行留空）。
 * 真实换行直落文件——旧的 "\n→<br> 单行编码" 管道已退役。memo.content 存与文件一致的
 * 真实换行文本（发送首帧 = 之后 vault 重读，防文字二次变化抖动）。
 */
export async function waitForInsert(MemoContent: string, isTASK: boolean, insertDate?: any): Promise<Model.Memo> {
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
    const { vault } =
        appStore.getState().dailyNotesState.app === undefined ? app : appStore.getState().dailyNotesState.app;
    let headerIdx: number;
    const dailyNotes = await getAllDailyNotes();
    const existingFile = getDailyNote(date, dailyNotes);
    if (!existingFile) {
        const file = await utils.createDailyNoteCheck(date);
        const fileContents = (await vault.read(file as unknown as TFile)) || '';
        const inserted = insertMemoBlock(InsertAfter || '', blockText, fileContents);
        await vault.modify(file as unknown as TFile, inserted.content);
        headerIdx = inserted.headerIdx;
        memo.path = file.path;
    } else {
        const fileContents = (await vault.read(existingFile as unknown as TFile)) || '';
        const inserted = insertMemoBlock(InsertAfter || '', blockText, fileContents);
        await vault.modify(existingFile as unknown as TFile, inserted.content);
        headerIdx = inserted.headerIdx;
        memo.path = existingFile.path;
    }
    // id 数字段 = 头行 0-based 行号（读取端按行索引生成 id，双向一致）
    memo.id = date.format('YYYYMMDDHHmmss') + headerIdx;
}

/**
 * 把卡片块插入日记：memo 区语义沿用 InsertAfter（在其后的首个标题前插入，节尾追加）。
 * 返回整文件新文本 + 头行 0-based 行号。
 */
function insertMemoBlock(targetString: string, blockText: string, fileContent: string): { content: string; headerIdx: number } {
    const lines = fileContent.split(/\r?\n/);
    const blockLines = blockText.split('\n');

    // 空文件：直接落块，无前导空行
    if (lines.length === 1 && lines[0].trim() === '') {
        return { content: blockText, headerIdx: 0 };
    }

    if (targetString !== '') {
        const targetRe = new RegExp('\\s*' + targetString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*');
        const targetIdx = lines.findIndex((line) => targetRe.test(line));
        if (targetIdx !== -1) {
            // 找 target 之后的下一标题（原语义 /^#+ |---/）
            let nextHeading = -1;
            for (let i = targetIdx + 1; i < lines.length; i++) {
                if (/^#{1,} |^---/.test(lines[i])) {
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
    }
    return appendAtEnd(lines, blockLines);
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
