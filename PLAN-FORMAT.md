# Rememo — 富内容存储与 cm6 输入改造计划（2026-09-05 定稿）

> 大改计划。对照阅读：[CONTEXT.md](CONTEXT.md)（域/现状）、[UI-STYLE.md](UI-STYLE.md)（样式接续）。
> 原则：**改格式/交互前先找参照物**（Obsidian 原生行为、kanban 等插件源码），再定规格。

## 动机（owner 原话归纳）

- 输入体验要"类 Obsidian 原生"；memo 正文要能承载块级 markdown（列表/代码块/表格…）
- 旧 `- HH:mm:ss 正文… ^id` 单行 + 字面 `<br>` 编码 = 烂设计：文件难看、正文不能有真换行、列表等块级全废
- 渲染器（分段式正则）与输入框（rta textarea）是真正的瓶颈；存储格式一并换成"多行卡片块"（方案 B，owner 拍板）

## 已拍板的决策（不要再改）

| # | 决策 | 结论 |
|---|---|---|
| 1 | 存储格式 | **B：卡片块 + 多行正文**（借鉴 kanban 文件观感，但评论不缩进） |
| 2 | 卡片头行 | **纯标识**：`- 12:00:00 ^id`（日期归文件名，与旧格式一致），正文一律从缩进第二行起 |
| 3 | 正文缩进 | **4 空格**（CommonMark 兼容），PoC 用 Obsidian 正文渲染验证观感 |
| 4 | 删除/回收站 | **保留软删+回收站**：deletedAt 标记放头行（行内、`^id` 前），UI 沿用现状 |
| 5 | 评论/引用 | **首期不做**（owner："坏了就坏了，先做主体"）；未来 = 引用卡（跨文件），记号用箭头系，格式预留 |
| 6 | 时间 | 仍统一 `HH:mm:ss` 落盘；显示格式开关 TimeFormat 照旧 |
| 7 | 输入内核 | **CodeMirror 6 迷你 EditorView**（自打包依赖，参照 kanban 做法）；tag/file 联想用 cm6 autocomplete 框架 + 自喂 source（fuzzy），行为参考 Obsidian 1.4+ 原生 tag autocomplete |
| 8 | 旧数据 | ~~读取双模式（文件级探测），写入一律新格式~~ **P1b 修订（2026-09-05 owner 拍板）**：读取**行级只认纯标识头**（旧顶层行不渲染、不进回收站，统一交数据体检整文件迁移恢复）；写入**只写新格式**（对旧格式目标文件直接追加新块，允许新旧混合）。旧逐行解析与评论链已删除 |

## 新格式规范 v1（草案样例）

```
## Memo

- 12:00:00 ^a1b2c3
    正文第一段，行内可 **粗体**、`code`、#tag、[[双链]]、图片 ![[x.png]]
    第二段…（空行=分段；无空行=紧接上段）

    - 子列表一
    - 子列表二

    ```
    代码块自由换行
    ```

    1. 有序列表

- 12:08:00 deletedAt: 2026-09-05 12:08:00 ^d4e5f6
    （被删卡的正文保留或可清空——渲染按 isDeleted 隐藏，子树=引用暂缓）
```

解析规则：
1. 头行 = 顶层 `- ` + 时间（HH:mm(:ss) 或旧 14 位）+ 可选 `deletedAt: 值`（无方括号）+ 行尾 `^id`，**后面不允许再有正文文本**
2. 正文块 = 头行之后**连续 ≥4 空格缩进的行**（原样并入卡片内容，可含空行）；缩进少于 4 的非空行（新顶层 bullet / 标题 / 文件尾）结束本卡
3. 评论/引用（未来）：顶层 bullet 头行后跟 `↗日期/id` 记号 → linkId；不做进本期
4. ~~旧文件兼容：文件探测 = 首条 memo 头行是否"纯标识"；旧文件（头行带正文/缩进评论/<br>）走旧解析，写入端不写旧~~ **P1b 修订**：行级判定（`classifyMemoRow` 三态），旧行整行跳过不渲染，迁移器（数据体检「整文件迁移」）负责转新；处理区（ProcessEntriesBelow）语义照旧
5. 任务卡片（拍板 2026-09-05）：任务态在**头行** `- [ ] 12:00:00 ^id`（与旧格式一致，纯标识判定已含任务前缀）；渲染 = 头部时间旁勾选框（P1b 已实现：`toggleMemoTask` 写回头行，TASK-DONE 正文置灰不划线；勾选框不再受 ShowTaskLabel 门控，该设置项已删）

## 模块改造清单

| 模块 | 动作 |
|---|---|
| `helpers/memoLine.ts` | 块级 parse/serialize：头行解析、正文块边界、deletedAt、格式探测 |
| `obComponents/obGetMemos.ts` 等 | 块分组读取替换"逐行+缩进栈"；linkId 预留 |
| `helpers/marked.ts`（渲染器） | 行式 mini-md：列表/嵌套/代码块/表格/引用；保留 tag/内部链接/图片/任务扩展；输入先 decode `<br>`→\n 兼容旧数据 |
| `components/Editor/*` + `editor/`（新） | cm6 host（主题 token 化/readOnly/高度/keymap/发送）+ autocomplete(tag/file fuzzy) + 原生 history；rta、TinyUndo、`<br>` 编解码管道退役 |
| 评论 UI | 本期保留现状最小可用；渲染按旧解析结果 |
| 回收站 | deletedAt 头行化；UI 沿用 |

## 体检工具 = 规则引擎（P0，先行）

架构（模块分离，加规则=加一个文件）：
```
src/audit/
  types.ts       Rule / Issue / Report（ruleId、path、line、原文、why、severity）
  engine.ts      遍历文件+行 → 规则表 detect → 报告；fix 流程：备份 → 单条/全量 → 写回
  rules/index.ts 注册表
  rules/…        一规则一文件：legacy-time / missing-id / dup-id / bare-br /
                 indent-comment(旧评论) / unparsable …（迁移类规则待 P1 启用 fix）
  ui/            报告弹窗：按规则分组、显示 why（eslint 式说明）、单修/忽略/一键全修
```
入口：用户名三点菜单「数据体检」。目标文件范围：日记目录全部（开发库先跑，正式库只读报告）。

## 阶段（每阶段独立 commit + Obsidian 目视关卡）

- **P0** 体检规则引擎（只读报告先上线；逐条/全量修复带备份）——先行，也是后续迁移的执行器
- **P1** 新格式读取器 + 行式渲染器 + `<br>` 兼容解码；开发库造新格式样例目视——✅（2026-09-05 目视通过）
- **P1b** 写入端只写新格式 + 读取端行级收窄（旧数据不渲染）+ 体检整文件迁移 v1（legacy-row/migrateFile/AuditPage 按钮）——✅ 代码完成（commit 4c881ec，2026-09-05），待 Obsidian 目视。迁移 v1 语义与已知偏差见 CONTEXT P1b 条目与 src/audit/migrate.ts 头部注释
- **P1.5** 文件级迁移正式化（在 v1 基础上收紧：已删评论折叠语义、缺时间行政策等），正式库 317 先只读体检再逐文件试点迁移
- **P2** cm6 输入栈（host/联想/keymap/undo），旧编辑器退役
- **P3** 引用卡（跨文件 ↗）+ 评论重建（暂缓项，另行细化）

## 认知记录（别再犯）

- Obsidian 原生 **# 标签联想存在**（1.4.0 changelog: "Tag autocomplete now uses a fuzzy search algorithm"）；机制在 cm6 autocomplete 框架内，[[ 同理。实现同款功能前先摸清原生行为再照做
- 论证一个"功能是否存在/怎么实现"：查官方 changelog / 直接实测 / 找同类实现源码；不要拿帮助文档没写或社区插件存在当反证

## 新需求登记（2026-09-05 owner 提出，未排期）

- **任务卡片支持**：卡片分普通/任务两种，任务卡带勾选框（md `- [ ]` 原生语法，kanban 同款）。规格见上方解析规则 5；正文内的任务行（`- [ ] 买菜`）行式渲染已支持，卡片级任务态（整卡勾选框）在 P1b 写入端一并落地。
