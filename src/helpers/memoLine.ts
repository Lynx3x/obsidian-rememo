import { DefaultMemoComposition } from '../memos';

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
    /** 是否已删除（行内含 deletedAt: 标记） */
    isDeleted: boolean;
    /** 删除时间戳（14位），未删除则为空字符串 */
    deletedAt: string;
}

/**
 * 从 memo 行内容中检测并提取删除标记 `deletedAt: <14位时间戳>`。
 * 返回剥掉标记后的内容 + 是否删除 + 删除时间。
 * 标记位于块 id 之前：`- 16:31 内容 deletedAt: 20260828150000 ^id`
 * 调用前应先剥掉行尾的块 id，使 deletedAt 位于内容末尾。
 */
export function extractDeletedAt(content: string): { isDeleted: boolean; deletedAt: string; rest: string } {
    // 值格式（新旧兼容）：旧 14 位数字 YYYYMMDDHHmmss，或可读 `YYYY-MM-DD HH:mm:ss`
    const m = /(\sdeletedAt:\s*(.+?))\s*$/.exec(content);
    if (m) {
        const value = m[2].trim();
        if (/^\d{14}$/.test(value) || /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) {
            return {
                isDeleted: true,
                deletedAt: value,
                rest: content.slice(0, m.index).trimEnd(),
            };
        }
    }
    return { isDeleted: false, deletedAt: '', rest: content };
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
    const indent = '\\s*';
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
        return { time: '', content: '', taskMark: '', hasId: '', isDeleted: false, deletedAt: '' };
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
    // 先剥块 id（行尾 ^xxxxxx）
    const idMatch = /\^(\S{6})$/.exec(content);
    if (idMatch) {
        hasId = idMatch[1];
        content = content.slice(0, -7).trimEnd();
    }
    // 再检测删除标记（剥掉 id 后 deletedAt 位于内容末尾）
    const { isDeleted, deletedAt, rest } = extractDeletedAt(content);
    content = rest;
    return { time, content, taskMark, hasId, isDeleted, deletedAt };
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

// ===== 缩进层级工具（评论多级依赖） =====
// 评论以缩进嵌套表达层级：顶层 memo 缩进 0，一级评论缩进 1 级（通常 4 空格），
// 二级评论缩进 2 级（8 空格）…… 层级 = 缩进宽度 / 单级缩进宽度。

/** 单级缩进宽度（空格数）。Obsidian 默认列表缩进，也兼容 tab（按 4 计）。 */
const INDENT_UNIT = 4;

/** 计算一行的缩进宽度（行首空格数；tab 按 INDENT_UNIT 折算） */
export function getIndentWidth(line: string): number {
    let width = 0;
    for (const ch of line) {
        if (ch === ' ') width += 1;
        else if (ch === '\t') width += INDENT_UNIT;
        else break;
    }
    return width;
}

/** 由缩进宽度换算层级（0 = 顶层 memo，1 = 一级评论，2 = 二级评论……） */
export function getIndentLevel(indentWidth: number): number {
    return Math.round(indentWidth / INDENT_UNIT);
}

/** 判断一行是否是缩进子项（评论行，非顶层 memo） */
export function isIndentedLine(line: string): boolean {
    return getIndentWidth(line) > 0;
}

/**
 * 从 memo 行内容（已去列表标记）提取时间。
 *
 * 支持三种格式（兼容旧数据）：
 *   - 新格式 `HH:mm` 或 `HH:mm:ss`（memo/评论统一）
 *   - 旧格式 `YYYYMMDDHHmmss`（14 位时间戳，仅旧评论）
 *
 * @returns time: 标准化的 `HH:mm` 或 `HH:mm:ss`；isOld: 是否为需回写的旧格式；rest: 剩余内容
 */
export function extractMemoTime(rawContent: string): { time: string; isOld: boolean; rest: string } {
    // 新格式 HH:mm 或 HH:mm:ss
    const t = /^(\d{1,2}):(\d{2})(?::(\d{2}))?/.exec(rawContent);
    if (t) {
        return {
            time: t[3] ? `${t[1]}:${t[2]}:${t[3]}` : `${t[1]}:${t[2]}`,
            isOld: !t[3],
            // 只去掉紧跟时间的一个布局分隔空格，保留用户手打的行首空格
            // （否则"写入→重读"往返会丢行首空格，导致发送后文字抖动一次）
            rest: rawContent.slice(t[0].length).replace(/^ /, ''),
        };
    }
    // 旧格式 14 位时间戳（YYYYMMDDHHmmss）
    const ts = /^(\d{14})\s?(.*)$/.exec(rawContent);
    if (ts) {
        const hh = ts[1].slice(8, 10);
        const mm = ts[1].slice(10, 12);
        const ss = ts[1].slice(12, 14);
        return { time: `${hh}:${mm}:${ss}`, isOld: true, rest: ts[2].trim() };
    }
    return { time: '', isOld: false, rest: rawContent.trim() };
}



// ===== 文件格式 era 探测（旧单行格式 / 新卡片块格式） =====
// 新格式头行 = 纯标识："- 时间 [deletedAt:…]? ^id"（行内无正文，可带任务标记；deletedAt 有/无方括号均可）
const PURE_HEADER_LINE = /^[-*]\s(\[[^\]]{1}\]\s+)?\d{1,2}:\d{2}(?::\d{2})?(\s+\[?deletedAt:[^\^]*\]?)?\s*\^[A-Za-z0-9]{6}\s*$/;
const TOP_BULLET_LINE = /^[-*]\s/;

export function isPureHeaderLine(line: string): boolean {
    return PURE_HEADER_LINE.test(line);
}

/** 按"首个顶层 bullet"判定文件 era：纯标识头行 → 'new'；否则 'old'；无 bullet → 'unknown' */
export function detectFileEra(lines: string[]): 'new' | 'old' | 'unknown' {
    for (const line of lines) {
        if (TOP_BULLET_LINE.test(line)) {
            return PURE_HEADER_LINE.test(line) ? 'new' : 'old';
        }
    }
    return 'unknown';
}

/** 新格式正文行剥去 4 空格缩进前缀；不足 4 空格（空行/手写少缩进）原样返回 */
export function unindentContentLine(line: string): string {
    return line.length >= 4 ? line.slice(4) : line;
}
