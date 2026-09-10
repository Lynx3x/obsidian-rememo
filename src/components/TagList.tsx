import React, { useContext, useEffect, useState } from 'react';
import appContext from '../stores/appContext';
import { locationService, memoService } from '../services';
import dailyNotesService from '../services/dailyNotesService';
import useToggle from '../hooks/useToggle';
import Only from './common/OnlyWhen';
import utils from '../helpers/utils';
import '../less/tag-list.less';
import ArrowRight from '../icons/arrow-right.svg?component';
import ViewList from '../icons/view-list.svg?component';
import TreeView from '../icons/tree.svg?component';
import { t } from '../translations/helper';

interface Tag {
  key: string;
  text: string;
  count: { [key: string]: number };
  subTags: Tag[];
}

interface Props {}

const TagList: React.FC<Props> = () => {
  const {
    locationState: {
      query: { tag: tagQuery },
    },
    memoState: { tags: tagsText, tagsNum: tagsCount, memos },
    settingsState: { settings },
  } = useContext(appContext);
  const [tags, setTags] = useState<Tag[]>([]);

  // 视图形态（2026-09-10）：平铺 = 全名一行一个（默认）；树状 = 层级折叠（原形态）
  const isFlat = settings.TagListView !== 'tree';

  useEffect(() => {
    memoService.updateTagsState();
  }, [memos]);

  useEffect(() => {
    const sortedTags = Array.from(tagsText).sort();
    const root: KVObject<any> = {
      subTags: [],
    };
    for (const tag of sortedTags) {
      const subtags = tag.split('/');
      let tempObj = root;
      let tagText = '';
      for (let i = 0; i < subtags.length; i++) {
        const key = subtags[i];
        if (i === 0) {
          tagText += key;
        } else {
          tagText += '/' + key;
        }

        let obj = null as Tag;

        for (const t of tempObj.subTags) {
          if (t.text === tagText) {
            obj = t;
            break;
          }
        }

        if (!obj) {
          obj = {
            key,
            text: tagText,
            count: tagsCount[tagText],
            subTags: [],
          };
          tempObj.subTags.push(obj);
        }
        tempObj = obj;
      }
    }
    setTags(root.subTags as Tag[]);
  }, [tagsText]);

  // 平铺形态行数据：全名一行一个（无折叠箭头/无子树；行样式与树状共用）
  const flatTags: Tag[] = Array.from(tagsText)
    .sort()
    .map((text) => ({ key: text, text, count: tagsCount[text], subTags: [] }));

  // 视图形态持久化：写插件设置 → saveSettings 内 dispatch SET_SETTINGS 回流（响应式重渲染本组件）
  const handleViewSwitch = (view: 'flat' | 'tree') => {
    if (settings.TagListView === view) {
      return;
    }
    const { app } = dailyNotesService.getState();
    //@ts-expect-error, private field —— 组件内无 plugin 注入通道，经 app 取插件实例
    const plugin = app.plugins.plugins['rememo'];
    if (plugin) {
      plugin.settings.TagListView = view;
      plugin.saveSettings();
    }
  };

  return (
    <div className="tags-wrapper">
      <p className="title-text">
        <span>{t('Frequently Used Tags')}</span>
        <span className="view-switch">
          <button
            type="button"
            className={`view-btn ${isFlat ? 'active' : ''}`}
            onClick={() => handleViewSwitch('flat')}
            title={t('Flat view')}
            aria-pressed={isFlat}
          >
            <ViewList className="icon-img" />
          </button>
          <button
            type="button"
            className={`view-btn ${!isFlat ? 'active' : ''}`}
            onClick={() => handleViewSwitch('tree')}
            title={t('Tree view')}
            aria-pressed={!isFlat}
          >
            <TreeView className="icon-img" />
          </button>
        </span>
      </p>
      <div className="tags-container">
        {isFlat
          ? flatTags.map((t, idx) => <TagItemContainer key={t.text + '-' + idx} tag={t} tagQuery={tagQuery} flat />)
          : tags.map((t, idx) => <TagItemContainer key={t.text + '-' + idx} tag={t} tagQuery={tagQuery} />)}
        <Only when={tags.length < 5 && memoService.initialized}>
          <p className="tag-tip-container">
            {t('TagTipFirst')}
            <span className="code-text">#Tag </span>
            {t('TagTipSecond')}
          </p>
        </Only>
      </div>
    </div>
  );
};

interface TagItemContainerProps {
  tag: Tag;
  tagQuery: string;
  /** 平铺形态：显示全名、无折叠箭头与子树（树状形态默认） */
  flat?: boolean;
}

const TagItemContainer: React.FC<TagItemContainerProps> = (props: TagItemContainerProps) => {
  const { tag, tagQuery, flat } = props;
  const isActive = tagQuery === tag.text;
  const hasSubTags = !flat && tag.subTags.length > 0;
  const [showSubTags, toggleSubTags] = useToggle(false);

  const handleTagClick = () => {
    if (isActive) {
      locationService.setTagQuery('');
    } else {
      utils.copyTextToClipboard(`#${tag.text} `);
      if (!['/', '/recycle'].includes(locationService.getState().pathname)) {
        locationService.setPathname('/');
      }
      locationService.setTagQuery(tag.text);
    }
  };

  const handleToggleBtnClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleSubTags();
  };

  return (
    <>
      <div className={`tag-item-container ${isActive ? 'active' : ''}`} onClick={handleTagClick}>
        <div className="tag-text-container">
          <span className="icon-text">#</span>
          <span className="tag-text">{flat ? tag.text : tag.key}</span>
        </div>
        <div className="btns-container">
          <span className="tag-count">{tag.count}</span>
          {hasSubTags ? (
            <button
              type="button"
              className={`action-btn toggle-btn ${showSubTags ? 'shown' : ''}`}
              onClick={handleToggleBtnClick}
              aria-expanded={showSubTags}
            >
              <ArrowRight className="icon-img" />
            </button>
          ) : !flat ? (
            // 树状下无子行补隐形占位：有子行的箭头钮占 16px 净宽，缺占位会让两类行的数字列错开（2026-09-10 owner 反馈）
            <span className="action-btn toggle-btn placeholder" aria-hidden="true" />
          ) : null}
        </div>
      </div>

      {hasSubTags ? (
        <div className={`subtags-container ${showSubTags ? '' : 'hidden'}`}>
          {tag.subTags.map((st, idx) => (
            <TagItemContainer key={st.text + '-' + idx} tag={st} tagQuery={tagQuery} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default TagList;
