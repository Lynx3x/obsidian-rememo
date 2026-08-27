import { showPreviewImageDialog } from './PreviewImageDialog';
import '../less/image.less';
import React from 'react';

interface Props {
  imgUrl: string;
  className?: string;
  alt: string;
  referrerPolicy?: 'no-referrer';
  filepath?: string;
  style?: React.CSSProperties;
  allImages?: Array<{
    src: string;
    filepath?: string;
  }>;
  index?: number;
}

const Image: React.FC<Props> = (props: Props) => {
  const { className, imgUrl, alt, referrerPolicy, filepath, allImages, index } = props;

  const handleImageClick = () => {
    if (allImages && typeof index === 'number') {
      showPreviewImageDialog(imgUrl, filepath, allImages, index);
    } else {
      showPreviewImageDialog(imgUrl, filepath);
    }
  };

  return (
    <div className={'image-container ' + className} onClick={handleImageClick} style={props.style}>
      <img 
        src={imgUrl} 
        alt={alt} 
        decoding="async" 
        loading="lazy" 
        referrerPolicy={referrerPolicy} 
        style={{width: '100%', height: '100%', objectFit: 'cover'}} 
      />
    </div>
  );
};

export default Image;
