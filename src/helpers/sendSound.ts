import { AbstractInputSuggest, Notice } from 'obsidian';
import type { App, TFile } from 'obsidian';
import { t } from '../translations/helper';
import { dailyNotesService } from '../services';
import { errorMessage } from './errorMessage';
import { BUILTIN_SEND_SOUND_URI } from './builtinSendSound';
import type { MemosSettings } from '../setting';

/** 发送音效配置（取设置里的三键；type-only 引入，不构成运行时代码环） */
export type SendSoundSettings = Pick<MemosSettings, 'SendSoundSource' | 'SendSoundPath' | 'SendSoundVolume'>;

/**
 * 发送音效（2026-09-10/11）：来源三选一——内置（base64 内嵌，零读盘）/ 自定义库内路径 / 不播放。
 * 播放元素按"来源键"缓存并预解码：发送那一刻起播，没有读盘 + 解码的固有延迟。
 * 失败提示去重：发送时同一来源只弹一次（试听 manual 每次都弹）；任何失败都不打断发送。
 */

/** 按扩展名给 Blob 标 MIME：个别环境按 Blob 类型选解码器，留空可能播不出 */
const AUDIO_MIME: Record<string, string> = {
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    oga: 'audio/ogg',
    m4a: 'audio/mp4',
    aac: 'audio/aac',
    flac: 'audio/flac',
    webm: 'audio/webm',
};
const AUDIO_EXT = new Set(Object.keys(AUDIO_MIME));
const isAudioPath = (p: string) => AUDIO_EXT.has(p.split('.').pop()?.toLowerCase() ?? '');

/**
 * 路径输入的库内自动补全（只列音频文件）。
 * AbstractInputSuggest 曾是「运行时才有、d.ts 里没有」的类，故旧代码靠命名空间取值 + any 兜底；
 * typings 升到 1.13 后已是正式导出，直接 extends。运行时仍判空一次：低版本 Obsidian 没有该类，
 * 输入框降级为纯手填。
 */
const AbstractInputSuggestCtor: typeof AbstractInputSuggest | undefined = AbstractInputSuggest;

export function attachAudioPathSuggest(app: App, inputEl: HTMLInputElement, onPick: (path: string) => void): void {
    if (!AbstractInputSuggestCtor) return;
    class AudioPathSuggest extends AbstractInputSuggestCtor<TFile> {
        constructor() {
            super(app, inputEl);
        }
        getSuggestions(query: string): TFile[] {
            const q = (query ?? '').trim().toLowerCase();
            const files = app.vault.getFiles().filter((f) => isAudioPath(f.path));
            const matched = q ? files.filter((f) => f.path.toLowerCase().includes(q)) : files;
            return matched.sort((a, b) => a.path.localeCompare(b.path)).slice(0, 50);
        }
        renderSuggestion(file: TFile, el: HTMLElement): void {
            el.setText(file.path);
        }
        selectSuggestion(file: TFile): void {
            onPick(file.path);
            this.close();
        }
    }
    new AudioPathSuggest();
}

type Target = { key: string; uri?: string; vaultPath?: string };

function targetOf(settings: SendSoundSettings): Target | null {
    if (settings.SendSoundSource === 'builtin') {
        return { key: '__builtin__', uri: BUILTIN_SEND_SOUND_URI };
    }
    if (settings.SendSoundSource === 'custom') {
        const path = (settings.SendSoundPath ?? '').trim();
        return path ? { key: path, vaultPath: path } : null;
    }
    return null;
}

let cachedKey = '';
let cachedBlobUrl = ''; // 仅自定义路径（blob）需要 revoke；内置是 data URI，无对象 URL
let cachedAudio: HTMLAudioElement | null = null;
let warnedKey = '';

async function ensureAudio(target: Target): Promise<HTMLAudioElement> {
    if (cachedKey === target.key && cachedAudio) return cachedAudio;
    let url = target.uri ?? '';
    if (!url && target.vaultPath) {
        const { app } = dailyNotesService.getState();
        const buffer = await app.vault.adapter.readBinary(target.vaultPath);
        const ext = target.vaultPath.split('.').pop()?.toLowerCase() ?? '';
        const mime = AUDIO_MIME[ext];
        if (cachedBlobUrl) URL.revokeObjectURL(cachedBlobUrl);
        cachedBlobUrl = URL.createObjectURL(
            new Blob([new Uint8Array(buffer)], mime ? { type: mime } : undefined),
        );
        url = cachedBlobUrl;
    }
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.load();
    cachedKey = target.key;
    cachedAudio = audio;
    return audio;
}

/**
 * 预读 + 预解码（不播）：视图打开时调用，发送那一刻起播就没有"读盘 + 解码"的固有延迟。
 * 失败只记 console——真正的失败提示留给播放那次。
 */
export function preloadSendSound(settings: SendSoundSettings): void {
    const target = targetOf(settings);
    if (!target) return;
    void ensureAudio(target).catch((error) => {
        console.error('[rememo] send sound preload failed:', target.key, error);
    });
}

export async function playSendSound(
    settings: SendSoundSettings,
    options?: { manual?: boolean },
): Promise<boolean> {
    const target = targetOf(settings);
    if (!target) return false;
    try {
        const audio = await ensureAudio(target);
        const volume = settings.SendSoundVolume;
        audio.volume = Math.max(0, Math.min(1, (typeof volume === 'number' ? volume : 100) / 100));
        if (audio.readyState > 0) audio.currentTime = 0; // 复用同一元素：从头播
        await audio.play();
        return true;
    } catch (error: unknown) {
        if (options?.manual || warnedKey !== target.key) {
            new Notice(t('Failed to play the sound: ') + errorMessage(error), 8000);
            warnedKey = target.key;
        }
        console.error('[rememo] send sound failed:', target.key, error);
        return false;
    }
}
