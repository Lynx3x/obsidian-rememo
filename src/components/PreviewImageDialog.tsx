import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { showDialog } from './Dialog';
import '../less/preview-image-dialog.less';
import appStore from '../stores/appStore';
import { Notice } from 'obsidian';
import { t } from '../translations/helper';

interface Props extends DialogProps {
  imgUrl: string;
  filepath?: string;
  allImages?: Array<{
    src: string;
    filepath?: string;
  }>;
  startIndex?: number;
}

const PreviewImageDialog: React.FC<Props> = ({ 
  destroy, 
  imgUrl, 
  filepath, 
  allImages, 
  startIndex = 0 
}: Props) => {
  const { vault } = appStore.getState().dailyNotesState.app;

  const copyImageToClipboard = async () => {
    try {
      if (!filepath && imgUrl) {
        const myBase64 = imgUrl.split('base64,')[1];
        const blobInput = new Blob([Uint8Array.from(atob(myBase64), c => c.charCodeAt(0))], { type: 'image/png' });
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blobInput })]);
      } else if (filepath) {
        const buffer = await vault.adapter.readBinary(filepath);
        const blob = new Blob([buffer], { type: 'image/png' });
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      }
      new Notice(t('Copied to clipboard Successfully'));
    } catch (err) {
      console.error('Failed to copy image:', err);
      new Notice(t('Fetch Error'));
    }
  };

  const slides = allImages || [{ src: imgUrl }];
  const hasMultipleImages = slides.length > 1;

  return (
    <div className="preview-dialog-lightbox">
      <Lightbox
        open={true}
        close={destroy}
        slides={slides}
        index={startIndex}
        plugins={[Zoom]}
        animation={{ fade: 300 }}
        carousel={{ 
          finite: !hasMultipleImages,
          preload: 1
        }}
        zoom={{
          maxZoomPixelRatio: 5,
          zoomInMultiplier: 1.5,
          wheelZoomDistanceFactor: 300,
          pinchZoomDistanceFactor: 300,
          scrollToZoom: true,
          doubleClickMaxStops: 2,
          doubleClickDelay: 300,
          keyboardMoveDistance: 50
        }}
        render={{
          iconLoading: () => <div>{t('Image is loading...')}</div>,
          iconError: () => <div>{t('😟 Cannot load image, image link maybe broken')}</div>
        }}
        toolbar={{
          buttons: hasMultipleImages 
            ? ['prev', 'zoom', 'next', 'close']
            : ['zoom', 'close']
        }}
        styles={{
          root: { position: 'absolute', inset: 0 },
          container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }
        }}
      />
      <button
        type="button"
        className="yarl__button copy-button"
        onClick={copyImageToClipboard}
      >
        📋
      </button>
    </div>
  );
};

export default function showPreviewImageDialog(
  imgUrl: string, 
  filepath?: string,
  allImages?: Array<{ src: string; filepath?: string }>,
  startIndex?: number
): void {
  showDialog(
    {
      className: 'preview-image-dialog',
      clickSpaceDestroy: false
    },
    PreviewImageDialog,
    { imgUrl, filepath, allImages, startIndex }
  );
}
