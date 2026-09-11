type BasicType = undefined | null | boolean | number | string | Record<string, unknown> | Array<BasicType>;

// 日期戳
type DateStamp = number;

// 时间戳
type TimeStamp = number;

type FunctionType = (...args: unknown[]) => unknown;

interface KVObject<T = unknown> {
  [key: string]: T;
}

/** memo 特殊类型筛选值（取值来源见 helpers/filter.ts 的 memoSpecialTypes）；
 *  早前全仓引用但从未定义，TS 视作 any —— 2026-09-11 补上定义 */
type MemoSpecType = 'NOT_TAGGED' | 'LINKED' | 'IMAGED' | 'CONNECTED';
