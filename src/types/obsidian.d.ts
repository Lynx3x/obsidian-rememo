import type { TFile as ObsidianTFile, TFolder } from 'obsidian';

declare module 'obsidian' {
  interface App {
    plugins: {
      getPlugin(id: string): unknown;
    };
  }

  interface DataWriteOptions {
    silent?: boolean;
  }

  // 简化 DataAdapter 接口，使用 any 来处理方法的版本差异
  interface DataAdapter {
    process: unknown;
  }

  interface Vault {
    adapter: DataAdapter;
    getFileByPath(path: string): TFile | null;
    getFolderByPath(path: string): TFolder | null;
    getAllFolders(): TFolder[];
    createFolder(path: string): Promise<unknown>;
    read(file: TFile): Promise<string>;
    process(): Promise<void>;
  }
}

export interface BaseMemo {
  id: string;
  content: string;
  user_id?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  memoType: string;
  hasId: string;
  linkId: string;
  path?: string;
}

declare global {
  type TFile = ObsidianTFile & {
    vault: unknown;
    parent: TFolder;
  };

  interface Window {
    app: import('obsidian').App;
  }
}
