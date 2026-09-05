// P2 — memo 输入联想（cm6 autocomplete 框架）：
//  - `#`（行首或空白后）→ 标签联想：数据源复用 obTagSuggester.usedTags（contains 匹配，
//    保持旧 UX）；apply = 整段替换为 `#tag`（不带尾随空格，目视可调）
//  - `[[` → 文件联想：数据源复用 obFileSuggester.getSuggestions（basename 前缀>包含>路径
//    分档排序），token 语义与旧 rta 一致（喂 `[ab` 形态）；apply = fileManager
//    generateMarkdownLink 整链（复刻旧插入，不能只插文件名）
//  - filter:false 用自有排序；条目 DOM .cm-sug-* 结构由 render 构建
import { CompletionContext, CompletionResult, autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { keymap } from '@codemirror/view';
import type { Extension } from '@codemirror/state';
import type { TFile } from 'obsidian';
import appStore from '../stores/appStore';
import { usedTags } from '../obComponents/obTagSuggester';
import { getSuggestions } from '../obComponents/obFileSuggester';

const isTagChar = (ch: string): boolean => ch !== '' && /[\p{L}\p{N}_/.-]/u.test(ch);
const isSpace = (ch: string): boolean => ch === undefined || /\s/.test(ch);

// ---- # 标签联想 ----
function tagCompletion(ctx: CompletionContext): CompletionResult | null {
  const { state, pos } = ctx;
  const line = state.doc.lineAt(pos);
  if (pos <= line.from) return null;

  // 从光标往前扫标签字符，定位 '#'
  let hash = pos;
  while (hash > line.from && isTagChar(state.sliceDoc(hash - 1, hash))) hash--;
  if (hash === pos || state.sliceDoc(hash - 1, hash) !== '#') return null;
  // 只允许行首或空白后触发（与旧 rta afterWhitespace 一致）
  const prev = hash - 2 >= line.from ? state.sliceDoc(hash - 2, hash - 1) : '';
  if (prev !== '' && !isSpace(prev)) return null;

  // hash 已停在 '#' 右侧 → token 从 hash 起（空 token = 刚打 '#'，列出全部）
  const token = state.sliceDoc(hash, pos);
  const options = usedTags(token).map(({ name }) => ({
    label: name,
    apply: '#' + name,
  }));
  if (options.length === 0) return null;
  return { from: hash, options, filter: false };
}

// ---- [[ 文件联想 ----
function fileCompletion(ctx: CompletionContext): CompletionResult | null {
  const { state, pos } = ctx;
  const line = state.doc.lineAt(pos);
  // 从光标向左收集 token：文件名可含空格等普通字符（不含 \n ] [），
  // 之后必须紧邻两个 '['（再多一个 '[' 不算，避免 [[[ 歧义）
  let s = pos;
  let brackets = 0;
  while (s > line.from) {
    const ch = state.sliceDoc(s - 1, s);
    if (ch === '\n' || ch === ']') break;
    if (ch === '[') {
      s--;
      brackets++;
      if (brackets >= 2) break;
      continue;
    }
    if (brackets > 0) break; // '[' 对后面直接跟着普通字符（[[] 之类）不算触发
    s--;
  }
  if (brackets < 2) return null;
  const from = s; // '[[rest' 整段（含两个 '['）
  // token 语义与旧 rta 一致：喂 getSuggestions 一个带单 '[' 的串（函数内部再剥）
  const tokenWithBracket = state.sliceDoc(from + 1, pos);
  const suggestions = getSuggestions(tokenWithBracket).slice(0, 10);
  if (suggestions.length === 0) return null;

  const options = suggestions.map(({ name, file }) => {
    const dir = file.parent && file.parent.path !== '/' ? file.parent.path : '';
    return {
      label: name,
      detail: dir,
      file,
      render: (el: HTMLElement) => {
        el.classList.add('cm-sug-file');
        const nameEl = document.createElement('span');
        nameEl.className = 'cm-sug-name';
        nameEl.textContent = name;
        el.appendChild(nameEl);
        if (dir) {
          const pathEl = document.createElement('span');
          pathEl.className = 'cm-sug-path';
          pathEl.textContent = dir;
          el.appendChild(pathEl);
        }
      },
      apply: (view: any, completion: any, from: number, to: number) => {
        const f = completion?.file as TFile | undefined;
        const app = appStore.getState().dailyNotesState.app;
        let link = '';
        if (f && app.fileManager) {
          // 复刻旧 Editor.tsx 插入：generateMarkdownLink(file, file.path, '', '')
          link = app.fileManager.generateMarkdownLink(f, f.path, '', '');
        } else {
          link = `[[${name}]]`;
        }
        view.dispatch({
          changes: { from, to, insert: link },
          selection: { anchor: from + link.length },
          userEvent: 'input.complete',
        });
      },
    };
  });

  return { from, options, filter: false };
}

/** memo 输入联想扩展（# 标签 + [[ 文件） */
export function memoAutocomplete(): Extension {
  return [
    autocompletion({
      override: [(ctx) => tagCompletion(ctx) ?? fileCompletion(ctx)],
      activateOnTyping: true,
      maxRenderedOptions: 200,
    }),
    keymap.of(completionKeymap),
  ];
}
