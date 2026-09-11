// import convertResourceToDataURL from "./convertResourceToDataURL";
// import { dailyNotesService } from '../../services';

import convertResourceToDataURL from './convertResourceToDataURL';

const getCloneStyledElement = async (element: HTMLElement) => {
  // 与原实现（新建同标签空壳 + 复制 innerHTML）等价：仍不带外层属性，只深拷贝子节点。
  // 不用 innerHTML 是社区审查的硬要求（禁止 innerHTML 赋值）。
  const clonedElementContainer = createEl(element.tagName);
  clonedElementContainer.append(...Array.from(element.childNodes, (node) => node.cloneNode(true)));

  const applyStyles = async (sourceElement: HTMLElement, clonedElement: HTMLElement) => {
    if (!sourceElement || !clonedElement) {
      return;
    }

    const sourceStyles = window.getComputedStyle(sourceElement);

    if (sourceElement.tagName === 'IMG') {
      try {
        const url = await convertResourceToDataURL(
          sourceElement.getAttribute('path') ?? sourceElement.getAttribute('src'),
        );
        (clonedElement as HTMLImageElement).src = url;
      } catch {
        // do nth
      }
    } else if (sourceElement.className === 'property-image') {
      try {
        const imageUrl = sourceElement.style.backgroundImage;
        const url = await convertResourceToDataURL(imageUrl);
        (clonedElement as HTMLImageElement).style.backgroundImage = url;
      } catch {
        // do nth
      }
    }

    for (const item of sourceStyles) {
      clonedElement.style.setProperty(
        item,
        sourceStyles.getPropertyValue(item),
        sourceStyles.getPropertyPriority(item),
      );
    }

    for (let i = 0; i < clonedElement.childElementCount; i++) {
      await applyStyles(sourceElement.children[i] as HTMLElement, clonedElement.children[i] as HTMLElement);
    }
  };

  await applyStyles(element, clonedElementContainer);

  return clonedElementContainer;
};

export default getCloneStyledElement;
