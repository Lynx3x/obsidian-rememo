import { parseMemoImages } from '../helpers/memoImages';
import utils from '../helpers/utils';
import { formatMemoContent } from './Memo';
import Only from './common/OnlyWhen';
import '../less/daily-memo.less';
import Image from './Image';
import React from 'react';
import appStore from '../stores/appStore';

interface DailyMemo extends FormattedMemo {
  timeStr: string;
}

interface Props {
  memo: Model.Memo;
}

const DailyMemo: React.FC<Props> = (props: Props) => {
  const { app } = appStore.getState().dailyNotesState;
  const { memo: propsMemo } = props;
  const memo: DailyMemo = {
    ...propsMemo,
    createdAtStr: utils.getDateTimeString(propsMemo.createdAt),
    timeStr: utils.getTimeString(propsMemo.createdAt),
  };

  // 图片解析收敛到 memoImages 深模块（含 external/internal 分离，供区块渲染）
  const { external, internal } = parseMemoImages(memo.content, app);
  const allImages = [
    ...external.map((u) => ({ src: u })),
    ...internal.map((img) => ({ src: img.path, filepath: img.filepath })),
  ];

  return (
    <div className="daily-memo-wrapper">
      <div className="time-wrapper">
        <span className="normal-text">{memo.timeStr}</span>
      </div>
      <div className="memo-content-container">
        <div className="memo-content-text" dangerouslySetInnerHTML={{ __html: formatMemoContent(memo.content) }}></div>
        <Only when={external.length > 0}>
          <div className="images-container">
            {external.map((imgUrl, idx) => (
              <Image
                key={idx}
                className="memo-img"
                imgUrl={imgUrl}
                alt=""
                referrerPolicy="no-referrer"
                allImages={allImages}
                index={idx}
              />
            ))}
          </div>
        </Only>
        <Only when={internal.length > 0}>
          <div className="images-container internal-embed image-embed is-loaded">
            {internal.map((imgUrl, idx) => (
              <Image
                key={idx}
                className="memo-img"
                imgUrl={imgUrl.path}
                alt={imgUrl.altText}
                filepath={imgUrl.filepath}
                allImages={allImages}
                index={external.length + idx}
              />
            ))}
          </div>
        </Only>
      </div>
    </div>
  );
};

export default DailyMemo;
