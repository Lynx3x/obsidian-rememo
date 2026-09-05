// P2 — memo 输入区轻量行内高亮（纯 Decoration，不改文本/存储）。
// 只做 5 类单行内正则：`code`、**bold**、*italic*、#tag、[[链接]]；
// 行内 code 区间先行收集，其余类型与 code 区间重叠者跳过（防 `#tag` 在代码里误着色）。
// 配色走 token（class 在 less 里绑 --memo-*），浅深主题单份书写。
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { RangeSetBuilder, Text } from '@codemirror/state';

// 标签字符集（与联想一致：字母/数字/_ / . -，禁空格）
const TAG_CHAR = '\\p{L}\\p{N}_/\\.\\-';
const CODE_RE = /`[^`\n]+?`/g;
const BOLD_RE = /\*\*[^*\n]+?\*\*/g;
const ITALIC_RE = /(?<!\*)\*[^*\n]+?\*(?!\*)/g;
const MARK_RE = /==[^=\n]+?==/g; // Obsidian 高亮语法 ==text==
const LINK_RE = /\[\[[^\[\]\n]+?\]\]/g;
const TAG_RE = new RegExp(`(?<![#${TAG_CHAR}])#(?:[${TAG_CHAR}]+)`, 'gu');

const mk = (cls: string) => Decoration.mark({ class: cls });

const CODE = mk('cm-hl-code');
const BOLD = mk('cm-hl-bold');
const ITALIC = mk('cm-hl-italic');
const MARK = mk('cm-hl-mark');
const TAG = mk('cm-hl-tag');
const LINK = mk('cm-hl-link');

const overlaps = (aFrom: number, aTo: number, ranges: { from: number; to: number }[]): boolean =>
  ranges.some((r) => aFrom < r.to && aTo > r.from);

function buildSet(doc: Text): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>();
  for (let ln = 1; ln <= doc.lines; ln++) {
    const line = doc.line(ln); // cm6 Text.line：from 为 0-based 行首
    const text = line.text;
    const base = line.from;
    const push = (re: RegExp, deco: Decoration, skip?: { from: number; to: number }[]) => {
      re.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(text)) !== null) {
        const a = base + m.index;
        const b = a + m[0].length;
        if (!skip || !overlaps(a, b, skip)) builder.add(a, b, deco);
      }
    };

    // 1) 行内 code 区间（其它类型避让）
    const codeRanges: { from: number; to: number }[] = [];
    CODE_RE.lastIndex = 0;
    let mc: RegExpExecArray | null;
    while ((mc = CODE_RE.exec(text)) !== null) {
      const a = base + mc.index;
      const b = a + mc[0].length;
      codeRanges.push({ from: a, to: b });
      builder.add(a, b, CODE);
    }
    // 2) 粗体/斜体（斜体靠 (?<!\*) 边界天然避开 **）+ ==高亮==
    push(BOLD_RE, BOLD, codeRanges);
    push(ITALIC_RE, ITALIC, codeRanges);
    push(MARK_RE, MARK, codeRanges);
    // 3) #tag / [[链接]]
    push(TAG_RE, TAG, codeRanges);
    push(LINK_RE, LINK, codeRanges);
  }
  return builder.finish();
}

/** 轻量行内高亮扩展 */
export const memoInputHighlight = ViewPlugin.fromClass(
  class {
    deco: DecorationSet;
    constructor(view: EditorView) {
      this.deco = buildSet(view.state.doc);
    }
    update(update: ViewUpdate) {
      if (update.docChanged) {
        this.deco = buildSet(update.state.doc);
      }
    }
  },
  {
    decorations: (v: any) => v.deco as DecorationSet,
  },
);
