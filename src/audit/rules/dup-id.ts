// 规则：同一文件内 ^id 重复
// 块 id 是 memo/评论的关联主键，重复会让评论/引用/回收站关联错乱（读取端按最近父行取 id，重复即歧义）。
import { Rule, Issue, DetectContext } from '../types';

const ID_AT_END = /\^([A-Za-z0-9]{6})\s*$/;

function randomId(exclude: Set<string>): string {
  let id = '';
  do {
    id = Math.random().toString(36).slice(-6);
  } while (exclude.has(id));
  return id;
}

export const dupIdRule: Rule = {
  id: 'dup-id',
  name: '重复 ^id',
  why: '同一文件里出现重复的 ^id。^id 是 memo/评论的持久主键，重复会使评论归属、回收站、引用全部歧义。修复：保留第一个出现的 id，后续重复行换成一个新的随机 ^id（引用方若指向被换掉的旧 id 需一并迁移——该场景在迁移规则中处理）。',
  severity: 'error',
  detect(ctx: DetectContext): Issue[] {
    const seen = new Map<string, number>(); // id → 首次出现行号
    const occupied = new Set<string>();
    ctx.lines.forEach((line) => {
      const m = ID_AT_END.exec(line);
      if (m) occupied.add(m[1]);
    });

    const issues: Issue[] = [];
    ctx.lines.forEach((line, idx) => {
      if (!ctx.inScope[idx]) return;
      const m = ID_AT_END.exec(line);
      if (!m) return;
      const id = m[1];
      if (seen.has(id)) {
        const fresh = randomId(occupied);
        occupied.add(fresh);
        issues.push({
          ruleId: this.id,
          path: ctx.path,
          line: idx + 1,
          raw: line,
          note: `首次出现在第 ${seen.get(id)} 行`,
          fixedLine: line.slice(0, m.index) + '^' + fresh,
        });
      } else {
        seen.set(id, idx + 1);
      }
    });
    return issues;
  },
};
