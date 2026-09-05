import React, { useCallback, useContext, useEffect, useRef } from 'react';
import {
  FIRST_TAG_REG,
  IMAGE_URL_REG,
  LINK_REG,
  MARKDOWN_URL_REG,
  MD_LINK_REG,
  TAG_REG,
  WIKI_IMAGE_URL_REG,
} from '../helpers/consts';
import { refPreview, refTimeLabel, stripMemoLinks } from '../helpers/memoLink';
import MemoRefBar from './MemoRefBar';
import useState from 'react-usestateref';
import { parseMarkedToHtml, renderMemoContentLines } from '../helpers/marked';
import utils from '../helpers/utils';
import useToggle from '../hooks/useToggle';
import { globalStateService, memoService } from '../services';
import showMemoCardDialog from './MemoCardDialog';
import showShareMemoImageDialog from './ShareMemoImageDialog';
import '../less/memo.less';
import { Notice, Platform } from 'obsidian';
import { showMemoInDailyNotes } from '../obComponents/obShowMemo';
import More from '../icons/more.svg?component';
import TaskBlank from '../icons/task-blank.svg?component';
import Task from '../icons/task.svg?component';
import { t } from '../translations/helper';
import MemoImage from './MemoImage';
import appContext from '../stores/appContext';

// 评论（旧缩进子树 + linkId）已随 P1b 拆除——存储层只认新格式卡片块，评论待 P3 引用卡重建。

interface Props {
  memo: Model.Memo;
}

const Memo: React.FC<Props> = (props: Props) => {
  const {
    settingsState: { settings },
  } = useContext(appContext);
  // 从响应式设置读取，替代全局变量
  const { DefaultEditorLocation, UseButtonToShowEditor } = settings;
  const { memo: propsMemo } = props;
  const [showConfirmDeleteBtn, toggleConfirmDeleteBtn] = useToggle(false);
  // 三点菜单：点击可“钉住”，外点/Esc 关闭（CSS hover 在列表滚动时指针易离开而消失）
  const [menuOpen, setMenuOpen] = useState(false);
  const memoCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (memoCardRef.current && !memoCardRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleMoreMenuClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen((v: boolean) => !v);
  }, []);

  const handleMoreActionClick = useCallback((e: React.MouseEvent) => {
    // 删除有两段确认（DELETE → CONFIRM），不自动关闭；其余动作点完即收
    const el = e.target as HTMLElement;
    if (!el.closest('.delete-btn')) {
      setMenuOpen(false);
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

  // 任务卡整卡勾选：切换头行 [ ]↔[x]（写完即回读，勾选框/置灰随之刷新）
  const isTaskCard = propsMemo.memoType === 'TASK-TODO' || propsMemo.memoType === 'TASK-DONE';
  const handleToggleTaskClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      try {
        await memoService.toggleMemoTask(propsMemo);
      } catch (error: any) {
        new Notice(error.message);
      }
    },
    [propsMemo],
  );

  // 三点菜单「切换任务卡」：普通 memo ⇄ 任务卡（头行 - ⇄ - [ ]，写回后即回读）
  const handleToggleTaskTypeClick = useCallback(async () => {
    try {
      await memoService.toggleMemoTaskType(propsMemo);
    } catch (error: any) {
      new Notice(error.message);
    }
  }, [propsMemo]);

  // 碎纸机效果：卡片切成 N 条下落。overlay 挂到卡片外层的定位祖先（offsetParent）上，
  // 这样真正的删除/下移填充可以立刻并行发生，不会先留一个“空卡槽”再跳。
  const animateShred = () => {
    const el = memoCardRef.current;
    if (!el) {
      return Promise.resolve();
    }
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (w < 8 || h < 8) {
      return Promise.resolve();
    }
    const host = (el.offsetParent as HTMLElement | null) ?? el.parentElement;
    if (!host) {
      return Promise.resolve();
    }
    const x = el.offsetLeft;
    const y = el.offsetTop;

    const N = 8;
    const band = w / N;

    // 先克隆（放入 overlay 前），仍处在 memos_view 作用域内 → 克隆样式正常
    const cloneTemplate = el.cloneNode(true) as HTMLElement;
    cloneTemplate.querySelectorAll('.more-action-btns-wrapper').forEach((n) => {
      (n as HTMLElement).style.display = 'none';
    });

    const overlay = document.createElement('div');
    overlay.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;pointer-events:none;z-index:50;`;
    for (let i = 0; i < N; i++) {
      const outer = document.createElement('div');
      outer.style.cssText = `position:absolute;top:0;left:${i * band}px;width:${band}px;height:100%;overflow:hidden;`;
      const inner = document.createElement('div');
      inner.style.cssText = `position:absolute;top:0;left:${-i * band}px;width:${w}px;height:auto;`;
      inner.appendChild(cloneTemplate.cloneNode(true) as HTMLElement);
      outer.appendChild(inner);
      overlay.appendChild(outer);
    }
    host.appendChild(overlay);
    el.style.visibility = 'hidden';

    const rnd = (min: number, max: number) => min + Math.random() * (max - min);
    Array.from(overlay.children).forEach((outer) => {
      outer.animate(
        [
          { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
          {
            transform: `translate(${rnd(-3, 3)}px, ${rnd(40, 130)}px) rotate(${rnd(-14, 14)}deg)`,
            opacity: 0,
          },
        ],
        { duration: rnd(240, 430), delay: rnd(0, 30), easing: 'cubic-bezier(0.2, 0.6, 0.4, 1)', fill: 'both' },
      );
    });

    return new Promise<void>((resolve) => {
      window.setTimeout(() => {
        overlay.remove();
        // 若仍挂载（删除失败等），恢复可见
        if (document.contains(el)) {
          el.style.visibility = '';
        }
        resolve();
      }, 460);
    });
  };

  const handleDeleteMemoClick = async () => {
    if (!showConfirmDeleteBtn) {
      toggleConfirmDeleteBtn();
      return;
    }
    setMenuOpen(false);
    // 碎纸开始后立即真正删除 → 下方卡片 FLIP 上移填充与碎纸条并行，无“空槽停顿”
    const shredDone = animateShred();
    try {
      await memoService.hideMemoById(propsMemo.id, propsMemo.hasId, propsMemo.path);
    } catch (error: any) {
      new Notice(error.message);
    }
    await shredDone;

    if (globalStateService.getState().editMemoId === propsMemo.id) {
      globalStateService.setEditMemoId('');
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
      const memoTemp = memoService.getMemoByLinkTarget(memoId ?? '');

      if (memoTemp) {
        showMemoCardDialog(memoTemp);
      } else {
        new Notice('MEMO Not Found');
        targetEl.classList.remove('memo-link-text');
      }
    } else if (targetEl.className === 'todo-block') {
      // 正文内的任务行暂为静态展示（任务卡整卡切换走头行勾选框）
    }
  };

  const imageProps = {
    memo: propsMemo.content,
  };
  // P3b 聚合区数据：被引用（指向本卡的 memo，时间降序，最新 3 条预览；点击整条开浮窗看全部）
  const referenced = memoService
    .getLinkedMemos(propsMemo)
    .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
  const referencedTop = referenced.slice(0, 3);
  return (
    <div
      ref={memoCardRef}
      className={`memo-wrapper ${'memos-' + propsMemo.id} ${propsMemo.memoType}${menuOpen ? ' menu-open' : ''}`}
      onMouseLeave={handleMouseLeaveMemoWrapper}
    >
      {isTaskCard && (
        <span
          className={`memo-task-corner ${propsMemo.memoType === 'TASK-DONE' ? 'done' : ''}`}
          aria-hidden="true"
        />
      )}
      <div className="memo-top-wrapper">
        <div className="memo-top-left-wrapper">
          <span className="time-text" onClick={handleShowMemoStoryDialog}>
            {utils.getDateTimeString(propsMemo.createdAt, settings.TimeFormat !== 'HH:mm')}
          </span>
          {isTaskCard ? (
            <span
              className={`memo-task-toggle ${propsMemo.memoType === 'TASK-DONE' ? 'done' : ''}`}
              title={t(propsMemo.memoType === 'TASK-DONE' ? 'Mark as todo' : 'Mark as done')}
              onClick={handleToggleTaskClick}
            >
              {propsMemo.memoType === 'TASK-DONE' ? <Task /> : <TaskBlank />}
            </span>
          ) : null}
        </div>
        <div className="memo-top-right-wrapper">
          <div className="btns-container">
            <span className="btn more-action-btn" onClick={handleMoreMenuClick}>
              <More className="icon-img" />
            </span>
            <div className="more-action-btns-wrapper" onClick={handleMoreActionClick}>
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
                <span className="btn" onClick={handleToggleTaskTypeClick}>
                  {isTaskCard ? t('TURN INTO MEMO') : t('TURN INTO TASK')}
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
      <MemoRefBar content={propsMemo.content} currentPath={propsMemo.path} onOpenMemo={(tm) => showMemoCardDialog(tm)} />
      {referenced.length > 0 && (
        <div
          className="memo-referenced-bar"
          title={`${referenced.length} ${t('REFS')}`}
          onClick={() => showMemoCardDialog(propsMemo)}
        >
          <span className="memo-ref-count">
            {referenced.length} {t('REFS')}
          </span>
          {referencedTop.map((m) => (
            <span key={m.id} className="memo-ref-preview">
              {refTimeLabel(m.createdAt ?? '', m.path, propsMemo.path)} · {refPreview(m.content, 24)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export function formatMemoContent(content: string, memoid?: string) {
  const { shouldUseMarkdownParser, shouldHideImageUrl } = globalStateService.getState();

  // P3 引用标记（MEMO_LINK）不渲染在正文：整串剥离，引用由卡底"引用自"条呈现（见 Memo.tsx 渲染）
  content = stripMemoLinks(content);

  // P1 行式渲染：<br> 旧编码归一 → 段落/列表(嵌套)/任务/代码块结构（内部转义）
  content = renderMemoContentLines(content);

  if (shouldUseMarkdownParser) {
    content = parseMarkedToHtml(content, memoid);
  }

  if (shouldHideImageUrl) {
    content = content.replace(WIKI_IMAGE_URL_REG, '').replace(MARKDOWN_URL_REG, '').replace(IMAGE_URL_REG, '');
  }

  content = content
    .replace(LINK_REG, "$1<a class='link' target='_blank' rel='noreferrer' href='$2'>$2</a>")
    .replace(MD_LINK_REG, "<a class='link' target='_blank' rel='noreferrer' href='$2'>$1</a>")
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

  const tempDivContainer = document.createElement('div');
  tempDivContainer.innerHTML = content;
  for (let i = 0; i < tempDivContainer.children.length; i++) {
    const c = tempDivContainer.children[i];

    // 删除所有空段（含 <p><br></p>），避免多余空行导致行距过大
    if (c.tagName === 'P' && c.textContent === '') {
      c.remove();
      i--;
      continue;
    }
  }

  return tempDivContainer.innerHTML;
}

export default Memo;
