// P3c @ 引用选择器：点选一条 memo 作为引用目标（markMemoId），发送时拼引用行。
// 定位 = react-popper（与 WriteDatePopover 同款，规避祖先 transform 破坏 fixed 的坑）。
import React, { useEffect, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';
import { memoService } from '../services';
import { refPreview } from '../helpers/memoLink';
import { t } from '../translations/helper';

interface Props {
  anchorEl: HTMLElement | null;
  /** 当前已选引用目标（active 高亮；点击条目 = toggle） */
  selectedIds: string[];
  onPick: (memo: Model.Memo) => void;
  onClose: () => void;
}

const RefMemoPicker: React.FC<Props> = ({ anchorEl, selectedIds, onPick, onClose }) => {
  const [query, setQuery] = useState('');
  const [popperEl, setPopperEl] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(anchorEl, popperEl, {
    placement: 'bottom-start',
    modifiers: [
      { name: 'flip', options: { fallbackPlacements: ['top-start'] } },
      { name: 'preventOverflow', options: { padding: 8 } },
    ],
  });

  // 点击面板与锚点之外 / Esc → 关闭
  useEffect(() => {
    if (!anchorEl) return;
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (popperEl && popperEl.contains(target)) return;
      if (anchorEl.contains(target)) return; // 锚点 toggle 由按钮自己处理
      onClose();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl, popperEl]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = memoService
      .getState()
      .memos.filter((m) => !m.isDeleted && (q === '' || m.content.toLowerCase().includes(q)));
    // 已选目标置顶，其余按时间降序
    const sorted = [...all].sort((a, b) => {
      const aSel = selectedIds.includes(a.id) ? 1 : 0;
      const bSel = selectedIds.includes(b.id) ? 1 : 0;
      if (aSel !== bSel) return bSel - aSel;
      return (b.createdAt ?? '').localeCompare(a.createdAt ?? '');
    });
    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedIds]);

  return (
    <div ref={setPopperEl} className="memo-ref-picker" style={styles.popper} {...attributes.popper}>
      <input
        className="memo-ref-picker-search"
        autoFocus
        placeholder={t('Search memos...')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
      />
      <div className="memo-ref-picker-list">
        {list.slice(0, 40).map((m) => {
          const active = selectedIds.includes(m.id);
          return (
            <div
              className={`memo-ref-picker-item ${active ? 'active' : ''}`}
              key={m.id}
              onClick={() => onPick(m)}
            >
              <span className="time">{(m.createdAt ?? '').slice(2, 16)}</span>
              <span className="preview">{refPreview(m.content, 42)}</span>
              {active && <span className="check">✓</span>}
            </div>
          );
        })}
        {list.length === 0 && <div className="memo-ref-picker-empty">{t('No memos found')}</div>}
      </div>
    </div>
  );
};

export default RefMemoPicker;
