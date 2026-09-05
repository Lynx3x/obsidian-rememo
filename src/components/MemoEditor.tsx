import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import appContext from '../stores/appContext';
import { dailyNotesService, globalStateService, locationService, memoService, resourceService } from '../services';
import utils from '../helpers/utils';
import { storage } from '../helpers/storage';
import Editor, { EditorRefActions } from './Editor/Editor';
import '../less/memo-editor.less';
import '../less/memo-write-date.less';
import Tag from '../icons/tag.svg?component';
import ImageSvg from '../icons/image.svg?component';
import JournalSvg from '../icons/journal.svg?component';
import TaskSvg from '../icons/checkbox-active.svg?component';
import CalendarSvg from '../icons/calendar.svg?component';
import showEditorSvg from '../icons/show-editor.svg';
import useState from 'react-usestateref';
import WriteDatePopover from './common/WriteDatePopover';
import { moment, Notice, Platform } from 'obsidian';
import useToggle from '../hooks/useToggle';
import { MEMOS_VIEW_TYPE } from '../constants';
import { t } from '../translations/helper';

interface Props {}

let isList: boolean;
let isEditor = false as boolean;
let isEditorGo = false as boolean;

// 发送前"蓄力压缩"时序（毫秒）：
// 压缩到低点并保持到 SQUASH_LAUNCH_MS，随后瞬间回弹；此刻 pushMemo 触发卡片发射。
const SQUASH_TOTAL_MS = 130;
const SQUASH_LAUNCH_MS = 90;

const MemoEditor: React.FC<Props> = () => {
  const { globalState } = useContext(appContext);
  const {
    settingsState: { settings },
  } = useContext(appContext);
  const { DefaultEditorLocation, DefaultPrefix, FocusOnEditor, UseButtonToShowEditor, EnterToSend } = settings;
  const { app } = dailyNotesService.getState();

  const [isListShown, toggleList] = useToggle(false);
  const [isEditorShown, toggleEditor] = useState(false);

  const editorRef = useRef<EditorRefActions>(null);
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);
  const skipNextFocusRef = useRef(false);
  const prevGlobalStateRef = useRef(globalState);

  // 指定日期写入：targetDate = 发送时的写入目标（moment）；null = 写"现在/今天"
  // 用 usestateref 的 ref 保持空依赖回调（handleSaveBtnClick）能读到最新值
  const [targetDate, setTargetDate, targetDateRef] = useState<moment.Moment | null>(null);
  const [isWriteDateOpen, setIsWriteDateOpen] = useState(false);
  const [calAnchor, setCalAnchor] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    if (DefaultPrefix === 'List') {
      isList = false;
      toggleList(false);
    } else {
      isList = true;
      toggleList(true);
    }

    isEditor = false;

    // editorRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const leaves = app.workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
    let memosWidth;
    // let leafView;

    if (leaves.length > 0) {
      const leaf = leaves[0];
      // leafView = leaf.view.containerEl;
      memosWidth = leaf.width > 0 ? leaf.width : window.outerWidth;
    } else {
      // leafView = document;
      memosWidth = window.outerWidth;
    }

    if ((Platform.isMobile === true || memosWidth < 875) && UseButtonToShowEditor) {
      // if (isEditorGo === false) {
      toggleEditor(true);
      // }
    }

    if (FocusOnEditor) {
      editorRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    if (
      UseButtonToShowEditor === true &&
      DefaultEditorLocation === 'Bottom' &&
      Platform.isMobile === true &&
      window.innerWidth < 875
    ) {
      const leaves = app.workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
      let memosHeight;
      let leafView;
      if (leaves.length > 0) {
        const leaf = leaves[0];
        leafView = leaf.view.containerEl;
        memosHeight = leafView.offsetHeight;
      } else {
        leafView = document;
        memosHeight = window.innerHeight;
      }

      const divThis = document.createElement('img');
      const memoEditorDiv = leafView.querySelector(
        "div[data-type='memos_view'] .view-content .memo-editor-wrapper",
      ) as HTMLElement;
      divThis.src = `${showEditorSvg}`;
      if (isEditorShown) {
        divThis.className = 'memo-show-editor-button hidden';
      } else {
        divThis.className = 'memo-show-editor-button';
      }
      const buttonTop = memosHeight - 200;
      const buttonLeft = window.innerWidth / 2 - 25;
      divThis.style.top = buttonTop + 'px';
      divThis.style.left = buttonLeft + 'px';

      divThis.onclick = function () {
        const scaleElementAni = divThis.animate(
          [
            // keyframes
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(60deg) scale(1.5)' },
          ],
          {
            // timing options
            duration: 300,
            iterations: Infinity,
          },
        );

        setTimeout(() => {
          divThis.className = 'memo-show-editor-button hidden';
          if (isEditor) {
            handleShowEditor(false);
            editorRef.current?.focus();
            scaleElementAni.reverse();
            // return;
          } else {
            handleShowEditor();
            editorRef.current?.focus();
            scaleElementAni.reverse();
          }

          // rotateElementAni.pause();
        }, 300);
      };
      leafView.querySelector('.content-wrapper').prepend(divThis);

      const memolistScroll = leafView.querySelector('.memolist-wrapper') as HTMLElement;
      memolistScroll.onscroll = function () {
        if (isEditor && !isEditorGo) {
          isEditorGo = true;
          const scaleEditorElementAni = memoEditorDiv.animate(
            [
              // keyframes
              { transform: 'scale(1)', opacity: 1 },
              { transform: 'scale(0.4)', opacity: 0 },
            ],
            {
              // timing options
              duration: 300,
              iterations: 1,
            },
          );
          let scaleOneElementAni: Animation;
          setTimeout(() => {
            scaleOneElementAni = divThis.animate(
              [
                // keyframes
                { transform: 'rotate(20deg) scale(1.5)' },
                { transform: 'rotate(0deg) scale(1)' },
              ],
              {
                // timing options
                duration: 100,
                iterations: 1,
              },
            );
          }, 300);
          setTimeout(() => {
            handleShowEditor(true);
            divThis.className = 'memo-show-editor-button';
          }, 300);
          setTimeout(() => {
            scaleOneElementAni.cancel();
            scaleEditorElementAni.reverse();
          }, 700);
        }
      };
    } else if (
      UseButtonToShowEditor === false &&
      DefaultEditorLocation === 'Bottom' &&
      Platform.isMobile === true &&
      window.innerWidth < 875
    ) {
      handleShowEditor(false);
      if (FocusOnEditor) {
        editorRef.current?.focus();
      }
    } else {
      if (!isEditor) {
        handleShowEditor(false);
      }
      if (FocusOnEditor) {
        editorRef.current?.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (globalState.markMemoId) {
      const editorCurrentValue = editorRef.current?.getContent();
      const memoLinkText = `${editorCurrentValue ? '\n' : ''}${t('MARK')}: [@MEMO](${globalState.markMemoId})`;
      editorRef.current?.insertText(memoLinkText);
      globalStateService.setMarkMemoId('');
    }

    if (globalState.editMemoId && globalState.editMemoId !== prevGlobalStateRef.current.editMemoId) {
      const editMemo = memoService.getMemoById(globalState.editMemoId);
      if (editMemo) {
        // 新格式正文即真实换行文本（旧 <br> 编码仅存量数据，渲染端解码；此处直用）
        editorRef.current?.setContent(editMemo.content ?? '');
        editorRef.current?.focus();
      }
    }

    prevGlobalStateRef.current = globalState;
  }, [globalState.markMemoId, globalState.editMemoId]);

  // 粘贴/拖放图片上传：挂在 cm 内容 DOM 上（内容变化缓存同步已由 cm updateListener
  // → onContentChange 承担，不再需要 click/keydown 轮询——旧实现还因此泄漏监听）
  useEffect(() => {
    const el = editorRef.current?.contentEl;
    if (!el) {
      return;
    }

    const handlePasteEvent = async (event: ClipboardEvent) => {
      if (event.clipboardData && event.clipboardData.files.length > 0) {
        event.preventDefault();
        const file = event.clipboardData.files[0];
        const url = await handleUploadFile(file);
        if (url) {
          editorRef.current?.insertText(url);
        }
      }
    };

    const handleDropEvent = async (event: DragEvent) => {
      if (event.dataTransfer && event.dataTransfer.files.length > 0) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const url = await handleUploadFile(file);
        if (url) {
          editorRef.current?.insertText(url);
        }
      }
    };

    el.addEventListener('paste', handlePasteEvent);
    el.addEventListener('drop', handleDropEvent);

    return () => {
      el.removeEventListener('paste', handlePasteEvent);
      el.removeEventListener('drop', handleDropEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUploadFile = useCallback(async (file: File) => {
    const { type } = file;

    if (!type.startsWith('image')) {
      return;
    }

    try {
      const image = await resourceService.upload(file);
      return `${image}`;
    } catch (error: any) {
      new Notice(error);
    }
  }, []);

  // 发送前“蓄力”：整体往上缩（origin 顶部，底缘上收）→ 停住 → 发射点瞬间回弹（向下弹出卡片）
  const squashEditor = () => {
    const el = editorWrapperRef.current;
    if (!el) {
      return;
    }
    el.style.transformOrigin = '50% 0%';
    const anim = el.animate(
      [
        // 0%：原状；~28%：压到低点；28%→70%：保持压缩（蓄力）
        // 70%→76%：瞬间回弹；之后静止。SQUASH_LAUNCH_MS(≈70%) 时刻 pushMemo → 发射
        { transform: 'scale(1, 1)', offset: 0, easing: 'cubic-bezier(0.33, 1, 0.68, 1)' },
        { transform: 'scale(1, 0.94)', offset: 0.28 },
        { transform: 'scale(1, 0.94)', offset: 0.7 },
        { transform: 'scale(1, 1)', offset: 0.76 },
        { transform: 'scale(1, 1)', offset: 1 },
      ],
      { duration: SQUASH_TOTAL_MS },
    );
    anim.onfinish = () => {
      anim.cancel();
      el.style.transformOrigin = '';
    };
  };

  const handleSaveBtnClick = useCallback(async (content: string) => {
    if (content === '') {
      new Notice(t('Content cannot be empty'));
      return;
    }
    if (sendingRef.current) {
      return;
    }

    const { editMemoId } = globalStateService.getState();
    content = content.replaceAll('&nbsp;', ' ');

    // 清空输入框并解锁：编辑态立即；新建态由"发射"那一刻调用，让文字随卡片一起"起飞"
    const finishSend = () => {
      editorRef.current?.clear();
      editorRef.current?.setEditable(true);
      setEditorContentCache('');
      sendingRef.current = false;
    };

    try {
      if (editMemoId) {
        // 编辑态：立即清空（无需蓄力动画）
        setEditorContentCache('');
        const prevMemo = memoService.getMemoById(editMemoId);
        // 编辑保存 = 正文原样写回；^id 留在头行由写入端定位，不拼进正文（防旧格式 ^id 重复累积）
        if (prevMemo && prevMemo.content !== content.replace(/\n+$/, '')) {
          const editedMemo = await memoService.updateMemo({
            memoId: prevMemo.id,
            text: content,
            type: prevMemo.memoType,
            path: prevMemo.path,
            hasId: prevMemo.hasId,
          });
          editedMemo.updatedAt = utils.getDateTimeString(Date.now());
          memoService.editMemo(editedMemo);
        }
        globalStateService.setEditMemoId('');
        finishSend();
      } else {
        // 新建态：先锁定输入 + 蓄力压缩（文字保留），memo 落盘后到点再清空并发射
        sendingRef.current = true;
        editorRef.current?.setEditable(false);
        const target = targetDateRef.current;
        // 发射即归一：去掉整段行首空白，保证"此刻显示的卡片"与"之后 vault 重读"完全一致，
        // 避免 memo 已存在一会儿后再被 trim 造成二次变化（抖动）。
        const sendContent = content.trimStart();
        const squashStart = Date.now();
        squashEditor();
        const newMemo = await memoService.createMemo(sendContent, isList, target ?? undefined);
        const remaining = Math.max(0, SQUASH_LAUNCH_MS - (Date.now() - squashStart));
        window.setTimeout(() => {
          finishSend();
          memoService.pushMemo(newMemo);
          // memoService.fetchAllMemos();
          locationService.clearQuery();
        }, remaining);
      }
    } catch (error: any) {
      sendingRef.current = false;
      editorRef.current?.setEditable(true);
      new Notice(error.message);
    }
  }, []);

  const handleCancelBtnClick = useCallback(() => {
    globalStateService.setEditMemoId('');
    // 取消编辑不要自动聚焦回输入框（setContent 里的 handleContentChange 会排一个 focus）
    skipNextFocusRef.current = true;
    editorRef.current?.setContent('');
    setEditorContentCache('');
    editorRef.current?.contentEl?.blur();
  }, []);

  const handleContentChange = useCallback((content: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    if (tempDiv.innerText.trim() === '') {
      content = '';
    }
    setEditorContentCache(content);

    if (!editorRef.current) {
      return;
    }

    setTimeout(() => {
      // 取消编辑等场景要跳过这次自动聚焦（否则刚 blur 又被 focus 回来）
      if (skipNextFocusRef.current) {
        skipNextFocusRef.current = false;
        return;
      }
      editorRef.current?.focus();
    });
  }, []);

  // Toggle List OR TASK
  const handleChangeStatus = () => {
    if (!editorRef.current) {
      return;
    }

    if (isList) {
      isList = false;
      toggleList(false);
    } else {
      isList = true;
      toggleList(true);
    }
  };

  const handleShowEditor = (flag?: boolean) => {
    if (!editorRef.current) {
      return;
    }

    // Use flag to toggle editor show/hide
    if (isEditor || flag === true) {
      isEditor = false;
      toggleEditor(true);
    } else {
      isEditor = true;
      isEditorGo = false;
      toggleEditor(false);
    }
  };

  const handleTagTextBtnClick = useCallback(() => {
    // # 标签按钮：光标处切换插/删一个 '#'
    editorRef.current?.toggleHashAtCursor();
  }, []);

  const handleUploadFileBtnClick = useCallback(() => {
    const inputEl = document.createElement('input');
    document.body.appendChild(inputEl);
    inputEl.type = 'file';
    inputEl.multiple = false;
    inputEl.accept = 'image/png, image/gif, image/jpeg';
    inputEl.onchange = async () => {
      if (!inputEl.files || inputEl.files.length === 0) {
        return;
      }

      const file = inputEl.files[0];
      const url = await handleUploadFile(file);
      if (url) {
        editorRef.current?.insertText(url);
      }
      document.body.removeChild(inputEl);
    };
    inputEl.click();
  }, []);

  const showEditStatus = Boolean(globalState.editMemoId);

  // 指定日期写入：目标 chip 的打开/清除
  const toggleWriteDateOpen = () => setIsWriteDateOpen((v: boolean) => !v);
  const handleClearTargetDate = () => {
    setTargetDate(null);
    setIsWriteDateOpen(false);
  };

  const editorConfig = useMemo(
    () => ({
      className: 'memo-editor',
      initialContent: getEditorContentCache(),
      placeholder: t('What do you think now...'),
      showConfirmBtn: true,
      showCancelBtn: showEditStatus,
      showTools: true,
      enterToSend: EnterToSend === true,
      onConfirmBtnClick: handleSaveBtnClick,
      onCancelBtnClick: handleCancelBtnClick,
      onContentChange: handleContentChange,
    }),
    [showEditStatus, EnterToSend],
  );

  return (
    <div
      ref={editorWrapperRef}
      className={`memo-editor-wrapper ${showEditStatus ? 'edit-ing' : ''} ${isEditorShown ? 'hidden' : ''}`}
    >
      <p className={`tip-text ${showEditStatus ? '' : 'hidden'}`}>Modifying...</p>
      <Editor
        ref={editorRef}
        {...editorConfig}
        tools={
          <>
            {!showEditStatus && (
              <span
                ref={setCalAnchor}
                className={`memo-write-date-anchor ${isWriteDateOpen ? 'active' : ''}`}
                title={t('Write to date')}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWriteDateOpen();
                }}
              >
                <CalendarSvg className="action-btn write-date" />
              </span>
            )}
            {/*<img className="action-btn add-tag" src={tag}  />*/}
            <Tag className="action-btn add-tag" onClick={handleTagTextBtnClick} />
            {/*<img className="action-btn file-upload" src={imageSvg} onClick={handleUploadFileBtnClick} />*/}
            <ImageSvg className="action-btn file-upload" onClick={handleUploadFileBtnClick} />
            {/*<img*/}
            {/*  className="action-btn list-or-task"*/}
            {/*  src={`${!isListShown ? journalSvg : taskSvg}`}*/}
            {/*  onClick={handleChangeStatus}*/}
            {/*/>*/}
            {!isListShown ? (
              <JournalSvg className="action-btn list-or-task" onClick={handleChangeStatus} />
            ) : (
              <TaskSvg className="action-btn list-or-task" onClick={handleChangeStatus} />
            )}
            {/* <img className={`action-btn ${isListShown ? "" : "hidden"}`} src={taskSvg} onClick={handleChangeStatus} /> */}
          </>
        }
      />
      {!showEditStatus && targetDate && (
        <div className="memo-write-date-target" onClick={toggleWriteDateOpen}>
          <CalendarSvg className="icon-img" />
          <span className="target-text">
            {t('Write on')} {targetDate.format('YYYY-MM-DD HH:mm')}
          </span>
          <span
            className="target-clear"
            title={t('Back to now')}
            onClick={(e) => {
              e.stopPropagation();
              handleClearTargetDate();
            }}
          >
            ✕
          </span>
        </div>
      )}
      {isWriteDateOpen && (
        <WriteDatePopover
          anchorEl={calAnchor}
          value={targetDate}
          onSet={setTargetDate}
          onClear={handleClearTargetDate}
          onClose={() => setIsWriteDateOpen(false)}
        />
      )}
    </div>
  );
};

function getEditorContentCache(): string {
  return storage.get(['editorContentCache']).editorContentCache ?? '';
}

function setEditorContentCache(content: string) {
  storage.set({
    editorContentCache: content,
  });
}

export default MemoEditor;
