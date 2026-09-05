import { FIRST_TAG_REG, NOP_FIRST_TAG_REG, TAG_REG } from '../helpers/consts';
import { waitForInsert } from '../obComponents/obCreateMemo';
import { changeMemo } from '../obComponents/obUpdateMemo';
import { deleteMemo, obHideMemo, restoreMemo } from '../obComponents/obHideMemo';
import { toggleMemoTask } from '../obComponents/obToggleMemoTask';
import { getMemos, getMemosFromDailyNote } from '../obComponents/obGetMemos';
import appStore from '../stores/appStore';
import { State as MemoStoreState } from '../stores/memoStore';
import type { UpdateMemoParams } from '../types/memo';
import { moment } from 'obsidian';
import type { TFile } from 'obsidian';

/**
 * 备忘录服务类 - 处理所有与备忘录相关的操作
 */
class MemoService {
    /** 初始化状态标志 */
    private initialized = false;

    /**
     * 获取当前备忘录状态
     */
    public getState(): MemoStoreState {
        return appStore.getState().memoState;
    }

    /**
     * 获取所有备忘录
     * 从API获取备忘录数据并更新到store
     */
    public async fetchAllMemos(): Promise<Model.Memo[]> {
        // 分批加载：按日期降序读文件，每批更新 store，让最新 memo 优先显示
        const accumulatedMemos: Model.Memo[] = [];
        await getMemos(async (batchMemos) => {
            accumulatedMemos.push(...batchMemos);
            this.updateMemoStore(accumulatedMemos);
        });

        if (!this.initialized) {
            this.initialized = true;
        }

        return accumulatedMemos;
    }

    /**
     * 增量加载：只重读变化的日记文件，替换 store 里该文件的旧 memos。
     * 用于 vault on('modify') 事件，避免每次改动全量重读。
     */
    public async fetchMemosFromFile(file: TFile): Promise<void> {
        const memos: Model.Memo[] = [];
        await getMemosFromDailyNote(file, memos);
        const { memoState } = appStore.getState();
        // 移除该文件旧的 memos，加上新读的（reducer 会去重+按时间排序）
        const others = memoState.memos.filter((m) => m.path !== file.path);
        this.updateMemoStore([...others, ...memos]);
    }

    /**
     * 获取已删除的备忘录列表
     */
    public async fetchDeletedMemos(): Promise<Model.Memo[]> {
        // 回收站：从 store 过滤带 deletedAt 标记的 memo（读取时已识别）
        const deletedMemos = this.getState().memos.filter((m) => m.isDeleted);
        return deletedMemos.sort((a, b) =>
            new Date(b.deletedAt || '').getTime() - new Date(a.deletedAt || '').getTime()
        );
    }

    /**
     * 向store中添加新的备忘录
     */
    public pushMemo(memo: Model.Memo): void {
        appStore.dispatch({
            type: 'INSERT_MEMO',
            payload: { memo: { ...memo } }
        });
    }

    /**
     * 向store中添加新的评论备忘录
     */
    public pushCommentMemo(memo: Model.Memo): void {
        appStore.dispatch({
            type: 'INSERT_MEMO',
            payload: { memo: { ...memo } }
        });
    }

    /**
     * 根据ID查找备忘录
     */
    public getMemoById(id: string): Model.Memo | null {
        return this.getState().memos.find((m: Model.Memo) => m.id === id) || null;
    }

    /**
     * 隐藏（软删除）指定备忘录：头行加 deletedAt 标记，写后即时回读刷新。
     */
    public async hideMemoById(id: string, hasId?: string, path?: string): Promise<void> {
        const file = await obHideMemo(id, hasId, path);
        if (file) {
            await this.fetchMemosFromFile(file);
        }
    }

    /**
     * 恢复已删除的备忘录（去掉头行 deletedAt 标记）
     */
    public async restoreMemoById(id: string, hasId?: string, path?: string): Promise<void> {
        const file = await restoreMemo(id, hasId, path);
        if (file) {
            await this.fetchMemosFromFile(file);
        }
    }

    /**
     * 永久删除备忘录（从头行删整个卡片块）
     */
    public async deleteMemoById(id: string, hasId?: string, path?: string): Promise<void> {
        const file = await deleteMemo(id, hasId, path);
        if (file) {
            await this.fetchMemosFromFile(file);
        }
    }

    /**
     * 任务卡整卡勾选切换（写回头行 [ ]↔[x]）
     */
    public async toggleMemoTask(memo: Model.Memo): Promise<void> {
        const file = await toggleMemoTask(memo.id, memo.hasId, memo.path);
        if (file) {
            await this.fetchMemosFromFile(file);
        }
    }

    /**
     * 编辑备忘录内容
     */
    public editMemo(memo: Model.Memo): void {
        appStore.dispatch({
            type: 'EDIT_MEMO',
            payload: memo
        });
    }

    /**
     * 更新标签状态
     * 解析所有备忘录中的标签并更新到store
     */
    public updateTagsState(): void {
        const { memos } = this.getState();
        const uniqueTags = new Set<string>();
        const tagCounts: { [key: string]: number; } = {};

        // 遍历所有备忘录收集标签
        memos.forEach((memo: Model.Memo) => {
            const tags = this.extractTagsFromContent(memo.content);
            tags.forEach(tag => {
                uniqueTags.add(tag);
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        // 更新store中的标签数据
        appStore.dispatch({
            type: 'SET_TAGS',
            payload: {
                tags: Array.from(uniqueTags),
                tagsNum: tagCounts
            }
        });
    }

    /**
     * 清空store中的备忘录数据
     */
    public clearMemos(): void {
        appStore.dispatch({
            type: 'SET_MEMOS',
            payload: { memos: [] }
        });
    }

    /**
     * 获取链接到指定备忘录的所有备忘录
     */
    public async getLinkedMemos(memoId: string): Promise<Model.Memo[]> {
        return this.getState().memos.filter((m: Model.Memo) => m.content.includes(memoId));
    }

    /**
     * 创建新的备忘录
     * date 可选：指定写入目标日期（moment，含时分；缺省写"现在/今天"）。
     * 为兼容 waitForInsert 需传 moment（含 .format），非 Date。
     */
    public async createMemo(text: string, isTask: boolean, date?: moment.Moment): Promise<Model.Memo> {
        return await waitForInsert(text, isTask, date);
    }

    /**
     * 导入备忘录
     */
    public async importMemos(text: string, isList: boolean, date: moment.Moment): Promise<Model.Memo> {
        return await waitForInsert(text, isList, date);
    }

    /**
     * 更新备忘录内容
     */
    public async updateMemo(params: UpdateMemoParams): Promise<Model.Memo> {
        return await changeMemo(
            params.memoId,
            params.text,
            params.type,
            params.path,
            params.hasId
        );
    }

    // 私有辅助方法

    /**
     * 从文本内容中提取标签
     */
    private extractTagsFromContent(content: string): string[] {
        const tags = new Set<string>();

        // 匹配不同格式的标签
        const matches = [
            ...(content.match(TAG_REG) || []),
            ...(content.match(NOP_FIRST_TAG_REG) || []),
            ...(content.match(FIRST_TAG_REG) || [])
        ];

        matches.forEach(match => {
            if (TAG_REG.test(match)) {
                tags.add(match.replace(TAG_REG, '$1').trim());
            } else if (NOP_FIRST_TAG_REG.test(match)) {
                tags.add(match.replace(NOP_FIRST_TAG_REG, '$1').trim());
            } else if (FIRST_TAG_REG.test(match)) {
                tags.add(match.replace(FIRST_TAG_REG, '$2').trim());
            }
        });

        return Array.from(tags);
    }

    /**
     * 更新store中的备忘录数据（评论已统一在 memos 中，linkId 非空表示评论）
     */
    private updateMemoStore(memos: Model.Memo[]): void {
        appStore.dispatch({
            type: 'SET_MEMOS',
            payload: { memos }
        });
    }
}

// 导出单例实例
const memoService = new MemoService();
export default memoService;
