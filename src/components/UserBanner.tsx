import React, { useContext, useEffect, useRef, useState } from 'react';
import appContext from '../stores/appContext';
import utils from '../helpers/utils';
import showDailyMemoDiaryDialog from './DailyMemoDiaryDialog';
import '../less/user-banner.less';
import { t } from '../translations/helper';

type Props = object;

/**
 * 计数器滚动数字（2026-09-10 owner 灵感）：值变化时从旧值快速滚到新值（easeOutCubic ~420ms），
 * 落定轻弹一次（纯位移，文字禁 scale）；挂载时从 0 滚入场；reduced-motion 直接到值。
 */
const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = to;
    if (from === to) {
      return;
    }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(to);
      return;
    }
    const duration = 420;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) {
        raf = window.requestAnimationFrame(tick);
      } else if (spanRef.current) {
        // 落定轻弹：位移 -2px 回零（Q 弹语汇，不缩放）
        spanRef.current.animate(
          [{ transform: 'translateY(0)' }, { transform: 'translateY(-2px)' }, { transform: 'translateY(0)' }],
          { duration: 160, easing: 'ease-out' },
        );
      }
    };
    raf = window.requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span className="amount-text" ref={spanRef}>
      {display}
    </span>
  );
};

// ADR-0004：用户名行与 ⋯ 小菜单退役（导航上移侧栏），UserBanner 收缩为统计行（MEMO/TAG/DAY）
const UserBanner: React.FC<Props> = () => {
  const {
    memoState: { memos, tags },
  } = useContext(appContext);
  // 口径（2026-09-10 owner 拍板）：统计排除回收站已删（与主列表可见口径一致）；MEMO 走 i18n（值保持 MEMO）
  const visibleMemos = memos.filter((m) => !m.isDeleted && !m.linkId);
  let createdDays;
  if (visibleMemos.length) {
    createdDays =
      Math.ceil((Date.now() - utils.getTimeStampByDate(visibleMemos[visibleMemos.length - 1].createdAt)) / 1000 / 3600 / 24) +
      1;
  }

  return (
    <div className="user-banner-container">
      <div className="status-text-container">
        <div className="status-text memos-text">
          <AnimatedNumber value={visibleMemos.length} />
          <span className="type-text">{t('MEMO')}</span>
        </div>
        <div className="status-text tags-text">
          <AnimatedNumber value={tags.length} />
          <span className="type-text">{t('TAG')}</span>
        </div>
        <div className="status-text duration-text" onClick={() => showDailyMemoDiaryDialog()}>
          <AnimatedNumber value={createdDays ?? 0} />
          <span className="type-text">{t('DAY')}</span>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
