import React, { memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import {
  FIRST_TAG_REG,
  IMAGE_URL_REG,
  LINK_REG,
  MARKDOWN_URL_REG,
  MD_LINK_REG,
  MEMO_LINK_REG,
  TAG_REG,
  WIKI_IMAGE_URL_REG,
} from '../helpers/consts';
import useState from 'react-usestateref';
import { encodeHtml, parseMarkedToHtml, parseRawTextToHtml } from '../helpers/marked';
import utils, { getDailyNoteFormat } from '../helpers/utils';
import useToggle from '../hooks/useToggle';
import { globalStateService, memoService, resourceService } from '../services';
import showMemoCardDialog from './MemoCardDialog';
import showShareMemoImageDialog from './ShareMemoImageDialog';
import '../less/memo.less';
import { moment, Notice, Platform } from 'obsidian';
import { showMemoInDailyNotes } from '../obComponents/obShowMemo';
import More from '../icons/more.svg?component';
import Comment from '../icons/comment.svg?component';
import TaskBlank from '../icons/task-blank.svg?component';
import Task from '../icons/task.svg?component';
import { t } from '../translations/helper';
import Editor, { EditorRefActions } from './Editor/Editor';
import MemoImage from './MemoImage';
import appContext from '../stores/appContext';

// interface LinkedMemo extends FormattedMemo {
//   dateStr: string;
// }

interface Props {
  memo: Model.Memo;
}

// Get Current Memos And Change it

const Memo: React.FC<Props> = (props: Props) => {
  const { globalState } = useContext(appContext);
  const {
    settingsState: { settings },
  } = useContext(appContext);
  // 从响应式设置读取，替代全局变量
  const { DefaultEditorLocation, ShowCommentOnMemos, ShowTaskLabel, UseButtonToShowEditor } = settings;
  // 评论功能默认开启（统一写回原笔记缩进子项）
  const CommentOnMemos = true;
  const CommentsInOriginalNotes = false;
  const { memo: propsMemo } = props;
  const [showConfirmDeleteBtn, toggleConfirmDeleteBtn] = useToggle(false);
  const memoCommentRef = useRef<EditorRefActions>(null);
  const [isCommentShown, toggleComment] = useToggle(false);
  const [isCommentListShown, toggleCommentList] = useToggle(ShowCommentOnMemos);
  const [commentMemos, setCommentMemos, commentMemosRef] = useState<Model.Memo[]>([]);
  // 当前回复的目标（null = 回复 memo 本身；非 null = 回复某条评论）
  // 用 ref 避免 handleSaveBtnClick（空依赖 useCallback）闭包捕获旧值
  const [replyTo, setReplyTo] = useState<Model.Memo | null>(null);
  const replyToRef = useRef<Model.Memo | null>(null);
  const setReplyToBoth = useCallback((m: Model.Memo | null) => {
    replyToRef.current = m;
    setReplyTo(m);
  }, []);
  const [, setAddRandomIDflag, RandomIDRef] = useState(false);
  // const imageUrls = Array.from(memo.content.match(IMAGE_URL_REG) ?? []);

  useEffect(() => {
    if (!memoCommentRef.current) {
      return;
    }
    if (!CommentOnMemos) {
      return;
    }

    const fetchCommentMemos = async () => {
      // 评论已统一在 memos 中（linkId = 父 memo 的 hasId）
      const allCommentMemos = memoService
        .getState()
        .memos.filter((m) => m.linkId === propsMemo.hasId)
        .sort((a, b) => utils.getTimeStampByDate(b.createdAt) - utils.getTimeStampByDate(a.createdAt));
      setCommentMemos(allCommentMemos);
    };

    fetchCommentMemos();
  }, [propsMemo.content, propsMemo.id]);

  useEffect(() => {
    if (!memoCommentRef.current) {
      return;
    }

    // new TagsSuggest(app, memoCommentRef.current.element);

    const handlePasteEvent = async (event: ClipboardEvent) => {
      if (event.clipboardData && event.clipboardData.files.length > 0) {
        event.preventDefault();
        const file = event.clipboardData.files[0];
        const url = await handleUploadFile(file);
        if (url) {
          memoCommentRef.current?.insertText(url);
        }
      }
    };

    const handleDropEvent = async (event: DragEvent) => {
      if (event.dataTransfer && event.dataTransfer.files.length > 0) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const url = await handleUploadFile(file);
        if (url) {
          memoCommentRef.current?.insertText(url);
        }
      }
    };

    const handleClickEvent = () => {
      handleContentChange(memoCommentRef.current?.element.value ?? '');
    };

    const handleKeyDownEvent = () => {
      setTimeout(() => {
        handleContentChange(memoCommentRef.current?.element.value ?? '');
      });
    };

    memoCommentRef.current.element.addEventListener('paste', handlePasteEvent);
    memoCommentRef.current.element.addEventListener('drop', handleDropEvent);
    memoCommentRef.current.element.addEventListener('click', handleClickEvent);
    memoCommentRef.current.element.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      memoCommentRef.current?.element.removeEventListener('paste', handlePasteEvent);
      memoCommentRef.current?.element.removeEventListener('drop', handleDropEvent);
    };
  }, []);

  const handleCancelBtnClick = useCallback(() => {
    globalStateService.setCommentMemoId('');
    memoCommentRef.current?.setContent('');
    toggleComment(false);
    // setEditorContentCache('');
  }, []);

  const handleContentChange = useCallback((content: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    if (tempDiv.innerText.trim() === '') {
      content = '';
    }
    // setEditorContentCache(content);

    setTimeout(() => {
      memoCommentRef.current?.focus();
    });
  }, []);

  const handleSaveBtnClick = useCallback(async (content: string) => {
    if (content === '') {
      new Notice(t('Content cannot be empty'));
      return;
    }

    const { commentMemoId } = globalStateService.getState();
    content = content.replaceAll('&nbsp;', ' ');
    globalStateService.setChangedByMemos(true);
    try {
      if (commentMemoId) {
        memoCommentRef.current?.setContent('');
        const memo = memoService.getCommentMemoById(commentMemoId);

        if (!memo) {
          throw new Error('Memo not found');
        }

        const prevMemo = memo;
        content = content.trim();

        // console.log(m);

        if (prevMemo && prevMemo.content !== content) {
          const editedMemo = await memoService.updateMemo({
            memoId: prevMemo.id,
            originalText: prevMemo.content,
            text: content,
            type: prevMemo.memoType,
            path: prevMemo.path
          });
          memoService.editCommentMemo(editedMemo);

          setCommentMemos(
            commentMemosRef.current.map((m) => {
              // console.log(m);
              if (m.id.slice(14) === commentMemoId.slice(14) && m.path === prevMemo.path) {
                return editedMemo;
              }
              return m;
            }),
          );
        }

        globalStateService.setCommentMemoId('');
        toggleComment(false);
      } else {
        // 新增评论：父 = 当前回复目标（replyToRef）或 memo 本身
        const parent = replyToRef.current || propsMemo;
        let randomId = parent.hasId || '';

        // 父无持久 ^id 时生成（读取时会补写，此处兜底）
        if (!randomId) {
          randomId = Math.random().toString(36).slice(-6);
          setAddRandomIDflag(true);
        }

        memoCommentRef.current?.setContent('');

        // 评论统一写回原笔记（缩进子项，linkId = 父 ^id）
        const newMemo: Model.Memo = await memoService.createCommentMemo({
          text: content.trim(),
          isList: true,
          path: parent.path,
          ID: parent.id,
          hasID: randomId
        });
        memoService.pushCommentMemo(newMemo);
        // 刷新 memo 的直接子评论（子评论由树组件递归查）
        setCommentMemos(
          memoService
            .getState()
            .memos.filter((m) => m.linkId === propsMemo.hasId)
            .sort((a, b) => utils.getTimeStampByDate(b.createdAt) - utils.getTimeStampByDate(a.createdAt)),
        );
        setReplyToBoth(null);
        toggleComment(false);
        if (RandomIDRef.current) {
          const editedMemo = await memoService.updateMemo({
            memoId: parent.id,
            originalText: parent.content,
            text: parent.content + ' ^' + randomId,
            type: parent.memoType
          });
          editedMemo.updatedAt = utils.getDateTimeString(Date.now());
          memoService.editMemo(editedMemo);
          setAddRandomIDflag(false);
        }
      }
    } catch (error: any) {
      new Notice(error.message);
    }

    // globalStateService.setChangedByMemos(false);
    // setEditorContentCache('');
  }, []);

  const handleUploadFile = useCallback(async (file: File) => {
    const { type } = file;

    if (!type.startsWith('image')) {
      return;
    }

    try {
      const image = await resourceService.upload(file);
      const url = `${image}`;

      return url;
    } catch (error: any) {
      new Notice(error);
    }
  }, []);

  const handleShowMemoStoryDialog = () => {
    showMemoCardDialog(propsMemo);
  };

  const handleMarkMemoClick = () => {
    if (UseButtonToShowEditor && DefaultEditorLocation === 'Bottom') {
      const elem = document.querySelector(
        "div[data-type='memos_view'] .view-content .memo-show-editor-button",
      ) as HTMLElement;
      if (elem?.onclick) {
        (elem.onclick as EventListener).call(elem, new MouseEvent('click'));
      }
    }

    globalStateService.setMarkMemoId(propsMemo.id);
  };

  const handleEditMemoClick = () => {
    if (UseButtonToShowEditor && DefaultEditorLocation === 'Bottom' && Platform.isMobile) {
      const elem = document.querySelector(
        "div[data-type='memos_view'] .view-content .memo-show-editor-button",
      ) as HTMLElement;
      if (elem.onclick) {
        (elem.onclick as EventListener).call(elem, new MouseEvent('click'));
      }
    }

    globalStateService.setEditMemoId(propsMemo.id);
  };

  const handleSourceMemoClick = (m: Model.Memo) => {
    showMemoInDailyNotes(m.id, m.path || '');
  };

  // const handleCreateNewNoteClick = () => {
  //   turnIntoNote(memo.id);
  // };

  const handleDeleteMemoClick = async () => {
    if (showConfirmDeleteBtn) {
      try {
        await memoService.hideMemoById(propsMemo.id);
      } catch (error: any) {
        new Notice(error.message);
      }

      if (globalStateService.getState().editMemoId === propsMemo.id) {
        globalStateService.setEditMemoId('');
      }
    } else {
      toggleConfirmDeleteBtn();
    }
  };

  const handleMouseLeaveMemoWrapper = () => {
    if (showConfirmDeleteBtn) {
      toggleConfirmDeleteBtn(false);
    }
  };

  const handleGenMemoImageBtnClick = () => {
    showShareMemoImageDialog(propsMemo);
  };

  const handleMemoTypeShow = () => {
    if (!ShowTaskLabel) {
      return null;
    }

    if (propsMemo.memoType === 'TASK-TODO') {
      return <TaskBlank />;
    } else if (propsMemo.memoType === 'TASK-DONE') {
      return <Task />;
    }
    return null;
  };

  // const handleMemoKeyDown = useCallback((event: React.MouseEvent, m) => {
  //   if (event.ctrlKey || event.metaKey) {
  //     handleSourceMemoClick(m);
  //   }
  // }, []);

  const handleMemoDoubleClick = useCallback((event: React.MouseEvent) => {
    if (event) {
      handleEditMemoClick();
    }
  }, []);

  const handleMemoContentClick = async (e: React.MouseEvent, m: Model.Memo) => {
    const targetEl = e.target as HTMLElement;

    if (e.ctrlKey || e.metaKey) {
      handleSourceMemoClick(m);
    }

    if (targetEl.className === 'memo-link-text') {
      const memoId = targetEl.dataset?.value;
      const memoTemp = memoService.getMemoById(memoId ?? '');

      if (memoTemp) {
        showMemoCardDialog(memoTemp);
      } else {
        new Notice('MEMO Not Found');
        targetEl.classList.remove('memo-link-text');
      }
    } else if (targetEl.className === 'todo-block') {
      // do nth
    }
  };

  const handleCommentBlock = () => {
    // 点 memo 的评论图标 = 回复 memo 本身，清空回复目标
    setReplyToBoth(null);
    if (!isCommentShown) {
      toggleComment(true);
    } else {
      toggleComment(false);
    }
    if (!isCommentListShown) {
      toggleCommentList(true);
    } else if (!ShowCommentOnMemos && isCommentListShown) {
      toggleCommentList(false);
    }
  };

  const handleEditCommentClick = useCallback((memo: Model.Memo) => {
    if (!CommentOnMemos) {
      return;
    }

    globalStateService.setCommentMemoId(memo.id);
    // console.log(Boolean(globalStateService.getState().commentMemoId));
    // console.log(globalStateService.getState().commentMemoId);

    if (!isCommentShown) {
      toggleComment(true);
    }
    memoCommentRef.current?.focus();
    memoCommentRef.current?.setContent(memo.content.trim());
  }, []);

  const showEditStatus = Boolean(globalState.commentMemoId);

  // 回复某条评论：点不同评论切换目标，点同一评论关闭输入框
  const handleReplyClick = useCallback(
    (comment: Model.Memo) => {
      const current = replyToRef.current;
      if (current && current.id === comment.id) {
        // 点同一条 → 关闭
        setReplyToBoth(null);
        toggleComment(false);
      } else {
        // 不同或没在回复 → 切换/打开
        setReplyToBoth(comment);
        toggleComment(true);
        setTimeout(() => {
          memoCommentRef.current?.focus();
        }, 0);
      }
    },
    [],
  );

  const editorConfig = useMemo(
    () => ({
      className: 'memo-editor',
      inputerType: 'commentMemo',
      initialContent: '',
      placeholder: t('Comment it...'),
      showConfirmBtn: true,
      showCancelBtn: showEditStatus,
      showTools: true,
      onConfirmBtnClick: handleSaveBtnClick,
      onCancelBtnClick: handleCancelBtnClick,
      onContentChange: handleContentChange,
    }),
    [globalState.commentMemoId],
  );

  const imageProps = {
    memo: propsMemo.content,
  };

  return (
    <div
      className={`memo-wrapper ${'memos-' + propsMemo.id} ${propsMemo.memoType}`}
      onMouseLeave={handleMouseLeaveMemoWrapper}
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', propsMemo.content.replace(/<br>/g, '\n'));
      }}
    >
      <div className="memo-top-wrapper">
        <div className="memo-top-left-wrapper">
          <span className="time-text" onClick={handleShowMemoStoryDialog}>
            {utils.getDateTimeString(propsMemo.createdAt)}
          </span>
          <div
            className={`memo-type-img ${
              (propsMemo.memoType === 'TASK-TODO' || propsMemo.memoType === 'TASK-DONE') && ShowTaskLabel
                ? ''
                : 'hidden'
            }`}
          >
            {handleMemoTypeShow() ?? ''}
          </div>
        </div>
        <div className="memo-top-right-wrapper">
          {CommentOnMemos ? (
            <div className="comment-button-wrapper">
              {/*<img className="comment-logo" onClick={handleCommentBlock} src={} alt="memo-comment" />*/}
              <Comment className="icon-img" onClick={handleCommentBlock} />
              {commentMemos.length > 0 ? <div className="comment-text-count">{commentMemos.length}</div> : null}
            </div>
          ) : (
            ''
          )}
          <div className="btns-container">
            <span className="btn more-action-btn">
              {/*<img className="icon-img" src={more} />*/}
              <More className="icon-img" />
            </span>
            <div className="more-action-btns-wrapper">
              <div className="more-action-btns-container">
                <span className="btn" onClick={handleShowMemoStoryDialog}>
                  {t('READ')}
                </span>
                <span className="btn" onClick={handleMarkMemoClick}>
                  {t('MARK')}
                </span>
                <span className="btn" onClick={handleGenMemoImageBtnClick}>
                  {t('SHARE')}
                </span>
                <span className="btn" onClick={handleEditMemoClick}>
                  {t('EDIT')}
                </span>
                <span className="btn" onClick={() => handleSourceMemoClick(propsMemo)}>
                  {t('SOURCE')}
                </span>
                <span
                  className={`btn delete-btn ${showConfirmDeleteBtn ? 'final-confirm' : ''}`}
                  onClick={handleDeleteMemoClick}
                >
                  {showConfirmDeleteBtn ? t('CONFIRM！') : t('DELETE')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="memo-content-text"
        onClick={(e) => handleMemoContentClick(e, propsMemo)}
        onDoubleClick={handleMemoDoubleClick}
        dangerouslySetInnerHTML={{ __html: formatMemoContent(propsMemo.content, propsMemo.id) }}
      ></div>
      <MemoImage {...imageProps} />
      {/*<Only when={externalImageUrls.length > 0}>*/}
      {/*  <div className="images-wrapper">*/}
      {/*    {externalImageUrls.map((imgUrl, idx) => (*/}
      {/*      <Image alt="" key={idx} className="memo-img" imgUrl={imgUrl} referrerPolicy="no-referrer" />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</Only>*/}
      {/*<Only when={internalImageUrls.length > 0}>*/}
      {/*  <div className="images-wrapper internal-embed image-embed is-loaded">*/}
      {/*    {internalImageUrls.map((imgUrl, idx) => (*/}
      {/*      <Image*/}
      {/*        key={idx}*/}
      {/*        className="memo-img"*/}
      {/*        imgUrl={imgUrl.path}*/}
      {/*        alt={imgUrl.altText}*/}
      {/*        filepath={imgUrl.filepath}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</Only>*/}
      {CommentOnMemos ? (
        <div className={`memo-comment-wrapper`}>
          {commentMemos.length > 0 && isCommentListShown ? (
            <div className={`memo-comment-list`}>
              {commentMemos.map((m, idx) => (
                <MemoComment
                  key={m.id || idx}
                  comment={m}
                  allMemos={memoService.getState().memos}
                  onContentClick={handleMemoContentClick}
                  onEdit={handleEditCommentClick}
                  onReply={handleReplyClick}
                />
              ))}
            </div>
          ) : null}
          <div className={`memo-comment-inputer ${isCommentShown ? '' : 'hidden'}`}>
            {replyTo && replyTo.id !== propsMemo.id ? (
              <div className="memo-comment-replying">
                回复: {replyTo.content.slice(0, 30)}
              </div>
            ) : null}
            <Editor ref={memoCommentRef} {...editorConfig} />
          </div>
        </div>
      ) : (
        ''
      )}
      {/* <Only when={imageUrls.length > 0}>
        <div className="images-wrapper">
          {imageUrls.map((imgUrl, idx) => (
            <Image className="memo-img" key={idx} imgUrl={imgUrl} />
          ))}
        </div>
      </Only> */}
    </div>
  );
};

export function formatMemoContent(content: string, memoid?: string) {
  content = encodeHtml(content);
  content = parseRawTextToHtml(content)
    .split('<br>')
    .map((t) => {
      return `<p>${t !== '' ? t : '<br>'}</p>`;
    })
    .join('');

  const { shouldUseMarkdownParser, shouldHideImageUrl } = globalStateService.getState();

  if (shouldUseMarkdownParser) {
    content = parseMarkedToHtml(content, memoid);
  }

  if (shouldHideImageUrl) {
    content = content.replace(WIKI_IMAGE_URL_REG, '').replace(MARKDOWN_URL_REG, '').replace(IMAGE_URL_REG, '');
  }

  // console.log(content);

  // 中英文之间加空格
  // if (shouldSplitMemoWord) {
  //   content = content
  //     .replace(/([\u4e00-\u9fa5])([A-Za-z0-9?.,;[\]]+)/g, "$1 $2")
  //     .replace(/([A-Za-z0-9?.,;[\]]+)([\u4e00-\u9fa5])/g, "$1 $2");
  // }

  content = content
    // .replace(TAG_REG, "<span class='tag-span'>#$1</span>")
    // .replace(FIRST_TAG_REG, "<p><span class='tag-span'>#$2</span>")
    .replace(LINK_REG, "$1<a class='link' target='_blank' rel='noreferrer' href='$2'>$2</a>")
    .replace(MD_LINK_REG, "<a class='link' target='_blank' rel='noreferrer' href='$2'>$1</a>")
    .replace(MEMO_LINK_REG, "<span class='memo-link-text' data-value='$2'>$1</span>")
    .replace(/\^\S{6}/g, '');

  const tagsCollect = (content: string) => {
    let tags = [...content.matchAll(TAG_REG)];
    tags = [...tags, ...content.matchAll(FIRST_TAG_REG)];
    tags.sort((tag, tag2) => tag.index - tag2.index);
    content = content.replace(TAG_REG, '').replace(FIRST_TAG_REG, '');

    let tagsComponent = `<p>`;
    const tagsOnTop = false;
    if (tags.length > 0) {
      for (const tag of tags) {
        tagsComponent += `<span class='tag-span'>#${tag[tag.length - 1]}</span>`;
      }
      if (tagsOnTop) {
        content = tagsComponent + content;
      } else {
        content += tagsComponent;
      }
    }
    return content;
  };

  content = tagsCollect(content);

  // .replace(TAG_REG, "<span class='tag-span'>#$1</span>")
  // .replace(FIRST_TAG_REG, "<p><span class='tag-span'>#$2</span>")

  // const contentMark = content.split('');

  // if(/(.*)<a(.*)/g.test(content)){

  // }
  //   for(let i=0; i<content.length;i++){
  //     let mark = false;
  //     let aMark = false;
  //     if(contentMark[i])
  //   }

  const tempDivContainer = document.createElement('div');
  tempDivContainer.innerHTML = content;
  for (let i = 0; i < tempDivContainer.children.length; i++) {
    const c = tempDivContainer.children[i];

    if (c.tagName === 'P' && c.textContent === '' && c.firstElementChild?.tagName !== 'BR') {
      c.remove();
      i--;
      continue;
    }
  }

  return tempDivContainer.innerHTML;
}

/**
 * 递归渲染单条评论及其子评论（多级评论）。
 * 子评论 = allMemos 中 linkId === 本条评论 hasId 的项。
 */
interface MemoCommentProps {
  comment: Model.Memo;
  allMemos: Model.Memo[];
  onContentClick: (e: React.MouseEvent, m: Model.Memo) => void;
  onEdit: (m: Model.Memo) => void;
  onReply: (m: Model.Memo) => void;
}

const MemoComment: React.FC<MemoCommentProps> = ({ comment, allMemos, onContentClick, onEdit, onReply }) => {
  const children = allMemos
    .filter((m) => m.linkId === comment.hasId)
    .sort((a, b) => utils.getTimeStampByDate(a.createdAt) - utils.getTimeStampByDate(b.createdAt));
  const [hovered, setHovered] = useState(false);
  return (
    <div className="memo-comment-item">
      <div
        className="memo-comment"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="memo-comment-time">{utils.getDateTimeString(comment.createdAt)}</div>
        <div
          className="memo-comment-text"
          onClick={(e) => onContentClick(e, comment)}
          onDoubleClick={() => onEdit(comment)}
          dangerouslySetInnerHTML={{
            __html: formatMemoContent(comment.content.trim(), comment.id),
          }}
        ></div>
        <div className={`memo-comment-actions ${hovered ? '' : 'hidden'}`}>
          <button className="memo-comment-reply-btn" onClick={() => onReply(comment)} title={t('Reply')}>
            <Comment className="icon-img" />
          </button>
        </div>
      </div>
      {children.length > 0 ? (
        <div className="memo-comment-children">
          {children.map((c) => (
            <MemoComment
              key={c.id}
              comment={c}
              allMemos={allMemos}
              onContentClick={onContentClick}
              onEdit={onEdit}
              onReply={onReply}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default memo(Memo);
