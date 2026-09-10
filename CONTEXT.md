# Rememo — 开发交接主文档（速览优先版，2026-09-05 整理）

> 用途：跨会话交接。**每次会话先读 §0 速览（≤30 行）**，需要细节再按索引深入；已完成工作的细节一律看 git log（本文件不重复流水账）。
>
> **文档地图**（什么时候读哪份）：
> - [PLAN-FORMAT.md](PLAN-FORMAT.md) —— **现行规格**：存储格式 / 体检架构 / 输入栈（活文档）
> - [UI-STYLE.md](UI-STYLE.md) —— 样式与动效接续（改样式前读）
> - [docs/adr/](docs/adr/) —— 高代价决策档案：为什么这么做
> - [P2-INVESTIGATION.md](P2-INVESTIGATION.md) —— 输入内核反编译锚点与防坑（历史档案）

## 0. 现状速览（每次会话从这里开始）

- 插件 Rememo（id `rememo`，曾名 Memos Plus）。仓库：`L:\Files\ObsidianDevVault\.obsidian\plugins\obsidian-rememo`，分支 `dev`，pnpm+vite，`pnpm build` 出 main.js/styles.css 随提交附。`L:\Files\md-note-repo` 是正式库（322 日记，2026-09-05 盘点）**勿碰**。HEAD 见 `git log -1`。
- **存储唯一格式 = 卡片块**：头行 `- [ ]? HH:mm:ss [deletedAt: 可读] ^6位id`（纯标识，行内无正文）+ 其后 ≥4 空格正文。旧单行/<br>/评论已不渲染、写入只写新格式、旧行由体检整文件迁移恢复（P1b 修订，2026-09-05，见 ADR-0002）。
- **主线状态（2026-09-05）**：P1b（读收窄/写端/任务卡/迁移 v1）✅ 目视通过；**P2 输入内核定稿 ✅ owner 目视全绿（反编译定案：首次 `set()` 构建 state 时把子类覆写的 `buildLocalExtensions` 扩展带进内核，见 §6）**；**P3 引用系统全部交付 ✅ owner 目视全绿（ADR-0003：MEMO_LINK 评论≡引用，a770b1a/4d634a6/33fc153，push 至 33fc153）**；**2026-09-06 侧栏导航重组批次（ADR-0004）已目视闭环**（f073768 实施 → 目视迭代 → polish 收口 043252b，原 §4 待目视条目已摘除）；**2026-09-09 回收站总开关已实施并目视通过**（原 §4 0 摘除）；**2026-09-09 blockquote 渲染缺口已修复并目视通过**（原 §4 1 摘除）；**2026-09-10 标签平铺/树状切换已实施并目视通过**（原 §4 0 摘除）；**2026-09-10 热力图批次已实施并目视通过**（原 §4 0 摘除）；**2026-09-10 统计行批次（切页/重开跳动修复+口径统一+数字滚动动效）已实施并目视通过**（原 §4 0 摘除）；**2026-09-10 设置页重构批次已实施并目视通过**（八组分组；「插入标题/解析标题」合并为**「Memo 区标题」**单设置+读写 bug 修复；死设置/复制功能/检索文件名设置退役；命令精简至仅 `Open Memos`；细节 git log）。**正式库启用要点已转 §8**（2026-09-10 起不再作为 Pending——插件已完备，owner 择机在正式库直接启用）；阶段 G/F2 未排期（见 §4）；**2026-09-10 BUG 批（发送失败兜底 + 关闭视图误弹提示）已实施并目视通过**（编辑路径删写盘前清草稿缓存——失败不丢输入；失败提示「保存失败:<原因>」停留 8 秒；删侧栏图标的「成功打开 Memos」提示；i18n 死键清理）；**owner 先前登记候选余 6 条（FEAT/BUG/STYLE）见 §5**（未排期，动手前先 grill）。
- 已知可复验状态：新样例 `daily/2026-09-06.md`（dm0001~5）；旧测试数据在 dev 库 09-03/04/05 等文件（可一键体检迁移）；styles.css ~247 KiB、main.js ~1.27 MB（2026-09-10 实测）。

## 1. 核心域词汇（现行）

| Term | Meaning |
|---|---|
| **memo** | 一条闪念 = 一张卡片块。渲染对象只有它。 |
| **卡片块** | 纯标识头行 + 4 空格正文；正文空行分段、额外缩进给 md 嵌套；块边界 = 非空缩进<4 的行/标题/文件尾。 |
| **^id** | 行尾 `^` + **6 位** [A-Za-z0-9]{6}，Obsidian 原生维护。**恒 6 位（踩坑教训：样例别造 7 位）**。 |
| **deletedAt** | 软删标记，在 `^id` 前，无方括号；值可读 `YYYY-MM-DD HH:mm:ss` 或旧 14 位（读取双兼容）。 |
| **daily note** | 数据源。memo 处理区 = 「Memo 区标题」小节（读写共用单设置；无标题文件读取端不读、写入端自动创建；读端/体检/迁移同源 helpers/memoSection）。 |
| **Memo 区标题** | 设置项（默认 `## Memo`）：新闪念写入其下、且只读取其下；文件缺失该标题时写入端自动创建（2026-09-10 合并旧「插入/解析」两键）。 |
| **评论（旧）** | **已废弃**：缩进子树 + linkId 格式作废，正式库旧评论行由迁移 v2 直转引用卡（ADR-0003）。 |
| **引用卡** | 正文含 MEMO_LINK `[@标签](日记文件#^id)` 的普通 memo——评论 ≡ 引用（可多引用、链式）；渲染 = 被引用卡下聚合区。 |
| **回收站** | isDeleted 的卡（头行 deletedAt）；恢复=去标记、永久删除=删整块。总开关「启用回收站」（设置）关闭时删除不再进回收站、入口隐藏（细节 git log 09-09 批）。 |
| **task 卡** | 头行带 `[ ]`/`[x]`（TASK-TODO/DONE）；勾选框在头部时间右侧写回头行；菜单可普通⇄任务卡。 |
| **草稿缓存** | 编辑器草稿的持久缓存（storage 键 `editorContentCache`，MemoEditor.tsx）：编辑器挂载时取它做初始内容；随输入更新、**写盘成功后才清空**——失败时保留，是「失败不丢输入」的兜底（2026-09-10：编辑保存不再提前清）。 |

## 2. 代码地图（现行，改动前先定位）

- **读写**：`src/obComponents/` —— 读 `obGetMemos.ts`（行级只认纯标识头，parseMemosFromNote）；写定位 `locateMemo.ts`（^id 优先/行号兜底/scanBodyEnd）；`obCreateMemo`（块插入：Memo 区标题节尾，缺失自动创建）、`obUpdateMemo`（只替换正文域）、`obHideMemo`（软删/恢复/整块删除）、`obToggleMemoTask`（勾选/类型切换）；`src/helpers/memoLine.ts` 纯函数（classifyMemoRow 三态/时间/删除标记，读端+规则+迁移共用）；`src/helpers/memoSection.ts`（处理区语义唯一来源：getMemoSectionRule/computeScope，读端+体检+迁移共用）；检索文件名常量 `QUERY_FILE_NAME`（consts.ts，2026-09-10 设置退役后写死）。
- **渲染**：`formatMemoContent`（Memo.tsx）→ `marked.ts`（行式结构 + 行内增强）；`memoImages.ts` 图片解析。卡片 UI：Memo.tsx / DeletedMemo.tsx。
- **编辑器**：`components/Editor/Editor.tsx`（cm6 host：keys/suggest/highlight/format 在 `src/editor/`）+ `MemoEditor.tsx`（工具条/蓄力发送/编辑态）。
- **体检**：`src/audit/`（rules 注册表 + engine 行修复 + migrate 整文件迁移 + AuditPage 路由 /audit）。
- **样式**：`src/less/` 全部 token 化收口（theme.less 定义 `--memo-*`，作用域 memos_view + .dialog-wrapper；坑见 UI-STYLE.md）。

## 3. 技术决策（一句话版，现行有效；被修订旧决策已删，完整论证与演变史见 [docs/adr/](docs/adr/)：0001 输入内核 / 0002 存储格式 / 0003 引用模型）

- 时间统一 `HH:mm:ss` 落盘（数据层恒定；编辑回写只替换正文行，内存对象时间从 id 前 14 位还原）；`TimeFormat` 设置只影响界面显示（**默认 `HH:mm` 不带秒**，2026-09-10 由带秒改；设置页可切回 `HH:mm:ss`）。
- 删除 = 头行 `deletedAt` 软删（值可读）；永久删除 = 删整卡片块。
- 旧数据不渲染、写入只写新格式、混合文件合法（旧行等体检迁移）——见 §6 之外的 P1b 记录（git log 4c881ec）。
- 评论（缩进/linkId）**已废弃**——引用系统取代（[ADR-0003](docs/adr/0003-memo-link-reference-model.md)）：引用 = 正文 MEMO_LINK `[@标签](文件#^id)` 的普通卡，无独立字段，content 即真相。
- Feed 排序 = createdAt 降序；指定日期写入走 `waitForInsert` 的 insertDate（moment）。
- 数据刷新时机（2026-09-10）：全量重读仅视图首开/重开（onOpen invalidate）、手动刷新（点标题）、设置更新、文件删除时发生；**路由切页不重读**（曾致统计行/热力图随分批加载跳动）；文件改动走 fetchMemosFromFile 增量；**重开且已有数据时重读为静默模式**（`fetchAllMemos({silent})` 读完全量一次性替换——分批中间态曾让数字滚动“又播一遍”；首开空库保留渐进加载）。统计行数字有计数器滚动入场动效（AnimatedNumber，每挂载播一次+落定轻弹，reduced-motion 跳过）。
- 读写区段同源（2026-09-10 设置合并）：处理区 = 「Memo 区标题」小节；写入插其节尾（下一个同级或更高级标题前），**标题缺失自动创建**（frontmatter 后；空文件也建）；读取**严格**（整文件无该标题 → 不读）。体检/迁移共用 `helpers/memoSection.computeScope`——处理区判定唯一来源，勿再抄。
- 输入内核 = **Obsidian 原生 MarkdownEditor 子类 + 首次 set() 建态 + DOM 外层控制**（2026-09-05 owner 拍板，论证见 [docs/adr/0001](docs/adr/0001-input-core-native-markdowneditor.md)，接入细节见 §6）；存储/体检规格见 PLAN-FORMAT.md，勿在 CONTEXT 重复。

## 4. Pending（按顺序）

0. **阶段 G**：formatMemoContent 渲染与图片/标签结构化拆分（小重构）。
1. **F2 小红书导出**（最低优先，可弃）。

## 5. Roadmap / 候选清单（2026-09-10 登记 8 条；发送失败兜底、关闭视图误弹已完成闭环，余 6 条未排期——动手前先 grill 细化）

- FEAT **发送音效**：默认不配；允许用户配一个音效路径（空 = 静音）。
- STYLE **工具栏任务切换钮**：切换 普通/任务 时输入框内要有可见的样式变化（让切换"看得见"）。
- BUG **热力图 × 检索器**：①点某日筛选后，检索条显示当天条件但被缩略显示不全；②经「取消检索规则」退出的路径，日历格高亮不消失。**根因已定位（2026-09-10 勘察）**：① 检索条时间 chip 的 `to` 多加 1 天（MemoFilter.tsx）→ 单日筛选显示成两天；② 高亮是 UsageHeatMap 组件本地 state、不订阅检索变化 → 各退出路径都不清理。全仓（文档+git log）无「检索器重做」计划痕迹（只有本条原文）——排期时先明确口径。
- FEAT **标签渲染选项**：标签统一抽到卡片最下方（现状）vs 保留原位夹杂——做成可选项。
- FEAT **筛选某天 memo 的显示功能**（更多入口？owner 原话登记）。
- FEAT **回收站自动清理**：超过指定天数自动删除；默认「永不删除」。

## 6. P2 输入内核定稿（2026-09-05 owner 目视全绿；决策论证见 [docs/adr/0001](docs/adr/0001-input-core-native-markdowneditor.md)，排查史看 git log）

**结论先行**：输入框本体 = 内核 MarkdownEditor 子类（打字/光标/IME/撤销全走内核）；插件能力分两条通道接入——能进编辑器的（格式高亮/占位/换行/keymap 等）在覆写的 `buildLocalExtensions()` 里追加；交互控制（发送按钮可用态/编辑命令路由/发送键）在编辑器外层 DOM 接管。

**定案机制（反编译确认）**：内核构造器只建空壳编辑器（标志位 `cmInit=false`），**真正可用的编辑 state 由第一次调用 `set(文本)` 构建**——此时扩展列表 = `getLocalExtensions()`（内部调用子类可覆写的 `buildLocalExtensions()` 并缓存）+ 内核动态扩展 + 内核私有扩展（反编译变量名 `RJ`，无需理解）。首设 `set()` 只发生一次，此后 `set()` 走增量 dispatch，不再重建。

**此前反复「时好时坏」的根因**：initial 为空时没有调用 `set()` → 覆写从未进 state；而 `appendConfig` 注入的扩展挂在**空壳 state** 上，任何一次首设 `set()` 都会用全新 state 整个换掉。两条被否路线（自打包 cm6、appendConfig 注入）都死在同一处。

**接入步骤（Editor.tsx 定稿后，唯一正确姿势）**：
1. `native.ts` 取类 hack 拿到内核构造类 → `new` 出子类实例，`plugin.addChild(editor)` 挂生命周期
2. **无条件调用一次 `set(initial)`（空串也调）**——让首设路径把覆写带进最终 state。这是最关键的一步
3. 覆写 `buildLocalExtensions()` 必须**先 `super.buildLocalExtensions()`** 保留内核原版注册（updateEvent→`onUpdate`、editorSuggest 联想都在里面），再追加自产扩展（换行/占位/高亮/keymap/readOnly 开关组）
4. 遮蔽 `removeHighlights/hasHighlight`（裸实例没有搜索高亮 field，点击/Esc 会 RangeError，已修）
5. 联想 = 内核原生 editorSuggest（super 保留后自动激活），controller 喂 tag/file 上下文；自产联想已退役（7c65cc9）
6. 外层 DOM 接管：contentDOM `input` 事件 → 发送按钮可用态；focus/blur 把 Obsidian 编辑命令（Mod-B/I/E）桥进输入框；Enter 发送走 contentDOM keydown + window capture 兜底 Ctrl+Enter（Obsidian 吞 Mod 键，机制见 75b16ec 与 capture.ts）
7. controller 需有 `syncScroll` 空实现（大段滚动会 TypeError，已补）

**踩过的坑（动这块前必读）**：
① 覆写生效的前提 = 首设 `set()` 被调用；
② `clear()` 后禁再用 setState 重建（丢内核私有 StateField → RangeError 崩实例，d81/43ab64d 教训）；
③ console.debug/warn 探针会被控制台过滤，排查期用 error 级；
④ 插件 disable/enable 可能不重载 main.js，完整重启 Obsidian 才保证；
⑤ 插件侧 @codemirror/* 与内核 asar 内副本是不同模块实例——updateListener 等插件侧 facet 对内核建的 state 不生效（2026-09-05 实测，曾致一次误收敛、已回退）；
⑥ 动输入通道前先挂 error 级计数探针验证，别凭推理直接收敛。

**视觉收尾**：`==高亮==` 输入框（decoration .cm-hl-mark）+ 卡片渲染（marked.ts `<mark>`）；占位 = CSS 叠层（`.cm-host.is-empty::before` + data-placeholder）；滚动条细条化 + overflow-x hidden + overflow-wrap anywhere。反编译锚点档案：P2-INVESTIGATION.md。回退点：75b16ec（自打包 cm6 可用版）。

## 7. 当前事实（verified 2026-09-05）

- dev 库 daily/ 25 个文件（2026-09-10 盘点）：09-06/09-09 为新样例；其中 12 个文件无 `## Memo` 标题（严格读取下不显示，owner 拍板弃置——写入端今后自动建标题不会再产生此类文件）。
- 命令面板仅一条命令 `Open Memos`（2026-09-10 盘查精简，其余 6 条删除；openMemos 已有视图只激活不重建）。
- 读取不再隐式改写文件（缺 id 内存随机 id 支撑会话，落盘修复归体检 missing-id）；`.rememo-backup/{audit,migrate}-<ts>/` 为备份目录。
- 关键正则/语义只允许一份定义在 memoLine.ts（classifyMemoRow），读端/规则/迁移共用——**别在别处再抄正则**。
- 里程碑（细节 git log）：A–F1 清理/架构/图片/日期写入（~09-01→03）；UI token 化主屏+次级（09-03/04）；P1 读取渲染（40bd02d…5920f3d）；P1b 写入端+迁移 v1+任务卡（4c881ec…7caf6c4，目视通过）；P2 输入内核（b98515b…7b2c051 定稿，owner 目视全绿，见 §6）。

## 8. 正式库启用要点（2026-09-10 转录自原 §4 P1.5；执行时机 owner 自定——不再作为开发待办）

> 迁移功能本身已完备：migrate v2 + 备份机制 + dev 库全量测试 + 8 样本目视 OK + computeScope bug 已修（e194339）。

- **范围**：正式库 `## Memo` 区内 **407 memo + 68 评论行**（38 文件；274/322 有 memo）；`## Tasks` 区与 delete.md 在处理区外，迁移不碰。样本池 `bak/prod-memos-20260905/`（dev 库）。
- **顺序**：先跑「数据审计」（只读体检，看清问题全貌）→ 再跑「整文件迁移」（写入时自动备份 `.rememo-backup/migrate-<ts>/`）。
- **首次动手前**：`diary/` 整目录额外复制一份——体检备份是文件级的，407 条真实历史多一层全库保险。
- **插件本体**：正式库那边的插件需更新到最新构建（main.js / styles.css 部署过去）。
- **配置**：零配置命中——数据全在 `## Memo` 标题下，与「Memo 区标题」默认值（`## Memo`）一致。
