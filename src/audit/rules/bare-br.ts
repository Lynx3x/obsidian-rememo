// 规则：正文含字面 <br>（旧换行编码）
// 只检测不自动修：<br> 编码行属于旧版单行格式，整文件应走文件级迁移（PLAN-FORMAT P1.5），
// 届时 <br> 会还原成真实换行并重排为卡片块。此规则用于在迁移前摸清受影响范围。
import { Rule, Issue, DetectContext } from '../types';
import { t, tf } from '../../translations/helper';

const BR_REG = /<br\s*\/?>|&lt;br\s*\/?&gt;/gi;

export const bareBrRule: Rule = {
  id: 'bare-br',
  name: t('Legacy <br> line breaks'),
  why: t(
    'This line contains the legacy <br> line-break encoding. The old single-line format is retired: <br> cannot express block-level Markdown, and it reads badly in the file itself. The fix is not line-by-line — migrate the whole file to the new card-block format.',
  ),
  severity: 'info',
  detect(ctx: DetectContext): Issue[] {
    const affectedLines = ctx.lines.filter((l) => BR_REG.test(l));
    if (affectedLines.length === 0) return [];
    const issues: Issue[] = [];
    ctx.lines.forEach((line, idx) => {
      if (!ctx.inScope[idx]) return;
      const count = (line.match(BR_REG) ?? []).length;
      if (count > 0) {
        issues.push({
          ruleId: this.id,
          path: ctx.path,
          line: idx + 1,
          raw: line,
          note: tf('contains {n} <br>; {m} lines affected in this file — migrate the whole file', {
            n: count,
            m: affectedLines.length,
          }),
        });
      }
    });
    return issues;
  },
};
