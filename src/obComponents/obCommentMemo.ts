import appStore from '../stores/appStore';
import { moment } from 'obsidian';
import type { TFile } from 'obsidian';

/**
 * 评论写入模块（脱离 Dataview）。
 *
 * 新模型：评论是父 memo 下的缩进子项，linkId = 父 memo 的持久 ^id。
 * 时间统一 HH:mm:ss，每条评论自带持久 ^id。
 */

const getAllLinesFromFile = (cache: string) => cache.split(/\r?\n/);

/**
 * 创建一条评论，写回父 memo 所在日记文件的子列表末尾。
 *
 * @param MemoContent 评论内容（\n 会转 <br> 存储）
 * @param isList 保留参数（统一视为列表项）
 * @param path 父 memo 所在文件路径
 * @param oriID 父 memo 的 id（时间戳+行号，兜底定位用）
 * @param hasID 父 memo 的持久 ^id（首选定位依据）
 */
export async function commentMemo(
  MemoContent: string,
  isList: boolean,
  path?: any,
  oriID?: string,
  hasID?: string,
): Promise<Model.Memo> {
  const { vault, metadataCache } =
    appStore.getState().dailyNotesState.app === undefined ? app : appStore.getState().dailyNotesState.app;
  const removeEnter = MemoContent.replace(/\n/g, '<br>').replace(/(<br>)(<br>)/g, '$1 $2').trim();

  if (path === undefined) {
    throw new Error('commentMemo: missing path');
  }

  const file = metadataCache.getFirstLinkpathDest('', path) as TFile | null;
  if (!file) {
    throw new Error('commentMemo: cannot find file ' + path);
  }

  const fileContents = await vault.read(file);
  const lines = getAllLinesFromFile(fileContents);

  // 1. 定位父行：优先按持久 ^id，找不到再用行号兜底
  let parentLineIdx = -1;
  if (hasID) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('^' + hasID)) {
        parentLineIdx = i;
        break;
      }
    }
  }
  if (parentLineIdx === -1 && oriID) {
    const lineNo = parseInt(oriID.slice(14));
    if (!isNaN(lineNo) && lineNo >= 0 && lineNo < lines.length) {
      parentLineIdx = lineNo;
    }
  }
  if (parentLineIdx === -1) {
    throw new Error('commentMemo: cannot locate parent memo line');
  }

  const parentLine = lines[parentLineIdx];
  const indentMatch = /^(\s*)/.exec(parentLine);
  const baseIndent = indentMatch ? indentMatch[1] : '';
  const commentIndent = baseIndent + '    ';

  // 2. 找插入位置：父行之后，直到遇到同级/外层列表项、标题或空行
  let insertIdx = parentLineIdx;
  for (let i = parentLineIdx + 1; i < lines.length; i++) {
    const l = lines[i];
    if (l.trim() === '') {
      insertIdx = i;
      break;
    }
    if (/^#{1,}/.test(l)) {
      insertIdx = i;
      break;
    }
    const lIndentMatch = /^(\s*)/.exec(l);
    const lIndent = lIndentMatch ? lIndentMatch[1] : '';
    // 同级或更外层的列表项 → 插在它之前
    if (lIndent.length <= baseIndent.length && /^\s*[-*]\s/.test(l)) {
      insertIdx = i - 1;
      break;
    }
    insertIdx = i;
  }

  // 3. 构造评论行：父缩进 + 4 空格 + "- HH:mm:ss 内容 ^id"
  const time = moment();
  const generatedId = Math.random().toString(36).slice(-6);
  const commentLine = `${commentIndent}- ${time.format('HH:mm:ss')} ${removeEnter} ^${generatedId}`;

  const newLines = [...lines.slice(0, insertIdx + 1), commentLine, ...lines.slice(insertIdx + 1)];
  await vault.modify(file, newLines.join('\n'));

  return {
    id: time.format('YYYYMMDDHHmmss') + (insertIdx + 1),
    content: removeEnter,
    deletedAt: '',
    createdAt: time.format('YYYY/MM/DD HH:mm:ss'),
    updatedAt: time.format('YYYY/MM/DD HH:mm:ss'),
    memoType: 'JOURNAL',
    path: file.path,
    hasId: generatedId,
    linkId: hasID || '',
  };
}
