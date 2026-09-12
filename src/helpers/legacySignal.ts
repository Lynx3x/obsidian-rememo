/**
 * 旧格式行计数（解析端发现，供列表空态展示迁移引导）。
 *
 * 背景：读取端遇到旧版 Memos 写的单行 memo 是**静默跳过**的——从旧插件迁过来的用户
 * 装好后会看到空列表，却不知道数据其实还在文件里。这里把「库里有多少行旧格式 memo」按文件
 * 记下来并广播给 UI，空列表时就能直接给一句说明 + 跳转数据体检的入口。
 */
const perFile = new Map<string, number>();
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((l) => l());

export const legacySignal = {
  /** 某文件解析出的旧格式行数（为 0 时清除该文件记录） */
  report(path: string, count: number): void {
    if (count === 0) {
      if (!perFile.delete(path)) return;
    } else {
      if (perFile.get(path) === count) return;
      perFile.set(path, count);
    }
    notify();
  },

  /** 全量重读前清空（增量重读单文件不用清，report 会覆盖该文件） */
  reset(): void {
    if (perFile.size === 0) return;
    perFile.clear();
    notify();
  },

  total(): number {
    let n = 0;
    for (const v of perFile.values()) n += v;
    return n;
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
