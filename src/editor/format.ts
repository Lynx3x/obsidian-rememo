// P2 — 行内格式快捷键（Mod-B 粗 / Mod-I 斜 / Mod-E 行内 code）。
// 纯文本包裹（decoration 高亮随 doc 变化即时呈现），不改变存储语义。
import { keymap } from '@codemirror/view';
import type { EditorView } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import type { Extension } from '@codemirror/state';

/** 包裹/展开：选区非空 → 两侧包 token；光标空 → 在光标处放一对 token 并把光标置于中间 */
function wrapToggle(view: EditorView, open: string, close = open): boolean {
  const { state, dispatch } = view;
  const sel = state.selection.main;
  if (sel.empty) {
    const head = sel.head;
    dispatch({
      changes: { from: head, to: head, insert: open + close },
      selection: { anchor: head + open.length },
    });
    return true;
  }
  const from = Math.min(sel.from, sel.to);
  const to = Math.max(sel.from, sel.to);
  const text = state.sliceDoc(from, to);
  dispatch({
    changes: { from, to, insert: open + text + close },
    selection: { anchor: from + open.length, head: to + open.length },
  });
  return true;
}

export type MemoFormatKind = 'b' | 'i' | 'e';

const FORMAT_TOKENS: Record<MemoFormatKind, [string, string]> = {
  b: ['**', '**'],
  i: ['*', '*'],
  e: ['`', '`'],
};

/**
 * 行内格式动作（b=粗 **、i=斜 *、e=行内码 `）。
 * 独立导出：window capture 兜底（capture.ts）与 cm keymap 共用同一语义。
 */
export function runFormatAction(view: EditorView, kind: MemoFormatKind): boolean {
  const [open, close] = FORMAT_TOKENS[kind];
  return wrapToggle(view, open, close);
}

/** 行内格式快捷键扩展 */
export function memoFormatKeymap(): Extension[] {
  return [
    Prec.high(
      keymap.of([
        { key: 'Mod-b', run: (v) => runFormatAction(v, 'b') },
        { key: 'Mod-i', run: (v) => runFormatAction(v, 'i') },
        { key: 'Mod-e', run: (v) => runFormatAction(v, 'e') },
      ]),
    ),
  ];
}
