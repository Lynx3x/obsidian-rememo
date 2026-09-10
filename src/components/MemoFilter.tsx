import React, { useContext } from 'react';
import appContext from '../stores/appContext';
import { locationService, queryService } from '../services';
import { getTextWithMemoType } from '../helpers/filter';
import '../less/memo-filter.less';
import { moment } from 'obsidian';
import { t } from '../translations/helper';

interface FilterProps {}

const MemoFilter: React.FC<FilterProps> = () => {
  const {
    locationState: { query },
  } = useContext(appContext);

  const { tag: tagQuery, duration, type: memoType, text: textQuery, filter } = query;

  const queryFilter = queryService.getQueryById(filter);
  const showFilter = Boolean(
    tagQuery || (duration && duration.from < duration.to) || memoType || textQuery || queryFilter,
  );

  return (
    <div className={`filter-query-container ${showFilter ? '' : 'hidden'}`}>
      <div className="filter-query">
        <span className="tip-text">{t('FILTER')}: </span>
        <div
          className={'filter-item-container ' + (queryFilter ? '' : 'hidden')}
          onClick={() => {
            locationService.setMemoFilter('');
          }}
        >
          <span className="icon-text">🔖</span> {queryFilter?.title}
        </div>
        <div
          className={'filter-item-container ' + (tagQuery ? '' : 'hidden')}
          onClick={() => {
            locationService.setTagQuery('');
          }}
        >
          <span className="icon-text">🏷️</span> {tagQuery}
        </div>
        <div
          className={'filter-item-container ' + (memoType ? '' : 'hidden')}
          onClick={() => {
            locationService.setMemoTypeQuery('');
          }}
        >
          <span className="icon-text">📦</span> {getTextWithMemoType(memoType as MemoSpecType)}
        </div>
        {duration && duration.from < duration.to ? (
          <div
            className="filter-item-container"
            onClick={() => {
              locationService.setFromAndToQuery(0, 0);
            }}
          >
            <span className="icon-text">🗓️</span> {moment(duration.from, 'x').format('YYYY/MM/DD')} {t('to')}{' '}
            {moment(duration.to, 'x').add(1, 'days').format('YYYY/MM/DD')}
          </div>
        ) : null}
        <div
          className={'filter-item-container ' + (textQuery ? '' : 'hidden')}
          onClick={() => {
            locationService.setTextQuery('');
          }}
        >
          <span className="icon-text">🔍</span> {textQuery}
        </div>
      </div>
    </div>
  );
};

export default MemoFilter;
