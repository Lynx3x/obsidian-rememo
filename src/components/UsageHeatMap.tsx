import React, { useCallback, useContext, useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import appContext from '../stores/appContext';
import { dailyNotesService, globalStateService, locationService } from '../services';
import { DAILY_TIMESTAMP } from '../helpers/consts';
import utils from '../helpers/utils';
import '../less/usage-heat-map.less';
import { moment, Platform } from 'obsidian';
import { t } from '../translations/helper';
import { getDailyNote } from 'obsidian-daily-notes-interface';

const tableConfig = {
  width: 12,
  height: 7,
};

const getInitialUsageStat = (usedDaysAmount: number, beginDayTimestamp: number): DailyUsageStat[] => {
  const initialUsageStat: DailyUsageStat[] = [];
  for (let i = 0; i <= usedDaysAmount; i++) {
    initialUsageStat.push({
      timestamp: parseInt(moment(beginDayTimestamp).add(i, 'days').format('x')),
      count: 0,
    });
  }
  return initialUsageStat;
};

interface DailyUsageStat {
  timestamp: number;
  count: number;
}

// interface FromTo {
//   begin: string;
// }

type Props = object;

// let FromTo: string = '';

const UsageHeatMap: React.FC<Props> = () => {
  const {
    memoState: { memos },
    settingsState: { settings },
  } = useContext(appContext);

  // 周起点（2026-09-10 设置项）：'sunday'（默认）| 'monday'；列 = 周，行 0 = 周起点
  const weekStartDay = settings.HeatMapStartDay === 'monday' ? 1 : 0; // moment day(): 周日 0 … 周六 6
  const todayStart = moment().startOf('day');
  const daysSinceWeekStart = (todayStart.day() - weekStartDay + 7) % 7;
  // 窗口 = 本周周首往前 11 周起共 12 周；今天 = 最后一列本周内，其后（未来）格补 null
  const startDate = todayStart
    .clone()
    .subtract(daysSinceWeekStart, 'days')
    .subtract((tableConfig.width - 1) * tableConfig.height, 'days');
  const beginDayTimestamp = parseInt(startDate.format('x'));
  const todayTimeStamp = parseInt(todayStart.format('x'));
  const usedDaysAmount = (tableConfig.width - 1) * tableConfig.height + daysSinceWeekStart;
  const nullCell = new Array(6 - daysSinceWeekStart).fill(0);

  // 口径（2026-09-10 owner 拍板）：排除回收站已删与旧评论——与统计行一致
  const newMemos = memos.filter((memo) => memo.linkId === '' && !memo.isDeleted);
  const [allStat, setAllStat] = useState<DailyUsageStat[]>(getInitialUsageStat(usedDaysAmount, beginDayTimestamp));
  const [popupStat, setPopupStat] = useState<DailyUsageStat | null>(null);
  const [currentStat, setCurrentStat] = useState<DailyUsageStat | null>(null);
  const [, setFromTo, fromToRef] = useState('');
  const containerElRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // const newFromTo = {
  //   begin: "from",
  // } as FromTo;

  useEffect(() => {
    const newStat: DailyUsageStat[] = getInitialUsageStat(usedDaysAmount, beginDayTimestamp);
    for (const m of newMemos) {
      const creationDate = moment(m.createdAt.replaceAll('/', '-')).startOf('day');
      const index = creationDate.diff(startDate, 'days');
      // const index = (utils.getDateStampByDate(m.createdAt) - beginDayTimestamp) / (1000 * 3600 * 24) - 1;
      // if(index != newStat.length) { }
      if (index >= 0 && index < newStat.length) {
        newStat[index].count += 1;
      }
    }
    setAllStat([...newStat]);
  }, [memos, daysSinceWeekStart]);

  const handleUsageStatItemMouseEnter = useCallback((event: React.MouseEvent, item: DailyUsageStat) => {
    setPopupStat(item);
    if (!popupRef.current) {
      return;
    }

    const { isMobileView } = globalStateService.getState();
    const targetEl = event.target as HTMLElement;
    const sidebarEl = document.querySelector('.memos-sidebar-wrapper');
    popupRef.current.style.left = targetEl.offsetLeft - (containerElRef.current?.offsetLeft ?? 0) + 'px';
    let topValue = targetEl.offsetTop;
    if (!isMobileView) {
      topValue -= sidebarEl.scrollTop;
    }
    popupRef.current.style.top = topValue + 'px';
  }, []);

  const handleUsageStatItemMouseLeave = useCallback(() => {
    setPopupStat(null);
  }, []);

  const handleUsageStatItemClick = useCallback((event: React.MouseEvent, item: DailyUsageStat) => {
    if (
      locationService.getState().query.duration?.from === item.timestamp &&
      moment(locationService.getState().query.duration?.from).diff(
        locationService.getState().query.duration?.to,
        'day',
      ) == 0
    ) {
      locationService.setFromAndToQuery(0, 0);
      setCurrentStat(null);
      setFromTo(null);
    } else if (
      locationService.getState().query.duration?.from !== item.timestamp &&
      locationService.getState().query.duration?.from > 0 &&
      event.shiftKey
    ) {
      const timeStampDays = moment(item.timestamp)
        .endOf('day')
        .diff(locationService.getState().query.duration?.to, 'day');
      if (
        timeStampDays > 0 &&
        moment(locationService.getState().query.duration?.from).diff(
          locationService.getState().query.duration?.to,
          'day',
        ) == 0
      ) {
        setFromTo('from');
      } else if (
        timeStampDays < 0 &&
        moment(locationService.getState().query.duration?.from).diff(
          locationService.getState().query.duration?.to,
          'day',
        ) == 0
      ) {
        setFromTo('to');
      }
      if (moment(locationService.getState().query.duration?.from).isBefore(item.timestamp)) {
        if (fromToRef.current === 'to') {
          if (timeStampDays < 0) {
            locationService.setFromAndToQuery(item.timestamp, locationService.getState().query.duration?.to);
          } else {
            locationService.setFromAndToQuery(
              parseInt(moment(locationService.getState().query.duration?.to).startOf('day').format('x')),
              parseInt(moment(item.timestamp).endOf('day').format('x')),
            );
            setFromTo('from');
          }
        } else if (fromToRef.current === 'from') {
          if (timeStampDays < 0) {
            locationService.setFromAndToQuery(
              locationService.getState().query.duration?.from,
              parseInt(moment(item.timestamp).endOf('day').format('x')),
            );
          } else {
            locationService.setFromAndToQuery(
              locationService.getState().query.duration?.from,
              parseInt(moment(item.timestamp).endOf('day').format('x')),
            );
          }
        }
      } else {
        // const days = moment(locationService.getState().query.duration?.from).diff(locationService.getState().query.duration?.to, 'day');
        if (fromToRef.current === 'to') {
          locationService.setFromAndToQuery(item.timestamp, locationService.getState().query.duration?.to);
        } else if (fromToRef.current === 'from') {
          locationService.setFromAndToQuery(
            item.timestamp,
            parseInt(moment(locationService.getState().query.duration?.from).endOf('day').format('x')),
          );
          setFromTo('to');
        }
      }
    } else if (locationService.getState().query.duration?.from === 0 && event.shiftKey) {
      locationService.setFromAndToQuery(item.timestamp, parseInt(moment().endOf('day').format('x')));
    } else if (item.count > 0 && (event.ctrlKey || event.metaKey)) {
      const { app, dailyNotes } = dailyNotesService.getState();

      const file = getDailyNote(moment(item.timestamp), dailyNotes);
      if (!Platform.isMobile) {
        const leaf = app.workspace.getLeaf(true);
        void leaf.openFile(file);
      } else {
        let leaf = app.workspace.getMostRecentLeaf();
        if (leaf === null) {
          leaf = app.workspace.getLeaf(true);
        }
        void leaf.openFile(file);
      }
    } else if (item.count > 0 && !event.shiftKey && !event.ctrlKey && !event.metaKey) {
      if (!['/', '/recycle'].includes(locationService.getState().pathname)) {
        locationService.setPathname('/');
      }
      locationService.setFromAndToQuery(
        item.timestamp,
        utils.getTimeStampByDate(
          moment(item.timestamp + DAILY_TIMESTAMP)
            .subtract(1, 'days')
            .endOf('day')
            .format('YYYY-MM-DD HH:mm:ss'),
        ),
      );
      setCurrentStat(item);
    }
  }, []);

  // 级差基准：窗口内有值日的最大值（相对分位；无数据时全空）
  const maxCount = allStat.reduce((max, s) => (s.count > max ? s.count : max), 0);

  return (
    <div className="usage-heat-map-wrapper" ref={containerElRef}>
      <div className="day-tip-text-container">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <span className="tip-text" key={i}>
            {i % 2 === 0 ? t('weekDaysShort')[(weekStartDay + i) % 7] : ''}
          </span>
        ))}
      </div>

      {/* popup */}
      <div ref={popupRef} className={'usage-detail-container pop-up ' + (popupStat ? '' : 'hidden')}>
        {popupStat?.count} memos on{' '}
        <span className="date-text">{new Date(popupStat?.timestamp).toDateString()}</span>
      </div>

      <div className="usage-heat-map">
        {allStat.map((v, i) => {
          const count = v.count;
          // 相对分位分级（2026-09-10）：按窗口内最大值折算 4 档——高密度日不再直接顶格（原绝对阈值 1/2/4/5+）
          const colorLevel =
            count <= 0 || maxCount <= 0
              ? ''
              : `stat-day-L${Math.min(4, Math.ceil((count / maxCount) * 4))}-bg`;

          return (
            <span
              className={`stat-container ${colorLevel} ${count > 0 ? 'has-memos' : ''} ${
                currentStat?.timestamp === v.timestamp ? 'current' : ''
              } ${todayTimeStamp === v.timestamp ? 'today' : ''}`}
              key={i}
              onMouseEnter={(e) => handleUsageStatItemMouseEnter(e, v)}
              onMouseLeave={handleUsageStatItemMouseLeave}
              onClick={(e) => handleUsageStatItemClick(e, v)}
            ></span>
          );
        })}
        {nullCell.map((v, i) => (
          <span className="stat-container null" key={i}></span>
        ))}
      </div>
    </div>
  );
};

export default UsageHeatMap;
