import { TFile, Vault } from 'obsidian';
import React from 'react';
import { IMAGE_URL_REG, MARKDOWN_URL_REG, MARKDOWN_WEB_URL_REG, WIKI_IMAGE_URL_REG } from '../helpers/consts';
import appStore from '../stores/appStore';
import Image from './Image';

const imageGridStyles = {
  display: 'grid',
  gridTemplateColumns: `repeat(3, 150px)`,
  gap: '1px',
  marginTop: '4px',
  maxWidth: '452px'
} as const;

const imageItemStyles = {
  width: '150px',
  height: '150px',
} as const;

const imageStyle = {
  width: '100%',
  height: '100%'
} as const;

interface Props {
  memo: string;
}

interface LinkMatch {
  linkText: string;
  altText: string;
  path: string;
  filepath?: string;
}

const MemoImage: React.FC<Props> = (props: Props) => {
  const { memo } = props;

  const getPathOfImage = (vault: Vault, image: TFile) => {
    return vault.getResourcePath(image);
  };

  const detectWikiInternalLink = (lineText: string): LinkMatch | null => {
    const { metadataCache, vault } = appStore.getState().dailyNotesState.app;
    const internalFileName = WIKI_IMAGE_URL_REG.exec(lineText)?.[1];
    const internalAltName = WIKI_IMAGE_URL_REG.exec(lineText)?.[5];
    const file = metadataCache.getFirstLinkpathDest(decodeURIComponent(internalFileName), '');

    if (file === null) {
      return {
        linkText: internalFileName,
        altText: internalAltName,
        path: '',
        filepath: '',
      };
    } else {
      const imagePath = getPathOfImage(vault, file);
      const filePath = file.path;
      return {
        linkText: internalFileName,
        altText: internalAltName || '',
        path: imagePath,
        filepath: filePath,
      };
    }
  };

  const detectMDInternalLink = (lineText: string): LinkMatch | null => {
    const { metadataCache, vault } = appStore.getState().dailyNotesState.app;
    const internalFileName = MARKDOWN_URL_REG.exec(lineText)?.[5];
    const internalAltName = MARKDOWN_URL_REG.exec(lineText)?.[2];
    const file = metadataCache.getFirstLinkpathDest(decodeURIComponent(internalFileName), '');
    
    if (file === null) {
      return {
        linkText: internalFileName,
        altText: internalAltName,
        path: '',
        filepath: '',
      };
    } else {
      const imagePath = getPathOfImage(vault, file);
      const filePath = file.path;
      return {
        linkText: internalFileName,
        altText: internalAltName || '',
        path: imagePath,
        filepath: filePath,
      };
    }
  };

  const allImages: Array<{ src: string; filepath?: string }> = [];

  // 处理外部图片
  if (MARKDOWN_WEB_URL_REG.test(memo)) {
    const externalUrls = Array.from(memo.match(MARKDOWN_WEB_URL_REG) || []);
    allImages.push(...externalUrls.map(url => ({ src: url })));
  }

  // 处理 Markdown 格式的链接
  if (MARKDOWN_URL_REG.test(memo)) {
    const markdownLinks = Array.from(memo.match(MARKDOWN_URL_REG) || []);
    for (const link of markdownLinks) {
      if (/(.*)http[s]?(.*)/.test(link)) {
        const url = [...(link as string).matchAll(MARKDOWN_URL_REG)][0]?.[5];
        if (url) allImages.push({ src: url });
      } else {
        const result = detectMDInternalLink(link);
        if (result?.path) {
          allImages.push({
            src: result.path,
            filepath: result.filepath
          });
        }
      }
    }
  }

  // 处理 Wiki 格式的链接
  if (WIKI_IMAGE_URL_REG.test(memo)) {
    const wikiLinks = Array.from(memo.match(WIKI_IMAGE_URL_REG) || []);
    for (const link of wikiLinks) {
      const result = detectWikiInternalLink(link);
      if (result?.path) {
        allImages.push({
          src: result.path,
          filepath: result.filepath
        });
      }
    }
  }

  if (allImages.length === 0) {
    return null;
  }

  return (
    <div className="images-wrapper" style={imageGridStyles}>
      {allImages.map((image, idx) => (
        <div key={idx} style={imageItemStyles}>
          <Image
            className="memo-img"
            imgUrl={image.src}
            alt=""
            filepath={image.filepath}
            style={imageStyle}
            referrerPolicy={!image.filepath ? 'no-referrer' : undefined}
            allImages={allImages}
            index={idx}
          />
        </div>
      ))}
    </div>
  );
};

export default MemoImage;
