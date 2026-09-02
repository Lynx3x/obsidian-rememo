import React from 'react';
import ReactDOM from 'react-dom';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import '../less/preview-lightbox.less';
import { t } from '../translations/helper';

/**
 * 图片预览 — 直接渲染 yet-another-react-lightbox（官方全屏灯箱）。
 *
 * 之前套在自定义 showDialog 弹窗里，双层遮罩/居中容器会与灯箱自身的全屏
 * 定位冲突（右上角出现不可点的 prev/next 文本、遮罩错乱）。这里改为独立挂载，
 * 灯箱自带遮罩/工具栏/左右导航，Zoom 插件提供缩放。多图时库原生显示左右箭头。
 */

export interface PreviewSlide {
  src: string;
  filepath?: string;
}

interface LightboxHostProps {
  slides: PreviewSlide[];
  startIndex: number;
  onClose: () => void;
}

const LightboxHost: React.FC<LightboxHostProps> = ({ slides, startIndex, onClose }) => {
  const [open, setOpen] = React.useState(true);
  const hasMultipleImages = slides.length > 1;

  return (
    <Lightbox
      open={open}
      close={() => {
        setOpen(false);
        onClose();
      }}
      slides={slides.map((s) => ({ src: s.src, filepath: s.filepath }))}
      index={Math.min(startIndex, Math.max(0, slides.length - 1))}
      plugins={[Zoom]}
      zoom={{
        maxZoomPixelRatio: 5,
        zoomInMultiplier: 1.5,
        wheelZoomDistanceFactor: 300,
        pinchZoomDistanceFactor: 300,
        scrollToZoom: true,
        doubleClickMaxStops: 2,
        doubleClickDelay: 300,
        keyboardMoveDistance: 50,
      }}
      carousel={{
        finite: !hasMultipleImages,
        preload: slides.length,
      }}
      toolbar={{
        buttons: ['zoom', 'close'],
      }}
      render={{
        iconLoading: () => <div>{t('Image is loading...')}</div>,
        iconError: () => <div>{t('😟 Cannot load image, image link maybe broken')}</div>,
        // 单图时不显示左右箭头（finite 只禁用，仍需显式隐藏）
        buttonPrev: hasMultipleImages ? undefined : () => null,
        buttonNext: hasMultipleImages ? undefined : () => null,
      }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
      }}
    />
  );
};

/** 挂载预览灯箱的宿主元素 */
let lightboxHost: HTMLDivElement | null = null;

export function showPreviewImageDialog(
  imgUrl: string,
  filepath?: string,
  allImages?: PreviewSlide[],
  startIndex = 0,
): void {
  // 已打开时先清理，避免多次点击叠加
  if (lightboxHost) {
    ReactDOM.unmountComponentAtNode(lightboxHost);
    lightboxHost.remove();
    lightboxHost = null;
  }

  const host = document.createElement('div');
  document.body.appendChild(host);
  lightboxHost = host;

  const slides: PreviewSlide[] =
    allImages && allImages.length > 0 ? allImages : [{ src: imgUrl, filepath }];

  const cleanup = () => {
    if (lightboxHost) {
      ReactDOM.unmountComponentAtNode(lightboxHost);
      lightboxHost.remove();
      lightboxHost = null;
    }
  };

  ReactDOM.render(
    <LightboxHost slides={slides} startIndex={startIndex} onClose={cleanup} />,
    host,
  );
}
