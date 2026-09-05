import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Notice, TFile } from 'obsidian';
import appStore from '../stores/appStore';
import dailyNotesService from '../services/dailyNotesService';
import { hasMemoReferences } from '../helpers/memoLink';
import utils from '../helpers/utils';
import { formatMemoContent } from './Memo';
import MemoImage from './MemoImage';
import { showDialog } from './Dialog';
import '../less/random-memo-dialog.less';
import { t } from '../translations/helper';
import Close from '../icons/close.svg?component';
import Casino from '../icons/casino.svg?component';
import Journal from '../icons/journal.svg?component';

// ADR-0004 随机访问：全库非软删随机抽一 → 只读浮窗 + 再抽 + 打开当天日记
const RandomMemoDialog: React.FC<DialogProps> = ({ destroy }: DialogProps) => {
  const [memo, setMemo] = useState<Model.Memo | null>(null);
  const lastIdRef = useRef('');
  const showSeconds = appStore.getState().settingsState.settings.TimeFormat !== 'HH:mm';

  const pickRandom = useCallback(() => {
    const { memos } = appStore.getState().memoState;
    const hideRef = appStore.getState().settingsState.settings.HideRefMemosInList;
    // 候选口径与主列表无筛选态一致（MemoList）：排除旧评论残留 / 软删卡 / （设置开启时）引用卡
    const pool = memos.filter((m) => !m.linkId && !m.isDeleted && !(hideRef && hasMemoReferences(m.content)));
    if (pool.length === 0) {
      new Notice(t('No memo found'));
      return;
    }
    let pick = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1 && pick.id === lastIdRef.current) {
      // 避免连续抽中同一张
      for (let i = 0; i < 5 && pick.id === lastIdRef.current; i++) {
        pick = pool[Math.floor(Math.random() * pool.length)];
      }
    }
    lastIdRef.current = pick.id;
    setMemo(pick);
  }, []);

  useEffect(() => {
    pickRandom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenDiary = useCallback(async () => {
    if (!memo || !memo.path) return;
    const { app } = dailyNotesService.getState();
    const file = app.vault.getAbstractFileByPath(memo.path);
    if (file instanceof TFile) {
      const leaf = app.workspace.getLeaf(false);
      await leaf.openFile(file, { active: true });
    } else {
      new Notice('MEMO Not Found');
    }
  }, [memo]);

  return (
    <div className="random-memo-container">
      <div className="header-container">
        <p className="title-text">
          <Casino className="icon-img" />
          {t('Random memo')}
        </p>
        <button className="btn close-btn" onClick={destroy}>
          <Close className="icon-img" />
        </button>
      </div>
      {memo ? (
        <>
          <div className="date-text">
            {utils.getDateString(memo.createdAt)} · {utils.getDateTimeString(memo.createdAt, showSeconds)}
          </div>
          <div className="memo-container">
            <div
              className="memo-content-text"
              dangerouslySetInnerHTML={{ __html: formatMemoContent(memo.content) }}
            ></div>
            <MemoImage memo={memo.content} />
          </div>
          <div className="btns-container">
            <button className="btn random-btn" onClick={pickRandom}>
              <Casino className="icon-img" />
              {t('Draw another')}
            </button>
            <button className="btn diary-btn" onClick={handleOpenDiary}>
              <Journal className="icon-img" />
              {t('Open the daily note')}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default function showRandomMemoDialog(): void {
  showDialog(
    {
      className: 'random-memo-dialog',
    },
    RandomMemoDialog,
  );
}
