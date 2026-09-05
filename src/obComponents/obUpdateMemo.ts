import { moment } from 'obsidian';
import appStore from '../stores/appStore';
import { contentToBodyLines, findHeaderLineIdx, openMemoFile, scanBodyEnd } from './locateMemo';

/**
 * 编辑 memo 正文（P1b：只作用于新格式卡片块）。
 * 定位头行（持久 ^id 优先，行号兜底）→ **只替换正文域**，头行（时间/任务标记/deletedAt/^id）原样不动。
 * 旧的"按行号 replace(originalContent)"逻辑退役；UI 不再需要把 ` ^id` 拼进内容。
 */
export async function changeMemo(
    memoid: string,
    content: string,
    memoType?: string,
    path?: string,
    hasId?: string,
): Promise<Model.Memo> {
    const loc = await openMemoFile(memoid, path);
    if (!loc) {
        throw new Error('File not found');
    }

    const hint = parseInt(memoid.slice(14));
    const headerIdx = findHeaderLineIdx(loc.lines, hasId, isNaN(hint) ? 0 : hint);
    if (headerIdx === -1) {
        throw new Error('Memo header not found in file');
    }

    // 与创建端一致：只去尾部空行，正文原样（含内部空行/缩进）
    const normalized = (content ?? '').replace(/\n+$/, '');
    const bodyLines = contentToBodyLines(normalized);
    const bodyEnd = scanBodyEnd(loc.lines, headerIdx);

    const before = loc.lines.slice(0, headerIdx + 1);
    const after = loc.lines.slice(bodyEnd + 1);
    const { vault } = appStore.getState().dailyNotesState.app;
    await vault.modify(loc.file, [...before, ...bodyLines, ...after].join('\n'));

    const date = moment(memoid.slice(0, 14), 'YYYYMMDDHHmmss');
    return {
        id: memoid,
        content: normalized,
        user_id: 1,
        deletedAt: '',
        createdAt: date.format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: date.format('YYYY/MM/DD HH:mm:ss'),
        memoType: memoType || 'JOURNAL',
        hasId: hasId || '',
        linkId: '',
        path: loc.file.path,
    };
}
