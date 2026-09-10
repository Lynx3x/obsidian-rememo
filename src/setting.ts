import { App, DropdownComponent, PluginSettingTab, Setting } from 'obsidian';
import type MemosPlugin from './index';
import { MEMOS_VIEW_TYPE } from './constants';
import memoService from './services/memoService';
import locationService from './services/locationService';
import { t } from './translations/helper';

export interface MemosSettings {
  /** Memo 区标题（2026-09-10 合并旧「插入标题/解析标题」两键）：默认 '## Memo'；写入其下、只读其下；缺失时写入端自动创建 */
  MemoHeading: string;
  ShareFooterStart: string;
  ShareFooterEnd: string;
  DefaultPrefix: string;
  DefaultEditorLocation: string;
  UseButtonToShowEditor: boolean;
  FocusOnEditor: boolean;
  HideDoneTasks: boolean;
  /** 主列表不显示引用卡（P3 引用模型；搜索/过滤时仍可见）。默认 true = 隐藏 */
  HideRefMemosInList: boolean;
  /** 删除路径总开关（2026-09-09 实施）：true = 删除进回收站（软删可恢复，默认）；false = 删除直接永久删，且侧栏回收站入口隐藏（旧软删数据保留，重开恢复） */
  EnableRecycleBin: boolean;
  /** 回收站自动清理保留期（2026-09-10）：'never'（默认，永不删）| '7' | '30' | '90' | '180'（天）；超期已删卡在全量加载后整块永久删 */
  RecycleBinRetention: 'never' | '7' | '30' | '90' | '180';
  /** 侧栏标签视图形态（2026-09-10）：'flat' = 平铺全名（默认）；'tree' = 层级折叠树 */
  TagListView: 'flat' | 'tree';
  /** 热力图周起点（2026-09-10）：'sunday'（默认）| 'monday' —— 渲染排布用 */
  HeatMapStartDay: 'sunday' | 'monday';
  /** 是否显示侧栏热力图（2026-09-10）：默认 true；关闭时隐藏区块，导航随之上浮 */
  ShowHeatMap: boolean;
  /** 按 Enter 直接发送（Ctrl+Enter 换行）；默认 false = Enter 换行、Ctrl+Enter 发送 */
  EnterToSend: boolean;
  OpenMemosAutomatically: boolean;
  AutoSaveWhenOnMobile: boolean;
  DefaultLightBackgroundImage: string;
  DefaultDarkBackgroundImage: string;
  ShowLeftSideBar: boolean;
  /** 界面时间显示格式：'HH:mm'（不带秒，默认）| 'HH:mm:ss'（带秒）。只影响渲染，不改文件数据 */
  TimeFormat: 'HH:mm:ss' | 'HH:mm';
}

export const DEFAULT_SETTINGS: MemosSettings = {
  MemoHeading: '## Memo',
  ShareFooterStart: '{MemosNum} Memos {UsedDay} Day',
  ShareFooterEnd: '✍️ Rememo',
  DefaultPrefix: 'List',
  DefaultEditorLocation: 'Top',
  UseButtonToShowEditor: false,
  FocusOnEditor: true,
  HideDoneTasks: false,
  HideRefMemosInList: true,
  EnableRecycleBin: true,
  RecycleBinRetention: 'never',
  TagListView: 'flat',
  HeatMapStartDay: 'sunday',
  ShowHeatMap: true,
  EnterToSend: false,
  OpenMemosAutomatically: false,
  AutoSaveWhenOnMobile: false,
  DefaultLightBackgroundImage: '',
  DefaultDarkBackgroundImage: '',
  ShowLeftSideBar: false,
  TimeFormat: 'HH:mm',
};

export class MemosSettingTab extends PluginSettingTab {
  plugin: MemosPlugin;
  //eslint-disable-next-line
  private applyDebounceTimer: number = 0;

  constructor(app: App, plugin: MemosPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  applySettingsUpdate() {
    clearTimeout(this.applyDebounceTimer);
    const plugin = this.plugin;
    this.applyDebounceTimer = window.setTimeout(() => {
      plugin.saveSettings();
    }, 100);
    memoService.updateTagsState();
  }

  //eslint-disable-next-line
  async hide() {}

  async display() {
    await this.plugin.loadSettings();

    const { containerEl } = this;
    this.containerEl.empty();

    // ===== 记录（写入 / 输入）=====
    new Setting(containerEl).setName(t('Memo')).setHeading();

    new Setting(containerEl)
      .setName(t('Memo heading'))
      .setDesc(
        t(
          'New memos are written below this heading, and only entries below it are read. If the heading is missing, it will be created automatically. Default: ## Memo',
        ),
      )
      .addText((text) =>
        text
          .setPlaceholder(DEFAULT_SETTINGS.MemoHeading)
          .setValue(this.plugin.settings.MemoHeading)
          .onChange(async (value) => {
            this.plugin.settings.MemoHeading = value;
            this.applySettingsUpdate();
          }),
      );

    new Setting(containerEl)
      .setName(t('Default prefix'))
      .setDesc(t("Set the default prefix when create memo, 'List' by default."))
      .addDropdown(async (d: DropdownComponent) => {
        d.addOption('List', t('List'));
        d.addOption('Task', t('Task'));
        d.setValue(this.plugin.settings.DefaultPrefix).onChange(async (value) => {
          this.plugin.settings.DefaultPrefix = value;
          this.applySettingsUpdate();
        });
      });

    new Setting(containerEl)
      .setName(t('Time display format'))
      .setDesc(t('Time display format description'))
      .addDropdown(async (d: DropdownComponent) => {
        d.addOption('HH:mm', 'HH:mm');
        d.addOption('HH:mm:ss', 'HH:mm:ss');
        d.setValue(this.plugin.settings.TimeFormat).onChange(async (value: 'HH:mm:ss' | 'HH:mm') => {
          this.plugin.settings.TimeFormat = value;
          this.applySettingsUpdate();
        });
      });

    new Setting(containerEl)
      .setName(t('Send memo by Enter key'))
      .setDesc(t('When enabled, pressing Enter sends the memo and Ctrl/Cmd+Enter inserts a new line. Off by default.'))
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.EnterToSend).onChange(async (value) => {
          this.plugin.settings.EnterToSend = value;
          this.applySettingsUpdate();
        }),
      );

    new Setting(containerEl)
      .setName(t('Focus on editor when open memos'))
      .setDesc(t('Focus on editor when open memos. Focus by default.'))
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.FocusOnEditor).onChange(async (value) => {
          this.plugin.settings.FocusOnEditor = value;
          this.applySettingsUpdate();
        }),
      );

    // ===== 列表与侧栏 =====
    new Setting(containerEl).setName(t('List & Sidebar')).setHeading();

    new Setting(containerEl)
      .setName(t('Hide done tasks in Memo list'))
      .setDesc(t('Hide all done tasks in Memo list. Show done tasks by default.'))
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.HideDoneTasks).onChange(async (value) => {
          this.plugin.settings.HideDoneTasks = value;
          this.applySettingsUpdate();
        }),
      );

    new Setting(containerEl)
      .setName(t('Hide Memos With References In List'))
      .setDesc(
        t(
          'Hide referenced memos in the main list (they are shown under the memo they reference). They still appear when searching/filtering. True by default.',
        ),
      )
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.HideRefMemosInList).onChange(async (value) => {
          this.plugin.settings.HideRefMemosInList = value;
          this.applySettingsUpdate();
        }),
      );

    new Setting(containerEl)
      .setName(t('Show Heat Map'))
      .setDesc(t('Whether to show the usage heat map in the sidebar. True by default.'))
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.ShowHeatMap).onChange(async (value) => {
          this.plugin.settings.ShowHeatMap = value;
          this.applySettingsUpdate();
        }),
      );

    new Setting(containerEl)
      .setName(t('Start day of week'))
      .setDesc(t('The first day of each column in the heat map. Sunday by default.'))
      .addDropdown(async (d: DropdownComponent) => {
        d.addOption('sunday', t('weekDays')[0]);
        d.addOption('monday', t('weekDays')[1]);
        d.setValue(this.plugin.settings.HeatMapStartDay).onChange(async (value: 'sunday' | 'monday') => {
          this.plugin.settings.HeatMapStartDay = value;
          this.applySettingsUpdate();
        });
      });

    new Setting(containerEl)
      .setName(t('Always Show Leaf Sidebar on PC'))
      .setDesc(t('Show left sidebar on PC even when the leaf width is less than 875px. False by default.'))
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.ShowLeftSideBar).onChange(async (value) => {
          this.plugin.settings.ShowLeftSideBar = value;
          this.applySettingsUpdate();
        }),
      );

    // ===== 回收站 =====
    new Setting(containerEl).setName(t('Recycle bin')).setHeading();

    new Setting(containerEl)
      .setName(t('Enable Recycle Bin'))
      .setDesc(
        t(
          'When turned off, deleting a memo removes it permanently instead of moving it to the recycle bin. Memos already in the recycle bin are kept and come back when this is re-enabled.',
        ),
      )
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.EnableRecycleBin).onChange(async (value) => {
          this.plugin.settings.EnableRecycleBin = value;
          // 直接落盘再重渲染：让「自动清理」行即时跟随显隐（display 会 loadSettings 回读，不能走防抖保存）
          await this.plugin.saveSettings();
          this.display();
        }),
      );

    if (this.plugin.settings.EnableRecycleBin) {
      new Setting(containerEl)
        .setName(t('Auto-clean Recycle Bin'))
        .setDesc(
          t(
            'Permanently deletes memos that have been in the recycle bin longer than the retention period. This cannot be undone.',
          ),
        )
        .addDropdown(async (d: DropdownComponent) => {
          d.addOption('never', t('Never delete'));
          d.addOption('7', t('7 days'));
          d.addOption('30', t('30 days'));
          d.addOption('90', t('90 days'));
          d.addOption('180', t('180 days'));
          d.setValue(this.plugin.settings.RecycleBinRetention).onChange(
            async (value: MemosSettings['RecycleBinRetention']) => {
              this.plugin.settings.RecycleBinRetention = value;
              this.applySettingsUpdate();
            },
          );
        });
    }

    // ===== 启动与打开 =====
    new Setting(containerEl).setName(t('Startup & Opening')).setHeading();

    new Setting(containerEl)
      .setName(t('Open Memos when obsidian opens'))
      .setDesc(t('When enable this, Memos will open when Obsidian opens. False by default.'))
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.OpenMemosAutomatically).onChange(async (value) => {
          this.plugin.settings.OpenMemosAutomatically = value;
          this.applySettingsUpdate();
        }),
      );

    // ===== 分享与导出 =====
    new Setting(containerEl).setName(t('Share Options')).setHeading();

    new Setting(containerEl)
      .setName(t('Share Memos Image Footer Start'))
      .setDesc(
        t(
          "Set anything you want here, use {MemosNum} to display Number of memos, {UsedDay} for days. '{MemosNum} Memos {UsedDay} Days' By default",
        ),
      )
      .addText((text) =>
        text
          .setPlaceholder(DEFAULT_SETTINGS.ShareFooterStart)
          .setValue(this.plugin.settings.ShareFooterStart)
          .onChange(async (value) => {
            this.plugin.settings.ShareFooterStart = value;
            this.applySettingsUpdate();
          }),
      );

    new Setting(containerEl)
      .setName(t('Share Memos Image Footer End'))
      .setDesc(t("Set anything you want here. '✍️ Rememo' By default"))
      .addText((text) =>
        text
          .setPlaceholder(DEFAULT_SETTINGS.ShareFooterEnd)
          .setValue(this.plugin.settings.ShareFooterEnd)
          .onChange(async (value) => {
            this.plugin.settings.ShareFooterEnd = value;
            this.applySettingsUpdate();
          }),
      );

    new Setting(containerEl)
      .setName(t('Background Image in Light Theme'))
      .setDesc(t('Set background image in light theme. Set something like "Daily/one.png"'))
      .addText((text) =>
        text
          .setPlaceholder(DEFAULT_SETTINGS.DefaultLightBackgroundImage)
          .setValue(this.plugin.settings.DefaultLightBackgroundImage)
          .onChange(async (value) => {
            this.plugin.settings.DefaultLightBackgroundImage = value;
            this.applySettingsUpdate();
          }),
      );

    new Setting(containerEl)
      .setName(t('Background Image in Dark Theme'))
      .setDesc(t('Set background image in dark theme. Set something like "Daily/one.png"'))
      .addText((text) =>
        text
          .setPlaceholder(DEFAULT_SETTINGS.DefaultDarkBackgroundImage)
          .setValue(this.plugin.settings.DefaultDarkBackgroundImage)
          .onChange(async (value) => {
            this.plugin.settings.DefaultDarkBackgroundImage = value;
            this.applySettingsUpdate();
          }),
      );

    // ===== 移动端 =====
    new Setting(containerEl).setName(t('Mobile Options')).setHeading();

    new Setting(containerEl)
      .setName(t('Default editor position on mobile'))
      .setDesc(t("Set the default editor position on Mobile, 'Top' by default."))
      .addDropdown(async (d: DropdownComponent) => {
        d.addOption('Top', t('Top'));
        d.addOption('Bottom', t('Bottom'));
        d.setValue(this.plugin.settings.DefaultEditorLocation).onChange(async (value) => {
          this.plugin.settings.DefaultEditorLocation = value;
          this.applySettingsUpdate();
        });
      });

    new Setting(containerEl)
      .setName(t('Use button to show editor on mobile'))
      .setDesc(t('Set a float button to call editor on mobile. Only when editor located at the bottom works.'))
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.UseButtonToShowEditor).onChange(async (value) => {
          this.plugin.settings.UseButtonToShowEditor = value;
          this.applySettingsUpdate();
        }),
      );

    new Setting(containerEl)
      .setName(t('Save Shared Image To Folder For Mobile'))
      .setDesc(t('Save image to folder for mobile. False by Default'))
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.AutoSaveWhenOnMobile).onChange(async (value) => {
          this.plugin.settings.AutoSaveWhenOnMobile = value;
          this.applySettingsUpdate();
        }),
      );

    // ===== 数据与兼容（ADR-0004：审计入口从小菜单下沉到设置面板）=====
    new Setting(containerEl).setName(t('Data tools')).setHeading();

    new Setting(containerEl)
      .setName(t('Data Audit'))
      .setDesc(t('Open the audit page to inspect and migrate memo data in daily notes.'))
      .addButton((bt) =>
        bt.setButtonText(t('Audit data')).onClick(async () => {
          // 已有视图只激活不重开（openMemos 会 detach 重开，开着页面时会闪关）
          const leaves = this.app.workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
          if (leaves.length === 0) {
            await this.plugin.openMemos();
          } else {
            this.app.workspace.setActiveLeaf(leaves[0]);
          }
          locationService.pushHistory('/audit');
        }),
      );

    // ===== 关于 =====
    new Setting(containerEl).setName(t('Say Thank You')).setHeading();

    new Setting(containerEl)
      .setName(t('Donate'))
      .setDesc(t('If you like this plugin, consider donating to support continued development:'))
      // .setClass("AT-extra")
      .addButton((bt) => {
        bt.buttonEl.outerHTML = `<a href="https://www.buymeacoffee.com/boninall"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=boninall&button_colour=6495ED&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"></a>`;
      });
  }
}
