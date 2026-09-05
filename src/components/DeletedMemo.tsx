import utils from '../helpers/utils';
import useToggle from '../hooks/useToggle';
import appStore from '../stores/appStore';
import { memoService } from '../services';
import { formatMemoContent } from './Memo';
import '../less/memo.less';
import React, { useRef } from 'react';
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
  // const imageUrls = Array.from(memo.content.match(IMAGE_URL_REG) ?? []);

  // 恢复/删除前的出行动效（用完再真正操作）
  const animateOut = (up: boolean) => {
    const el = rootRef.current;
    if (!el) {
      return Promise.resolve();
    }
    const anim = el.animate(
      up
        ? [
            { transform: 'none', opacity: 1, offset: 0 },
            { transform: 'translateY(-4px) scale(0.98)', opacity: 1, offset: 0.4 },
            { transform: 'translateY(-14px) scale(0.96)', opacity: 0, offset: 1 },
          ]
        : [
            { transform: 'none', opacity: 1, offset: 0 },
            { transform: 'translateY(2px) scale(0.98)', opacity: 1, offset: 0.3 },
            { transform: 'translateY(14px) scale(0.95)', opacity: 0, offset: 1 },
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

  return (
    <div ref={rootRef} className={`memo-wrapper ${'memos-' + memo.id}`} onMouseLeave={handleMouseLeaveMemoWrapper}>
      <div className="memo-top-wrapper">
        <span className="time-text">
          {t('DELETE AT')} {memo.deletedAtStr}
        </span>
        <div className="btns-container">
          <span className="btn more-action-btn">
            {/*<img className="icon-img" src={more} />*/}
            <More className="icon-img" />
          </span>
          <div className="more-action-btns-wrapper">
            <div className="more-action-btns-container">
              <span className="btn restore-btn" onClick={handleRestoreMemoClick}>
                {t('RESTORE')}
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
      <div className="memo-content-text" dangerouslySetInnerHTML={{ __html: formatMemoContent(memo.content) }}></div>
      <MemoImage memo={memo.content} />
    </div>
  );
};

export default DeletedMemo;
