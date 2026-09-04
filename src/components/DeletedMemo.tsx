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
  // deletedAt 是 14 位时间戳（YYYYMMDDHHmmss），转成可显示格式
  const deletedAtStr = propsMemo.deletedAt
    ? moment(propsMemo.deletedAt, 'YYYYMMDDHHmmss').format(showSeconds ? 'YYYY/MM/DD HH:mm:ss' : 'YYYY/MM/DD HH:mm')
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
        await memoService.deleteMemoById(memo.id);
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
      await memoService.restoreMemoById(memo.id);
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

  // 如果是评论，找到最顶层的父 memo（跳过中间的评论层级）
  const allMemos = memoService.getState().memos;
  let topParent: Model.Memo | null = null;
  if (propsMemo.linkId) {
    let current = allMemos.find((m) => m.hasId === propsMemo.linkId);
    let guard = 0;
    while (current && current.linkId && guard < 10) {
      current = allMemos.find((m) => m.hasId === current!.linkId) || null;
      guard++;
    }
    topParent = current;
  }
  // 子评论（递归收集该评论的全部子孙）
  const collectChildren = (parentHasId: string): Model.Memo[] => {
    const direct = allMemos.filter((m) => m.linkId === parentHasId);
    let result: Model.Memo[] = [];
    for (const d of direct) {
      result = result.concat(d, collectChildren(d.hasId));
    }
    return result;
  };
  const childComments = propsMemo.hasId ? collectChildren(propsMemo.hasId) : [];

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
      {topParent ? (
        <div className="deleted-memo-parent">
          来自: {topParent.content.slice(0, 40)}
        </div>
      ) : null}
      <div className="memo-content-text" dangerouslySetInnerHTML={{ __html: formatMemoContent(memo.content) }}></div>
      <MemoImage memo={memo.content} />
      {childComments.length > 0 ? (
        <div className="deleted-memo-children">
          <div className="deleted-memo-children-count">包含 {childComments.length} 条子评论</div>
          {childComments.slice(0, 5).map((c) => (
            <div
              key={c.id}
              className="deleted-memo-child"
              dangerouslySetInnerHTML={{ __html: formatMemoContent(c.content.trim()) }}
            />
          ))}
          {childComments.length > 5 ? <div className="deleted-memo-children-more">...</div> : null}
        </div>
      ) : null}
      {/* <Only when={externalImageUrls.length > 0}>
        <div className="images-wrapper">
          {externalImageUrls.map((imgUrl, idx) => (
            <Image alt="" key={idx} className="memo-img" imgUrl={imgUrl} referrerPolicy="no-referrer" />
          ))}
        </div>
      </Only>
      <Only when={internalImageUrls.length > 0}>
        <div className="images-wrapper internal-embed image-embed is-loaded">
          {internalImageUrls.map((imgUrl, idx) => (
            <Image
              key={idx}
              className="memo-img"
              imgUrl={imgUrl.path}
              alt={imgUrl.altText}
              filepath={imgUrl.filepath}
            />
          ))}
        </div>
      </Only> */}
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

export default DeletedMemo;
