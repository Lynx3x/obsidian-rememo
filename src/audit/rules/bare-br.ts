// 规则：正文含字面 <br>（旧换行编码）
// 只检测不自动修：<br> 编码行属于旧版单行格式，整文件应走文件级迁移（PLAN-FORMAT P1.5），
// 届时 <br> 会还原成真实换行并重排为卡片块。此规则用于在迁移前摸清受影响范围。
import { Rule, Issue, DetectContext } from '../types';

const BR_REG = /<br\s*\/?>|&lt;br\s*\/?&gt;/gi;

export const bareBrRule: Rule = {
  id: 'bare-br',
  name: '旧 <br> 换行编码',
  why: '行内存在旧版换行编码 <br>。旧单行格式已弃用：<br> 无法表达块级 markdown（列表/代码块需要真实换行），原文件观感也差。处理方式不是逐行修补——含 <br> 的文件应整体迁移到新卡片块格式（迁移功能随 P1.5 提供，届时此规则会自动升级为可修复）。',
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
          note: `该行含 ${count} 处 <br>；本文件共 ${affectedLines.length} 行受影响，建议整体迁移`,
        });
      }
    });
    return issues;
  },
};
