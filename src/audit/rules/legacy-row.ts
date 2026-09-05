// 规则：旧数据行（legacy-row）
// 说明：P1b 起读取端"行级只认新格式卡片块"——顶层行不是纯标识头（旧单行 memo /
// 缩进评论的父行 / 缺时间或缺结构的手写行）一律不渲染，也不出现在主列表/回收站。
// 恢复手段 = 数据体检页对整文件执行"旧→新 迁移"（迁移器 migrateFile，本规则只负责把文件
// 浮出到体检树并计数受影响行，无行级 fixedLine——行级修复引擎无法增删行/重排卡片块）。
import { Rule, Issue, DetectContext } from '../types';
import { classifyMemoRow } from '../../helpers/memoLine';

export const legacyRowRule: Rule = {
  id: 'legacy-row',
  name: '旧格式行',
  why: '顶层行不是新格式的纯标识头（旧单行数据/手写混入），读取端不渲染它。修复：在文件头部点「整文件迁移为最新格式」统一转换（自动备份，评论子树会折叠进父卡正文）。',
  severity: 'warning',
  detect(ctx: DetectContext): Issue[] {
    const issues: Issue[] = [];
    ctx.lines.forEach((line, idx) => {
      if (!ctx.inScope[idx]) return;
      if (classifyMemoRow(line) !== 'old-top-row') return;
      issues.push({
        ruleId: this.id,
        path: ctx.path,
        line: idx + 1,
        raw: line,
        note: '旧格式行：整文件迁移可将其转成新格式卡片块',
      });
    });
    return issues;
  },
};
