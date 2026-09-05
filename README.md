# Rememo

> 把闪念写进你的日记。所见即文件：每条 memo 就是日记文件里的一张卡片块。

Rememo 是 Obsidian 备忘录插件，源自 [Obsidian-Memos](https://github.com/Quorafind/Obsidian-Memos) 的增强重写（曾用名 Memos Plus）。所有 memo 都存储在**你的日记文件**里，不做私有数据库——Obsidian 文件归你，随时可读、可改、可迁移。

## 特性

- **原生编辑体验的输入框**：基于 Obsidian 内核编辑器的输入体验——打字/换行/中文输入、`==高亮==` 实时渲染、`#tag` 与 `[[链接]]` 联想、撤销，Enter 或 Ctrl+Enter 发送
- **卡片流浏览**：日记里的 memo 以卡片列表呈现，分页加载、按文本/标签/查询/日期过滤
- **任务卡**：`- [ ]` 输入即任务，卡片上的勾选框直接完成
- **侧栏**：热力图（按天分布）、查询列表、标签列表一键筛选
- **回收站**：删除是**软删**——memo 留在原日记、带 `deletedAt` 标记，可在回收站恢复或永久删除
- **分享成图片**：单张卡片或整日日记一键生成图片（可配页脚/背景）
- **数据体检**：内置修复工具，扫描异常数据、把旧版单行格式整文件迁移为卡片块（自动备份）
- **移动端可用**，支持接收文本/文件「存为 memo」

## 快速开始

1. 启用 Obsidian 核心插件「日记」（或 Periodic Notes）
2. 在 Rememo 设置中确认两个标题都指向你的日记标题（都设为 `# Journal` 或同一标题即可；见下方「两个标题」提醒）
3. 点击左侧栏的灯泡图标（或命令面板执行 "Open Memos"）打开 Rememo
4. 输入一条闪念，发送——打开今天的日记，就能看到它变成一张卡片块

## 你的日记文件长什么样

```markdown
## Journal

- 14:32:15 ^a1b2c3
    闪念正文，支持 **粗体**、`代码`、#tag、[[双链]]、![[图片]]，
    空行分段；列表、代码块等块级格式都行

- [x] 14:40:00 ^d4e5f6
    任务卡：勾选会写回头行

- 14:45:00 deletedAt: 2026-09-05 14:45:00 ^g7h8i9
    已删除的卡（留在原处，回收站里可恢复或永久删除）
```

格式约定：头行 = `- [ ]? HH:mm:ss [deletedAt: …] ^id`（纯标识，正文从下一行 4 空格缩进开始，支持完整 Markdown）；`^id` 由 Obsidian 维护。旧版单行格式（正文写在头行里）不渲染，用「数据体检 → 整文件迁移」转成新格式。

## 设置要点

- **两个标题设置最好设成同一个**：「Insert after heading」（新 memo 写到哪里）与「Process Memos below」（从哪里开始读）默认分别为 `# Journal` 与空——空表示从文件头读到第一个标题为止；如果日记模板把 `# Journal` 放在文件头而写入也插到它下面，新写的 memo 不会被读回。建议把两者都设成你的日记标题
- **Send memo by Enter key**：关（默认）= Enter 换行、Ctrl+Enter 发送；开 = 反过来
- **Time display format**：只影响显示，落盘始终 `HH:mm:ss`
- **日记来源**：Daily Notes 或 Periodic Notes 二选一
- 界面语言跟随 Obsidian 界面语言

## 安装

手动安装：将 `main.js`、`styles.css`、`manifest.json` 放入
`你的库/.obsidian/plugins/obsidian-rememo/`，然后在 Obsidian 的第三方插件列表里启用。

（从 Obsidian 插件市场/BRAT 安装：上架后可用，当前请走手动。）

## 从命令行构建

```bash
pnpm install
pnpm build      # 产出 main.js + styles.css（随提交附）
```

调试：把产物复制到上面的插件目录，在 Obsidian 里重载插件（若改动未生效，完整重启 Obsidian）。

## 致谢

本项目基于 [Boninall (Quorafind)](https://github.com/Quorafind/) 开发的 [Obsidian-Memos](https://github.com/Quorafind/Obsidian-Memos) 开发；设计灵感来自 [memos](https://github.com/justmemos/memos) 与 [flomo](https://flomoapp.com/)。MIT 许可证，详见 [LICENSE](LICENSE)。
