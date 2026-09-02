# Memos Plus — Domain Context

> Domain glossary + handover doc for the Obsidian plugin **Memos Plus** (`obsidian-memos-plus`, fork of Quorafind's Obsidian-Memos). Kept in sync as work proceeds. **Last updated: 2026-09-02.**

## Project location

- Vault: `L:\Files\ObsidianDevVault` (开发库，plugin 在这里被 Obsidian 加载)
- Plugin repo: `L:\Files\ObsidianDevVault\.obsidian\plugins\Obsidian-Memos`
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

## Pending work (按顺序)

1. **阶段 D 收尾** — ✅ 全部完成（时间迁移实测通过）
2. **阶段 E 图片** — ✅ 代码完成，图片宽高/预览待 Obsidian 目视确认
3. **阶段 F 新功能**: 指定日期添加（编辑器日期选择 + 填时分，`waitForInsert` 已支持 insertDate）、小红书导出（低优先）。
4. **UI 整体风格优化**: 上插件市场需要差异性，预期加动效（性能敏感则放弃）。发送按钮/评论显示调整一并规划。
5. **阶段 G**: `parseMemo` 拆分（formatMemoContent 的 HTML 与图片/标签结构化）。

## Key technical decisions

- **时间格式统一 `HH:mm:ss`**（带秒）。评论不用 14 位时间戳（日期来自文件）。
- **删除 = 隐藏标记**（`deletedAt:` 在 `^id` 前），不移动数据。恢复=去标记，永久删除=删行。
- **评论默认开启**，废弃 `CommentOnMemos`/`CommentsInOriginalNotes` 设置开关。保留 `ShowCommentOnMemos`（评论列表显隐）。
- **`^id` 在行尾**，`deletedAt` 在 `^id` 前（不影响 id 解析）。
- **子评论不单独标记**：父 deleted → 子树隐藏（读取时父 `isDeleted` 跳过子树）。

## Current-state facts (verified 2026-09-03)

- 开发库 `daily/` 有 11 个日记文件、35 条 memo（含测试评论/删除数据）。全有 `^id`。时间迁移测试文件 `daily/2024-06-15.md` **已删**（验证完成）。
- 图片解析收敛到 `src/helpers/memoImages.ts`（`parseMemoImages(content, app)`），MemoImage/DailyMemo/ShareMemoImageDialog 共用。
- `memos.ts` 不再有 `FetchMemos*`/`SaveMemoButton*` 全局变量；`obGetMemos.ts` 不再导入 obsidian-dataview。
- 图片正则已修：consts.ts 里 `wepg`→`webp`，`IMAGE_URL_REG` 补 webp/bmp，`MARKDOWN_WEB_URL_REG` 支持带参 URL。
- `MemoImage` 网格：**微博式定宽**（单图 160px / 多图 110px，列上限 3，不撑满整行）。`src/less/preview-image-dialog.less` 已删，改由 `src/less/preview-lightbox.less` 定制灯箱。
- 时间迁移两 bug 已修并实测：`backfillMemoTimes` 前缀重复 + `getRemainingMemos` 漏 `m` flag（后者导致带尾换行文件整文件跳过）。
- 图片预览：`PreviewImageDialog` 独立挂载 yet-another-react-lightbox（弃 showDialog 双层），单图隐藏左右箭头、多图循环、Zoom 插件可用。
- 深色评论样式补齐（memo.less）：actions 按钮、CommentInput 全套；`comment.svg` 硬编码 fill 改 `currentColor`；深色 send-btn 用 `@text-dark-red` 与主编辑器 confirm 一致。
- 注意：`main.js`/`styles.css` 需重新 build 后由 hot-reload 加载（已 build）。

_See also: [REFACTOR-2026.md](REFACTOR-2026.md) (2026 重构方案，部分已实施)。_
