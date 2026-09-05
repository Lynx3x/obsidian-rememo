/**
 * MemoLine — 卡片块格式（P1b 起唯一格式）的解析工具模块。
 *
 * 新格式卡片块（PLAN-FORMAT 2026-09-05）：
 *   - 头行 = 纯标识：`- [ ]? 时间 [deletedAt: 值]? ^6位id`，行内无正文
 *   - 正文 = 头行之后连续 ≥4 空格缩进的行（空行分段；额外缩进保留给 md 嵌套）
 *   - 旧单行格式（头行带正文 / <br> 编码 / 缩进评论）不再渲染，由数据体检迁移
 *
 * 旧单行 parse/serialize 全链（parseMemoLine/serializeMemoLine/行级时间提取等）
 * 已随读取端退役删除；时间/删除标记/分类工具保留给读取端与体检迁移器共用。
 */

/**
 * 从内容尾部提取删除标记 `deletedAt: <值>`，返回剥掉标记后的内容 + 是否删除 + 删除时间。
 * 标记位于块 id 之前：`- 16:31 deletedAt: 2026-09-05 12:08:00 ^id`。
 * 值格式双兼容：旧 14 位 YYYYMMDDHHmmss，或可读 `YYYY-MM-DD HH:mm:ss`。
 * 调用前应先剥掉行尾的块 id，使 deletedAt 位于内容末尾；前缀允许行首或空白
 * （剥时间时分隔空格可能被移除，deletedAt 会顶到内容开头）。
 */
export function extractDeletedAt(content: string): { isDeleted: boolean; deletedAt: string; rest: string } {
    const m = /(?:^|\s)deletedAt:\s*(.+?)\s*$/.exec(content);
    if (m) {
        const value = m[1].trim();
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

/** 提取任务标记（`- [x] …` 中括号内字符；无任务返回空串） */
export function extractMemoTaskTypeFromLine(line: string): string {
    const match = /^[\s-*]*\[(.{1})\]/.exec(line);
    return match ? match[1] : '';
}

/** 任务标记 → memo 类型（TASK-TODO/TASK-DONE/自定义 TASK-x） */
export const getTaskType = (memoTaskType: string): string => {
    if (memoTaskType === ' ') return 'TASK-TODO';
    if (memoTaskType === 'x' || memoTaskType === 'X') return 'TASK-DONE';
    return 'TASK-' + memoTaskType;
};

/**
 * 从文本开头提取时间。支持：
 *   - `HH:mm` / `HH:mm:ss`（卡片头行标准时间；不带秒时补 :00 由调用方决定）
 *   - 旧 14 位 YYYYMMDDHHmmss（迁移器归一用）
 * 返回 time 为标准形态，rest 为剩余内容；只去掉紧跟时间的一个布局空格
 * （保留用户手打的行首空格，避免"写入→重读"往返丢空格抖动）。
 */
export function extractMemoTime(rawContent: string): { time: string; isOld: boolean; rest: string } {
    const t = /^(\d{1,2}):(\d{2})(?::(\d{2}))?/.exec(rawContent);
    if (t) {
        return {
            time: t[3] ? `${t[1]}:${t[2]}:${t[3]}` : `${t[1]}:${t[2]}`,
            isOld: !t[3],
            rest: rawContent.slice(t[0].length).replace(/^ /, ''),
        };
    }
    const ts = /^(\d{14})\s?(.*)$/.exec(rawContent);
    if (ts) {
        const hh = ts[1].slice(8, 10);
        const mm = ts[1].slice(10, 12);
        const ss = ts[1].slice(12, 14);
        return { time: `${hh}:${mm}:${ss}`, isOld: true, rest: ts[2].trim() };
    }
    return { time: '', isOld: false, rest: rawContent.trim() };
}

/** 单级缩进宽度（空格数）。Obsidian 默认列表缩进；tab 按 4 计。 */
const INDENT_UNIT = 4;

/** 一行的缩进宽度（行首空格数；tab 按 4 折算） */
export function getIndentWidth(line: string): number {
    let width = 0;
    for (const ch of line) {
        if (ch === ' ') width += 1;
        else if (ch === '\t') width += INDENT_UNIT;
        else break;
    }
    return width;
}

/** 正文行剥去 4 空格缩进前缀；不足 4 空格（空行/手写少缩进）原样返回 */
export function unindentContentLine(line: string): string {
    return line.length >= 4 ? line.slice(4) : line;
}

// ===== 行级分类 / 文件格式 era 探测 =====
// 新格式头行 = 纯标识（行内无正文，可带任务标记；deletedAt 无方括号）。
// 行级分类（读端 / 体检 legacy-row 规则 / 迁移器三处共用，禁止各自再写正则）：
//  - pure-header：顶层 bullet，时间（HH:mm(:ss) 或旧 14 位）后只允许 deletedAt:值 与行尾 ^id
//  - old-top-row：顶层 bullet 但带正文/其它结构 → 旧数据行（不渲染，交数据体检迁移）
//  - other：非顶层 bullet（缩进正文行 / 段落 / 标题 / 空行等）
// 容差：任务组 ] 后允许 0 空格（`- [ ]12:30 ^id`，Obsidian 原生写法）；时间组认 14 位旧时间戳
// （legacy-time 规则修复前的 14 位纯头行不致隐形）。deletedAt 值在分类时即校验两形态——
// 值畸形（垃圾/空值）的行归 old-top-row 由体检处理，杜绝"伪纯头"把标记文本当正文渲染。
const TIME_TEXT = String.raw`(?:\d{1,2}:\d{2}(?::\d{2})?|\d{14})`;
const DELETED_AT_VALUE = String.raw`(?:\d{14}|\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})`;
const PURE_HEADER_LINE = new RegExp(
    String.raw`^[-*]\s(\[[^\]]{1}\]\s?)?${TIME_TEXT}(\s+deletedAt:\s*${DELETED_AT_VALUE})?\s*(\^[A-Za-z0-9]{6})?\s*$`,
);
const TOP_BULLET_LINE = /^[-*]\s/;

export function isPureHeaderLine(line: string): boolean {
    return PURE_HEADER_LINE.test(line);
}

/** 顶层 bullet 行的行级分类（见上）。缩进行一律 'other'。 */
export function classifyMemoRow(line: string): 'pure-header' | 'old-top-row' | 'other' {
    if (!TOP_BULLET_LINE.test(line)) return 'other';
    return PURE_HEADER_LINE.test(line) ? 'pure-header' : 'old-top-row';
}

/** 按"首个顶层 bullet"判定文件 era：纯标识头行 → 'new'；否则 'old'；无 bullet → 'unknown'。
 *  读取端已退役（行级分类覆盖 mixed），保留给体检/迁移器做"文件需要迁移"粗筛。 */
export function detectFileEra(lines: string[]): 'new' | 'old' | 'unknown' {
    for (const line of lines) {
        if (TOP_BULLET_LINE.test(line)) {
            return PURE_HEADER_LINE.test(line) ? 'new' : 'old';
        }
    }
    return 'unknown';
}
