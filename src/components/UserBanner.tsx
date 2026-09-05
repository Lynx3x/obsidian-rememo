import React, { useContext } from 'react';
import appContext from '../stores/appContext';
import utils from '../helpers/utils';
import showDailyMemoDiaryDialog from './DailyMemoDiaryDialog';
import '../less/user-banner.less';
import { t } from '../translations/helper';

interface Props {}

// ADR-0004：用户名行与 ⋯ 小菜单退役（导航上移侧栏），UserBanner 收缩为统计行（MEMO/TAG/DAY）
const UserBanner: React.FC<Props> = () => {
  const {
    memoState: { memos, tags },
  } = useContext(appContext);
  let createdDays;
  if (memos.length) {
    createdDays =
      Math.ceil((Date.now() - utils.getTimeStampByDate(memos[memos.length - 1].createdAt)) / 1000 / 3600 / 24) + 1;
  }

  return (
    <div className="user-banner-container">
      <div className="status-text-container">
        <div className="status-text memos-text">
          <span className="amount-text">{memos.length}</span>
          <span className="type-text">MEMO</span>
        </div>
        <div className="status-text tags-text">
          <span className="amount-text">{tags.length}</span>
          <span className="type-text">{t('TAG')}</span>
        </div>
        <div className="status-text duration-text" onClick={() => showDailyMemoDiaryDialog()}>
          <span className="amount-text">{createdDays ?? 0}</span>
          <span className="type-text">{t('DAY')}</span>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
