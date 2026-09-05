/**
 * Define storage data type
 */
interface StorageData {
  // 编辑器输入缓存内容
  editorContentCache: string;
  // 分词开关
  shouldSplitMemoWord: boolean;
  // 是否隐藏图片链接地址
  shouldHideImageUrl: boolean;
  // markdown 解析开关
  shouldUseMarkdownParser: boolean;

  // 数据体检：用户忽略的行 key（"path#line" → true，行粒度）
  auditIgnoredLines: Record<string, boolean>;
}

type StorageKey = keyof StorageData;

/**
 * storage helper
 */
export namespace storage {
  export function get(keys: StorageKey[]): Partial<StorageData> {
    const data: Record<string, unknown> = {};

    for (const key of keys) {
      try {
        const stringifyValue = localStorage.getItem(key);
        if (stringifyValue !== null) {
          const val = JSON.parse(stringifyValue);
          data[key] = val;
        }
      } catch (error: any) {
        console.error('Get storage failed in ', key, error);
      }
    }

    return data as Partial<StorageData>;
  }

  export function set(data: Partial<StorageData>) {
    for (const key in data) {
      try {
        const stringifyValue = JSON.stringify(data[key as StorageKey]);
        localStorage.setItem(key, stringifyValue);
      } catch (error: any) {
        console.error('Save storage failed in ', key, error);
      }
    }
  }

  export function remove(keys: StorageKey[]) {
    for (const key of keys) {
      try {
        localStorage.removeItem(key);
      } catch (error: any) {
        console.error('Remove storage failed in ', key, error);
      }
    }
  }

  /** 移除未登记 key（历史残留清理用，如已退役的 tiny-undo 三个 key） */
  export function removeRaw(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error: any) {
      console.error('Remove storage failed in ', key, error);
    }
  }

  export function emitStorageChangedEvent() {
    const iframeEl = document.createElement('iframe');
    iframeEl.style.display = 'none';
    document.body.appendChild(iframeEl);

    iframeEl.contentWindow?.localStorage.setItem('t', Date.now().toString());
    iframeEl.remove();
  }
}
