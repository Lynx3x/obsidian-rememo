// P3 引用条（卡底"引用自"列表，ADR-0003）——Memo 卡/回收站卡/浮窗共用，防三处漂移。
// 展示：正文 MEMO_LINK 目标 → 卡底小字条（同文件省略日期，预览实时取目标内容）；
//   点击由调用方决定（主列表/回收站 = 打开目标浮窗；浮窗内 = 内部导航）。
import React from 'react';
import { extractLinkTargets, refPreview, refTimeLabel } from '../helpers/memoLink';
import { memoService } from '../services';
import { t } from '../translations/helper';

interface Props {
  content: string;
  /** 当前卡所在文件路径（同文件引用省略日期前缀） */
  currentPath: string;
  /** 点击一条引用（目标存在时） */
  onOpenMemo: (memo: Model.Memo) => void;
}

const MemoRefBar: React.FC<Props> = ({ content, currentPath, onOpenMemo }) => {
  const refTargets = extractLinkTargets(content);
  if (refTargets.length === 0) return null;
  return (
    <div className="memo-ref-bar">
      {refTargets.map((target) => {
        const tm = memoService.getMemoByLinkTarget(target);
        if (!tm) {
          return (
            <span key={target} className="memo-ref-item missing">
              ↗ {t('Reference target deleted')}
            </span>
          );
        }
        const timeLabel = refTimeLabel(tm.createdAt ?? '', tm.path, currentPath);
        const preview = refPreview(tm.content, 30);
        return (
          <span
            key={target}
            className="memo-ref-item"
            title={preview || timeLabel}
            onClick={() => onOpenMemo(tm)}
          >
            ↗ {timeLabel}· {preview}
          </span>
        );
      })}
    </div>
  );
};

export default MemoRefBar;
