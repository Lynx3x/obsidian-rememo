# 社区市场审查反馈与处置（2026-09-11）

> 1.0.0 提交 community.obsidian.md 后官方自动审查**未通过**，返回 9 类阻断级 **Error** + 几百条 Warning/Recommendation。
> 本文归档审查结论与逐项处置，供重新提交前复查。审查分档含义：**Error = 阻断**（不清完用户在 Obsidian 里装不上）；Warning = 不阻断但会挂在页面上；Recommendation = 提示性质。

## 本地复现（自查工具）

已接入官方同款：`eslint-plugin-obsidianmd@0.4.2` 的 `recommended` + eslint 9（flat config [eslint.config.mjs](../eslint.config.mjs)）+ 类型感知规则（tsconfig projectService）。

```
pnpm lint          # = 审查同款口径
```

配套升级：TypeScript 5.9、`obsidian` typings 1.13.1、`eslint-plugin-react-hooks` 5.2（旧 `.eslintrc.js` 删除；`dev` 脚本不再串联 lint）。

## 阻断级 Error（9 类，已全部清零）

| 审查项 | 数量 | 处置 |
|---|---|---|
| `innerHTML` 赋值 | 5 处 | `Memo.tsx`/`MemoEditor.tsx` 改 `DOMParser`；`marked.ts` 两个仅导出未使用的解析函数删除；`html2image` 改 `cloneNode` 深拷贝子节点 |
| 直接写内联样式 | 7 处 | 全改 `setCssStyles`（Obsidian 元素方法） |
| 动态创建并挂 `<style>` 元素 | 1 处 | `labs/html2image/getFontsStyleElement` 是死代码（返回的 style 内容全被注释，实际为空）→ 删文件 + 摘调用 |
| 无说明 / 无规则名 / 禁用受限规则的 `eslint-disable` | 19+19 处 | 过期失效的一律删除；确需保留的（react-hooks 依赖）补规则名 + 中文说明 |
| `navigator` 判操作系统 | 1 处 | 所在函数 `getOSVersion` 全仓无调用 → 删除 |
| `onunload` 里 detach leaves | 1 处 | 删除（连带「关闭 Memos」提示） |
| 使用要求 1.7.2 的 API（`revealLeaf`） | 2 处 | `minAppVersion` 1.5.0 → **1.7.2** |
| 创建 `<style>` 之外的受限元素 / 其它零散 | — | 同上逐项处理 |
| `no-explicit-any` 等「禁止禁用」的规则 | 3 处 | 修掉底层 `any`（如 `AbstractInputSuggest` 改用正式导出类型） |

## 顺带修复的真 bug（非 lint 要求，改动过程中发现）

1. **分享图深色背景一直抛异常**：`document.body.className.contains('theme-dark')` —— `String` 没有 `contains`（应为 `classList.contains`）。4 处（`ShareMemoImageDialog` ×3、`labs/html2image/index.ts` ×1），运行时直接 `TypeError`，分享图底色逻辑从未生效。
2. **外链图片分享必失败**：`fetch(url, { mode: 'no-cors' })` 拿到 opaque 响应（`status` 恒 0）→ 永远判定失败；改用内核 `requestUrl`（同时满足审查对 `fetch` 的要求）。
3. **死监听**：`obsidian-memos:settings-updated`（改名后全仓无触发点）删除。

## 尚未处理（批 2，按审查分档均为非阻断）

| 项 | 数量 | 说明 |
|---|---|---|
| `@typescript-eslint/no-unsafe-*` | 约 205 | 根因集中在 `src/labs/`、`src/editor/native.ts`、`polyfill.ts` 等 any 源头；需逐类补类型 |
| `react-hooks/exhaustive-deps` | 28 | 含 7 处刻意例外（已带说明禁用）；其余需逐个确认是否影响闭包正确性 |
| `no-misused-promises` | 24 | React 事件属性传 async 函数，需包一层 `() => void fn()` |
| `localStorage`（改用 `App#saveLocalStorage/loadLocalStorage`） | 4 | `helpers/storage.ts`；涉及草稿缓存/体检忽略行等键，迁移需考虑旧数据 |
| `no-deprecated`：`PluginSettingTab.display`、`setDynamicTooltip` | 3 | 前者需迁到 1.13 的声明式设置 API（大改），后者移除会让低版本失去数值提示 → 暂留 |
| `namespace` 语法 | 2 | `helpers/utils.ts`、`helpers/storage.ts`，审查归为 Recommendation |

## 其它两条非代码建议（已处理）

- **Repository**：仓库 Issues 原为关闭 → 已开启。
- **Releases**：构建证明（artifact attestations）→ 发版工作流已加 `actions/attest@v4`，推 tag 时自动为 `main.js` / `styles.css` 生成 provenance（步骤排在发布之前：证明失败则不出 Release）。
