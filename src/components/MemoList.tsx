import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import appContext from '../stores/appContext';
import { locationService, memoService, queryService } from '../services';
import { FIRST_TAG_REG, IMAGE_URL_REG, LINK_REG, MEMO_LINK_REG, NOP_FIRST_TAG_REG, TAG_REG } from '../helpers/consts';
import { hasMemoReferences } from '../helpers/memoLink';
import utils from '../helpers/utils';
import { checkShouldShowMemoWithFilters } from '../helpers/filter';
import Memo from './Memo';
import '../less/memolist.less';
import dailyNotesService from '../services/dailyNotesService';
import appStore from '../stores/appStore';
import { Notice, Platform } from 'obsidian';
import { t } from '../translations/helper';
import Pagination from './Pagination';

interface Props {}

export let copyShownMemos: Model.Memo[];

const ITEMS_PER_PAGE = 10; // 每页显示10条记录

const MemoList: React.FC<Props> = () => {
  const {
    locationState: { query },
    memoState: { memos },
    settingsState: { settings },
  } = useContext(appContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setFetchStatus] = useState(true);
  const wrapperElement = useRef<HTMLDivElement>(null);
  // 上一次布局快照（新 memo 入场时对下方卡片做 FLIP 位移）
  const layoutSnapRef = useRef<{ keys: string[]; tops: number[] }>({ keys: [], tops: [] });
  // 入场节流：覆盖 vault 重读 store（~2s 后）可能导致的“二次入场”误触发
  const lastInsertAnimRef = useRef(0);

  const { tag: tagQuery, duration, type: memoContentType, text: textQuery, filter: queryId } = query;
  const queryFilter = queryService.getQueryById(queryId);
  const showMemoFilter = Boolean(
    tagQuery || (duration && duration.from < duration.to) || memoContentType || textQuery || queryFilter,
  );

  const shownMemos =
    showMemoFilter || queryFilter || settings.HideDoneTasks
      ? memos.filter((memo) => {
          let shouldShow = true;

          // 过滤已删除的 memo（isDeleted）
          if (memo.isDeleted) {
            shouldShow = false;
          }

          if (memo.memoType !== undefined) {
            if (settings.HideDoneTasks && memo.memoType === 'TASK-DONE') {
              shouldShow = false;
            }
          }

          // 过滤评论（linkId 非空 = 评论，不显示在 memo 列表）
          if (memo.linkId) {
            shouldShow = false;
          }

          if (queryFilter) {
            const filters = JSON.parse(queryFilter.querystring) as Filter[];
            if (Array.isArray(filters)) {
              shouldShow = checkShouldShowMemoWithFilters(memo, filters);
            }
          }

          if (tagQuery) {
            const tagsSet = new Set<string>();
            for (const t of Array.from(memo.content.match(TAG_REG) ?? [])) {
              const tag = t.replace(TAG_REG, '$1').trim();
              const items = tag.split('/');
              let temp = '';
              for (const i of items) {
                temp += i;
                tagsSet.add(temp);
                temp += '/';
              }
            }
            for (const t of Array.from(memo.content.match(NOP_FIRST_TAG_REG) ?? [])) {
              const tag = t.replace(NOP_FIRST_TAG_REG, '$1').trim();
              const items = tag.split('/');
              let temp = '';
              for (const i of items) {
                temp += i;
                tagsSet.add(temp);
                temp += '/';
              }
            }
            for (const t of Array.from(memo.content.match(FIRST_TAG_REG) ?? [])) {
              const tag = t.replace(FIRST_TAG_REG, '$2').trim();
              const items = tag.split('/');
              let temp = '';
              for (const i of items) {
                temp += i;
                tagsSet.add(temp);
                temp += '/';
              }
            }
            if (!tagsSet.has(tagQuery)) {
              shouldShow = false;
            }
          }
          if (
            duration &&
            duration.from < duration.to &&
            (utils.getTimeStampByDate(memo.createdAt) < duration.from ||
              utils.getTimeStampByDate(memo.createdAt) > duration.to)
          ) {
            shouldShow = false;
          }
          if (memoContentType) {
            if (
              memoContentType === 'NOT_TAGGED' &&
              (memo.content.match(TAG_REG) !== null || memo.content.match(NOP_FIRST_TAG_REG) !== null)
            ) {
              shouldShow = false;
            } else if (memoContentType === 'LINKED' && memo.content.match(LINK_REG) === null) {
              shouldShow = false;
            } else if (memoContentType === 'IMAGED' && memo.content.match(IMAGE_URL_REG) === null) {
              shouldShow = false;
            } else if (memoContentType === 'CONNECTED' && memo.content.match(MEMO_LINK_REG) === null) {
              shouldShow = false;
            }
          }
          if (textQuery && !memo.content.includes(textQuery)) {
            shouldShow = false;
          }

          return shouldShow;
        })
      : memos.filter((memo) => {
          // 过滤旧评论字段残留（linkId）、已删除 memo，以及（设置开启时）引用卡
          // （引用卡在其引用目标卡的聚合区可见，主列表默认不重复出现；搜索/过滤时不受此限）
          return (
            !memo.linkId &&
            !memo.isDeleted &&
            !(settings.HideRefMemosInList && hasMemoReferences(memo.content))
          );
        });

  copyShownMemos = shownMemos;

  // 分页计算
  const totalPages = Math.ceil(shownMemos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMemos = shownMemos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    wrapperElement.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1); // 重置页码——仅当"可见列表"变化时（隐藏的引用卡新增不打断当前浏览位置）
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, shownMemos.length]);

  useEffect(() => {
    setTimeout(() => {
      memoService
        .fetchAllMemos()
        .then(() => {
          setFetchStatus(false);
        })
        .catch(() => {
          new Notice(t('Fetch Error'));
        });
    }, 400);
    dailyNotesService
      .getMyAllDailyNotes()
      .then(() => {
        setFetchStatus(false);
      })
      .catch(() => {
        new Notice('😭 Fetch DailyNotes Error');
      });
    dailyNotesService.getState();
    memoService.getState();
  }, []);

  useEffect(() => {
    wrapperElement.current?.scrollTo({ top: 0 });
  }, [query]);

  // 新 memo 入场动效：从编辑器方向“弹下”，并把下方卡片往下挤（FLIP）。
  // 仅当列表顶部恰好新增一条（旧卡片顺序原样后移一位）时触发；初载/翻页/过滤都跳过。
  // 无依赖数组 → 每次提交后比对布局快照，成本 ≈ 读 ~10 个元素的矩形。
  useLayoutEffect(() => {
    const container = wrapperElement.current;
    if (!container) {
      return;
    }

    const cards = Array.from(container.querySelectorAll<HTMLElement>('.memo-wrapper'));
    const getMemoId = (el: HTMLElement) => /(?:^|\s)memos-([^\s]+)/.exec(el.className)?.[1] ?? '';
    const keys = cards.map(getMemoId);

    const prev = layoutSnapRef.current;
    const containerTop = container.getBoundingClientRect().top;
    const tops = cards.map((c) => c.getBoundingClientRect().top - containerTop);

    // 顶部插入判定：
    // 分页每页 10 条 → 顶部插入新卡时，可能同时把页尾最后一条挤出，列表总数不变。
    // 所以允许「当前长度 = 上一屏长度 或 +1」，且满足：首卡是上一屏没有的新卡、
    // 剩余卡片恰好是上一屏去掉末尾后的前缀（避免过滤/翻页误触发）。
    const firstIsNew = prev.keys.length > 0 && keys[0] !== prev.keys[0] && !prev.keys.includes(keys[0]);
    const lengthOk = keys.length === prev.keys.length + 1 || keys.length === prev.keys.length;
    const tailIsPrevHead =
      lengthOk && keys.slice(1).join('|') === prev.keys.slice(0, keys.length - 1).join('|');
    const isTopInsert =
      firstIsNew && lengthOk && tailIsPrevHead && Date.now() - lastInsertAnimRef.current > 2500;

    // 入场动效由 JS(WAAPI) 驱动；CSS 层级的 reduced-motion 关闭不影响它。
    if (isTopInsert) {
      lastInsertAnimRef.current = Date.now();

      // 用 WAAPI 直接驱动（不依赖 CSS transition/动画时间线，可稳定触发）

      // 1) 旧卡片被新卡片顶下去：从旧位置平滑过渡到新位置
      cards.forEach((card, idx) => {
        if (idx === 0) {
          return;
        }
        const delta = (prev.tops[idx - 1] ?? 0) - tops[idx];
        if (Math.abs(delta) > 1) {
          const anim = card.animate(
            [{ transform: `translateY(${delta}px)` }, { transform: 'none' }],
            { duration: 120, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
          );
          anim.onfinish = () => anim.cancel();
        }
      });

      // 2) 新卡入场：桌面默认升级为「纸片入列」——空白纸片从编辑器中心弹出、长大落入卡位，
      //    真卡在落点淡入与纸片交接（纸片无文字可安全缩放；世界动效律只禁文字缩放）。
      //    回退链：prefers-reduced-motion → 纯淡入；移动端/编辑器不可测距(滚远) → 旧发射位移入场。
      const first = cards[0];
      if (first) {
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

        let slipEligible = false;
        let host: HTMLElement | null = null;
        let originX = 0;
        let originY = 0;
        if (!reduceMotion && !Platform.isMobile && first.offsetWidth > 0) {
          const editorHost = container.parentElement;
          const editor = editorHost?.querySelector<HTMLElement>('.memo-editor-wrapper');
          if (editorHost && editor) {
            const editorRect = editor.getBoundingClientRect();
            const slotRect = first.getBoundingClientRect();
            const hostRect = editorHost.getBoundingClientRect();
            if (hostRect.width > 0 && slotRect.width > 0) {
              // 纸片飞行原点 = 编辑器下沿中心：一出膛就在列表灰底画布上，全程可见
              // （旧版取编辑器中心，前段飞在白卡上方白纸对白卡不可见 → 观感只剩落点闪入）
              originX = editorRect.left + editorRect.width / 2 - (slotRect.left + slotRect.width / 2);
              originY = editorRect.bottom + 2 - (slotRect.top + slotRect.height / 2);
              // 距离合理（未滚远）才做飞行；滚远时纸片在可视区外无意义
              slipEligible = Math.abs(originX) < 80 && originY > -340 && originY < -8;
              host = editorHost;
            }
          }
        }

        if (reduceMotion) {
          // reduced-motion：最短淡入
          const anim = first.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 140, easing: 'ease-out' });
          anim.onfinish = () => anim.cancel();
        } else if (slipEligible && host) {
          // —— 「纸片入列」choreography ——
          const slip = document.createElement('div');
          slip.className = 'memo-slip-paper';
          const hostRect = host.getBoundingClientRect();
          const slotRect = first.getBoundingClientRect();
          const slipH = 46;
          slip.style.cssText =
            `width:${first.offsetWidth}px;height:${slipH}px;` +
            `left:${slotRect.left - hostRect.left}px;` +
            `top:${slotRect.top - hostRect.top + (slotRect.height - slipH) / 2}px;`;
          host.appendChild(slip);

          // 飞行：从编辑器下沿探出 → 弧线摆落（横向摇摆+微旋读出轨迹）→ 落位融出与真卡交接
          const flyAnim = slip.animate(
            [
              {
                transform: `translate(${originX}px, ${originY}px) scale(0.4) rotate(-2deg)`,
                opacity: 0,
                offset: 0,
              },
              {
                transform: `translate(${originX - 8}px, ${originY * 0.78}px) scale(0.58) rotate(-1.4deg)`,
                opacity: 1,
                offset: 0.22,
              },
              {
                transform: `translate(${originX + 5}px, ${originY * 0.45}px) scale(0.8) rotate(-0.6deg)`,
                opacity: 1,
                offset: 0.5,
              },
              {
                transform: `translate(${originX - 2}px, ${originY * 0.12}px) scale(0.96) rotate(0deg)`,
                opacity: 1,
                offset: 0.76,
              },
              { transform: 'translate(0px, 0px) scale(1) rotate(0deg)', opacity: 0, offset: 1 },
            ],
            { duration: 240, easing: 'cubic-bezier(0.25, 0.8, 0.3, 1)' },
          );
          flyAnim.onfinish = () => {
            flyAnim.cancel();
            slip.remove();
          };

          // 真卡上浮落位：纸片融出时从下方 12px 升起并淡入（位移+淡入，文字安全），
          // 完成“纸片→卡片”的落定感，不再是原地闪入
          const cardAnim = first.animate(
            [
              { opacity: 0, transform: 'translateY(12px)', offset: 0 },
              { opacity: 1, transform: 'translateY(0px)', offset: 1 },
            ],
            { duration: 200, delay: 80, easing: 'ease-out' },
          );
          cardAnim.onfinish = () => cardAnim.cancel();
        } else {
          // 旧「从输入框底下发射」入场：纯位移+淡入（不加 scale，避免文字缩放抖动）
          const anim = first.animate(
            [
              { transform: 'translateY(-150px)', opacity: 0, offset: 0 },
              { transform: 'translateY(12px)', opacity: 1, offset: 0.55 },
              { transform: 'translateY(-2px)', opacity: 1, offset: 0.82 },
              { transform: 'none', opacity: 1, offset: 1 },
            ],
            { duration: 160, easing: 'cubic-bezier(0.12, 0.8, 0.2, 1)' },
          );
          anim.onfinish = () => anim.cancel();
        }
      }
    }

    // 删除后（回收站化 / 永久删）：下方卡片平滑上移补位（与入场对称的 FLIP）
    let removalAt = -1;
    if (prev.keys.length > 0 && keys.length === prev.keys.length - 1) {
      // 当前列表 = 上一屏去掉恰好一条（其余顺序不变）→ 找出被删的索引
      let j = 0;
      let missing = -1;
      let okSeq = true;
      for (let i = 0; i < prev.keys.length; i++) {
        if (j < keys.length && prev.keys[i] === keys[j]) {
          j++;
        } else if (missing === -1) {
          missing = i;
        } else {
          okSeq = false;
          break;
        }
      }
      if (okSeq && j === keys.length) {
        removalAt = missing;
      }
    }
    if (removalAt >= 0) {
      cards.forEach((card, idx) => {
        const prevIdx = idx < removalAt ? idx : idx + 1;
        const delta = (prev.tops[prevIdx] ?? 0) - tops[idx];
        if (Math.abs(delta) > 1) {
          const anim = card.animate(
            [{ transform: `translateY(${delta}px)` }, { transform: 'none' }],
            { duration: 160, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
          );
          anim.onfinish = () => anim.cancel();
        }
      });
    }

    layoutSnapRef.current = { keys, tops };
  });

  const handleMemoListClick = useCallback((event: React.MouseEvent) => {
    const { workspace } = appStore.getState().dailyNotesState.app;

    const targetEl = event.target as HTMLElement;
    if (targetEl.tagName === 'SPAN' && targetEl.className === 'tag-span') {
      const tagName = targetEl.innerText.slice(1);
      const currTagQuery = locationService.getState().query.tag;
      if (currTagQuery === tagName) {
        locationService.setTagQuery('');
      } else {
        locationService.setTagQuery(tagName);
      }
    } else if (targetEl.tagName === 'A' && targetEl.className === 'internal-link') {
      const sourcePath = targetEl.getAttribute('data-filepath') || '';
      if (sourcePath) {  // 只有在路径存在时才打开链接
        if (Platform.isMobile) {
          workspace.openLinkText(sourcePath, sourcePath, false);
        } else {
          workspace.openLinkText(sourcePath, sourcePath, true);
        }
      }
    }
  }, []);

  // 列表尾状态话术：仅在真有话可说时渲染（fetch/空/末页），空带不再常驻列表尾
  const statusText = isFetching
    ? t('Fetching data...')
    : shownMemos.length === 0
    ? t('Noooop!')
    : showMemoFilter
    ? ''
    : currentPage === totalPages
    ? t('All Data is Loaded 🎉')
    : '';

  return (
    <div
      className={`memolist-wrapper ${isFetching ? '' : 'completed'}`}
      onClick={handleMemoListClick}
      ref={wrapperElement}
    >
      {paginatedMemos.map((memo) => (
        <Memo key={`${memo.id}-${memo.updatedAt}`} memo={memo} />
      ))}
      {statusText && (
        <div className="status-text-container">
          <p className="status-text">{statusText}</p>
        </div>
      )}
      {!isFetching && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MemoList;
