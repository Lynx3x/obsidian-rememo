// MEMO_LINK 引用解析（P3 引用模型，ADR-0003，2026-09-05）
// 新式目标：日记文件名#^6位id（^id 持久，迁移后全卡覆盖）；旧式目标：内存 id（YYYYMMDDHHmmss+行号，不再产生新数据）
// 展示模型：MEMO_LINK 不渲染在正文（formatMemoContent 先整串剥离），由卡片底部"引用自"条呈现；
//   正文任意位置的 MEMO_LINK 都是引用（多引用），条目标签渲染时从目标 memo 实时取内容，不依赖存储里的 @ 标签。
import { MEMO_LINK_REG } from './consts';

const NEW_TARGET_REG = /^([^#]+\.md)#\^([A-Za-z0-9]{6})$/;

export interface ParsedLinkTarget {
  /** 新式目标命中 <文件.md>#^<id> 时为文件名 */
  fileName?: string;
  id: string;
  isLegacy: boolean;
}

export function parseLinkTarget(target: string): ParsedLinkTarget | null {
  const t = (target ?? '').trim();
  if (!t) return null;
  const m = NEW_TARGET_REG.exec(t);
  if (m) return { fileName: m[1], id: m[2], isLegacy: false };
  return { id: t, isLegacy: true };
}

/** 提取正文中全部 MEMO_LINK 目标（去重、保序） */
export function extractLinkTargets(content: string): string[] {
  const set = new Set<string>();
  for (const m of content.matchAll(MEMO_LINK_REG)) {
    if (m[2]) set.add(m[2]);
  }
  return [...set];
}

/** 剥除正文中的 MEMO_LINK（渲染正文前调用——引用由卡底"引用自"条呈现） */
export function stripMemoLinks(content: string): string {
  return content.replace(MEMO_LINK_REG, '');
}

/** 引用条展示文本：剥引用标记与 <br> 后取前 max 字 */
export function refPreview(content: string, max = 30): string {
  return stripMemoLinks(content)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}
