import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Compartment, EditorState } from '@codemirror/state';
import type { Extension } from '@codemirror/state';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import { completionStatus } from '@codemirror/autocomplete';
import { memoInputHighlight } from '../../editor/highlight';
import { getNativeMarkdownEditorClass } from '../../editor/native';
import { attachKeyCapture } from '../../editor/capture';
import appStore from '../../stores/appStore';
import '../../less/editor.less';
import { FocusOnEditor } from '../../memos';
import SendIcon from '../../icons/send.svg?component';
import { t } from '../../translations/helper';
import Only from '../common/OnlyWhen';

/**
 * memo 主输入（P2 定稿：Obsidian 原生 MarkdownEditor 嵌入 + 纯外层 DOM 控制）。
 *
 * 架构（2026-09-05 探针实测定稿）：
 * - 内核 embed/裸编辑器的生效 state 不吃任何 buildLocalExtensions 返回值
 *   （覆写/原型 patch/onUpdate 均不可靠）→ 控制权全部放在编辑器之外：
 *   * 变更回调 = contentDOM 的 input 事件（DOM 通道，驱动发送按钮可用态/缓存）
 *   * activeEditor 桥 = contentDOM focus/blur（Obsidian 编辑器命令路由到本输入）
 *   * 键盘 = contentDOM keydown（纯 Enter 发送模式）+ window capture 兜底
 *     （Ctrl/Cmd+Enter：Obsidian window capture 吞命中命令的 Mod 键，75b16ec 机制）
 *   * 编辑器挂进插件组件树（plugin.addChild，kanban 同款生命周期）
 * - 观感扩展（换行/高亮/联想/占位）走 cm6 官方 StateEffect.appendConfig 注入
 *   生效 state；addChild 的 load 链可能异步重建 state 抹掉注入 → 立即注入全量 +
 *   延迟补注 lineWrapping/高亮（facet/装饰类重复追加安全）
 * - removeHighlights 实例遮蔽：裸编辑器 state 无搜索高亮 field，点击/Esc 会崩
 * - readOnly 锁（发送后发射前）走 roCompartment（随 buildLocalExtensions 尝试，
 *   兜底由外层置 contenteditable 不可编辑）
 */

// ===== 诊断区已移除(2026-09-05 正门方案):反编译确认最终 state 由首次 set() 构建,
// cmInit=false → getLocalExtensions() → buildLocalExtensions()(覆写正门)→
// EditorState.create → cm.setState。见 P2-INVESTIGATION.md §7。=====

export interface EditorRefActions {
  element: HTMLElement;
  contentEl: HTMLElement;
  focus: FunctionType;
  insertText: (text: string) => void;
  setContent: (text: string) => void;
  getContent: () => string;
  clear: () => void;
  setEditable: (editable: boolean) => void;
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
  const viewRef = useRef<EditorView | null>(null);
  const nativeRef = useRef<any>(null);
  const roCompartmentRef = useRef(new Compartment());
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

    // file 上下文（2026-09-05 定案）：Obsidian 内建文件/标签联想 = 内核 editorSuggest
    // 通道（buildLocalExtensions 内核原版 updateEvent 触发），条件含 editor+file。
    // 此前 file=null 原生联想不工作才自喂 suggest；挂 dev 库真实文件后原生联想可用
    // （kanban 同款），自产 suggest 退役。
    const contextFile: any = app?.vault?.getMarkdownFiles?.()?.[0] ?? null;
    const controller = {
      app,
      syncScroll: () => undefined, // 内核滚动处理调 owner.syncScroll（缺了会 TypeError）
      getMode: () => 'source',
      showSearch: () => undefined,
      toggleMode: () => undefined,
      onMarkdownScroll: () => undefined,
      scroll: 0,
      editMode: null,
      get file() {
        return contextFile;
      },
      get path() {
        return contextFile?.path ?? '';
      },
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
    const sendFrom = (view: EditorView) => {
      cbRef.current.confirm(view.state.doc.toString());
    };

    class MemoNativeEditor extends NativeEditor {
      constructor(...args: any[]) {
        super(...args);
      }

      buildLocalExtensions(): Extension[] {
        // 正门(2026-09-05 反编译定案):最终 state 由首次 set() 构建,扩展 =
        // [getLocalExtensions()(=buildLocalExtensions 覆写,缓存), dynamic, RJ]。
        // 必须 super 保留内核原版(updateEvent/onUpdate/联想触发等都在里面)。
        const exts: Extension[] = super.buildLocalExtensions?.() ?? [];
        exts.push(
          // 换行:内核主编辑器的 lineWrapping 由更外层注入,裸实例不自带——这里补
          EditorView.lineWrapping,
          placeholder(cbRef.current.placeholder),
          memoInputHighlight,
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
        return exts;
      }

      onUpdate(update: any, changed: boolean) {
        super.onUpdate?.(update, changed);
        if (update?.docChanged) {
          const text = update.state.doc.toString();
          setHasContent(text.length > 0);
          cbRef.current.change(text);
        }
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

    // kanban 同款生命周期：把编辑器挂进插件组件树（addChild → 内核完整 load 链）。
    // 这是与 kanban 接入方式最后未验证的差异（kanban: plugin.addChild(editor)）。
    const plugin: any = app?.plugins?.plugins?.['rememo'];
    let addedToPlugin = false;
    if (plugin && typeof plugin.addChild === 'function') {
      try {
        plugin.addChild(native);
        addedToPlugin = true;
      } catch (err) {
        console.error('[rememo] addChild 失败', err);
      }
    } else {
    }

    const cm: EditorView | undefined = native.cm; // addChild/load 后重取
    if (!cm) {
      console.error('[rememo] 原生实例无 .cm（内核结构变动？）');
      parent.textContent = '[rememo] editor init failed (see console)';
      return;
    }

    // 遮蔽内核"搜索高亮"方法：该功能的 StateField 由主编辑器外层注入，裸编辑器 state
    // 没有；内核点击（onViewClick）与 Esc 会调 removeHighlights → 读缺失 field →
    // RangeError（实测崩输入）。memo 输入无搜索高亮，实例级 no-op 遮蔽。
    const editorWrapper = native.editor;
    if (editorWrapper && typeof editorWrapper.removeHighlights === 'function') {
      editorWrapper.removeHighlights = () => undefined;
      editorWrapper.hasHighlight = () => false;
    }
    viewRef.current = cm;
    cbRef.current.get = () => cm.state.doc.toString();

    // ---- appendConfig 注入观感扩展（cm6 官方通道，直接追加进当前生效 state；
    // buildLocalExtensions 通道已证不可靠）。addChild 的 load 链可能异步重建 state
    // 抹掉注入（换行曾随机丢失）→ 立即注入全量 + 延迟补注 lineWrapping/高亮
    // （两者为 facet/装饰类扩展，重复追加安全；联想/占位保持单份防重复冲突）----
    // ---- 正门初始化：无条件首设 set()（空串也调）→ 触发 cmInit=false 分支：
    // EditorState.create 用 [getLocalExtensions()=buildLocalExtensions 覆写, dynamic,
    // RJ] 建立最终 state（2026-09-05 反编译定案，见 P2-INVESTIGATION.md §7）。
    // 此前 initial 为空时不调 set() → 覆写从未进 state（探针全对的根因）。
    const initial = initialContent ?? '';
    try {
      if (typeof native.set === 'function') {
        native.set(initial);
      } else if (initial) {
        native.editor?.setValue?.(initial);
      }
    } catch (err) {
      console.error('[rememo] 设置初始内容失败', err);
    }

    // ---- 输入变更检测（DOM 通道，不依赖内核扩展）：contenteditable 的 input 事件
    // 在用户打字/粘贴/删除时必然触发 → 驱动发送按钮可用态与内容缓存 ----
    const onDomInput = () => {
      const text = cm.state.doc.toString();
      setHasContent(text.length > 0);
      cbRef.current.change(text);
    };
    cm.contentDOM?.addEventListener('input', onDomInput);

    // ---- activeEditor 桥（DOM 通道）：聚焦把本实例接为 activeEditor → Obsidian
    // 编辑器命令（Mod-B/I/E、任务切换等）路由到 memo 输入而非主编辑器 ----
    const onDomFocus = () => {
      bridgeActiveEditor(true);
    };
    const onDomBlur = () => bridgeActiveEditor(false);
    cm.contentDOM?.addEventListener('focus', onDomFocus);
    cm.contentDOM?.addEventListener('blur', onDomBlur);

    // Mod 组合键兜底：Obsidian window capture 会吞命中其命令的 Mod 键（Ctrl+Enter
    // 勾选任务等）→ window 层 capture 拦截执行发送/换行（75b16ec 验证过的机制）
    const detachCapture = attachKeyCapture(cm, [
      {
        match: (e) => !e.shiftKey && (e.ctrlKey || e.metaKey) && !e.altKey && e.key === 'Enter',
        run: (view) => {
          if (cbRef.current.enterToSend) {
            // 发送模式：Ctrl+Enter = 单行换行
            const head = view.state.selection.main.head;
            view.dispatch({
              changes: { from: head, to: head, insert: '\n' },
              selection: { anchor: head + 1 },
            });
          } else {
            sendFrom(view);
          }
        },
      },
    ]);

    return () => {
      detachCapture();
      cm.contentDOM?.removeEventListener('input', onDomInput);
      cm.contentDOM?.removeEventListener('focus', onDomFocus);
      cm.contentDOM?.removeEventListener('blur', onDomBlur);
      bridgeActiveEditor(false);
      nativeRef.current = null;
      viewRef.current = null;
      cbRef.current.get = undefined;
      if (addedToPlugin && typeof plugin?.removeChild === 'function') {
        try {
          plugin.removeChild(native);
        } catch (err) {
          console.error('[rememo] removeChild 卸载异常', err);
        }
      } else {
        try {
          native.unload?.();
        } catch (err) {
          console.error('[rememo] 原生编辑器卸载异常', err);
        }
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
        const view = viewRef.current;
        if (!view) return;
        if (view.state.doc.length > 0) {
          // 只用 dispatch 清空——setState 重建 state 会丢内核私有 StateField
          // （RangeError: Field is not present，实测崩输入）
          view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: '' } });
        }
        setHasContent(false);
        // 注：dispatch 清空后 Ctrl+Z 仍可撤销回旧文（undo 历史无法安全清空，已知小瑕疵）
      },
      setEditable: (editable: boolean) => {
        const view = viewRef.current;
        if (!view) return;
        try {
          view.dispatch({
            effects: roCompartmentRef.current.reconfigure(
              editable ? [] : EditorState.readOnly.of(true),
            ),
          });
        } catch {
          // compartment 不在生效 state（构建路径差异）时退回 DOM 锁
          const el = view.contentDOM as HTMLElement | undefined;
          if (el) el.contentEditable = editable ? 'true' : 'false';
        }
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
      <div
        className={'cm-host' + (hasContent ? '' : ' is-empty')}
        data-placeholder={placeholderText}
        ref={mountRef}
      />
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
