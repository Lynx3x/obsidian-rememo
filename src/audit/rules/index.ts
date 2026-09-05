// 规则注册表：新增规则 = 在此 import 并 push（检测顺序即规则内声明顺序，
// 同一行命中多条可修规则时引擎按此顺序逐轮修复）。
import { Rule } from '../types';
import { legacyTimeRule } from './legacy-time';
import { dupIdRule } from './dup-id';
import { missingIdRule } from './missing-id';
import { bareBrRule } from './bare-br';
import { legacyRowRule } from './legacy-row';

export const rules: Rule[] = [legacyTimeRule, dupIdRule, missingIdRule, bareBrRule, legacyRowRule];

export const ruleById: Record<string, Rule> = Object.fromEntries(rules.map((r) => [r.id, r]));
