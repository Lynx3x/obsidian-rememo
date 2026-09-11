// ESLint 扁平配置——采用 Obsidian 官方审查同款（eslint-plugin-obsidianmd 的 recommended）。
// 本地 `pnpm lint` 与 community.obsidian.md 的自动审查同源，改完即可自查。
// 需要 type-checked 规则：parserOptions.projectService 指向本仓库 tsconfig。
import { defineConfig } from 'eslint/config';
import obsidianmd from 'eslint-plugin-obsidianmd';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
  {
    // 构建产物、文档/素材、以及不在 tsconfig 里的构建配置不参与源码 lint
    ignores: [
      'main.js',
      'styles.css',
      'node_modules/**',
      'tools/**',
      'document/**',
      'assets/**',
      'vite.config.js',
      'rollup.config.js',
      '.prettierrc.js',
    ],
  },
  ...obsidianmd.configs.recommended,
  {
    // TypeScript 项目惯例（typescript-eslint 官方建议）：no-undef 交给 TS 自己兜底；
    // 且本仓的全局类型声明（Model/TFile/FunctionType 等 .d.ts）会被该规则误报。
    files: ['**/*.ts', '**/*.tsx'],
    rules: { 'no-undef': 'off' },
  },
  {
    // React Hooks 两条经典规则（官方仓库 141 个文件里只有 7 处刻意例外，均带说明禁用）
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.*'],
        },
      },
    },
  },
]);
