import { DefaultMemoComposition, CommentsInOriginalNotes } from '../memos';

/**
 * MemoLine — 单条 memo 行的语法解析/序列化模块。
 *
 * 收敛了原先散落在 obGetMemos / obHideMemo / obCreateMemo 里的重复正则，
 * 把 "一行 memo 文本 → 结构化字段" 和 "字段 → 一行文本" 统一到一个地方。
 *
 * memo 行格式（Obsidian 列表项）：
 *   - [ ] 12:34 内容 ^xxxxxx
 *   - 12:34:56 内容
 *   - 内容（无时间）
 *
 * 时间可用 <time> 标签包裹，任务标记可为 [ ] / [x] / [X] / 自定义。
 */

export interface MemoLineFields {
    /** 时间 "HH:mm" 或 "HH:mm:ss"，无则为空字符串 */
    time: string;
    /** 纯内容（已去除时间、任务标记、块 id） */
    content: string;
    /** 任务标记：' ' | 'x' | 'X' | 自定义字符，无任务则为空字符串 */
    taskMark: string;
    /** 块 id（^xxxxxx），无则为空字符串 */
    hasId: string;
}

/** 是否配置了 {TIME}/{CONTENT} 自定义组合 */
const hasCustomComposition = (): boolean =>
    DefaultMemoComposition !== '' &&
    /{TIME}/g.test(DefaultMemoComposition) &&
    /{CONTENT}/g.test(DefaultMemoComposition);

/**
 * 构造"匹配一行 memo"的正则字符串。
 *
 * 三个捕获组（从 1 开始）：
 *   1. 任务标记（[ ] / [x] / 自定义），可选
 *   2. 时间部分（<time>?HH:mm(:ss)?</time>?），可选
 *   3. 内容（到行尾）
 *
 * 可选前缀 indent：CommentsInOriginalNotes 为真时行首无空白（评论是内嵌子项，无缩进前缀）。
 */
const buildMemoLineRegexString = (): string => {
    const indent = CommentsInOriginalNotes ? '' : '\\s*';
    // 三个捕获组（用非捕获组避免编号混乱）：
    //   1. 任务标记（[ ] / [x] / 自定义）
    //   2. 时间部分（<time>?HH:mm(:ss)?</time>?）
    //   3. 内容（到行尾）
    const taskGroup = '(\\[(?:.{1})\\]\\s?)?';
    const timeGroup = '(<time>)?(\\d{1,2}:\\d{2}(?::\\d{2})?)?(</time>)?';
    if (hasCustomComposition()) {
        return (
            '^' +
            indent +
            '[-*]\\s' +
            taskGroup +
            DefaultMemoComposition.replace(/{TIME}/g, timeGroup).replace(/{CONTENT}/g, '(.*)$')
        );
    }
    return '^' + indent + '[-*]\\s' + taskGroup + timeGroup + '\\s?(.*)$';
};

// 惰性构造一次，避免每次调用都重新拼接
let cachedRegex: RegExp | null = null;
const getMemoLineRegex = (): RegExp => {
    if (cachedRegex === null) {
        cachedRegex = new RegExp(buildMemoLineRegexString(), '');
    }
    return cachedRegex;
};

/** 设置变更后（settings-updated 事件）需重置缓存 */
export const resetMemoLineRegex = (): void => {
    cachedRegex = null;
};

/**
 * 解析一行 memo 文本 → 结构化字段。
 *
 * @param line 一行文本（如 "- [ ] 12:34 内容"）
 * @returns 结构化字段；若行不是合法 memo 行，返回 time/content/taskMark/hasId 全空
 */
export const parseMemoLine = (line: string): MemoLineFields => {
    const match = getMemoLineRegex().exec(line);
    if (!match) {
        return { time: '', content: '', taskMark: '', hasId: '' };
    }
    // 内容永远是最后一个捕获组（原 extractTextFromTodoLine 的做法，不依赖中间组编号）
    const rawContent = match[match.length - 1] !== undefined ? match[match.length - 1] : '';
    // 时间/任务用独立小正则提取，避免大正则组编号漂移
    const hourText = extractHourFromBulletLine(line);
    const minText = extractMinFromBulletLine(line);
    const secText = extractSecondFromBulletLine(line);
    const taskMark = extractMemoTaskTypeFromLine(line);
    let time = '';
    if (hourText !== '' && minText !== '') {
        time = secText !== '' ? `${hourText}:${minText}:${secText}` : `${hourText}:${minText}`;
    }
    let content = rawContent;
    let hasId = '';
    // 块 id 在内容末尾（^xxxxxx）
    const idMatch = /\^(\S{6})$/.exec(content);
    if (idMatch) {
        hasId = idMatch[1];
        content = content.slice(0, -7).trimEnd();
    }
    return { time, content, taskMark, hasId };
};

/** 判断一行是否是含时间的 memo 行（原 lineContainsTime） */
export const lineContainsTime = (line: string): boolean => getMemoLineRegex().test(line);

/** 判断一行是否含秒（原 lineContainsSeconds） */
export function lineContainsSeconds(line: string): boolean {
    return /^[\s-*]*(\[(.{1})\]\s?)?(<time>)?\d{1,2}:\d{2}:\d{2}(<\/time>)?/.test(line);
}

/** 提取小时（原 extractHourFromBulletLine） */
export function extractHourFromBulletLine(line: string): string {
    const match = /^[\s-*]*(\[(.{1})\]\s?)?(<time>)?(\d{1,2}):\d{2}(:\d{2})?(<\/time>)?/.exec(line);
    return match ? match[4] : '';
}

/** 提取分钟（原 extractMinFromBulletLine） */
export function extractMinFromBulletLine(line: string): string {
    const match = /^[\s-*]*(\[(.{1})\]\s?)?(<time>)?(\d{1,2}):(\d{2})(:\d{2})?(<\/time>)?/.exec(line);
    return match ? match[5] : '';
}

/** 提取秒（原 extractSecondFromBulletLine，去冒号） */
export function extractSecondFromBulletLine(line: string): string {
    const match = /^[\s-*]*(\[(.{1})\]\s?)?(<time>)?(\d{1,2}):(\d{2}):(\d{2})(<\/time>)?/.exec(line);
    return match ? match[6] : '';
}

/** 提取任务标记（原 extractMemoTaskTypeFromLine） */
export function extractMemoTaskTypeFromLine(line: string): string {
    const match = /^[\s-*]*\[(.{1})\]/.exec(line);
    return match ? match[1] : '';
}

/** 提取内容（原 extractTextFromTodoLine / obHideMemo 的 extractContentfromText） */
export const extractTextFromTodoLine = (line: string): string => parseMemoLine(line).content;

/** 任务标记 → memo 类型（原 getTaskType） */
export const getTaskType = (memoTaskType: string): string => {
    if (memoTaskType === ' ') return 'TASK-TODO';
    if (memoTaskType === 'x' || memoTaskType === 'X') return 'TASK-DONE';
    return 'TASK-' + memoTaskType;
};

/**
 * 序列化字段 → 一行 memo 文本。
 *
 * 对应 obCreateMemo 的 waitForInsert 拼行逻辑。
 */
export const serializeMemoLine = (fields: {
    isTask: boolean;
    time?: string;
    content: string;
}): string => {
    const { isTask, content } = fields;
    const time = fields.time !== undefined ? fields.time : '';
    let line = isTask ? '- [ ] ' : '- ';
    if (DefaultMemoComposition === '') {
        line += time !== '' ? `${time} ${content}` : content;
    } else {
        line += DefaultMemoComposition.replace(/{TIME}/g, time).replace(/{CONTENT}/g, content);
    }
    return line;
};
