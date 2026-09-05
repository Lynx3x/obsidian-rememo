import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Compartment, EditorState } from '@codemirror/state';
import type { Extension } from '@codemirror/state';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { memoInputKeymap } from '../../editor/keys';
import { memoAutocomplete } from '../../editor/suggest';
import { memoInputHighlight } from '../../editor/highlight';
import '../../less/editor.less';
import { FocusOnEditor } from '../../memos';
import SendIcon from '../../icons/send.svg?component';
import { t } from '../../translations/helper';
import Only from '../common/OnlyWhen';

/**
 * memo 主输入（P2：CodeMirror 6 迷你 EditorView，替代 rta textarea）。
 * 外层壳（.common-editor-wrapper + tools）与 props 契约保持，内层全换：
 *  - 列表/任务回车续行、Ctrl/Cmd+Enter 发送（keys.ts）
 *  - `#` 标签 / `[[` 文件联想（suggest.ts，复用 obTag/FileSuggester 数据源）
 *  - 轻量行内高亮（highlight.ts）+ 原生 history（commands）
 *  - 高度自适应走 CSS；readOnly 用 Compartment 动态开关
 * rta 弹层与 tiny-undo 已退役。
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
  /** 清空输入（重建 state 同时清空 undo 历史——发送后不该能撤销回旧文） */
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
  } = props;

  const mountRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const roCompartmentRef = useRef(new Compartment());
  const extRef = useRef<Extension[]>([]);
  // 动态回调经 ref 转发（扩展实例只建一次）
  const cbRef = useRef<{
    confirm: (content: string) => void;
    change: (content: string) => void;
    placeholder: string;
    get?: () => string;
  }>({
    confirm: handleConfirmBtnClickCallback,
    change: handleContentChangeCallback,
    placeholder: placeholderText,
  });
  cbRef.current.confirm = handleConfirmBtnClickCallback;
  cbRef.current.change = handleContentChangeCallback;
  cbRef.current.placeholder = placeholderText;

  // 发送键可用态（仅空内容时禁用确认钮，与旧 textarea disabled 语义一致）
  const [hasContent, setHasContent] = useState(() => initialContent.length > 0);

  useEffect(() => {
    const parent = mountRef.current;
    if (!parent || parent.querySelector('.cm-editor')) {
      return;
    }
    const buildExtensions = (): Extension[] => [
      EditorView.lineWrapping,
      history(),
      placeholder(cbRef.current.placeholder),
      memoInputHighlight,
      memoAutocomplete(),
      memoInputKeymap(() => cbRef.current.confirm(cbRef.current.get?.() ?? '')),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      roCompartmentRef.current.of([]),
      EditorView.updateListener.of((u) => {
        if (u.docChanged) {
          const text = u.state.doc.toString();
          setHasContent(text.length > 0);
          cbRef.current.change(text);
        }
      }),
    ];
    const createState = (doc: string): EditorState =>
      EditorState.create({ doc, extensions: buildExtensions() });

    extRef.current = buildExtensions();
    const view = new EditorView({
      state: createState(initialContent ?? ''),
      parent,
    });
    viewRef.current = view;
    cbRef.current.get = () => view.state.doc.toString();

    return () => {
      view.destroy();
      viewRef.current = null;
      cbRef.current.get = undefined;
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
        const view = viewRef.current;
        if (!view) return;
        // 重建 state：同时清掉 undo 历史（发送后 Ctrl+Z 不应复活旧文）
        view.setState(EditorState.create({ doc: '', extensions: extRef.current }));
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
