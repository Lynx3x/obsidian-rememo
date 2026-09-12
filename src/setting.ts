import { App, DropdownComponent, PluginSettingTab, Setting } from 'obsidian';
import type MemosPlugin from './index';
import { MEMOS_VIEW_TYPE } from './constants';
import memoService from './services/memoService';
import locationService from './services/locationService';
import { t } from './translations/helper';

/** 时间显示格式选项：值是 moment 格式串、不是自然语言文案（sentence-case 规则会误判，故集中成表） */
const TIME_FORMAT_OPTIONS: { value: 'HH:mm' | 'HH:mm:ss'; label: string }[] = [
  { value: 'HH:mm', label: 'HH:mm' },
  { value: 'HH:mm:ss', label: 'HH:mm:ss' },
];
import { playSendSound, attachAudioPathSuggest } from './helpers/sendSound';

/** 捐赠链接（2026-09-11 上架准备）：拿到自己的链接后填这里（空串 = 该渠道不显示；两个都空则「捐赠」行隐藏） */
const DONATE_AFDIAN_URL = '';
const DONATE_KOFI_URL = '';

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
  /** 卡片标签渲染位置（2026-09-11）：'bottom' = 抽到正文末尾（默认，现状）；'inline' = 保留原位（内联可点，全部卡片渲染面跟随） */
  TagRenderPosition: 'bottom' | 'inline';
  /** 热力图周起点（2026-09-10）：'sunday'（默认）| 'monday' —— 渲染排布用 */
  HeatMapStartDay: 'sunday' | 'monday';
  /** 是否显示侧栏热力图（2026-09-10）：默认 true；关闭时隐藏区块，导航随之上浮 */
  ShowHeatMap: boolean;
  /** 按 Enter 直接发送（Ctrl+Enter 换行）；默认 false = Enter 换行、Ctrl+Enter 发送 */
  EnterToSend: boolean;
  /** 发送音效来源（2026-09-10/11）：'builtin'（默认，插件内置发牌声）| 'custom'（用 SendSoundPath）| 'none'（静音） */
  SendSoundSource: 'builtin' | 'custom' | 'none';
  /** 发送音效·自定义：库内相对路径（如 assets/send.mp3）；来源为 custom 且为空时等同静音 */
  SendSoundPath: string;
  /** 发送音效音量（2026-09-10/11）：0-100，默认 25（owner 目视定：小一点不打扰）；只影响播放响度 */
  SendSoundVolume: number;
  OpenMemosAutomatically: boolean;
  AutoSaveWhenOnMobile: boolean;
  DefaultLightBackgroundImage: string;
  DefaultDarkBackgroundImage: string;
  ShowLeftSideBar: boolean;
  /** 界面时间显示格式：'HH:mm'（不带秒，默认）| 'HH:mm:ss'（带秒）。只影响渲染，不改文件数据 */
  TimeFormat: 'HH:mm:ss' | 'HH:mm';
  /** Rememo 内正文/编辑器字号（2026-09-13）：'' = 跟随 Obsidian 正文字号（默认）；'15'|'16'|'17'|'18'|'20' = 该 px 值。只影响 Rememo 界面，不动全局笔记 */
  ContentFontSize: string;
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
  TagRenderPosition: 'bottom',
  HeatMapStartDay: 'sunday',
  ShowHeatMap: true,
  EnterToSend: false,
  SendSoundSource: 'builtin',
  SendSoundPath: '',
  SendSoundVolume: 25,
  OpenMemosAutomatically: false,
  AutoSaveWhenOnMobile: false,
  DefaultLightBackgroundImage: '',
  DefaultDarkBackgroundImage: '',
  ShowLeftSideBar: false,
  TimeFormat: 'HH:mm',
  // 默认 16px：大字号库（19px）下跟随全局会让卡片一行仅 ≈31 字、界面件显小（2026-09-13 owner 报）；
  // 想要跟全局同步在设置里选「跟随 Obsidian」
  ContentFontSize: '16',
};

/** Rememo 内字号自定义（setting.ts ContentFontSize）：'' = 跟随 Obsidian 正文字号。
 *  写成插件自有变量 --memo-content-font-size，由 less 侧消费（var(--memo-content-font-size, var(--font-text-size))），
 *  不直接改写宿主的 --font-text-size，避免与 Obsidian 全局变量定义打架 */
export function applyContentFontSize(settings: MemosSettings): void {
  const els = document.querySelectorAll<HTMLElement>(`div[data-type='${MEMOS_VIEW_TYPE}']`);
  els.forEach((el) => {
    if (settings.ContentFontSize) {
      el.style.setProperty('--memo-content-font-size', `${settings.ContentFontSize}px`);
    } else {
      el.style.removeProperty('--memo-content-font-size');
    }
  });
}

export class MemosSettingTab extends PluginSettingTab {
  plugin: MemosPlugin;
  private applyDebounceTimer: number = 0;

  constructor(app: App, plugin: MemosPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  applySettingsUpdate() {
    window.clearTimeout(this.applyDebounceTimer);
    const plugin = this.plugin;
    this.applyDebounceTimer = window.setTimeout(() => {
      void plugin.saveSettings();
    }, 100);
    memoService.updateTagsState();
  }

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
        for (const opt of TIME_FORMAT_OPTIONS) d.addOption(opt.value, opt.label);
        d.setValue(this.plugin.settings.TimeFormat).onChange(async (value: 'HH:mm:ss' | 'HH:mm') => {
          this.plugin.settings.TimeFormat = value;
          this.applySettingsUpdate();
        });
      });

    // Rememo 内字号（2026-09-13）：全景跟随全局正文字号时，19px 大字号库下卡片一行仅 ≈31 字、界面件显小；
    // 这里给 Rememo 局部一个自己的字号（不影响全局笔记）。默认 16px。
    new Setting(containerEl)
      .setName(t('Content font size'))
      .setDesc(t('Font size of memo content inside Rememo only. Does not affect your notes.'))
      .addDropdown(async (d: DropdownComponent) => {
        d.addOption('', t('Follow Obsidian'));
        for (const size of ['14', '15', '16', '17', '18', '20'] as const) {
          d.addOption(size, `${size}px`);
        }
        d.setValue(this.plugin.settings.ContentFontSize).onChange(async (value) => {
          this.plugin.settings.ContentFontSize = value;
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

    const sendSoundRow = new Setting(containerEl)
      .setName(t('Send sound'))
      .setDesc(t('Play a sound when a new memo is sent. Choose the bundled sound or your own audio file.'))
      .addDropdown((d: DropdownComponent) => {
        d.addOption('builtin', t('Built-in (card deal)'));
        d.addOption('custom', t('Custom path'));
        d.addOption('none', t('Not played'));
        d.setValue(this.plugin.settings.SendSoundSource).onChange(
          async (value: MemosSettings['SendSoundSource']) => {
            this.plugin.settings.SendSoundSource = value;
            // 直接落盘再重渲染：路径/试听/音量行跟随来源显隐（display 会 loadSettings 回读，不能走防抖保存）
            await this.plugin.saveSettings();
            void this.display();
          },
        );
      });
    if (this.plugin.settings.SendSoundSource !== 'none') {
      sendSoundRow.addSlider((slider) =>
        slider
          .setLimits(0, 100, 5)
          .setValue(this.plugin.settings.SendSoundVolume)
          .setDynamicTooltip()
          .onChange(async (value) => {
            this.plugin.settings.SendSoundVolume = value;
            this.applySettingsUpdate();
          }),
      );
    }
    if (this.plugin.settings.SendSoundSource === 'custom') {
      new Setting(containerEl)
        .setName(t('Sound file path'))
        .setDesc(t('Enter a vault-relative path (e.g. assets/send.mp3).'))
        .addText((text) => {
          text
            .setPlaceholder('assets/send.mp3')
            .setValue(this.plugin.settings.SendSoundPath)
            .onChange(async (value) => {
              this.plugin.settings.SendSoundPath = value;
              this.applySettingsUpdate();
            });
          // 库内路径自动补全（只列音频文件；老 Obsidian 无此 API 时自动降级为纯手填）
          attachAudioPathSuggest(this.app, text.inputEl, (picked) => {
            text.setValue(picked);
            this.plugin.settings.SendSoundPath = picked;
            this.applySettingsUpdate();
          });
        })
        .addExtraButton((button) =>
          button
            .setIcon('play')
            .setTooltip(t('Preview'))
            .onClick(async () => {
              // 试听：每次都反馈（manual）+ 用滑块当前音量
              await playSendSound(this.plugin.settings, { manual: true });
            }),
        );
    }

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
      .setName(t('Tag position'))
      .setDesc(t('Show tags at the bottom of the card, or keep them where they appear in the text.'))
      .addDropdown((d: DropdownComponent) => {
        d.addOption('bottom', t('Bottom'));
        d.addOption('inline', t('In place'));
        d.setValue(this.plugin.settings.TagRenderPosition).onChange(
          async (value: MemosSettings['TagRenderPosition']) => {
            this.plugin.settings.TagRenderPosition = value;
            this.applySettingsUpdate();
          },
        );
      });

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
          void this.display();
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

    // 捐赠渠道（2026-09-11 上架准备）：爱发电（国内）/ Ko-fi（海外）。
    // 拿到自己的链接后填到两个常量里；空串 = 该渠道不显示，两个都空 = 「捐赠」行整体隐藏。
    const donateLinks = (
      [
        [t('Afdian'), DONATE_AFDIAN_URL],
        ['Ko-fi', DONATE_KOFI_URL],
      ] as Array<[string, string]>
    ).filter(([, url]) => url !== '');
    if (donateLinks.length > 0) {
      const donateSetting = new Setting(containerEl)
        .setName(t('Donate'))
        .setDesc(t('If you like this plugin, consider donating to support continued development:'));
      for (const [label, url] of donateLinks) {
        donateSetting.addButton((bt) => bt.setButtonText(label).onClick(() => window.open(url, '_blank')));
      }
    }
  }
}
