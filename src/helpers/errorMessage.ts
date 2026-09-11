/**
 * 从 unknown 类型的错误里取可读文案。
 * 显式分类型：Error 取 message、字符串原样、其余 JSON 化——直接 String() 会被 lint 判为
 * no-base-to-string（对象只会得到 [object Object]）。
 */
export function errorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === 'string') return e;
  if (typeof e === 'number' || typeof e === 'boolean') return String(e);
  try {
    return JSON.stringify(e) ?? 'Unknown error';
  } catch {
    return 'Unknown error';
  }
}
