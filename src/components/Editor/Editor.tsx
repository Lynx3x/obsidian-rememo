import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Compartment, EditorState } from '@codemirror/state';
import type { Extension } from '@codemirror/state';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import { completionStatus } from '@codemirror/autocomplete';
import { memoAutocomplete } from '../../editor/suggest';
import { memoInputHighlight } from '../../editor/highlight';
import { getNativeMarkdownEditorClass } from '../../editor/native';
import appStore from '../../stores/appStore';
import '../../less/editor.less';
import { FocusOnEditor } from '../../memos';
import SendIcon from '../../icons/send.svg?component';
import { t } from '../../translations/helper';
import Only from '../common/OnlyWhen';

/**
 * memo 主输入（P2 转向：Obsidian 原生 MarkdownEditor 子类，替代自打包 cm6）。
 * 外层壳（.common-editor-wrapper + tools）与 props/ref 契约不变，内层引擎换成
 * 内核编辑器的子类实例（kanban 同款接入，见 native.ts）：
 *  - 键盘 = Obsidian 原生（列表/任务续行、IME、undo/redo、原生 markdown 格式键）
 *  - 编辑器聚焦时把 workspace.activeEditor 桥到本实例 → Obsidian 的编辑器命令
 *    （Mod-B/I/E 等）直接作用于 memo 输入，不再被全局键拦截或误改主编辑器
 *  - 发送键位（Enter / Ctrl+Enter 按 EnterToSend 设置）在最高优先级 keymap 覆写
 *  - `#`/`[[` 联想、轻量高亮、placeholder 仍是自产扩展（数据源/apply 语义可控）
 *  - readOnly（发送后发射前锁输入）走 Compartment
 */

export interface EditorRefActions {
  /** cm 编辑器容器 DOM（.cm-editor），供外部挂 paste/drop、blur 等 */
  element: HTMLElement;
  /** 可聚焦的内容 DOM（.cm-content） */
  contentEl: HTMLElement;
  focus: FunctionType;
  insertText: (text: string) => void;
  setContent: (text: string) => void;
  getContent: () => string;
  /** 清空输入（同时清 undo 历史——发送后不该能撤销回旧文） */
  clear: () => void;
  /** 锁定/解锁输入（readOnly），用于"发送后发射前"不让用户继续改内容 */
  setEditable: (editable: boolean) => void;
  /** 工具按钮：# 标签切换（光标前有 '#' 则删、无则插） */
  toggleHashAtCursor: () => void;
}

interface EditorProps {
  className: string;
  initialContent: string;
  placeholder: string;
  showConfirmBtn: boolean;
  showCancelBtn: boolean;
  tools?: React.ReactNode;
  onConfirmBtnClick: (content: string) => void;
  onCancelBtnClick: () => void;
  onContentChange: (content: string) => void;
  /** true = Enter 直接发送（Ctrl/Cmd+Enter 换行）；false（默认）= Enter 换行/续行，Ctrl+Enter 发送 */
  enterToSend?: boolean;
}

// eslint-disable-next-line react/display-name
const Editor = forwardRef((props: EditorProps, ref: React.ForwardedRef<EditorRefActions>) => {
  const {
    className,
    initialContent,
    placeholder: placeholderText,
    showConfirmBtn,
    showCancelBtn,
    onConfirmBtnClick: handleConfirmBtnClickCallback,
    onCancelBtnClick: handleCancelBtnClickCallback,
    onContentChange: handleContentChangeCallback,
    enterToSend,
  } = props;

  const mountRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null); // 原生实例的 cm（EditorView）
  const nativeRef = useRef<any>(null); // 内核 MarkdownEditor 子类实例
  const roCompartmentRef = useRef(new Compartment());
  // 全量扩展快照（内核 super + 自产，buildLocalExtensions 内捕获一次）——clear() 重建 state 用
  const extRef = useRef<Extension[]>([]);
  // 动态回调经 ref 转发（原生实例只建一次）
  const cbRef = useRef<{
    confirm: (content: string) => void;
    change: (content: string) => void;
    placeholder: string;
    enterToSend: boolean;
    get?: () => string;
  }>({
    confirm: handleConfirmBtnClickCallback,
    change: handleContentChangeCallback,
    placeholder: placeholderText,
    enterToSend: enterToSend === true,
  });
  cbRef.current.confirm = handleConfirmBtnClickCallback;
  cbRef.current.change = handleContentChangeCallback;
  cbRef.current.placeholder = placeholderText;
  cbRef.current.enterToSend = enterToSend === true;

  // 发送键可用态（仅空内容时禁用确认钮，与旧 textarea disabled 语义一致）
  const [hasContent, setHasContent] = useState(() => initialContent.length > 0);

  useEffect(() => {
    const parent = mountRef.current;
    if (!parent || parent.querySelector('.cm-editor')) {
      return;
    }
    const app: any = appStore.getState().dailyNotesState.app;
    const NativeEditor = getNativeMarkdownEditorClass(app);
    if (!NativeEditor) {
      console.error('[rememo] 原生 MarkdownEditor 初始化失败（内核 API 变动，见 native.ts）');
      parent.textContent = '[rememo] editor init failed (see console)';
      return;
    }

    // ---- workspace.activeEditor 桥：聚焦时把本实例接为 activeEditor，让 Obsidian
    // 编辑器命令（Mod-B/I/E、任务切换等）作用于 memo 输入而非主编辑器 ----
    const controller = {
      app,
      getMode: () => 'source',
      showSearch: () => undefined,
      toggleMode: () => undefined,
      onMarkdownScroll: () => undefined,
      scroll: 0,
      editMode: null,
      file: null,
      path: '',
      get editor() {
        return nativeRef.current?.editor;
      },
    };
    const bridgeActiveEditor = (on: boolean) => {
      const ws = app?.workspace;
      if (!ws) return;
      if (on) {
        ws.activeEditor = controller;
      } else if (ws.activeEditor === controller) {
        ws.activeEditor = null;
      }
    };

    // ---- 发送/换行：以编辑器当前文档为准（缓存由 change 回调维护） ----
    const sendFrom = (view: EditorView) => {
      cbRef.current.confirm(view.state.doc.toString());
    };

    class MemoNativeEditor extends NativeEditor {
      constructor(...args: any[]) {
        super(...args);
      }

      buildLocalExtensions(): Extension[] {
        const exts: Extension[] = super.buildLocalExtensions?.() ?? [];
        // 换行：主编辑器的 lineWrapping 由内核更外层注入，子类不自带——这里显式补上
        exts.push(EditorView.lineWrapping);
        exts.push(
          // 聚焦/失焦即桥接/卸下 activeEditor（仿 kanban MarkdownEditor focus 处理）
          Prec.highest(
            EditorView.domEventHandlers({
              focus: () => {
                bridgeActiveEditor(true);
                return true;
              },
              blur: () => {
                bridgeActiveEditor(false);
                return true;
              },
            }),
          ),
          placeholder(cbRef.current.placeholder),
          memoInputHighlight,
          memoAutocomplete(),
          keymap.of([
            {
              key: 'Enter',
              run: (view) => {
                if (!cbRef.current.enterToSend) return false; // 默认模式：交原生续行/换行
                if (completionStatus(view.state) === 'active') return false; // 联想打开：交联想接受
                sendFrom(view);
                return true;
              },
            },
            {
              key: 'Mod-Enter',
              run: (view) => {
                if (cbRef.current.enterToSend) {
                  // 发送模式：Ctrl/Cmd+Enter = 单行换行
                  const head = view.state.selection.main.head;
                  view.dispatch({
                    changes: { from: head, to: head, insert: '\n' },
                    selection: { anchor: head + 1 },
                  });
                  return true;
                }
                sendFrom(view);
                return true;
              },
            },
          ]),
          roCompartmentRef.current.of([]),
          EditorView.updateListener.of((u) => {
            if (u.docChanged) {
              const text = u.state.doc.toString();
              setHasContent(text.length > 0);
              cbRef.current.change(text);
            }
          }),
        );
        // 全量扩展快照（内核 super + 自产）：仅在内核构造调用本方法这一次时捕获，
        // 供 clear() 重建 state 用（重建 = undo 历史一起清，发送后 Ctrl+Z 不复活旧文）
        extRef.current = exts;
        return exts;
      }
    }

    let native: any;
    try {
      native = new MemoNativeEditor(app, parent, controller);
    } catch (err) {
      console.error('[rememo] 原生 MarkdownEditor 构造失败', err);
      parent.textContent = '[rememo] editor init failed (see console)';
      return;
    }
    nativeRef.current = native;
    const cm: EditorView | undefined = native.cm;
    if (!cm) {
      console.error('[rememo] 原生实例无 .cm（内核结构变动？）');
      parent.textContent = '[rememo] editor init failed (see console)';
      return;
    }
    viewRef.current = cm;
    cbRef.current.get = () => cm.state.doc.toString();

    // 初始内容：优先实例 .set（kanban 同款），缺则走 editor 包装 setValue
    const initial = initialContent ?? '';
    if (initial) {
      try {
        if (typeof native.set === 'function') {
          native.set(initial);
        } else {
          native.editor?.setValue?.(initial);
        }
      } catch (err) {
        console.error('[rememo] 设置初始内容失败', err);
      }
    }

    return () => {
      bridgeActiveEditor(false);
      nativeRef.current = null;
      viewRef.current = null;
      cbRef.current.get = undefined;
      try {
        native.unload?.();
      } catch (err) {
        console.error('[rememo] 原生编辑器卸载异常', err);
      }
    };
    // 只在挂载时建一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      get element(): HTMLElement {
        return viewRef.current?.dom ?? mountRef.current ?? document.createElement('div');
      },
      get contentEl(): HTMLElement {
        return (viewRef.current?.contentDOM as HTMLElement) ?? document.createElement('div');
      },
      focus: () => {
        if (FocusOnEditor) {
          viewRef.current?.focus();
        }
      },
      insertText: (rawText: string) => {
        const view = viewRef.current;
        if (!view) return;
        const sel = view.state.selection.main;
        view.dispatch({
          changes: { from: sel.from, to: sel.from, insert: rawText },
          selection: { anchor: sel.from + rawText.length },
        });
        view.focus();
      },
      setContent: (text: string) => {
        const view = viewRef.current;
        if (!view) return;
        if (text === view.state.doc.toString()) return;
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: text ?? '' },
          selection: { anchor: text?.length ?? 0 },
        });
      },
      getContent: (): string => {
        return viewRef.current?.state.doc.toString() ?? '';
      },
      clear: () => {
        const cm = viewRef.current;
        if (!cm) return;
        if (extRef.current.length > 0) {
          // 重建 state：undo 历史随重建一起清掉——发送后 Ctrl+Z 不应复活旧文（旧 dispatch
          // 清空会被原生 undo 拉回，造成输入框残留旧文 + 状态失步）；setState 不受 readOnly 拦
          cm.setState(EditorState.create({ doc: '', extensions: extRef.current }));
        } else if (cm.state.doc.length > 0) {
          cm.dispatch({ changes: { from: 0, to: cm.state.doc.length, insert: '' } });
        }
        setHasContent(false);
      },
      setEditable: (editable: boolean) => {
        const view = viewRef.current;
        if (!view) return;
        view.dispatch({
          effects: roCompartmentRef.current.reconfigure(
            editable ? [] : EditorState.readOnly.of(true),
          ),
        });
      },
      toggleHashAtCursor: () => {
        const view = viewRef.current;
        if (!view) return;
        const head = view.state.selection.main.head;
        const prev = head > 0 ? view.state.doc.sliceString(head - 1, head) : '';
        if (prev === '#') {
          view.dispatch({ changes: { from: head - 1, to: head, insert: '' } });
        } else {
          view.dispatch({
            changes: { from: head, to: head, insert: '#' },
            selection: { anchor: head + 1 },
          });
        }
        view.focus();
      },
    }),
    [],
  );

  const handleCommonConfirmBtnClick = () => {
    // 发送前与旧实现一致：以编辑器当前文档为准（编辑器为唯一真相源，缓存由 change 回调维护）
    const content = viewRef.current?.state.doc.toString() ?? '';
    handleConfirmBtnClickCallback(content);
  };

  const handleCommonCancelBtnClick = () => {
    handleCancelBtnClickCallback();
  };

  return (
    <div className={'common-editor-wrapper ' + className}>
      <div className="cm-host" ref={mountRef} />
      <div className="common-tools-wrapper">
        <div className="common-tools-container">
          <Only when={props.tools !== undefined}>{props.tools}</Only>
        </div>
        <div className="btns-container">
          <Only when={showCancelBtn}>
            <button className="action-btn cancel-btn" onClick={handleCommonCancelBtnClick}>
              {t('CANCEL EDIT')}
            </button>
          </Only>
          <Only when={showConfirmBtn}>
            <button
              className="action-btn confirm-btn"
              disabled={!hasContent}
              onClick={handleCommonConfirmBtnClick}
              title="Send"
            >
              <SendIcon className="icon-img" />
            </button>
          </Only>
        </div>
      </div>
    </div>
  );
});

export default Editor;
