# Rememo — Domain Context（速览优先版，2026-09-05 重构）

> 用途：跨会话交接。**用法：每次会话先读 §0 速览（≤30 行）**，需要细节再按索引深入；
> 已完成工作的细节一律看 git log（本文件不再重复流水账）。对照：[PLAN-FORMAT.md](PLAN-FORMAT.md)（大改计划/规格）· [UI-STYLE.md](UI-STYLE.md)（样式接续）。

## 0. 现状速览（每次会话从这里开始）

- 插件 Rememo（id `rememo`，曾名 Memos Plus）。仓库：`L:\Files\ObsidianDevVault\.obsidian\plugins\obsidian-rememo`，分支 `dev`，pnpm+vite，`pnpm build` 出 main.js/styles.css 随提交附。`L:\Files\md-note-repo` 是正式库（317 日记）**勿碰**。HEAD 见 `git log -1`。
- **存储唯一格式 = 卡片块**：头行 `- [ ]? HH:mm:ss [deletedAt: 可读] ^6位id`（纯标识，行内无正文）+ 其后 ≥4 空格正文。旧单行/<br>/评论已不渲染、写入只写新格式、旧行由体检整文件迁移恢复（决策 8 修订，2026-09-05）。
- **主线状态（2026-09-05）**：P1b（读收窄/写端/任务卡/迁移 v1）✅ 目视通过；**P2 转向：输入内核已切换为 Obsidian 原生 MarkdownEditor 子类（530d1a5，kanban 式接入；自打包 cm6 + capture 兜底退役），待 owner 复测（清单见 §6）**；联想弹层/编辑命令路由随原生接入一并实测；P1.5 正式库迁移/G/F2/Roadmap 未排期（见 §4/§5）。
- 已知可复验状态：新样例 `daily/2026-09-06.md`（dm0001~5）；旧测试数据在 dev 库 09-03/04/05 等文件（可一键体检迁移）；styles.css ~212 KiB、main.js ~1.35 MB（cm6 捆绑后）。

## 1. 核心域词汇（现行）

| Term | Meaning |
|---|---|
| **memo** | 一条闪念 = 一张卡片块。渲染对象只有它。 |
| **卡片块** | 纯标识头行 + 4 空格正文；正文空行分段、额外缩进给 md 嵌套；块边界 = 非空缩进<4 的行/标题/文件尾。 |
| **^id** | 行尾 `^` + **6 位** [A-Za-z0-9]{6}，Obsidian 原生维护。**恒 6 位（血泪教训，样例别造 7 位）**。 |
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

## 3. 技术决策（现行有效；被修订的旧决策已删）

- 时间统一 `HH:mm:ss` 落盘；`TimeFormat` 设置只影响显示与回写策略（HH:mm 模式暂停回写）。
- 删除 = 头行 `deletedAt` 软删（值可读）；永久删除 = 删整卡片块。
- 旧数据不渲染、写入只写新格式、混合文件合法（旧行等体检迁移）——见 §6 之外的 P1b 记录（git log 4c881ec）。
- 评论停摆至 P3；linkId 语义作废（模型字段保留备用）。
- Feed 排序 = createdAt 降序；指定日期写入走 `waitForInsert` 的 insertDate（moment）。
- 输入内核 = **Obsidian 原生 MarkdownEditor 子类**（决策 7 修订，2026-09-05 owner 拍板：弃自打包 cm6+capture；取类 hack 与接入细节见 §6/PLAN-FORMAT）；格式/大改规格都在 PLAN-FORMAT.md，勿在 CONTEXT 重复。

## 4. Pending（按顺序）

0. **P2 原生接入复测**（530d1a5，清单见 §6）——owner 在 Obsidian 目视，据结果定后续（联想双弹层去留/格式键/回退决策）。
1. **P1.5 迁移正式化**：v1 已在用；收紧（已删评论折叠/缺时间行政策），正式库 317 **只读体检报告 → 逐文件试点需 owner 点头**。
2. **阶段 G**：formatMemoContent 渲染与图片/标签结构化拆分（小重构）。
3. **F2 小红书导出**（最低优先，可弃）。
4. **Roadmap**（§5）等 owner 细化后实施。

## 5. Roadmap（2026-09-04 登记，未排期，需 owner 细化）

- 导航/布局：去用户名显示与左侧小菜单 → 主页/回收站/设置式导航（热力图下、标签上）；导入功能去留调研；About 移除并入 README；回收站总开关（关=删除二次确认后直接永久删）。
- 视觉：热力图优化+"是否显示"开关；三点菜单「阅读」页与"点日期=阅读"入口重想；菜单文字对齐。
- 格式/设置：输入框 `[[` 文件联想（rta 基础版已做过，P2 cm6 重做中）；markdown 所见即所得评估（P2 高亮为铺垫）。
- 标签：平铺/树状切换按钮。

## 6. P2 原生接入——已提交（530d1a5），待 owner 复测

- **背景**：75b16ec 的 window capture 兜底复测通过（Ctrl+Enter 已好），但 owner 拍板转 **Obsidian 原生编辑器体系**（kanban 式），Mod-B/I/E 等不必自做。根因侦察结论保留：Obsidian 内核在 window capture 最早注册 keydown、命中命令即 preventDefault+stopPropagation。
- **接入**（仿 mgmeyers/obsidian-kanban main.ts getEditorClass + MarkdownEditor.tsx）：
  - `src/editor/native.ts`：取内核 MarkdownEditor 构造器 = 瞬时 md embed（detached）→ `editable=true; showEditor()` → `editMode` 原型链倒退一层 `.constructor`；失败返回 null（UI 显示 init failed 不崩溃）。内部 API（embedRegistry/embedByExtension.md/editMode）在 Obsidian 1.13.7 已验证存在；**内核大版本升级需复测此 hack**。
  - Editor.tsx 内层：`new 原生子类(app, el, controller)`；聚焦时 `workspace.activeEditor` 桥到 controller（`getMode:'source'` + `editor` getter）→ Obsidian 编辑器命令（Mod-B/I/E/任务等）直接作用于 memo 输入，不再吞键/误改主编辑器。
  - Enter 策略：默认模式 Enter 交原生续行、Mod-Enter=发送；EnterToSend 模式 Enter=发送（联想 active 放行）、Mod-Enter=单行换行（最高优先级 keymap）。
  - 自产扩展保留：placeholder / memoInputHighlight / memoAutocomplete（#/[[ 数据源 apply 可控）/ readOnly Compartment / updateListener。
  - `src/editor/{keys,format,capture}.ts` 停用（未打包）；clear 无原生 clearHistory（发后 Ctrl+Z 复活旧文=已知低优先）。
- **待 owner 复测清单**：① 输入框是否正常初始化（失败会显示 init failed）；② 打字/中文 IME；③ Enter 列表/任务续行、空项退出；④ Ctrl+Enter 发送、按钮发送、squash 动画；⑤ **Mod-B/I/E 原生格式键**（选区包裹）；⑥ **主编辑器文件是否不再被误改**；⑦ `#`/`[[` 联想是否出现、是否与原生联想双弹层（双弹层出现即停用自产 suggest，改原生）；⑧ undo/redo、placeholder 观感、编辑态（setContent/clear）流程。回退点：530d1a5 前一版（75b16ec capture 过渡版）。

## 7. 当前事实（verified 2026-09-05）

- dev 库 daily/ 11+1 个文件：09-06 为新样例（新格式，勿当旧数据迁移）；其余为旧格式测试数据（含体检测试行/重复 id 测试/软删标记），可经体检「整文件迁移」转新。
- 读取不再隐式改写文件（缺 id 内存随机 id 支撑会话，落盘修复归体检 missing-id）；`.rememo-backup/{audit,migrate}-<ts>/` 为备份目录。
- 关键正则/语义只允许一份定义在 memoLine.ts（classifyMemoRow），读端/规则/迁移共用——**别在别处再抄正则**。
- 里程碑（细节 git log）：A–F1 清理/架构/图片/日期写入（~09-01→03）；UI token 化主屏+次级（09-03/04）；P1 读取渲染（40bd02d…5920f3d）；P1b 写入端+迁移 v1+任务卡（4c881ec…7caf6c4，目视通过）；P2 cm6 首版（b98515b/bbb87c7，待排查见 §6）。
