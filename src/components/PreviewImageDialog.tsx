import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { showDialog } from './Dialog';
import '../less/preview-image-dialog.less';
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
  allImages, 
  startIndex = 0 
}: Props) => {
  const slides = allImages || [{ src: imgUrl }];
  const hasMultipleImages = slides.length > 1;

  return (
    <Lightbox
      open={true}
      close={destroy}
      slides={slides}
      index={startIndex}
      plugins={[Zoom]}
      carousel={{
        finite: !hasMultipleImages,
        preload: slides.length
      }}
      animation={{
        fade: 150
      }}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.9)" }
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
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true
      }}
      render={{
        iconLoading: () => <div>{t('Image is loading...')}</div>,
        iconError: () => <div>{t('😟 Cannot load image, image link maybe broken')}</div>,
        buttonPrev: hasMultipleImages ? undefined : () => null,
        buttonNext: hasMultipleImages ? undefined : () => null
      }}
      toolbar={{
        buttons: hasMultipleImages 
          ? ['prev', 'zoom', 'next', 'close']
          : ['zoom', 'close']
      }}
    />
  );
};

export function showPreviewImageDialog(
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

export default PreviewImageDialog;
