// audit 类型：eslint 式规则引擎的公共契约
// 设计目标：加一条新规则 = 在 rules/ 新增一个文件并注册，检测/修复/说明自包含。

export type RuleSeverity = 'error' | 'warning' | 'info';

/** 单文件检测上下文（只读） */
export interface DetectContext {
  path: string;
  lines: string[]; // 每行原文（不含行尾换行符）
  /** 每行是否在 memo 处理区内（与读取器 ProcessEntriesBelow 语义一致，engine 预计算） */
  inScope: boolean[];
}

/** 一个具体问题（行级定位） */
export interface Issue {
  ruleId: string;
  path: string;
  line: number; // 1-based
  raw: string; // 原行
  /** 行级可自动修复时的目标行；无此字段 = 该问题不可自动修（提示类/需文件级迁移） */
  fixedLine?: string;
  note?: string;
}

export interface Rule {
  id: string;
  name: string;
  /** eslint 式说明：这是什么问题、为什么值得修、修成什么样（在报告 UI 展示给用户） */
  why: string;
  severity: RuleSeverity;
  detect(ctx: DetectContext): Issue[];
}

export interface AuditResult {
  issues: Issue[];
  byRule: Record<string, Issue[]>;
  scannedFiles: number;
}
