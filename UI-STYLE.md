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

## 按钮与主操作（2026-09-05 后约定，别再走 accent 实底白字）

- owner 主题 accent 偏浅，**accent 实底 + `--memo-on-accent` 白字会白成一片不可读**（实测两处）。主操作按钮统一走 `.btn-accent()` mixin（audit-page.less 顶部）：accent 色**文字** + accent 12% 淡底 + 45% 描边，hover 加深。新写按钮照此；若某处仍用实底白字且 owner 报看不清，同样处理。
- theme.less 全局 `button` 规则已加 `background-image: none`——Obsidian 主题会给 button 挂渐变 background-image，会盖住我们设的 background-color（按钮"全白"常见根因之一）。

## 间距标度与状态语汇（2026-09-06 /impeccable layout 收口）

- **间距标度**（px 直写即可，不引 spacing 变量）：区块间 **8**、列表 gap **10**、纸内 **12/16**、侧栏行距 4、行高 38/40；统计行↔热力图分节 **12**（usage-heat-map-wrapper `margin-top: 12px`，窄屏 `--narrow` 内重置 margin-top 0）。
- **主列左缘单轨**：content-wrapper `padding-left: 10`；memolist `padding-left: 0`（右 4px 让滚动条）——卡片左缘与编辑器/标题同线，勿再写 2px 内缩。
- **列表尾**：状态行 `.status-text-container` 只在有话术时渲染（MemoList `statusText` 判空）；Pagination 仅 `totalPages > 1` 渲染——单页不出现禁用钮（margin 8/4，钮距 8）。
- **激活/选中唯一轨，无 accent 实底白字**：页面导航 = accent 粗体无底；数据行选中（查询/标签）= accent **12% 淡底 + 粗体**（query-list 已改并去 `!important`）；页码/按钮 = `.btn-accent` 公式。**pagination.less 于本批补收口**——此前漏网：裸类名无作用域 + 直写宿主 var + 硬编码 `#fff`/`0.2s`，现挂 `div[data-type='memos_view']` 并全走 token（/audit 同作用域，共用不受影响）。
- **悬案（owner 目视后定）**：侧栏行文字列 40（查询/标签）vs 52（导航）差 12px——icon 列同在 x24，差源于 # 字形窄 + svg 18px/gap10。若要对齐：（a）导航项 `padding-left: 4`（文字落 40，icon 中心左偏 ~7px）或（b）查询/标签 `.icon-text` 宽 16→28（文字落 52，#↔文字间隙过大）。未实施，别绕过 owner 自行决定。

## P1 行式渲染相关样式（memo-content.less）

- 结构类（渲染器输出，勿手改 DOM）：`.memo-md-line`（列表/任务行，紧凑 margin，勿吃段落负 margin）、相邻普通段落 `> p:not(.memo-md-line) + …` 段距 8px（空行分段可见）、`pre`（代码块）、`.todo-block`/`.counter-block`、行内 `code`（theme.less 全局样式）。
- 主操作/激活语义色已统一 accent/danger（见已收口清单）；**全库列表结构用 div 别用 li**（theme 会给 li::before 注入 '•'，flex 下变孤立圆点行）。

## 任务卡勾选框（P1b，2026-09-05）

- 任务卡（memoType TASK-TODO/DONE）在头部时间旁渲染 `.memo-task-toggle`（memo.less，替换已退役的 `.memo-type-img`）：20px 可点区，svg 16px `fill: currentColor`；悬停 accent；`.done`（TASK-DONE）勾选态 muted（低调度），正文置灰走 `.memo-wrapper.TASK-DONE > .memo-content-text { color: var(--memo-text-faint) }`（不划线）。
- 勾选框恒显示（不受任何设置门控）；点击走 toggleMemoTask 写回头行 [ ]↔[x]，写完即回读。
- 评论样式（`.memo-comment-*`、`memo-comment-in` 关键帧）已随 P1b 评论链拆除删除——勿再按旧名补样式，P3 引用卡会重建。

## Token 系统（唯一调色入口）

文件：`src/less/theme.less`，作用域 `div[data-type='memos_view']`。

- 颜色：`--memo-bg`(=`--background-primary`) / `--memo-canvas`(secondary) / `--memo-surface-hover` / `--memo-border` / `--memo-border-strong` / `--memo-text` / `-muted` / `-faint` / `--memo-accent` / `--memo-accent-hover` / `--memo-on-accent` / `--memo-danger` / `--memo-link`
- 骨架：`--memo-radius-s/m/l`、`--memo-shadow-card`(常态) / `--memo-shadow-card-hover` / `--memo-shadow-s/l`(浮层)
- 动效：`--memo-transition-fast`(120ms) / `--memo-transition`(200ms)
- 关键帧：`memo-fade-in`、`memo-pop-in`(弹层)、`memo-comment-in`、`memo-edit-pulse`；`prefers-reduced-motion` 兜底在 theme.less 内
- `global.less` 顶部 `@import './theme.less'`。新样式文件也 `@import './theme.less'` 以便用 mixin/token。

## 已 token 化收口 — 别再写回双份

**主屏**：`global / memo-editor / editor / common-date-picker / memo（评论样式已随 P1b 拆除，勿补）/ memo-content / memolist / pagination / memos-header / search-bar / memo-filter / home(画布=background-secondary) / memo-trash / image(容器 overflow hidden)`

**次级界面（2026-09-04 收口；目视与待办状态以 CONTEXT §0/§4 为准，勿在此重复维护）**：`dialog`(弹窗外壳) / `about-site-dialog` / `daily-memo-diary-dialog` / `memo-card-dialog` / `create-query-dialog` / `share-memo-image-dialog` / `tag-list` / `query-list` / `usage-heat-map` / `user-banner` / `siderbar` / `menu-btns-popup` / `daily-memo` / `common/selector` / `audit-page`(数据体检整页：文件→memo行分组/折叠/徽章/最近修复/分页)。收口时的语义归一：**“主操作/选中激活”一律 `--memo-accent`（原绿/红/蓝混杂）、危险操作 `--memo-danger`、次要提示 `--memo-text-muted`、浮层 = `--memo-bg`+1px `--memo-border`+`--memo-shadow-s`、卡 = `--memo-bg`+`--memo-shadow-card`**。日期/标签等输入控件需显式覆盖 Obsidian `.text-input`（坑 4）。
同批删除的死界面（勿再找）：React 设置页 `/setting` 链（pages/Setting、PreferencesSection、setting.less、preferences-section.less、路由与类型）——设置实际在 Obsidian 原生设置里；tag-list 内 rename-tag-dialog 段（无功能）。`setting` 的语义名与 `pages/Setting.tsx` 无关（那是 Obsidian 原生 setting tab 入口）。

同批删除的死文件（勿再找）：`my-account-section / change-password-dialog / mentions / toast / signin` 5 个 less 无任何 import；`mixin.less` 36 个无消费者 `@bg-*`/`@text-*` 变量。自产联想 suggest 与 rta 输入已退役（7c65cc9，联想回归内核原生 editorSuggest）——勿再按旧样式名补样式。

**全库浅深双写已清零**，唯一保留的 theme 分支是两处刻意适配（有注释）：
- `preview-lightbox.less`：全屏灯箱的浅/深按钮基色（覆盖在 Obsidian 之上，不属于任何 token 作用域）
- `memo-write-date.less`：深色时钟图标的单行 invert 特调

## Token 作用域（弹窗 portal 在 body，不在视图内！）

theme.less 把 `.memo-theme-root()` mixin **同挂 `div[data-type='memos_view']` 与 `.dialog-wrapper`**——`showDialog` 会把弹窗 portal 到 `document.body`，没有后者时弹窗内 `var(--memo-*)` 全部失效。凡插件自绘的 body 级浮层（弹窗/灯箱/菜单等）要消费 token：要么挂在已有作用域下，要么先在 theme.less 扩展作用域列表。
新增 token（2026-09-04）：`--memo-overlay`（弹窗遮罩，引 `--background-modifier-cover`）、`--memo-heat-1..4`（热力色阶，GitHub 式绿阶——**值在 theme.less 末尾按浅/深主题各给一套明度**，组件只消费 var 一份；深色不套用浅色半透明值，否则看不见色块）。

## 待 owner 反馈

- 主屏/次级界面细节微调（间距/强弱/对比度），以 Obsidian 内目视为准；待办跟踪在 CONTEXT §4。

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

## 2026-09-06 /impeccable polish 全界面收口记录

- **悬案定案（owner 拍板）**：① 侧栏行文字起点统一——查询/标签行 `.icon-text` 宽 16→**18 + text-align:center**（# 与导航图标同在 x25 中线）、`-text-container` 加 **gap:10**，文字起点与导航同列（x44）；行高 40 vs 38 不动。② 「阅读」双入口**保留**（点时间=打开阅读弹窗，owner 认可微博同款逻辑），不改。
- **实底白字清零漏网补丁**（全改 12%→hover 22% 淡底公式 / 12% 淡底）：`.write-date-confirm`（写日期确认）、create-query `.save-btn`、search-bar `.type-item.selected`、query-list「+ 新建」hover、feed 正文 `.tag-span:hover`（改为 accent 18% 叠 surface-hover，不再实底白字）、date-picker `.current`（选中日圆点）。
- **TagList 行激活补齐 12% 淡底 + accent 粗体**（与 QueryList 数据行选中同语汇）；`.tag-count` 补样式（12px muted，此前裸奔）。
- **菜单族统一**：主列表/回收站/查询项的三点菜单同款（shadow-l、radius-m、min112、Q弹 pop-in）。回收站卡补 click-pin（DeletedMemo 与主列表同逻辑：外点/Esc 关）；`more-action-btn` 补 cursor/color。回收站卡 padding 12/18→**12/16** 与全库卡一致。
- **世界律**：回收站恢复/整删出场动效去掉 scale（纯 translate + 淡出）。
- **交互/a11y**：弹窗 Esc 由（不生效的）onKeyPress 改 **onKeyDown**；三点菜单/查询行操作/标签展开的 span → 真实 `<button>`（global `.btn` + theme button 规则兜底 box-sizing/padding/font，此后菜单项天然可 Tab/Enter/focus ring）。
- **死代码删除**：home.less `Control-box/controlPanel/controlBtn/react-transform-wrapper/永不命中的 mobile body 规则/content-wrapper-padding-fix`；editor.less `cm-tooltip-autocomplete` 整块（自产联想退役 TODO 兑现）+ `.scroll` 规则；siderbar `.memos-sidebar-wrapper-display`；global.less DINPro ×2（空 src 零引用）；share 弹窗 chrome 字体 RobotoDraft 退役随宿主。
- **i18n**：分页「上一页/下一页」硬编码中文→键；搜索占位、FILTER 标、标签引导、`MEMO Not Found` → t()；新键补五语言（en/zh-cn/fr/pt/pt-br），stub 语言走 en fallback（helper 既有行为）。
- 检测器：既有 68 advisory 为注释在案的例外（Q弹曲线/字号档/默认色兜底/灯箱），无新引入问题。
