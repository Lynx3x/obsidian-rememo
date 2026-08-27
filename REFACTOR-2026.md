# Memos Plus 重构方案（2026-08）

> 状态：**待确认**。本文档是"需求审查 + 无用代码清理清单 + 评论系统重构"的完整方案，供 owner 审阅确认后，由重构 skill 渐进式执行。
>
> 背景：Obsidian Memos 原插件已废弃（上游 v1.9.7 停止维护），当前维护 fork **Memos Plus**（`id: obsidian-memos-plus`）。本次目标：**清理无用代码 + 评论系统重构 + 功能需求重审**。技术栈升级（Vite2/React17/TS4.5 → 新版）作为可选步骤，需单独评估。

---

## 一、需求审查：插件现在到底做什么

### 1.1 核心数据流（已逐文件核实）

```
日记笔记（如 diary/2026-08-28.md，data-source）
  └─ "## Memo" 标题下、以列表项形式存 memo
      格式：- [ ] 12:34:56 {内容}
      或自定义 DefaultMemoComposition 模板（{TIME}/{CONTENT} 占位）
      内容里的 ^xxxxxx 是 6 位 block ID（供评论/引用定位）
        │
        ▼ 读取（obGetMemos.ts）
   getMemos() ── 遍历日记文件夹所有 .md
        │  parse 每行：时间→createdAt、任务→TASK-*、内容→content
        │  id = YYYYMMDDHHmmss + 行号（非持久、对行号敏感！）
        │  评论：原笔记内嵌套子项（CommentsInOriginalNotes）
        │        或独立 commentMemos（linkId 关联）
        ▼ 写入（obCreateMemo.ts）
   waitForInsert() ── 新建 memo 追加到 InsertAfter 标题下
   changeMemo() ── 编辑（按 id 里的行号定位原行 → 整行替换）
        ▼ 删除（obDeleteMemo.ts / obHideMemo.ts）
   hideMemo → 从日记删行 + 追加到 diary/delete.md（格式见下）
   query 功能 → 存 diary/query.md（本库未使用，query.md 不存在）
```

**已确认的真实数据（diary/delete.md 现有 22 条）**：
```
- 202206162240008 测试消息2 deletedAt: 202206170125563
- 2023090402420012 ChatGPT翻译黄油<br> <br>[...](https://...) deletedAt: 2023100621092918
- 2023011202060012 [[...]] ^9qx2i5 deletedAt: 202301120207006
```
格式 = `- {14位日期}{行号} {原始内容} deletedAt: {14位日期}{行号}`。

**query.md（若启用）**：`{14位日期}{行号} {标题} [{querystring}] [pinnedAt: {14位日期}{行号}]`。

### 1.2 你在库里的实际用法（决定了兼容性边界）

| 项 | 现状 | 含义 |
|---|---|---|
| 日记文件夹 | `diary/`（`getDailyNotePath()` 读取） | 数据源确认无误 |
| 日记格式 | `- [ ] #类别/任务 内容`（任务带标签） | 解析必须兼容任务 + 标签 |
| 标题 | `## Memo`（InsertAfter + ProcessEntriesBelow 一致） | 必须兼容 |
| delete.md | 22 条历史删除记录 | **格式有 bug，见 §4.2** |
| query.md | 不存在（没用过查询功能） | 可重设计，无存量数据包袱 |
| 评论 | 未启用（CommentOnMemos=false） | 评论系统重构=新设计，无兼容包袱 |
| 已知痛点（你自己提的） | 不能指定日期写入旧 memo；网络图片不适配 | 见 §4.3 |

### 1.3 结论：需求边界

- **必须保留**：日记作数据源、`## Memo` 标题读写、任务/标签解析、删除进 delete.md、分享/热力图/搜索/过滤/查询、移动端。
- **必须修**：§4 的 bug。
- **可重设计**：评论系统（当前完全关闭）、查询存储（未使用）、白板（废弃）。

---

## 二、无用代码清理清单（渐进式，可独立执行）

### 2.1 整文件删除（可安全删，均有验证依据）

| 文件 | 理由 |
|---|---|
| `src/components/MemosBoard.tsx` | 381 行 **100% 注释**（废弃白板画布） |
| `src/components/Xarrow.tsx` | 27 行 **100% 注释** |
| `src/components/box.tsx` | 66 行 **100% 注释** |
| `src/components/ChangePasswordDialog.tsx` | 123 行中 106 行注释（86%），依赖已删除的云账号体系 |
| `src/components/MemoCard.tsx` | **0 字节空文件** |
| `src/components/args.tsx` | `normalizeArgs` **无任何引用** |
| `src/components/Toast.tsx` | `toastHelper` 仅被死代码注释引用，实际 UI 用 `new Notice()` |
| `src/hooks/useDebounce.ts` | **无任何引用** |
| `src/pages/HomeBoard.tsx` | 渲染空壳，路由可达但用户不可达（菜单按钮已注释） |
| `src/obComponents/obSuggest.ts` | **整文件注释**（TextInputSuggest 基类） |
| `src/services/userService.ts` | **整文件注释** |
| `src/helpers/validator.ts` | 仅被已废弃的 ChangePasswordDialog 使用 |

### 2.2 需要进一步验证后删（可能仍被引用，先 grep）

| 文件 | 说明 |
|---|---|
| `src/types/obsidian.d.ts` | 大量 `any` 覆写 Obsidian 类型，可能掩盖真类型；删除前验证编译 |
| `src/services/resourceService.ts` | `upload()` 被 Memo/MemoEditor 用；`parseHtml()` 仅被 MenuBtnsPopup 导入用，确认导入路径 |
| `src/labs/html2image/` | 被 ShareMemoImageDialog / DailyMemoDiaryDialog 用，保留但可简化 |

### 2.3 注释死代码（整块注释，删除对应区块）

- `src/helpers/api.ts`：整文件每个函数都保留着旧的 `request()` 网络版注释（原 memos 云服务），约 60% 注释，可清空。
- `src/services/locationService.ts`：每方法尾部注释的 `updateLocationUrl()` 旧逻辑。
- `src/services/dailyNotesService.ts`：注释的 pushDailyNote、userService 导入。
- `src/helpers/utils.ts`：`getDailyNoteFormat/getDailyNotePath` 里各有一段被注释掉的旧实现；`debounce`（未用）/`debouncePlus` 二选一。
- `src/components/Memo.tsx`：注释的旧 Image 列表、`handleMemoKeyDown`。
- `src/components/MemoEditor.tsx`、`src/pages/Home.tsx`、`src/pages/MemoTrash.tsx`、`src/obComponents/*`：多处旧注释块。
- `src/translations/helper.ts`：locale 里的部分过时 key（如 signin 相关）清理（需谨慎，跨语言一致性）。

### 2.4 模块级可变导出（跨组件隐式通信，重构目标，见 §5.2）

- `src/memos.ts` 35 个 `export let` 设置变量 ← **最大架构债**
- `MemoList.tsx` 的 `export let copyShownMemos`（被 MemoFilter 直接读）
- `SearchBar.tsx` 的 `export let searchBoxInput`（无人消费）
- `Editor.tsx` 的 `export let editorInput`（无人消费）、`let actualToken`

### 2.5 未使用依赖（package.json，清理时验证）

- `@popperjs/core`、`react-popper`（MemoEditor 用，若改写则去）
- `@webscopeio/react-textarea-autocomplete`（Editor 用，若改 Markdown 编辑器则去）
- `tiny-undo`（Editor 用）
- `focus-trap-react`、`react-usestateref`（用的地方可被原生替代）
- `react-rnd`、`react-xarrows`、`react-zoom-pan-pinch`（仅死代码白板用，**可删**）
- `yet-another-react-lightbox`（图片预览用，保留）
- `obsidian-daily-notes-interface`（核心，保留）

---

## 三、评论系统重构方案（对应 refactor-plan.md，落地为代码）

### 3.1 现状问题（已核实）

1. **id 依赖行号**：`id = YYYYMMDDHHmmss + 行号`，插入/删除任意行后 id 全部错位 → 评论关联（`linkId`）断链。
2. **评论定位靠字符串**：`getCommentMemos(memoId)` 用 `content.includes('comment: ' + memoId)` 遍历所有 memo 匹配——O(n) 且脆。
3. **两种评论模式并存**：`CommentsInOriginalNotes`（原笔记嵌套子项）vs 独立 commentMemos，双轨逻辑（读在 obGetMemos 两处、写在 obCommentMemo/Memo.tsx 各一份）→ 数据一致性差。
4. **删除遗留孤立评论**：删除父 memo 不清子评论。
5. **不支持多级评论**：只一层嵌套。

### 3.2 目标结构（对齐 refactor-plan 推荐）

```ts
// 新增关系索引（内存）
memoCommentIndex = Map<memoId, Set<commentId>>
// 评论显式 parentId + memoId，不再靠 linkId=hasId 字符串
interface Comment { id; content; createdAt; parentId; memoId; ... }
```

**关键决策**：评论 **继续内联存储在日记笔记**（原 memo 下缩进子项，即当前 `CommentsInOriginalNotes` 模式），**不引入独立评论文件**——理由：你的日记是唯一数据源（§1.3），独立存储会破坏"日记即数据"；且你当前未启用评论，无迁移包袱，可直接让新结构成为唯一模式。

### 3.3 分阶段落地

- **阶段 C1 稳定 id**：memo id 从"日期+行号"改为**持久化**（写回时在行尾追加 `^id`，或读取时若缺则生成并回写）。这是评论系统和新功能（指定日期写入）的地基。**需迁移**：存量日记中无 `^id` 的行首次读取时补写。delete.md 同步。
- **阶段 C2 单轨评论**：废弃 `CommentOnMemos=false` 的双轨分支，只保留"内联子项"模式；重写 obGetMemos 评论读取、obCommentMemo 写入、Memo.tsx 评论 UI 为同一套。
- **阶段 C3 关系索引 + 级联删除**：`memoCommentIndex` 内存索引；删除父 memo 时把子评论移入 delete.md 或一并删除（默认保留进 delete.md）。
- **阶段 C4（可选）多级评论**：`parentId` 支持嵌套渲染。

---

## 四、已确认的 Bug（重构时必修）

### 4.1 编辑 memo 按行号定位，行号偏移即错改/错删

`obUpdateMemo.changeMemo()`：`idString = parseInt(memoid.slice(14))` 当作**文件行号**，`originalLine = fileLines[idString]` 直接按行号取行。插入/删除任意 memo 后，行号对应错行 → **可能改错或删除他人行**。修复依赖 §3.3 的持久 id（按 `^id` 定位，或按内容匹配）。

### 4.2 delete.md 的行号定位同样错位（你的真实数据已验证）

`obDeleteMemo.getDeletedMemos()` 解析 delete.md：
```ts
const id = extractIDfromText(line)        // 正则只取 14 位日期
const timeString = id.slice(0, 13)        // ✗ 取前 13 位，少一位！
const deletedDateID = extractDeleteDatefromText(...) // 同上 13 位
const lineNum = parseInt(deletedMemoid.slice(14))     // 当作行号取行
```
真实数据（如 `- 202206162240008 测试消息2 deletedAt: 202206170125563`）已证明：**id 从 13 位截断 → createdAt/deletedAt 错误；按行号取行 → 恢复/删除错位**。你数据里 `deletedAt: 202206170125563` 末尾的 `3` 被当行号，实际是 `deletedAtID.slice(14)` 的残段。**这条是数据损坏级 bug**，重构 delete 子系统时优先修。

### 4.3 你提出的两个功能痛点（新需求）

1. **不支持指定日期写入**：新建 memo 只能写今天。需求：`waitForInsert` 支持传入任意 `date`（实际上 `insertDate` 参数已存在但 UI 未暴露——MemoEditor 的日期选择只插入 `[[日期]]` 文本，没用于写 memo）。落地：编辑器日期选择改为"写入到该日期的日记"。
2. **网络图片不适配**：外部图片宽度超出卡片。当前 `MemoImage.tsx` 的九宫格固定 `150px` 网格且 `MARKDOWN_WEB_URL_REG` 漏了 `wepb`（拼写，应为 `webp`）、漏了 `?` 查询串的图片。修复正则 + 网格改为 `minmax` 自适应。

### 4.4 其他顺手修

- `memos.ts handleResize()`：同一函数内 `setIsMobileView` 重复调用（结果恒等于 `leaf.width <= 875`）。
- `Memo.tsx` 评论编辑：`m.id.slice(14) === commentMemoId.slice(14)` 字符串切片判断，改 id 相等。
- `ShareMemoImageDialog` 的 `setImgAmount` 闭包 stale（多图并发计数错）。
- `QueryList.tsx` 渲染期 `queries.sort()` 原地改 state（React 状态突变）。
- `Pagination.tsx` 中文"上一页/下一页"未走 `t()`；`MemoList` 的 `new Notice('😭 Fetch DailyNotes Error')` 未走 `t()`。
- `app.less` 中 `875` 宽度魔法数字 6+ 处，抽常量。

---

## 五、架构重构建议（渐进式，skill 执行时按此顺序）

### 5.1 执行顺序（每步可独立提交、可验证）

```
第 0 步  建立基线：npm run build 确认当前可编译；git 打 tag 或分支
第 1 步  清理死代码（§2.1 整文件删除 + §2.3 注释块）→ 构建验证
第 2 步  清理模块级可变导出（§2.4）与未用依赖（§2.5）→ 构建验证
第 3 步  修数据 bug（§4.2 delete 子系统、§4.1 按行号编辑）→ 用 delete.md 实测
第 4 步  持久 id 化（§3.3 C1，含存量数据迁移）→ 用日记实测
第 5 步  评论系统单轨重构（§3.3 C2/C3）
第 6 步  新需求（§4.3 指定日期写入、网络图适配）
第 7 步  （可选，评估后）技术栈升级 + 重复逻辑抽取（§5.3）
```

### 5.2 首要架构债：35 个全局 `export let` 设置变量

`memos.ts` 从 `plugin.settings` 一次性拷贝 35 个设置到模块级变量，UI 层 import 后**非响应式**——设置变更不触发重渲染、多个 leaf 视图读取同一份、onOpen 才赋值。

**建议（渐进）**：改为 React Context（`SettingsProvider` 从 `plugin.settings` 读，变更时 setState），UI 组件 `useContext` 取。这一步和"清理"解耦，可作为第 2.5 步单独做，风险可控（机械替换 import 来源）。

### 5.3 技术栈升级评估（你说"有必要再升"，结论如下）

**结论：建议做，但放到清理+重构之后作为独立阶段，并作为一次性的、可回滚的提交。**

- **收益**：Vite 2→5/6（构建快 10x+）、React 17→18/19（根因并发渲染、`ReactDOM.render` 废弃）、TS 4.5→5.x（类型更好）、旧依赖（react-rnd 等死代码）可去。
- **风险**：`react-textarea-autocomplete`、`react-popper`、`react-usestateref` 是 React 17 时代包，升 React 18/19 需验证或替换；`obsidian-daily-notes-interface` 是核心且多年未更，先确认仍兼容；`yet-another-react-lightbox` 需升。
- **做法**：单独分支、先升 Vite+TS（风险低）→ 再升 React（风险中）→ 每步构建+Obsidian 实测。

---

## 六、需求重审结论（功能保留/修改/移除总表）

| 功能 | 决策 | 说明 |
|---|---|---|
| 日记读写（`## Memo` 标题） | ✅ 保留 | 唯一数据源，不迁移 |
| 任务/标签解析 | ✅ 保留 + 修正则 | webp、查询串 |
| 删除→delete.md | ✅ 保留 + **修复 bug** | §4.2 |
| 查询（query.md） | 🔶 保留但可重设计 | 你未用过，零包袱 |
| 评论 | 🔶 重构为新结构 | §3，当前关闭 |
| 分享图片 / 热力图 / 搜索 / 过滤 | ✅ 保留 | 抽重复逻辑 |
| 白板（MemosBoard） | ❌ 删除 | 死代码 |
| 云账号/登录/密码/关于 | ❌ 删除 | 死代码，本地插件无此需求 |
| 指定日期写入 | ➕ 新增 | 你的痛点 §4.3 |
| 网络图自适应 | ➕ 修复 | 你的痛点 §4.3 |
| 移动端编辑体验 | ✅ 保留 | MemoEditor 的 DOM hack 重构时简化 |
| 多 leaf 同时打开 | 🔶 支持（修） | 模块级变量污染 |

---

## 七、验证方式

- **构建**：`npm run build`（vite build），每次清理/重构后必须通过。
- **数据实测**：用 `diary/2026-08-28.md` 和 `diary/delete.md` 的**副本**做读写/删除/恢复测试，不碰真实数据。
- **Obsidian 实测**：`hot-reload` 插件已装（community-plugins 里有），改代码自动重载；在测试库（或 `obsidian-memos-bac`）验证。
- **测试文件**：库里有 `pluginTestingFiles/` 目录可用于放测试笔记。
