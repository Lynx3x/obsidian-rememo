# Rememo — UI 样式接续文档

> 给后续"继续改样式/动效"的会话用。主上下文可能被压缩，改动前先读这份 + [CONTEXT.md](CONTEXT.md)。
> 插件现在叫 **Rememo**（id `rememo`），开发库目录 `L:\Files\ObsidianDevVault\.obsidian\plugins\obsidian-rememo`，分支 `dev`。

## 已拍板的方向（别再推翻）

- **不升 React**、**不引 Tailwind / shadcn**（嵌 Obsidian 宿主冲突、观感太"通用 SaaS"）。
- 样式路线 = **方案 A：调色板交给 Obsidian、骨架/手感留给自己**。
  - 颜色一律走 Obsidian 主题 CSS 变量或它们的语义别名 `--memo-*`（见下），**不要**再写死 `white`/`rgb(…)`/`#f1f1f1`/`@text-green`。
  - 深/浅主题：用 CSS 变量后**一份书写**即可，禁止再复制 `.theme-light`/`.theme-dark` 两套。
- **图标统一用 Material 实心**风格（fill 由 CSS 控制成 currentColor/muted/accent）。临时加过 lucide 描边又被 owner 否了——别再引描边系。
- 主题取向：**融入用户主题**（accent/bg/fonts 都随 Obsidian），插件不搞固定品牌色板。

## Token 系统（唯一调色入口）

文件：`src/less/theme.less`，作用域 `div[data-type='memos_view']`。

- 颜色：`--memo-bg`(=`--background-primary`) / `--memo-canvas`(secondary) / `--memo-surface-hover` / `--memo-border` / `--memo-border-strong` / `--memo-text` / `-muted` / `-faint` / `--memo-accent` / `--memo-accent-hover` / `--memo-on-accent` / `--memo-danger` / `--memo-link`
- 骨架：`--memo-radius-s/m/l`、`--memo-shadow-card`(常态) / `--memo-shadow-card-hover` / `--memo-shadow-s/l`(浮层)
- 动效：`--memo-transition-fast`(120ms) / `--memo-transition`(200ms)
- 关键帧：`memo-fade-in`、`memo-pop-in`(弹层)、`memo-comment-in`、`memo-edit-pulse`；`prefers-reduced-motion` 兜底在 theme.less 内
- `global.less` 顶部 `@import './theme.less'`。新样式文件也 `@import './theme.less'` 以便用 mixin/token。

## 已 token 化收口（主屏）— 别再写回双份

`global / memo-editor / editor / common-date-picker / memo(含评论) / memo-content / memolist / pagination / memos-header / search-bar / memo-filter / home(画布=background-secondary) / memo-trash(仅补间距) / image(容器 overflow hidden)`

## 还没做（次级界面，下一批）

弹窗 dialog、DailyMemoDiaryDialog、ShareMemoImageDialog、usage-heat-map、设置页、标签/查询/侧栏、preferences、memo-card-dialog、menu-btns-popup 等仍拖着旧样式的浅深双份/硬编码色，按同一套 token 收口即可。

## 动效约定 & 参数位置

- **发送蓄力→发射**：`MemoEditor.tsx`（`SQUASH_TOTAL_MS=130 / SQUASH_LAUNCH_MS=90`；`squashEditor` scaleY 0.94 往上缩、`transformOrigin:'50% 0%'`；发送后不立即清空：readOnly 锁定→发射点 `finishSend()` 清空）。
- **列表 FLIP**：`MemoList.tsx` useLayoutEffect 布局快照。顶部插入(新卡发射：纯位移+淡入，**不要 scale** 否则文字闪)、删除后补位上移对称。分页满页判定、删除判据已实现，别破坏。
- **菜单/搜索面板 pop-in**：`memo-pop-in`，origin 锚点 top-right。
- **评论/子条目**：`memo-comment-in`（小条目可轻 scale；正文文字多则只位移/淡入）。
- **删除碎纸机**：`Memo.tsx animateShred`（overlay 挂卡片 **offsetParent**，与删除/FLIP 并行；条数 8、下落 240–430ms、460ms 收尾）。
- **取消编辑高亮**：已修——取消走 `skipNextFocusRef` 跳过自动聚焦，别让 focus-within 残留。

## 反复踩过的坑（改样式前必读）

1. 主屏大多数祖先有 transform(`#page-wrapper`)→ 别用 `position:fixed` 做浮层坐标，碎纸/面板 overlay 要挂在能保住作用域的祖先上用 absolute（坐标用 offsetLeft/Top 避开 scroll）。
2. `.memo-wrapper` 若加 `transform`(hover translateY 等)会造层叠上下文→弹出菜单会被**下一条卡片的图标/内容穿透**。菜单 z 提很高也没用，得避免 hover transform 或保证不隔离。
3. 文字多的卡片动画别加 scale（会抖），用位移+opacity。
4. Obsidian 会给 `.text-input` 自带白底/高框/box-shadow、给 textarea `resize` → 需要显式覆盖（search-bar、editor 都有先例）。
5. 空格/换行往返：memo 内容统一 `<br>` 形态、首行空格在**发射时** trimStart 归一、解析端别把行首空格 trim 掉——否则"发送后 1~3s 文字变一次"。
6. 图标单色可染：svg 基座是 `:where(... svg){fill: var(--memo-text-muted)}` + `.icon-img/action-btn` 取 currentColor；要覆盖用更高特异性或类链，别靠 global `svg{fill:…}`。
7. 构建：pnpm v10 会拦 install scripts，`package.json` 已配 `"pnpm":{"onlyBuiltDependencies":["esbuild"]}`；改了依赖后若报 vite 找不到就 `CI=true pnpm install` + `pnpm rebuild esbuild`。产物 = `main.js`/`styles.css`，提交时随附。

## 检查提醒

Obsidian 里每改必看：浅/深两主题 + 改强调色 accent 跟随 + reduced-motion。上一批（主屏）owner 已目视通过；次级界面 token 化后仍需逐文件目视。
