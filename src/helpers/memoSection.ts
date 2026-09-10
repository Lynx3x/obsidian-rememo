/**
 * Memo 处理区语义（唯一来源，2026-09-10 设置合并后）。
 * 处理区 = 「Memo 区标题」（设置 MemoHeading，默认 `## Memo`）所在小节：
 * 从标题行之后，到下一个同级或更高级标题止；更深的子标题仍属本区。
 * 容错：整文件没有该标题时，视为「读整个文件」（兼容旧数据；写入端会自动创建标题）。
 * 读端（obGetMemos）/ 体检（engine）/ 迁移（migrate）共用本文件，勿在别处再抄判定。
 */

export interface MemoSectionRule {
  /** 完整标题行文本（trim 后严格相等匹配），如 '## Memo' */
  title: string;
  /** 标题级别（# 数量）；0 = 非 # 标题文本（此时任何标题都视为区段边界） */
  level: number;
}

export const DEFAULT_MEMO_HEADING = '## Memo';

/** 由设置值解析处理区规则（空值回退默认） */
export function getMemoSectionRule(heading: string | undefined): MemoSectionRule {
  const title = (heading ?? '').trim() || DEFAULT_MEMO_HEADING;
  const m = /^(#{1,6})\s/.exec(title);
  return { title, level: m ? m[1].length : 0 };
}

/** 行是否为目标标题行（trim 后严格相等） */
export function isMemoHeadingLine(line: string, rule: MemoSectionRule): boolean {
  return line.trim() === rule.title;
}

/** 行是否构成处理区结束边界（同级或更高级标题；rule.level = 0 时任意 # 标题） */
export function isMemoSectionBoundary(line: string, rule: MemoSectionRule): boolean {
  const m = /^(#{1,6})\s/.exec(line);
  if (!m) {
    return false;
  }
  return rule.level === 0 || m[1].length <= rule.level;
}

/**
 * 处理区行判定（体检/迁移用）：返回与文件行等长的布尔数组。
 * 语义与 obGetMemos.parseMemosFromNote 完全一致（严格模式：标题行自身不入区、边界行不入区、
 * 整文件无目标标题 → 全不处理；写入端缺失时自动创建标题，保证读写成对）。
 */
export function computeScope(lines: string[], heading: string): boolean[] {
  const rule = getMemoSectionRule(heading);
  const inScope = new Array<boolean>(lines.length).fill(false);
  let active = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isMemoHeadingLine(line, rule)) {
      active = true; // 标题行只开门、不入区（否则会被自身级别判定当场熄灭）
      continue;
    }
    if (active && isMemoSectionBoundary(line, rule)) {
      active = false;
      continue;
    }
    if (active) {
      inScope[i] = true;
    }
  }
  return inScope;
}
