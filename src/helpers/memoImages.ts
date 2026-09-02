import { App, TFile, Vault } from 'obsidian';
import { MARKDOWN_URL_REG, MARKDOWN_WEB_URL_REG, WIKI_IMAGE_URL_REG } from './consts';

/**
 * memoImages — 图片解析深模块。
 *
 * 原先 MemoImage / DailyMemo / ShareMemoImageDialog 各自重复同一套
 * "从 memo 内容识别外部/内部图片" 的逻辑（detectWiki/MD 内部链接 +
 * 外部 URL 提取，约 250 行）。这里收敛为单一入口 parseMemoImages：
 *   - external: 外部网络图 URL（裸 http URL 或 Markdown 链接里的 http URL）
 *   - internal: 库内图片（Wiki 语法 / Markdown 语法，经 metadataCache 解析）
 *   - all:      external + internal 合并（顺序同旧行为），供图片预览灯箱用
 *
 * 注意：这些全局正则带 /g，跨次 .exec 会推进 lastIndex，统一在解析时
 * 用局部克隆（new RegExp(source, 'g')）避免状态污染。
 */

export interface MemoImageLink {
  linkText: string;
  altText: string;
  path: string;
  filepath?: string;
}

export interface MemoImageInfo {
  src: string;
  filepath?: string;
}

export interface MemoImageResult {
  external: string[];
  internal: MemoImageLink[];
  all: MemoImageInfo[];
}

/** vault 资源路径（原各组件内 getPathOfImage 统一版） */
export const getPathOfImage = (vault: Vault, image: TFile): string => vault.getResourcePath(image);

/** 去掉全匹配里 group1 的前导空白 / 冒号（URL 只取 http(s) 起） */
const urlOnly = (raw: string): string => {
  const at = raw.search(/https?:\/\//);
  return at >= 0 ? raw.slice(at) : raw.trim();
};

/** 用 metadataCache 解析库内文件；找不到返回 null（解析器跳过该图） */
const resolveFilePath = (
  app: App,
  rawName: string,
  altText: string,
): { linkText: string; altText: string; path: string; filepath?: string } | null => {
  const file = app.metadataCache.getFirstLinkpathDest(decodeURIComponent(rawName), '');
  if (file === null) {
    return null;
  }
  const asFile = file as TFile;
  return {
    linkText: rawName,
    altText: altText || '',
    path: getPathOfImage(app.vault, asFile),
    filepath: asFile.path,
  };
};

/**
 * 解析一条 Wiki 语法图片链接（![[xxx.png|alt]]）→ 库内图片信息。
 * 用非全局正则解析，避免 /g 的 lastIndex 跨调用推进。
 */
export const resolveWikiInternalLink = (app: App, linkText: string): MemoImageLink | null => {
  const m = new RegExp(WIKI_IMAGE_URL_REG.source).exec(linkText);
  if (!m) {
    return null;
  }
  return resolveFilePath(app, m[1] || '', m[5] || '');
};

/**
 * 解析一条 Markdown 语法图片链接（![alt](path)）→ 库内图片信息。
 * group5 = 目标路径，group2 = alt 文本。
 */
export const resolveMDInternalLink = (app: App, linkText: string): MemoImageLink | null => {
  const m = new RegExp(MARKDOWN_URL_REG.source).exec(linkText);
  if (!m) {
    return null;
  }
  return resolveFilePath(app, m[5] || '', m[2] || '');
};

/**
 * 从 memo 内容提取所有图片。返回结果顺序与旧实现一致：
 * external 在前（裸 URL + md 链接里的 http URL），internal 在后（wiki/md 库内图）。
 */
export function parseMemoImages(content: string, app: App): MemoImageResult {
  const external: string[] = [];
  const internal: MemoImageLink[] = [];

  // 1) 裸外部网络图 URL（不含 md/wiki 语法，直接出现在文本里）
  //    MARKDOWN_WEB_URL_REG 尾部的 (?!\)) 保证不会吞掉 md 链接里的 URL
  const webReg = new RegExp(MARKDOWN_WEB_URL_REG.source, 'g');
  let webMatch: RegExpExecArray | null;
  while ((webMatch = webReg.exec(content)) !== null) {
    const url = urlOnly(webMatch[0]);
    if (url && !external.includes(url)) {
      external.push(url);
    }
  }

  // 2) Markdown 图片链接：target 是 http(s) → external；否则按库内文件解析
  const mdReg = new RegExp(MARKDOWN_URL_REG.source, 'g');
  let mdMatch: RegExpExecArray | null;
  while ((mdMatch = mdReg.exec(content)) !== null) {
    const link = mdMatch[0];
    const target = mdMatch[5] || '';
    if (/^https?:\/\//.test(target.trim())) {
      if (!external.includes(target.trim())) {
        external.push(target.trim());
      }
    } else {
      const resolved = resolveMDInternalLink(app, link);
      if (resolved) {
        internal.push(resolved);
      }
    }
  }

  // 3) Wiki 图片链接：库内文件
  const wikiReg = new RegExp(WIKI_IMAGE_URL_REG.source, 'g');
  let wikiMatch: RegExpExecArray | null;
  while ((wikiMatch = wikiReg.exec(content)) !== null) {
    const resolved = resolveWikiInternalLink(app, wikiMatch[0]);
    if (resolved) {
      internal.push(resolved);
    }
  }

  const all: MemoImageInfo[] = [
    ...external.map((src) => ({ src })),
    ...internal.map((l) => ({ src: l.path, filepath: l.filepath })),
  ];

  return { external, internal, all };
}
