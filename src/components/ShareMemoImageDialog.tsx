import React, { useEffect, useRef, useState } from 'react';
// import { userService } from "../services";
import toImage from '../labs/html2image';
import { ANIMATION_DURATION } from '../helpers/consts';
import utils from '../helpers/utils';
import { showDialog } from './Dialog';
import { formatMemoContent } from './Memo';
import { parseMemoImages } from '../helpers/memoImages';
import Only from './common/OnlyWhen';
import '../less/share-memo-image-dialog.less';
import { moment, Notice, Platform, TFile } from 'obsidian';
import appStore from '../stores/appStore';
import lightBackground from '../icons/lightBackground.svg';
import darkBackground from '../icons/darkBackground.svg';

import { getAllDailyNotes } from 'obsidian-daily-notes-interface';
import { t } from '../translations/helper';
import { dailyNotesService } from '../services';
import Share from '../icons/share.svg?component';
import Close from '../icons/close.svg?component';

interface Props extends DialogProps {
  memo: Model.Memo;
}

const ShareMemoImageDialog: React.FC<Props> = (props: Props) => {
  const { memo: propsMemo, destroy } = props;
  const { memos } = appStore.getState().memoState;
  const { settings } = appStore.getState().settingsState;
  const { AutoSaveWhenOnMobile, DefaultDarkBackgroundImage, DefaultLightBackgroundImage, ShareFooterEnd, ShareFooterStart, UserName } = settings;
  let memosLength;
  let createdDays;
  if (memos.length) {
    memosLength = memos.length - 1;
    createdDays = memos
      ? Math.ceil((Date.now() - utils.getTimeStampByDate(memos[memosLength].createdAt)) / 1000 / 3600 / 24)
      : 0;
  }
  // const { user: userinfo } = userService.getState();
  const memo: FormattedMemo = {
    ...propsMemo,
    createdAtStr: utils.getDateTimeString(propsMemo.createdAt),
  };
  // const memoImgUrls = Array.from(memo.content.match(IMAGE_URL_REG) ?? []);
  // const memosNum = memos.length;

  const footerEnd = ShareFooterEnd.replace('{UserName}', UserName);
  const footerStart = ShareFooterStart.replace('{MemosNum}', memos.length.toString()).replace(
    '{UsedDay}',
    createdDays.toString(),
  );

  // 图片解析收敛到 memoImages 深模块（external/internal 分离供分享图渲染）
  const { app } = appStore.getState().dailyNotesState;
  const { external: externalImageUrls, internal: internalImageUrls } = parseMemoImages(memo.content, app);

  const [shortcutImgUrl, setShortcutImgUrl] = useState('');
  const [imgAmount, setImgAmount] = useState(externalImageUrls.length);
  const memoElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imgAmount > 0) {
      return;
    }

    changeBackgroundImage();

    setTimeout(() => {
      if (!memoElRef.current) {
        return;
      }

      let shareDialogBackgroundColor;

      if (document.body.className.contains('theme-dark')) {
        shareDialogBackgroundColor = '#727171';
      } else {
        shareDialogBackgroundColor = '#eaeaea';
      }

      toImage(memoElRef.current, {
        backgroundColor: shareDialogBackgroundColor,
        pixelRatio: window.devicePixelRatio * 2,
      })
        .then((url) => {
          setShortcutImgUrl(url);
        })
        .catch(() => {
          // do nth
        });
    }, ANIMATION_DURATION);
  }, [imgAmount]);

  const handleCloseBtnClick = () => {
    destroy();
  };

  const convertBase64ToBlob = (base64: string, type: string) => {
    const bytes = window.atob(base64);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: type });
  };

  const convertBackgroundToBase64 = async (path: string): Promise<string> => {
    const { vault } = dailyNotesService.getState().app;
    const buffer = await vault.adapter.readBinary(path);
    const arr = new Uint8Array(buffer);

    const blob = new Blob([arr], { type: 'image/png' });

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        // cachedResourceMap.set(url, base64Url);
        resolve(base64Url);
      };
      reader.readAsDataURL(blob);
    });
  };

  const changeBackgroundImage = async () => {
    const { app } = dailyNotesService.getState();
    let imageUrl;
    let imagePath;
    const lightBackgroundImage = encodeURI(lightBackground);
    const darkBackgroundImage = encodeURI(darkBackground);
    if (document.body.className.contains('theme-light')) {
      if (
        (await app.vault.adapter.exists(DefaultLightBackgroundImage)) &&
        /\.(png|svg|jpg|jpeg)/g.test(DefaultLightBackgroundImage)
      ) {
        imagePath = DefaultLightBackgroundImage;
        imageUrl = await convertBackgroundToBase64(imagePath);
      } else {
        imageUrl = lightBackgroundImage;
      }
    } else if (document.body.className.contains('theme-dark')) {
      if (
        (await app.vault.adapter.exists(DefaultDarkBackgroundImage)) &&
        /\.(png|svg|jpg|jpeg)/g.test(DefaultDarkBackgroundImage)
      ) {
        imagePath = DefaultDarkBackgroundImage;
        imageUrl = await convertBackgroundToBase64(imagePath);
      } else {
        imageUrl = darkBackgroundImage;
      }
    }
    const memoShareDiv = document.querySelector('.dialog-wrapper .memo-background .property-image') as HTMLElement;
    memoShareDiv.style.backgroundImage = "url('" + imageUrl + "')";
    if (document.body.className.contains('theme-dark')) {
      memoShareDiv.style.backgroundColor = '#1f1f1f';
    }
  };

  const handleCopytoClipboardBtnClick = async () => {
    const { vault } = appStore.getState().dailyNotesState.app;
    const divs = document.querySelector('.memo-shortcut-img') as HTMLElement;
    const myBase64 = divs.getAttribute('src').split('base64,')[1];
    const blobInput = convertBase64ToBlob(myBase64, 'image/png');
    let aFile: TFile;
    let newFile;
    if (AutoSaveWhenOnMobile && Platform.isMobile) {
      blobInput.arrayBuffer().then(async (buffer) => {
        const ext = 'png';
        const dailyNotes = getAllDailyNotes();
        for (const string in dailyNotes) {
          if (dailyNotes[string] instanceof TFile) {
            aFile = dailyNotes[string];
            break;
          }
        }
        if (aFile !== undefined) {
          newFile = await vault.createBinary(
            //@ts-expect-error, private method
            await vault.getAvailablePathForAttachments(`Pasted Image ${moment().format('YYYYMMDDHHmmss')}`, ext, aFile),
            buffer,
          );
        }
      });
    }
    const clipboardItemInput = new ClipboardItem({ 'image/png': blobInput });
    window.navigator['clipboard'].write([clipboardItemInput]);
    new Notice('Send to clipboard successfully');
  };

  const handleImageOnLoad = (ev: React.SyntheticEvent<HTMLImageElement>) => {
    if (ev.type === 'error') {
      new Notice(t('Image load failed'));
      (ev.target as HTMLImageElement).remove();
    }
    // 函数式更新，避免多图并发 onLoad 读到同一个 stale imgAmount 只减一次
    setImgAmount((n) => n - 1);
  };

  return (
    <>
      <div className="dialog-header-container">
        <p className="title-text">
          <span className="icon-text">🥰</span>
          {t('Share Memo Image')}
        </p>
        <div className="btn-group">
          <button className="btn copy-btn" onClick={handleCopytoClipboardBtnClick}>
            <Share className="icon-img" />
          </button>
          <button className="btn close-btn" onClick={handleCloseBtnClick}>
            <Close className="icon-img" />
          </button>
        </div>
      </div>
      <div className="dialog-content-container">
        <div className={`tip-words-container ${shortcutImgUrl ? 'finish' : 'loading'}`}>
          <p className="tip-text">{shortcutImgUrl ? t('↗Click the button to save') : t('Image is generating...')}</p>
        </div>
        <div className="memo-container" ref={memoElRef}>
          <Only when={shortcutImgUrl !== ''}>
            <img className="memo-shortcut-img" src={shortcutImgUrl} />
          </Only>
          <div className="memo-background">
            <div
              className="property-image"
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            {/* <span className="time-text">{memo.createdAtStr}</span> */}
            <span className="background-container"></span>
            <div
              className="memo-content-text"
              dangerouslySetInnerHTML={{ __html: formatMemoContent(memo.content) }}
            ></div>
            <Only when={externalImageUrls.length > 0}>
              <div className="images-container">
                {externalImageUrls.map((imgUrl, idx) => (
                  <img
                    // crossOrigin="anonymous"
                    // decoding="async"
                    key={idx}
                    src={imgUrl}
                    alt=""
                    referrerPolicy="no-referrer"
                    onLoad={handleImageOnLoad}
                    onError={handleImageOnLoad}
                  />
                ))}
              </div>
            </Only>
            <Only when={internalImageUrls.length > 0}>
              <div className="images-container internal-embed image-embed is-loaded">
                {internalImageUrls.map((imgUrl, idx) => (
                  <img key={idx} className="memo-img" src={imgUrl.path} alt={imgUrl.altText} path={imgUrl.filepath} />
                ))}
              </div>
            </Only>
            <div className="watermark-container">
              <span className="normal-text footer-start">
                <div className="property-social-icons"></div>
                <span className="name-text">{footerStart}</span>
              </span>
              <span className="normal-text footer-end">
                <span className="name-text">{footerEnd}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function showShareMemoImageDialog(memo: Model.Memo): void {
  showDialog(
    {
      className: 'share-memo-image-dialog',
    },
    ShareMemoImageDialog,
    { memo },
  );
}
