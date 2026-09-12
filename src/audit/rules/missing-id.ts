// 规则：memo/评论行缺少持久 ^id
// 说明：块 id 由 Obsidian 原生维护（行挪位不变），是关联主键；缺 id 的行在编辑、评论、回收站场景下会失联。
// 范围守卫：新格式文件里“缩进正文的列表行”本就无 id（正文内容），只查顶层卡行；旧格式文件（缩进=评论）查全部列表行。
import { Rule, Issue, DetectContext } from '../types';
import { detectFileEra } from '../../helpers/memoLine';
import { t } from '../../translations/helper';

// 顶层 bullet 行（- 或 - [ ]，无缩进）
const TOP_BULLET = /^[-*]\s(\[[^\]]{1}\]\s+)?/;
// 缩进列表行（旧文件里的评论行等）
const INDENT_BULLET = /^\s{1,}[-*]\s/;
const ID_AT_END = /\^([A-Za-z0-9]{6})\s*$/;

function randomId(): string {
  return Math.random().toString(36).slice(-6);
}

export const missingIdRule: Rule = {
  id: 'missing-id',
  name: t('Missing ^id'),
  why: t(
    'This list line has no trailing ^id. Without a persistent block id, a line cannot be edited, commented on, recycled or referenced once its line number changes. Fix: append a 6-character ^id.',
  ),
  severity: 'warning',
  detect(ctx: DetectContext): Issue[] {
    const era = detectFileEra(ctx.lines);
    const issues: Issue[] = [];
    ctx.lines.forEach((line, idx) => {
      if (!ctx.inScope[idx]) return;
      const isTop = TOP_BULLET.test(line);
      const isIndent = INDENT_BULLET.test(line);
      if (!isTop && !isIndent) return;
      // 新格式文件：正文里的缩进列表行不需要 id
      if (era === 'new' && isIndent) return;
      if (ID_AT_END.test(line)) return;
      issues.push({
        ruleId: this.id,
        path: ctx.path,
        line: idx + 1,
        raw: line,
        fixedLine: `${line.trimEnd()} ^${randomId()}`,
      });
    });
    return issues;
  },
};
