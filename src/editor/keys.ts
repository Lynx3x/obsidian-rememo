// P2 — memo 输入 keymap：回车列表/任务续行 + Ctrl/Cmd-Enter 发送。
// 续行语义（Obsidian 原生近似）：
//  - 行首为 `- ` / `* ` / `+ ` / `- [ ] ` / `- [x] ` / `- [X] ` / `N. ` / `N) ` 时，
//    光标处回车 → 下一行续同前缀（有序列表数字 +1，任务标记续空 [ ]）；
//  - 空列表项上回车 → 删除该行前缀退出列表；
//  - 联想打开时 Enter 交给联想接受（completionStatus === 'active' 时放行）。
import { keymap } from '@codemirror/view';
import type { EditorView } from '@codemirror/view';
import { EditorState, Prec } from '@codemirror/state';
import type { Extension } from '@codemirror/state';
import { completionStatus } from '@codemirror/autocomplete';

// 列表前缀（含缩进）：- * + | 1. 1) | - [ ]（任务）；整体即续行前缀文本
const LIST_PREFIX = /^(\s*(?:[-*+]\s(?:\[[ xX]\]\s+)?|(?:\d+)[.)]\s+))/;

function listPrefixOf(lineText: string): string | null {
  const m = LIST_PREFIX.exec(lineText);
  return m ? m[1] : null;
}

function continueList(view: EditorView): boolean {
  const { state, dispatch } = view;
  if (completionStatus(state) === 'active') return false; // 联想打开：Enter = 接受项

  const sel = state.selection.main;
  const head = sel.head;
  const line = state.doc.lineAt(head);
  const prefix = listPrefixOf(line.text);
  if (prefix === null) return false;

  // 光标所在行去掉前缀后是否为空项
  const rest = line.text.slice(prefix.length);
  if (rest.trim() === '') {
    // 空项回车 → 删前缀退出列表
    dispatch({
      changes: { from: line.from, to: line.from + prefix.length, insert: '' },
      selection: { anchor: line.from },
    });
    return true;
  }

  // 续行：光标处插换行 + 前缀（有序 +1；任务/无序照搬）
  const numMatch = /^(\s*)(\d+)([.)]\s+)/.exec(prefix);
  let nextPrefix = prefix;
  if (numMatch) {
    const n = parseInt(numMatch[2], 10);
    nextPrefix = `${numMatch[1]}${n + 1}${numMatch[3]}`;
  }
  const insert = '\n' + nextPrefix;
  dispatch({
    changes: { from: head, to: head, insert },
    selection: { anchor: head + insert.length },
  });
  return true;
}

/**
 * memo 输入 keymap：
 *  - Enter：列表续行（非列表行放行给默认换行；联想打开时放行给接受）
 *  - Mod-Enter：发送（回调注入，读当前文档全文）
 */
export function memoInputKeymap(onSend?: () => void): Extension[] {
  return [
    Prec.high(
      keymap.of([
        { key: 'Enter', run: continueList },
        {
          key: 'Mod-Enter',
          run: (view) => {
            if (onSend) {
              onSend();
              return true;
            }
            return false;
          },
        },
      ]),
    ),
  ];
}

export { listPrefixOf };
