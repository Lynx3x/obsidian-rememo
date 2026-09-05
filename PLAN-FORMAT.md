# Rememo — 存储 / 体检 / 输入规格（活文档）

> **本文件是现行规格，不是计划。** 原「富内容存储 + cm6 输入改造」计划（P0→P2）已于 2026-09-05 全部落地并目视通过。
> 决策背景与演变（为什么）见 [docs/adr/](docs/adr/)（0001 输入内核 / 0002 卡片块存储）；完成历史看 git log；现状速览、术语、代码地图看 [CONTEXT.md](CONTEXT.md) §0/§1/§2。
> 原则：改格式/交互前先找参照物（Obsidian 原生行为、kanban 等插件源码），再定规格。

## 1. 卡片块存储格式（现行唯一格式，2026-09-05 定稿）

**样例**：

```markdown
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
    （被删卡的正文保留或可清空——渲染按 isDeleted 隐藏）
```

**解析规则**：

1. **头行** = 顶层 `- ` + 可选任务前缀 `[ ]/[x] ` + 时间 `HH:mm:ss`（读取兼容旧 14 位）+ 可选 `deletedAt: 值`（无方括号）+ 行尾 `^id`；头行内不允许再有正文文本
2. **正文块** = 头行之后**连续 ≥4 空格缩进的行**（原样并入卡片内容，可含空行与块级 markdown）；缩进少于 4 的非空行（新顶层 bullet / 标题 / 文件尾）结束本卡
3. **旧行**（头行带正文 / 字面 `<br>` / 缩进评论）由 `classifyMemoRow` 判出：不渲染、不进回收站；恢复 = 体检「整文件迁移」
4. **任务卡**：任务态只在头行（`- [ ] 12:00:00 ^id`）；渲染为头部时间旁勾选框，点击经 `toggleMemoTask` 写回头行，TASK-DONE 正文置灰不划线；勾选框恒显示（不受设置门控）
5. **处理区** = ProcessEntriesBelow 语义（设置标题为空时，从文件头到首个 `# ` 标题止）——读取/体检/迁移三处同款，改一处要改三处
6. 边界与软删语义的词汇定义在 CONTEXT §1；**正则唯一实现在 `src/helpers/memoLine.ts`（读端/规则/迁移共用）——别在别处再抄正则**

## 2. 数据体检 = 规则引擎（现行架构）

模块分离，加一条规则 = 加一个文件：

```
src/audit/
  types.ts       Rule / Issue / Report（ruleId、path、line、原文、why、severity）
  engine.ts      遍历文件+行 → 规则表 detect → 报告；fix 流程：备份 → 单条/全量 → 写回
  rules/index.ts 注册表；一规则一文件：legacy-time / missing-id / dup-id / bare-br /
                 indent-comment(旧评论) / unparsable …
  migrate.ts     整文件迁移（迁移 v1 语义与已知偏差：读本文件头部注释）
  ui/            报告弹窗：按规则分组、显示 why（eslint 式说明）、单修/忽略/一键全修
```

- 入口：用户名三点菜单「数据体检」；目标范围：日记目录全部（开发库可修，正式库只做只读报告——逐文件试点迁移需 owner 点头，见 CONTEXT §4 P1.5）
- 修复前自动备份到 `.rememo-backup/{audit,migrate}-<ts>/`

## 3. 输入内核（2026-09-05 定稿；操作手册 = CONTEXT §6，决策论证 = docs/adr/0001）

- 输入框本体 = 内核 MarkdownEditor 子类（取类 hack：`src/editor/native.ts`）；打字/光标/IME/撤销走内核
- 能进编辑器的扩展（换行/占位/高亮/keymap/readOnly）只经覆写 `buildLocalExtensions()` 进入最终 state；联想 = 内核原生 editorSuggest（controller 喂 tag/file 上下文）
- 交互控制在外层 DOM：`capture.ts`（Ctrl+Enter window capture）等；文件：`components/Editor/Editor.tsx`（接入总成）、`MemoEditor.tsx`（工具条/蓄力发送/编辑态）
- **已退役、勿重建**：rta 输入、自产 suggest 联想、自打包 cm6、appendConfig 注入扩展

## 4. 认知记录（别再犯）

- Obsidian 原生 **# 标签联想存在**（1.4.0 changelog: "Tag autocomplete now uses a fuzzy search algorithm"）；机制在 cm6 autocomplete 框架内，`[[` 同理。实现同款功能前先摸清原生行为再照做
- 论证一个「功能是否存在/怎么实现」：查官方 changelog / 直接实测 / 找同类实现源码；不要拿帮助文档没写或社区插件存在当反证
