import { debounce, HoverPopover, ItemView, Platform, TFile, WorkspaceLeaf } from 'obsidian';
import { MEMOS_VIEW_TYPE } from './constants';
import { applyContentFontSize } from './setting';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import type MemosPlugin from './index';
import { dailyNotesService, globalStateService, memoService } from './services';
import { getDateFromFile } from 'obsidian-daily-notes-interface';
import appStore from './stores/appStore';
import { preloadSendSound } from './helpers/sendSound';

export class Memos extends ItemView {
  plugin: MemosPlugin;
  hoverPopover: HoverPopover | null;
  private memosComponent: React.ReactElement;

  constructor(leaf: WorkspaceLeaf, plugin: MemosPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getDisplayText(): string {
    // TODO: Make this interactive: Either the active workspace or the local graph
    return 'Rememo';
  }

  getIcon(): string {
    return 'Memos';
  }

  getViewType(): string {
    return MEMOS_VIEW_TYPE;
  }

  private async onFileDeleted(file: TFile): Promise<void> {
    if (getDateFromFile(file, 'day')) {
      await dailyNotesService.getMyAllDailyNotes();
      memoService.clearMemos();
      void memoService.fetchAllMemos();
    }
  }

  private async onFileModified(file: TFile): Promise<void> {
    const date = getDateFromFile(file, 'day');
    if (date && this.memosComponent) {
      // 增量：只重读变化的文件，避免全量重读所有日记
      void memoService.fetchMemosFromFile(file);
    }
  }

  private onFileCreated(file: TFile): void {
    if (this.app.workspace.layoutReady && this.memosComponent) {
      if (getDateFromFile(file, 'day')) {
        void dailyNotesService.getMyAllDailyNotes();
        // memoService.clearMemos();
        // memoService.fetchAllMemos();
      }
    }
  }

  async handleResize() {
    const leaves = this.app.workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
    if (leaves.length > 0) {
      const leaf = leaves[0];
      if (leaf.width > 875) {
        // hide the sidebar

        globalStateService.setIsMobileView(false);
        leaf.view.containerEl.classList.remove('mobile-view');
        globalStateService.setIsMobileView(leaf.width <= 875);
        return;
      }

      if (ShowLeftSideBar && !Platform.isMobile) {
        return;
      }

      globalStateService.setIsMobileView(true);
      leaf.view.containerEl.classList.add('mobile-view');
      globalStateService.setIsMobileView(leaf.width <= 875);
    }
  }

  async onOpen(): Promise<void> {
    this.registerEvent(this.app.vault.on('create', (file) => this.onFileCreated(file)));
    this.registerEvent(this.app.vault.on('delete', (file) => this.onFileDeleted(file)));
    this.registerEvent(this.app.vault.on('modify', debounce((file) => this.onFileModified(file), 2000, true)));
    this.registerEvent(
      this.app.workspace.on('resize', () => {
        void this.handleResize();
      }),
    );

    dailyNotesService.getApp(this.app);

    // 视图重开：关闭期间 vault 监听已随 registerEvent 解绑，标记数据过期 → 页面挂载走一次全量重读
    // （视图打开频率低，不影响"切页不重读"的跳动修复；2026-09-10）
    memoService.invalidate();

    // 把设置注入响应式 store（组件经 context 订阅，实现响应式）
    appStore.dispatch({ type: 'SET_SETTINGS', payload: { settings: this.plugin.settings } });
    // 自定义字号：每次打开视图应用一次（设置页改动由 saveSettings 即时应用）
    applyContentFontSize(this.plugin.settings);

    // 发送音效预读+预解码：发送那刻起播没有"读盘+解码"延迟（2026-09-10）
    preloadSendSound(this.plugin.settings);

    MemoHeading = this.plugin.settings.MemoHeading;
    DefaultPrefix = this.plugin.settings.DefaultPrefix;
    DefaultEditorLocation = this.plugin.settings.DefaultEditorLocation;
    UseButtonToShowEditor = this.plugin.settings.UseButtonToShowEditor;
    FocusOnEditor = this.plugin.settings.FocusOnEditor;
    HideDoneTasks = this.plugin.settings.HideDoneTasks;
    OpenMemosAutomatically = this.plugin.settings.OpenMemosAutomatically;
    AutoSaveWhenOnMobile = this.plugin.settings.AutoSaveWhenOnMobile;
    DefaultDarkBackgroundImage = this.plugin.settings.DefaultDarkBackgroundImage;
    DefaultLightBackgroundImage = this.plugin.settings.DefaultLightBackgroundImage;
    ShowLeftSideBar = this.plugin.settings.ShowLeftSideBar;

    this.memosComponent = React.createElement(App);

    ReactDOM.render(this.memosComponent, this.contentEl);
  }

  async onClose() {
    // Nothing to clean up.
  }
}

/** Memo 区标题（2026-09-10 合并旧「插入标题/解析标题」两键）：写入其下、只读其下，缺失自动创建 */
export let MemoHeading: string;
export let DefaultPrefix: string;
export let DefaultEditorLocation: string;
export let UseButtonToShowEditor: boolean;
export let FocusOnEditor: boolean;
export let HideDoneTasks: boolean;
export let OpenMemosAutomatically: boolean;
export let AutoSaveWhenOnMobile: boolean;
export let DefaultDarkBackgroundImage: string;
export let DefaultLightBackgroundImage: string;
export let ShowLeftSideBar: boolean;
