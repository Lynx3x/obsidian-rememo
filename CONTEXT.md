# Rememo — Domain Context

> Domain glossary + handover doc for the Obsidian plugin **Rememo** (`rememo`, fork of Quorafind's Obsidian-Memos). Kept in sync as work proceeds. **Last updated: 2026-09-04.**

## Project location

- Vault: `L:\Files\ObsidianDevVault` (开发库，plugin 在这里被 Obsidian 加载)
- Plugin repo: `L:\Files\ObsidianDevVault\.obsidian\plugins\obsidian-rememo`（开发库文件夹名 obsidian-rememo；插件 id/name = rememo / Rememo，Obsidian 按 id 认插件）
- Branch: `dev`. Node 环境: pnpm + vite build. `npm run build` 产出 main.js/styles.css。
- 另一个库 `L:\Files\md-note-repo` 是**正式库**（317 个日记文件），开发时勿碰。

## The plugin in one line

Captures ideas ("memos") into Obsidian **daily notes**, lists them back, lets you tag / search / filter / share them, and (optionally) comment on them.

## Core domain terms

| Term | Meaning |
|---|---|
| **memo** | A single captured idea. Stored as a list item under a heading in a daily note (e.g. `- 12:34:56 内容 ^id`). Has `createdAt`, `memoType`, `hasId` (持久 `^id`), `linkId` (评论时 = 父的 `^id`), `isDeleted`. |
| **memo line** | The physical line in a note holding one memo. Grammar: `- [ ] HH:mm:ss 内容 [deletedAt: xxxxxx] ^xxxxxx`. 时间统一 `HH:mm:ss`（带秒）。 |
| **block id** | `^xxxxxx` (6位). **持久化，Obsidian 原生维护**（行号变也不变）。每条 memo/评论都有。读取缺时自动补写（B2 迁移）。 |
| **daily note** | A day file in the daily-notes folder (`daily/`). **Single source of truth**. Memos under `## Memo` heading (`ProcessEntriesBelow` 可配置). |
| **comment** | 评论 = 父 memo 下的缩进子项（原生列表嵌套），`linkId` = 父的 `^id`。多级 = 更深缩进。**零标记**，渲染出层级。 |
| **recycle bin** | 回收站。删除 = 日记行内加 `deletedAt: <14位时间戳>` 标记（在 `^id` 前），数据留在原处。恢复 = 去标记。永久删除 = 删行（父+子树）。**delete.md 已弃用**。 |
| **query** | Saved filter in `query.md`. Not actively used. |
| **tag** | `#tag` tokens from content, hierarchical (`a/b`). |
| **setting** | Settings live in `plugin.settings` + 响应式 `settingsStore`（appStore.settingsState）。评论相关开关已废弃（评论总开启）。 |

## Subsystems (good seams)

- **Note IO** — `src/obComponents/*`. 读/写日记文件、缩进解析、删除/恢复/永久删除标记。
- **MemoLine module** — `src/helpers/memoLine.ts`. **纯函数**：parse/serialize memo 行、缩进工具（getIndentWidth/Level）、时间提取（extractMemoTime）、deletedAt 识别（extractDeletedAt）。可单测。
- **Memo list** — 列表 + 过滤（`MemoList` 过滤 `linkId`=评论、`isDeleted`=已删）。
- **Memo rendering** — `formatMemoContent` (Memo.tsx) → HTML。清理空段（`<p><br></p>` 删除）。
- **Comment UI** — `Memo.tsx` (MemoComment 树渲染 + CommentInput 轻量输入框)。
- **Settings** — 响应式 store（`settingsStore`），组件经 `useContext(appContext).settingsState` 读取，`saveSettings` 后 dispatch。

## Completed work (阶段 A–D + bug fixes)

- **A 清理**: 删 12 死代码文件、废弃文档、`obsidian-memos-bac` 备份。
- **B 架构地基**:
  - B1 `MemoLine` 模块（memo 行语法收敛）
  - B2 持久 `^id`（读取缺时补写）
  - B3 响应式设置（appStore + context，设置实时生效）
  - B4 删 `api.ts` 透传（服务层直调 ob*）
- **C 加载优化**: 分批加载（最新优先）、增量重读（文件改动只读那个文件）、修复新建重复。
- **D 评论大改**（核心）:
  - 评论多级嵌套（缩进树渲染）
  - **脱离 Dataview**（读写都不依赖）
  - 统一 `memos` 数组（linkId 关联，废弃 commentMemos）
  - 回复评论（切换/取消）、删除评论（软删 + 回收站显示父来源/子树）
  - 轻量评论输入框 `CommentInput`
  - 删除改为隐藏标记（deletedAt），弃用 delete.md；回收站改读 isDeleted
- **Bug fixes**: 新建 memo 双击编辑/跳转失败（`waitForInsert` 未 await → id/path 空）。
- **阶段 D 收尾（2026-09-02）**:
  - 修 `backfillMemoTimes` 前缀重复 bug（group1 已含任务标记，原拼两遍）
  - 移除 SaveMemoButton 死设置（Editor 已用 send.svg）
  - **彻底移除 Dataview**：删 `getMemosFromNote`、`obsidian-dataview` 依赖、`FetchMemos*` 设置
  - **修 `getRemainingMemos` 漏 `m` flag**（2026-09-03）：带尾换行的文件 `matchLength=0` → `Memos===0` → 整文件跳过（解析+回写都不跑）。改 `'gm'` 后实测 `daily/2024-06-15.md` 三行旧格式成功自动回写 HH:mm:ss，测试文件已删
- **阶段 E 图片（2026-09-02）**:
  - 修图正则（`wepg`→`webp`、带参 URL、IMAGE_URL_REG 补 webp/bmp）
  - `MemoImage` 网格微博式定宽（1 图 160px / 多图 110px，列上限 3，不撑满整行）
  - 新深模块 `memoImages.ts`，三组件消重复解析
  - 修 ShareMemoImageDialog `setImgAmount` stale 闭包
- **预览重写（2026-09-03）**: `PreviewImageDialog` 弃用 showDialog 双层弹窗，改为独立挂载 yet-another-react-lightbox 全屏灯箱（官方样式 + 主题适配 `preview-lightbox.less`）。修 toolbar `prev/next` 文本 bug（库 toolbar 只认 zoom/close），多图导航走库原生箭头。DailyMemoDiaryDialog import bug（default 组件当函数用）一并修
- **深色评论样式补齐（2026-09-03）**: memo.less 深色镜像缺 `.memo-comment-actions`（回复/删除按钮）与 CommentInput 的 input/send/cancel 样式（旧版残留 `.common-editor-wrapper`）→ 深色下按钮回文档流变"下一行"、输入框无样式。已镜像补齐
- **UI 风格优化（第一轮·主屏，方案 A 接 Obsidian 主题，2026-09-03）**:
  - 新增 `less/theme.less` 语义 token（`--memo-*` 映射 Obsidian 主题变量，含 radius/shadow/transition + `memo-fade-up`/`memo-fade-in` 关键帧 + `prefers-reduced-motion` 兜底）
  - **收口浅深双写**：global / memo-editor / editor / common-date-picker / memo(含评论区) / memo-content / memolist / pagination / memos-header / search-bar / memo-filter 全部单份书写、吃 token；发送键/选中/删除/链接改用 `--memo-accent`/`--memo-danger` → **随用户 Obsidian 主题 accent 自动变**
  - 动效：memo 卡片入场 `memo-fade-up`、卡片 hover 抬升+shadow、按钮/图标/面板 hover·focus 过渡、日期面板淡入
  - 清理多文件整段注释死块；styles.css 本轮净减 ~19KB（283.6→264.3）
  - **同轮微调（2026-09-03）**：卡片阴影改小并拆两档（`--memo-shadow-card/-hover`）；回收站卡片间距补 gap 10（memo-trash.less）；字体跟随——正文/输入区用 `--font-text`、代码块用 `--font-monospace`；新 memo 入场改为 **MemoList 内 FLIP 位移动效**（WAAPI 驱动，新卡从上方 `-140px`“发射式”弹入+回弹、下方卡片平滑下挤；分页满 10 条的顶部插入判定已兼容；2.5s 节流防 vault 重读二次触发）。三点菜单修复：`.more-action-btns-wrapper` 提到 `z-index:50` 并去掉 `.memo-wrapper:hover` 的 `translateY`（transform 制造层叠上下文导致下一条卡片图标穿透菜单）；改为**点击钉住 + 外点/Esc 关闭**（CSS hover 仍作快捷打开），滚动时不再消失。发送动效定稿：编辑器**蓄力压缩** = 快速压到 scaleY 0.94 并停住，`SQUASH_LAUNCH_MS 90` 时瞬间回弹同时 pushMemo 发射（总 `SQUASH_TOTAL_MS 130`）；入场为**纯位移+淡入**（160ms，去 scale 防文字缩放抖动），下推 120ms。发送后输入框**不立即清空**：Editor 暴露 `clear()/setEditable()`，新建先 readOnly 锁定、文字保留到发射瞬间才清空。**空格归一在发射时完成**：新建用 `content.trimStart()` 落盘/入 store；且修 `obGetMemos` 剥 `^id` 后的 `.trim()`→`.trimEnd()`（否则重读丢行首空格、发送后二次抖动）——双保险保证"发射第一帧"与"之后重读"一致
  - **Q 弹动效批量（2026-09-03，A1–A4）**：①三点菜单 & 搜索快速过滤面板出现时 `memo-pop-in`（scale 0.92→1 过冲，transform-origin 锚点侧 top-right）；②评论/子条目挂载 `memo-comment-in`（轻上浮+放大）；③删除改为**碎纸机效果**（卡片竖向切成 8 条各自旋转下落淡出，WAAPI + overlay 克隆，overlay 挂在 `.memo-wrapper` 内以保留作用域样式；随后删除补位 FLIP）；恢复/回收站永久删除仍用"蹲→淡出/上移淡出"；④进入编辑 `memo-edit-pulse` accent 光环扩散一次；发送/取消/工具图标/评论发送统一**按压 scale 反馈**。搜索框样式修复：覆盖 Obsidian `.text-input` 白底/内建 box-shadow，胶囊 30px 高、细输入。碎纸 overlay 定位改 **absolute 贴在卡片自身**（`position:relative` 临时基准；fixed 会被 `#page-wrapper` transform 带偏）；主输入 textarea 禁缩放（`resize:none!important`）。**图标统一回 Material 实心风格**（恢复原 tag/image/journal/checkbox-active，calendar.svg 改写为 Material fill；丢弃临时描边 memo-*.svg）。碎纸机再调：overlay 挂到卡片 **offsetParent**，删除/下方 FLIP 上移与碎纸条**并行**（无空槽停顿）、下落提速
  - **待 Obsidian 目视**：浅/深主题 + 换 accent + 换社区主题验证协调性；弹窗/日期/回收站/设置/热力图/标签等次级界面**下轮**再做
- **UI 风格优化·次级界面 token 化（2026-09-04）**: 主屏之后把所有次级界面浅深双写清零、全部吃到 `--memo-*` token：
  - **theme.less 作用域扩展**：token 定义抽成 `.memo-theme-root()` mixin，同挂 `div[data-type='memos_view']` **与 `.dialog-wrapper`**（showDialog portal 到 body，没有后者弹窗内 var 全失效）；svg 基色/焦点环/reduced-motion 同步覆盖弹窗。新增 token `--memo-overlay`（弹窗遮罩）、`--memo-heat-1..4`（热力色阶，GitHub 式绿阶，值按浅/深主题各一套明度，定义在 theme.less 末尾）
  - **收口文件（17 个 less + 公共两件）**：dialog 外壳、about/daily-memo-diary/memo-card/create-query/share 五弹窗、tag-list(含 rename)、query-list、usage-heat-map、user-banner、siderbar、menu-btns-popup、daily-memo、setting、preferences-section、suggest(.rta)、common/selector。语义归一：主操作/激活=accent、危险=danger、浮层=memo-bg+border+shadow-s
  - **顺手修的 bug**：回收站 dark 侧 header title 18px 与 light 15px 不一致（统一 15）；`img.memo-show-editor-button` 双写死规则删除（DOM 是 div，img 选择器永不命中）；query/tag 弹层菜单 z-index 提到 50 并对齐 border+pop-in
  - **行为/观感变化（目视重点）**：daily-memo（日记弹窗时间线）dark 专属两行截断已移除（深色现在全文显示）；memo-card-dialog 纸黄色卡 → memo-bg 随主题（去掉"便签纸"质感，若觉素再议）；热力图深色红阶 → 与浅色同色相的绿阶（深色用 GitHub dark 亮绿值，深色下色阶才可见）；share 弹窗卡片底色/文字随主题（导出所见即所得），去大硬阴影；create-query/rename-tag 等主按钮绿红混杂 → accent
  - **清理**：删 5 个无 import 的死 less（my-account-section/change-password-dialog/mentions/toast/signin）；mixin.less 顶部 36 个无消费者 `@bg-*`/`@text-*` 变量移除；pretty-scroll-bar 吃 token（fallback 保留）。styles.css 283.6→224.6 KiB
  - 全库浅深双写清零，仅剩两处刻意适配（有注释）：preview-lightbox 灯箱按钮基色、memo-write-date 深色时钟图标 invert
  - **同日再删死界面（2026-09-04 下午）**：React 设置页 `/setting` 整链删除（无任何导航入口；设置实际走 Obsidian 原生 MemosSettingTab）——pages/Setting.tsx、PreferencesSection.tsx、setting.less、preferences-section.less、homeRouter '/setting' key、locationService/location.d.ts 的 '/setting'；tag-list.less 内 rename-tag-dialog 段删除（全库无 rename tag 功能，纯死 CSS）。**注意 memo-card-dialog 不是死的**：它是三点菜单「阅读」(READ) 的展示卡（另有点 memo 时间戳触发），Roadmap 里要优化的"阅读页"就是它，勿删
  - 热力图配色 owner 拍板（2026-09-04）：**深浅统一绿阶**（浅=旧深绿档 #9be9a8→#216e39，深=GitHub 亮绿档 #0e4429→#39d353），值集中在 theme.less 按主题给，勿再改
  - 侧栏选中态（选中标签/查询项、新建查询按钮、rta 选中）统一 accent 已获 owner 认可，保持
- **时间格式开关（2026-09-04）**: 设置新增 `TimeFormat`（默认 `'HH:mm:ss'`，可切 `'HH:mm'`）。只影响渲染与回写策略，**不改用户数据**：
  - 显示层：`utils.getTimeString/getDateTimeString` 加可选 `showSeconds` 参（默认 true 保持旧行为）；卡头/评论时间（Memo.tsx）、日记弹窗 chip（DailyMemo.tsx）、回收站删除时间（DeletedMemo.tsx）、阅读卡（MemoCardDialog.tsx）全部跟随
  - 回写：HH:mm:ss 模式读取到无秒行照旧回写补秒；**HH:mm 模式暂停回写**（obGetMemos.ts 判断 `settings.TimeFormat !== 'HH:mm'`），切回带秒后恢复——`undefined` 兜底=带秒旧行为
  - 新 memo 落盘始终 HH:mm:ss，不随开关（数据完备性优先）
  - 翻译 key：'Time display format' / 'Time display format description'（en/zh-cn）
  - 注：`npx tsc` src 有两条**基线噪音**（非本次引入）：CommentInput.tsx `'Cancel'` 不在 en keyof、Editor.tsx rta 泛型不匹配
- **`[[` 文件名联想增强（2026-09-04）**: rta '[[' trigger 早已存在（多字符 trigger 库支持），本轮把"基础版"做成类 Obsidian：`obFileSuggester.getSuggestions` 评分排序（basename 前缀 > basename 包含 > 全路径包含，同分路径字典序，空 query 全量按路径列出）；联想条目显示 md 用 basename（无扩展名）、图片带扩展名 + 右侧淡色目录消歧，选中高亮走 accent（suggest.less 新增 `.rta-sug-file/name/path`）。注意 rta 传给 dataProvider 的 token 仍带 '['（如 '[ob'），剥前缀处已兼容
- **读取自动修复移除 + 体检 UI v2（2026-09-05）**: 读取端 `backfillMemoIds/backfillMemoTimes` 及其调用**已删除**（obGetMemos.ts）——缺 ^id 的行只生成内存随机 id 支撑会话、旧时间只解析不回写；数据问题全部收敛给"数据体检"修，读取不再隐式改写用户文件。audit UI 重构为**文件 → memo 行分组**（文件/行均可折叠；行内容单行缩略、点击展开原文与"修复为"预览；修复粒度为行 = 该行可修问题循环修到干净，备份在 `.rememo-backup/audit-<ts>/`；忽略也是行粒度，key = `path#line`）。坑：弹窗内列表一律用 **div** 别用 li（theme.less 会给 li::before 注入 '•'，flex 布局下变成孤立圆点行）。测试数据在开发库 `daily/2026-09-05.md` 尾部（【体检测试】行：旧14位时间 / 缺id / 重复id / <br>）
- **大改立项（2026-09-05）**: 富内容存储（卡片块多行正文，弃 `<br>`）+ cm6 输入内核。**决策与规格见 [PLAN-FORMAT.md](PLAN-FORMAT.md)**（头行纯标识、正文 4 空格缩进、deletedAt 仍放行内、评论/引用首期不做未来走跨文件引用卡）。P0 = `src/audit/` 规则引擎体检工具（先行，eslint 式规则注册表，同时是迁移执行器）。tag 联想事实更正：Obsidian 原生有（1.4.0 changelog "Tag autocomplete now uses a fuzzy search algorithm"），cm6 autocomplete 框架内实现，别再断言没有。
- **阶段 F1 指定日期添加（2026-09-03）**:
  - **移除旧「输入 @/📆 弹日历插截止日期文本」功能** + `InsertDateFormat` 设置项；删 `select-date-picker.less`（`.rdp-*` 旧 react-day-picker 死样式，全仓库仅 MemoEditor 一处 import）。owner 从未用过、无此需求
  - 新增**写入日期**：工具栏日历按钮 → 新组件 `WriteDatePopover`（复用 `DatePicker` + `.editor-date-picker` 外观、react-popper 定位、HH:mm input，秒固定 00）；选定后 chip `写入 YYYY-MM-DD HH:mm`，**保留到手动 ✕**（回默认"现在/今天"）。写旧日期文件不存在时走既有 createDailyNoteCheck 新建
  - `memoService.createMemo` 第三参类型收正为 `moment.Moment`（原伪 `Date`，运行时本就要 moment）；保存时 `targetDate` 非空则传给 `waitForInsert`（`insertDate` 参数早已支持）
  - 编辑态隐藏日历按钮/chip（编辑不挪日期）
  - 新文件：`components/common/WriteDatePopover.tsx`、`icons/calendar.svg`、`less/memo-write-date.less`（初版浅/深两套，UI 轮已收口为 token 单份）

## Pending work (按顺序)

1. **阶段 D 收尾** — ✅ 全部完成（时间迁移实测通过）
2. **阶段 E 图片** — ✅ 代码完成，图片宽高/预览待 Obsidian 目视确认
3. **阶段 F1 指定日期添加** — ✅ 全部完成（2026-09-03，Obsidian 目视确认通过）
4. **UI 风格优化（方案 A 接 Obsidian 主题）** — 主屏 + **次级界面全部 token 化收口 ✅ 代码完成（2026-09-04）**，全库浅深双写清零。**Obsidian 目视待确认**（重点清单见上条目视 4 点 + 弹窗/回收站/设置/热力图/标签/查询/侧栏逐文件）。目视后若有细节（间距/动效强弱/对比度）再微调
5. **阶段 G**: `parseMemo` 拆分（formatMemoContent 的 HTML 与图片/标签结构化）。
6. **阶段 F2 小红书导出**（最低优先，**可弃**）: 需先调研导出格式（9 图/文案排版），暂不做。

## Roadmap（新增规划 2026-09-04，未排期，实施前需与 owner 细化）

**导航 / 布局**
- 去掉界面左上角的**用户名显示**；同步清理相关设置项（确认不影响正文里渲染的用户名）。
- 左侧那个小菜单（用户名旁）不要了：把入口挪成"主页 / 随机访问(暂缓) / 回收站 / 设置"式导航，位置在**热力图下方、标签上方**。
- **导入**功能：运作机制不明 → 之后再调研决定去留。
- **About 页面**：直接移除，内容挪进项目 README。
- 加"是否启用回收站"开关：关闭时删除 = 二次确认后**直接永久删除**（不再进回收站）。

**视觉**
- **热力图**：样式优化 + "是否显示热力图"开关（设置项）。
- 三点菜单「**阅读**」页观感丑 → 优化；点**日期 = 阅读**的行为也奇怪 → 重新想这两个入口（阅读到底打开什么、日期点击该干嘛）。
- 三点菜单内**文字略偏** → 修（padding/行高/对齐）。

**格式 / 设置**
- 时间显示格式开关：`HH:mm` 或 `HH:mm:ss`
  - 选带秒：读取到无秒数据时回写补秒（沿既有 backfill 机制）。
  - 从带秒切回不带秒：**只改渲染逻辑，不改用户数据**。
- 输入框支持 `[[` **文件名联想**（类 Obsidian 原生提示，现 [[ 联想是自动补全做的基础版）。
- 输入框支持 **markdown 所见即所得**（加粗/删除线等）：先评估能否直接上"原生输入/富文本"，现有 @webscopeio/react-textarea-autocomplete 不是原生输入。

**标签**
- 标签区加小按钮切换：**平铺 / 树状**（决定标签是否折叠）。

## Key technical decisions

- **时间格式统一 `HH:mm:ss`**（带秒）。评论不用 14 位时间戳（日期来自文件）。
- **删除 = 隐藏标记**（`deletedAt:` 在 `^id` 前），不移动数据。恢复=去标记，永久删除=删行。
- **评论默认开启**，废弃 `CommentOnMemos`/`CommentsInOriginalNotes` 设置开关。保留 `ShowCommentOnMemos`（评论列表显隐）。
- **`^id` 在行尾**，`deletedAt` 在 `^id` 前（不影响 id 解析）。
- **子评论不单独标记**：父 deleted → 子树隐藏（读取时父 `isDeleted` 跳过子树）。
- **指定日期写入**：复用 `waitForInsert` 的 `insertDate`（moment）。UI 独立于内容里的日期文本——原"输入 @/📆 插日期"功能已整体删除，无残留。写入目标秒统一 `HH:mm:ss`（面板只填 HH:mm → 秒 00）。
- **Feed 排序 = createdAt 降序**（非文件行序）→ 补录旧日期 memo 追加在文件 memo 区末尾即可，显示位置靠排序正确。

## Current-state facts (verified 2026-09-03)

- 开发库 `daily/` 有 11 个日记文件、35 条 memo（含测试评论/删除数据）。全有 `^id`。时间迁移测试文件 `daily/2024-06-15.md` **已删**（验证完成）。
- 图片解析收敛到 `src/helpers/memoImages.ts`（`parseMemoImages(content, app)`），MemoImage/DailyMemo/ShareMemoImageDialog 共用。
- `memos.ts` 不再有 `FetchMemos*`/`SaveMemoButton*` 全局变量；`obGetMemos.ts` 不再导入 obsidian-dataview。
- 图片正则已修：consts.ts 里 `wepg`→`webp`，`IMAGE_URL_REG` 补 webp/bmp，`MARKDOWN_WEB_URL_REG` 支持带参 URL。
- `MemoImage` 网格：**微博式定宽**（单图 160px / 多图 110px，列上限 3，不撑满整行）。`src/less/preview-image-dialog.less` 已删，改由 `src/less/preview-lightbox.less` 定制灯箱。
- 时间迁移两 bug 已修并实测：`backfillMemoTimes` 前缀重复 + `getRemainingMemos` 漏 `m` flag（后者导致带尾换行文件整文件跳过）。
- 图片预览：`PreviewImageDialog` 独立挂载 yet-another-react-lightbox（弃 showDialog 双层），单图隐藏左右箭头、多图循环、Zoom 插件可用。
- 深色评论样式补齐（memo.less）：actions 按钮、CommentInput 全套；`comment.svg` 硬编码 fill 改 `currentColor`；深色 send-btn 用 `@text-dark-red` 与主编辑器 confirm 一致。
- **指定日期写入（2026-09-03）**：MemoEditor 工具栏新增 `calendar.svg` 按钮 → `WriteDatePopover`（DatePicker+HH:mm）。目标 moment 存 `targetDate`（react-usestateref 的 ref 供空依赖回调读），**保留到手动 ✕**；编辑态不显示。`memoService.createMemo(content, isList, targetDate ?? undefined)`，缺省仍写"现在/今天"。旧 @/📆 日期插入 + `InsertDateFormat` 设置 + `select-date-picker.less` 已移除。
- 注意：`styles.css` 已随次级收口重新 build（224.6 KiB，main.js 本轮无改动）。次级界面 token 化（2026-09-04）尚未目视，弹窗/回收站/设置/热力图/标签/查询/侧栏需逐文件在 Obsidian 里看浅/深 + 换 accent。

_See also: [PLAN-FORMAT.md](PLAN-FORMAT.md) (2026-09-05 富内容存储+cm6 大改计划，P0 体检引擎进行中) · [REFACTOR-2026.md](REFACTOR-2026.md) (2026 重构方案，部分已实施) · [UI-STYLE.md](UI-STYLE.md) (样式/动效接续文档：token、已收口清单、待办、坑)。_
