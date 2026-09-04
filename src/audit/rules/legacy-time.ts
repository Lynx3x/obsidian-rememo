// 规则：旧 14 位时间戳（YYYYMMDDHHmmss）
// 读取端已支持并迁移这类行（isOld → backfill 补写 HH:mm:ss），此规则负责检出遗漏行并就地修复。
import { Rule, Issue, DetectContext } from '../types';

const LEGACY_TIME_REG = /^(\s*[-*]\s(\[[^\]]{1}\]\s+)?)(\d{14})(?=\s|$)/;

function toClockTime(ts: string): string {
  // YYYYMMDDHHmmss → HH:mm:ss
  return `${ts.slice(8, 10)}:${ts.slice(10, 12)}:${ts.slice(12, 14)}`;
}

export const legacyTimeRule: Rule = {
  id: 'legacy-time',
  name: '旧 14 位时间戳',
  why: '行首是旧版 14 位时间戳（YYYYMMDDHHmmss）。时间应统一为 HH:mm:ss（带秒）——旧版读取端会把它当“旧格式”反复要求回写。修复：只替换时间位为 HH:mm:ss，内容与 ^id 不动。',
  severity: 'warning',
  detect(ctx: DetectContext): Issue[] {
    const issues: Issue[] = [];
    ctx.lines.forEach((line, idx) => {
      if (!ctx.inScope[idx]) return;
      const m = LEGACY_TIME_REG.exec(line);
      if (m) {
        issues.push({
          ruleId: this.id,
          path: ctx.path,
          line: idx + 1,
          raw: line,
          fixedLine: `${m[1]}${toClockTime(m[3])}${line.slice(m[0].length)}`,
        });
      }
    });
    return issues;
  },
};
