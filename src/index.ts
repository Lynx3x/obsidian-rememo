import { Platform, Plugin, TFile } from 'obsidian';
import { FocusOnEditor, Memos } from './memos';
import { MEMOS_VIEW_TYPE } from './constants';
import addIcons from './obComponents/customIcons';
import { DEFAULT_SETTINGS, MemosSettings, MemosSettingTab, applyContentFontSize } from './setting';
import { t } from './translations/helper';
import { memoService } from './services';
import appStore from './stores/appStore';

export default class MemosPlugin extends Plugin {
    public settings: MemosSettings;

    async onload(): Promise<void> {
        await this.loadSettings();

        this.registerView(MEMOS_VIEW_TYPE, (leaf) => new Memos(leaf, this));

        this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
    }

    public async loadSettings() {
        const loaded = (await this.loadData()) ?? {};
        // 仅保留 schema 内键：清历史孤儿键（下次保存时自然从 data.json 消失）
        this.settings = Object.assign({}, DEFAULT_SETTINGS);
        for (const key of Object.keys(DEFAULT_SETTINGS) as Array<keyof typeof DEFAULT_SETTINGS>) {
            if (loaded[key] !== undefined) {
                (this.settings as Record<string, unknown>)[key] = loaded[key];
            }
        }
        // 历史键迁移（2026-09-10 合并「插入标题/解析标题」）：InsertAfter → MemoHeading
        if (!loaded.MemoHeading && typeof loaded.InsertAfter === 'string' && loaded.InsertAfter.trim() !== '') {
            this.settings.MemoHeading = loaded.InsertAfter;
        }
        // 历史键迁移（2026-09-10/11 发送音效·内置）：旧数据只有 SendSoundPath（空 = 静音）
        // → 填了路径的迁成「自定义」保留原选择；没填过路径的吃新默认「内置」
        if (!loaded.SendSoundSource && typeof loaded.SendSoundPath === 'string' && loaded.SendSoundPath.trim() !== '') {
            this.settings.SendSoundSource = 'custom';
        }
    }

    async saveSettings() {
        await this.saveData(this.settings);
        // 设置变更后同步到响应式 store，让 UI 组件立即更新
        appStore.dispatch({ type: 'SET_SETTINGS', payload: { settings: this.settings } });
        // 字号设置：即时应用到已打开的 Rememo 视图（视图未开时无元素可改，下次 onOpen 会再应用）
        applyContentFontSize(this.settings);
    }

    registerMobileEvent() {
        this.registerEvent(
            this.app.workspace.on('receive-text-menu', (menu, source) => {
                menu.addItem((item: unknown) => {
                    item
                        .setIcon('popup-open')
                        .setTitle(t('Insert as Memo'))
                        .onClick(async () => {
                            const newMemo = await memoService.createMemo(source, false);
                            memoService.pushMemo(newMemo);
                        });
                });
            }),
        );

        this.registerEvent(
            this.app.workspace.on('receive-files-menu', (menu, source) => {
                menu.addItem((item) => {
                    item
                        .setIcon('popup-open')
                        .setTitle(t('Insert file as memo content'))
                        .onClick(async () => {
                            const fileName = source.map((file: TFile) => {
                                return this.app.fileManager.generateMarkdownLink(file, file.path);
                            });
                            const newMemo = await memoService.createMemo(fileName.join('\n'), false);
                            memoService.pushMemo(newMemo);
                            // console.log(source, 'hello world');
                        });
                });
            }),
        );
    }

    onRegisterProjectView(data: DataFrame, contentEl: HTMLElement) {
        contentEl.createEl('h1', { text: 'Debug' });

        const ul = contentEl.createEl('ul');

        for (const field of data.fields) {
            ul.createEl('li', {
                text: field.name,
            });
        }
    }

    async onLayoutReady(): Promise<void> {
        addIcons();
        this.addSettingTab(new MemosSettingTab(this.app, this));
        this.addCommand({
            id: 'open-memos',
            name: 'Open memos',
            callback: () => this.openMemos(),
        });

        if (Platform.isMobile) {
            this.registerMobileEvent();
        }

        this.addRibbonIcon('Memos', t('ribbonIconTitle'), () => {
            void this.openMemos();
        });

        const leaves = this.app.workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
        if (!(leaves.length > 0)) {
            return;
        }
        if (this.settings.FocusOnEditor) {
            const leaf = leaves[0];
            (leaf.view.containerEl.querySelector('.cm-content'))?.focus();
            return;
        }
        if (!this.settings.OpenMemosAutomatically) {
            return;
        }
        void this.openMemos();
    }

    async openMemos() {
        const workspace = this.app.workspace;
        // 已有视图：只激活不重建（2026-09-10 命令盘查：消除 detach 重建闪烁）
        const existing = workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
        if (existing.length > 0) {
            workspace.setActiveLeaf(existing[0]);
            void workspace.revealLeaf(existing[0]);
            if (FocusOnEditor) {
                (existing[0].view.containerEl.querySelector('.cm-content'))?.focus();
            }
            return;
        }
        const leaf = workspace.getLeaf(true);
        await leaf.setViewState({ type: MEMOS_VIEW_TYPE });
        void workspace.revealLeaf(leaf);

        if (!FocusOnEditor) {
            return;
        }

        (leaf.view.containerEl.querySelector('.cm-content'))?.focus();
    }
}
