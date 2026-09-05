# Rememo — 开发交接主文档（速览优先版，2026-09-05 整理）

> 用途：跨会话交接。**每次会话先读 §0 速览（≤30 行）**，需要细节再按索引深入；已完成工作的细节一律看 git log（本文件不重复流水账）。
>
> **文档地图**（什么时候读哪份）：
> - [PLAN-FORMAT.md](PLAN-FORMAT.md) —— **现行规格**：存储格式 / 体检架构 / 输入栈（活文档）
> - [UI-STYLE.md](UI-STYLE.md) —— 样式与动效接续（改样式前读）
> - [docs/adr/](docs/adr/) —— 高代价决策档案：为什么这么做
> - [P2-INVESTIGATION.md](P2-INVESTIGATION.md) —— 输入内核反编译锚点与防坑（历史档案）

## 0. 现状速览（每次会话从这里开始）

- 插件 Rememo（id `rememo`，曾名 Memos Plus）。仓库：`L:\Files\ObsidianDevVault\.obsidian\plugins\obsidian-rememo`，分支 `dev`，pnpm+vite，`pnpm build` 出 main.js/styles.css 随提交附。`L:\Files\md-note-repo` 是正式库（317 日记）**勿碰**。HEAD 见 `git log -1`。
- **存储唯一格式 = 卡片块**：头行 `- [ ]? HH:mm:ss [deletedAt: 可读] ^6位id`（纯标识，行内无正文）+ 其后 ≥4 空格正文。旧单行/<br>/评论已不渲染、写入只写新格式、旧行由体检整文件迁移恢复（P1b 修订，2026-09-05，见 ADR-0002）。
- **主线状态（2026-09-05）**：P1b（读收窄/写端/任务卡/迁移 v1）✅ 目视通过；**P2 输入内核定稿 ✅ owner 目视全绿（反编译定案：首次 `set()` 构建 state 时把子类覆写的 `buildLocalExtensions` 扩展带进内核，见 §6）**；P1.5 正式库迁移/G/F2/Roadmap 未排期（见 §4/§5）。
- 已知可复验状态：新样例 `daily/2026-09-06.md`（dm0001~5）；旧测试数据在 dev 库 09-03/04/05 等文件（可一键体检迁移）；styles.css ~212 KiB、main.js ~1.35 MB（cm6 捆绑后）。

## 1. 核心域词汇（现行）

| Term | Meaning |
|---|---|
| **memo** | 一条闪念 = 一张卡片块。渲染对象只有它。 |
| **卡片块** | 纯标识头行 + 4 空格正文；正文空行分段、额外缩进给 md 嵌套；块边界 = 非空缩进<4 的行/标题/文件尾。 |
| **^id** | 行尾 `^` + **6 位** [A-Za-z0-9]{6}，Obsidian 原生维护。**恒 6 位（踩坑教训：样例别造 7 位）**。 |
| **deletedAt** | 软删标记，在 `^id` 前，无方括号；值可读 `YYYY-MM-DD HH:mm:ss` 或旧 14 位（读取双兼容）。 |
| **daily note** | 数据源。memo 处理区 = ProcessEntriesBelow 语义（`''` 时从文件头到首个 `# ` 标题止；读取/体检/迁移三处同款）。 |
| **评论** | **已停摆**（缩进子树+linkId 代码已拆，P3 引用卡重建）。 |
| **回收站** | isDeleted 的卡（头行 deletedAt）；恢复=去标记、永久删除=删整块。 |
| **task 卡** | 头行带 `[ ]`/`[x]`（TASK-TODO/DONE）；勾选框在头部时间右侧写回头行；菜单可普通⇄任务卡。 |

## 2. 代码地图（现行，改动前先定位）

- **读写**：`src/obComponents/` —— 读 `obGetMemos.ts`（行级只认纯标识头，parseMemosFromNote）；写定位 `locateMemo.ts`（^id 优先/行号兜底/scanBodyEnd）；`obCreateMemo`（块插入，头行号=id 数字段）、`obUpdateMemo`（只替换正文域）、`obHideMemo`（软删/恢复/整块删除）、`obToggleMemoTask`（勾选/类型切换）；`src/helpers/memoLine.ts` 纯函数（classifyMemoRow 三态/时间/删除标记，读端+规则+迁移共用）。
- **渲染**：`formatMemoContent`（Memo.tsx）→ `marked.ts`（行式结构 + 行内增强）；`memoImages.ts` 图片解析。卡片 UI：Memo.tsx / DeletedMemo.tsx。
- **编辑器**：`components/Editor/Editor.tsx`（cm6 host：keys/suggest/highlight/format 在 `src/editor/`）+ `MemoEditor.tsx`（工具条/蓄力发送/编辑态）。
- **体检**：`src/audit/`（rules 注册表 + engine 行修复 + migrate 整文件迁移 + AuditPage 路由 /audit）。
- **样式**：`src/less/` 全部 token 化收口（theme.less 定义 `--memo-*`，作用域 memos_view + .dialog-wrapper；坑见 UI-STYLE.md）。

## 3. 技术决策（一句话版，现行有效；被修订旧决策已删，完整论证与演变史见 [docs/adr/](docs/adr/)：0001 输入内核 / 0002 存储格式）

- 时间统一 `HH:mm:ss` 落盘；`TimeFormat` 设置只影响显示与回写策略（HH:mm 模式暂停回写）。
- 删除 = 头行 `deletedAt` 软删（值可读）；永久删除 = 删整卡片块。
- 旧数据不渲染、写入只写新格式、混合文件合法（旧行等体检迁移）——见 §6 之外的 P1b 记录（git log 4c881ec）。
- 评论停摆至 P3；linkId 语义作废（模型字段保留备用）。
- Feed 排序 = createdAt 降序；指定日期写入走 `waitForInsert` 的 insertDate（moment）。
- 输入内核 = **Obsidian 原生 MarkdownEditor 子类 + 首次 set() 建态 + DOM 外层控制**（2026-09-05 owner 拍板，论证见 [docs/adr/0001](docs/adr/0001-input-core-native-markdowneditor.md)，接入细节见 §6）；存储/体检规格见 PLAN-FORMAT.md，勿在 CONTEXT 重复。

## 4. Pending（按顺序）

0. **P2 收尾观察**（7b2c051 已全绿）：编辑态/弹窗多实例回归、占位/联想在极端重载时序下的稳定性；随后进入 P1.5 或 Roadmap 等 owner 定夺。
1. **P1.5 迁移正式化**：v1 已在用；收紧（已删评论折叠/缺时间行政策），正式库 317 **只读体检报告 → 逐文件试点需 owner 点头**。
2. **阶段 G**：formatMemoContent 渲染与图片/标签结构化拆分（小重构）。
3. **F2 小红书导出**（最低优先，可弃）。
4. **Roadmap**（§5）等 owner 细化后实施。

## 5. Roadmap（2026-09-04 登记，未排期，需 owner 细化）

- 导航/布局：去用户名显示与左侧小菜单 → 主页/回收站/设置式导航（热力图下、标签上）；导入功能去留调研；About 移除并入 README；回收站总开关（关=删除二次确认后直接永久删）。
- 视觉：热力图优化+"是否显示"开关；三点菜单「阅读」页与"点日期=阅读"入口重想；菜单文字对齐。
- 格式/设置：输入框 `[[` 文件联想（rta 基础版已做过，P2 cm6 重做中）；markdown 所见即所得评估（P2 高亮为铺垫）。
- 标签：平铺/树状切换按钮。

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

- dev 库 daily/ 11+1 个文件：09-06 为新样例（新格式，勿当旧数据迁移）；其余为旧格式测试数据（含体检测试行/重复 id 测试/软删标记），可经体检「整文件迁移」转新。
- 读取不再隐式改写文件（缺 id 内存随机 id 支撑会话，落盘修复归体检 missing-id）；`.rememo-backup/{audit,migrate}-<ts>/` 为备份目录。
- 关键正则/语义只允许一份定义在 memoLine.ts（classifyMemoRow），读端/规则/迁移共用——**别在别处再抄正则**。
- 里程碑（细节 git log）：A–F1 清理/架构/图片/日期写入（~09-01→03）；UI token 化主屏+次级（09-03/04）；P1 读取渲染（40bd02d…5920f3d）；P1b 写入端+迁移 v1+任务卡（4c881ec…7caf6c4，目视通过）；P2 输入内核（b98515b…7b2c051 定稿，owner 目视全绿，见 §6）。
