import React, { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { moment } from 'obsidian';
import DatePicker from './DatePicker';
import { t } from '../../translations/helper';

interface WriteDatePopoverProps {
  /** 锚点元素（编辑器工具栏的日历按钮），null 时不渲染 */
  anchorEl: HTMLElement | null;
  /** 当前已提交的写入目标；null = 默认写"现在/今天" */
  value: moment.Moment | null;
  /** 确认目标日期（含时分） */
  onSet: (target: moment.Moment) => void;
  /** 清除目标，恢复默认"现在/今天" */
  onClear: () => void;
  /** 关闭面板 */
  onClose: () => void;
}

/**
 * 指定日期写入面板：DatePicker 网格 + HH:mm 输入。
 * 挂在日历按钮上由 react-popper 定位；点击外部 / Esc 关闭。
 * 秒固定为 00（memo 行时间统一 HH:mm:ss）。
 */
const WriteDatePopover: React.FC<WriteDatePopoverProps> = (props) => {
  const { anchorEl, value, onSet, onClear, onClose } = props;

  // 打开即用「当前目标 ?? 现在」预填（组件随打开挂载，无需随 props 同步）
  const [draftDateMs, setDraftDateMs] = useState<number>(() =>
    moment(value ?? moment()).startOf('day').valueOf(),
  );
  const [draftTime, setDraftTime] = useState<string>(() => moment(value ?? moment()).format('HH:mm'));
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
    if (!anchorEl) {
      return;
    }
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (popperEl && popperEl.contains(target)) {
        return;
      }
      if (anchorEl.contains(target)) {
        // 锚点自身的 toggle 由 MemoEditor 处理，这里跳过避免开关翻转
        return;
      }
      onClose();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [anchorEl, popperEl, onClose]);

  if (!anchorEl) {
    return null;
  }

  const handleConfirm = () => {
    const [h = 0, m = 0] = draftTime.split(':').map((n) => parseInt(n));
    const target = moment(draftDateMs)
      .hours(h)
      .minutes(m)
      .seconds(0)
      .milliseconds(0);
    onSet(target);
    onClose();
  };

  const handleToday = () => {
    setDraftDateMs(moment().startOf('day').valueOf());
  };

  const handleClear = () => {
    onClear();
    onClose();
  };

  const draftLabel = moment(draftDateMs).format('YYYY-MM-DD');

  return (
    <div ref={setPopperEl} className="memo-write-date-popover" style={styles.popper} {...attributes.popper} role="dialog">
      <DatePicker
        className="editor-date-picker"
        datestamp={draftDateMs}
        handleDateStampChange={(ms) => setDraftDateMs(ms)}
      />
      <div className="write-date-row">
        <span className="write-date-label">{t('Time')}</span>
        <input
          className="write-date-time"
          type="time"
          value={draftTime}
          step="60"
          onChange={(e) => setDraftTime(e.target.value)}
        />
      </div>
      <div className="write-date-actions">
        <div className="write-date-ghost-actions">
          <span className="ghost-btn" onClick={handleToday}>
            {t('Today')}
          </span>
          {value && (
            <span className="ghost-btn danger" onClick={handleClear}>
              {t('Back to now')}
            </span>
          )}
        </div>
        <button className="write-date-confirm" onClick={handleConfirm}>
          {t('Write on')} {draftLabel} {draftTime}
        </button>
      </div>
    </div>
  );
};

export default WriteDatePopover;
