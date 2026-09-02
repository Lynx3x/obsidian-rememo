import React from 'react';
import { parseMemoImages } from '../helpers/memoImages';
import appStore from '../stores/appStore';
import Image from './Image';

// 微博式九宫格：列数上限 3，格子定宽不随容器拉伸；单图只占一格（不撑满整行）
// cell: 多图格宽小（紧凑），单图格宽稍大但仍远小于整行
const MAX_COLS = 3;
const GAP = 2;
const CELL_WIDTH = 110;
const SINGLE_CELL_WIDTH = 160;

interface Props {
  memo: string;
}

const MemoImage: React.FC<Props> = (props: Props) => {
  const { memo } = props;
  const { app } = appStore.getState().dailyNotesState;
  // 图片解析收敛到 memoImages 深模块（external+internal 合并成 all，供九宫格与灯箱）
  const { all } = parseMemoImages(memo, app);

  if (all.length === 0) {
    return null;
  }

  const count = all.length;
  const cols = count >= MAX_COLS ? MAX_COLS : count;
  const cell = count === 1 ? SINGLE_CELL_WIDTH : CELL_WIDTH;
  const gridWidth = cols * cell + (cols - 1) * GAP;

  const imageGridStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: `${GAP}px`,
    marginTop: '4px',
    // 定宽包裹，窄卡片时收缩（minmax 0 均分）
    width: `${gridWidth}px`,
    maxWidth: '100%',
  } as const;

  const imageItemStyles = {
    aspectRatio: '1 / 1',
    overflow: 'hidden',
  } as const;

  const imageStyle = {
    width: '100%',
    height: '100%',
  } as const;

  return (
    <div className="images-wrapper" style={imageGridStyles}>
      {all.map((image, idx) => (
        <div key={idx} style={imageItemStyles}>
          <Image
            className="memo-img"
            imgUrl={image.src}
            alt=""
            filepath={image.filepath}
            style={imageStyle}
            referrerPolicy={!image.filepath ? 'no-referrer' : undefined}
            allImages={all}
            index={idx}
          />
        </div>
      ))}
    </div>
  );
};

export default MemoImage;
