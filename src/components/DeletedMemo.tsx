import utils from '../helpers/utils';
import useToggle from '../hooks/useToggle';
import appStore from '../stores/appStore';
import { memoService } from '../services';
import { formatMemoContent } from './Memo';
import MemoRefBar from './MemoRefBar';
import showMemoCardDialog from './MemoCardDialog';
import '../less/memo.less';
import React, { useEffect, useRef, useState } from 'react';
import { moment, Notice } from 'obsidian';
import More from '../icons/more.svg?component';
import { t } from '../translations/helper';
import MemoImage from './MemoImage';

interface Props {
  memo: Model.Memo;
  handleDeletedMemoAction: (memoId: string) => void;
}

const DeletedMemo: React.FC<Props> = (props: Props) => {
  // const { app }  = appStore.getState().dailyNotesState;

  const { memo: propsMemo, handleDeletedMemoAction } = props;
  // 时间格式开关：HH:mm 模式不带秒（纯渲染，不动数据）
  const showSeconds = appStore.getState().settingsState.settings.TimeFormat !== 'HH:mm';
  // deletedAt 新旧两种值：旧 14 位数字 / 可读 YYYY-MM-DD HH:mm:ss，转成统一显示格式
  const parseDeletedAt = (value: string) =>
    /^\d{14}$/.test(value)
      ? moment(value, 'YYYYMMDDHHmmss')
      : moment(value, 'YYYY-MM-DD HH:mm:ss');
  const deletedAtStr = propsMemo.deletedAt
    ? parseDeletedAt(propsMemo.deletedAt).format(
        showSeconds ? 'YYYY/MM/DD HH:mm:ss' : 'YYYY/MM/DD HH:mm',
      )
    : utils.getDateTimeString(Date.now(), showSeconds);
  const memo: FormattedMemo = {
    ...propsMemo,
    createdAtStr: utils.getDateTimeString(propsMemo.createdAt, showSeconds),
    deletedAtStr,
  };
  const [showConfirmDeleteBtn, toggleConfirmDeleteBtn] = useToggle(false);
  const rootRef = useRef<HTMLDivElement>(null);
  // 三点菜单：与主列表一致走点击"钉住"（回收站同样会滚动，纯 CSS hover 在滚动时指针易离而消失）
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) {
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

  const handleMoreMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen((v) => !v);
  };

  const handleMoreActionClick = (e: React.MouseEvent) => {
    // 删除有两段确认（DELETE → CONFIRM），不自动关闭；其余动作点完即收
    const el = e.target as HTMLElement;
    if (!el.closest('.delete-btn')) {
      setMenuOpen(false);
    }
  };

  // 恢复/删除前的出行动效（用完再真正操作）
  const animateOut = (up: boolean) => {
    const el = rootRef.current;
    if (!el) {
      return Promise.resolve();
    }
    // 世界律：文字多的卡不 scale（2026-09-06 polish 收口）——纯位移 + 淡出
    const anim = el.animate(
      up
        ? [
            { transform: 'none', opacity: 1, offset: 0 },
            { transform: 'translateY(-8px)', opacity: 1, offset: 0.4 },
            { transform: 'translateY(-20px)', opacity: 0, offset: 1 },
          ]
        : [
            { transform: 'none', opacity: 1, offset: 0 },
            { transform: 'translateY(8px)', opacity: 1, offset: 0.3 },
            { transform: 'translateY(20px)', opacity: 0, offset: 1 },
          ],
      { duration: 200, easing: 'ease-in' },
    );
    return anim.finished.catch(() => undefined);
  };

  const handleDeleteMemoClick = async () => {
    if (showConfirmDeleteBtn) {
      try {
        await animateOut(false);
        await memoService.deleteMemoById(memo.id, memo.hasId, memo.path);
        handleDeletedMemoAction(memo.id);
      } catch (error: any) {
        new Notice(error.message);
      }
    } else {
      toggleConfirmDeleteBtn();
    }
  };

  const handleRestoreMemoClick = async () => {
    try {
      await animateOut(true);
      await memoService.restoreMemoById(memo.id, memo.hasId, memo.path);
      handleDeletedMemoAction(memo.id);
      new Notice(t('RESTORE SUCCEED'));
    } catch (error: any) {
      new Notice(error.message);
    }
  };

  const handleMouseLeaveMemoWrapper = () => {
    if (showConfirmDeleteBtn) {
      toggleConfirmDeleteBtn(false);
    }
  };

  const isTaskCard = propsMemo.memoType === 'TASK-TODO' || propsMemo.memoType === 'TASK-DONE';

  return (
    <div
      ref={rootRef}
      className={`memo-wrapper ${'memos-' + memo.id} ${propsMemo.memoType ?? ''}${menuOpen ? ' menu-open' : ''}`}
      onMouseLeave={handleMouseLeaveMemoWrapper}
    >
      {isTaskCard && (
        <span
          className={`memo-task-corner ${propsMemo.memoType === 'TASK-DONE' ? 'done' : ''}`}
          aria-hidden="true"
        />
      )}
      <div className="memo-top-wrapper">
        <span className="time-text">
          {t('DELETE AT')} {memo.deletedAtStr}
        </span>
        <div className="btns-container">
          <button
            type="button"
            className="btn more-action-btn"
            onClick={handleMoreMenuClick}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <More className="icon-img" />
          </button>
          <div className="more-action-btns-wrapper" onClick={handleMoreActionClick}>
            <div className="more-action-btns-container">
              <button type="button" className="btn restore-btn" onClick={handleRestoreMemoClick}>
                {t('RESTORE')}
              </button>
              <button
                type="button"
                className={`btn delete-btn ${showConfirmDeleteBtn ? 'final-confirm' : ''}`}
                onClick={handleDeleteMemoClick}
              >
                {showConfirmDeleteBtn ? t('CONFIRM！') : t('DELETE')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="memo-content-text" dangerouslySetInnerHTML={{ __html: formatMemoContent(memo.content) }}></div>
      <MemoImage memo={memo.content} />
      <MemoRefBar
        content={memo.content}
        currentPath={memo.path}
        onOpenMemo={(tm) => showMemoCardDialog(tm)}
      />
    </div>
  );
};

export default DeletedMemo;
