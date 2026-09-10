# Rememo

> 把闪念写进你的日记。所见即文件：每条 memo 就是日记文件里的一张卡片块。

[English](README.md) | **中文**

Rememo 是 Obsidian 备忘录插件，源自 [Obsidian-Memos](https://github.com/Quorafind/Obsidian-Memos) 的增强重写（曾用名 Memos Plus）。所有 memo 都存储在**你的日记文件**里，不做私有数据库——Obsidian 文件归你，随时可读、可改、可迁移。

## 截图

![主界面](assets/screenshots/01-main.png)
![任务模式的编辑器](assets/screenshots/02-editor.png)
![标签](assets/screenshots/03-tags.png)
![回收站](assets/screenshots/04-recycle.png)

## 特性

- **原生编辑体验的输入框**：基于 Obsidian 内核编辑器——打字/换行/中文输入、撤销、`==高亮==` 实时渲染、`#tag` 与 `[[链接]]` 联想；Enter 或 Ctrl/Cmd+Enter 发送
- **卡片流浏览**：日记里的 memo 以卡片列表呈现，分页加载，按文本/标签/查询/日期过滤；侧栏带热力图与标签树
- **任务卡**：`- [ ]` 输入即任务，卡片上的勾选框直接完成；发送键旁边的**双段滑块**切换 普通/任务——编辑已有卡时自动跟随该卡类型
- **标签**：默认抽到卡片底部，也可设为**原位保留**在句子里（设置项）；点任意标签即按标签筛选
- **回收站**：删除是**软删**——memo 留在原日记、带 `deletedAt` 标记，可在回收站恢复或永久删除；可设保留期自动清理（默认永不）
- **发送音效**：发送时播放发牌声（可换自己的音频文件 / 关闭，带音量）
- **分享成图片**：单张卡片或整日日记一键生成图片（可配页脚/背景）
- **数据体检**：内置修复工具，扫描异常数据、把旧版单行格式整文件迁移为卡片块（自动备份）
- **移动端可用**，支持接收文本/文件「存为 memo」

## 安装

**从社区插件市场安装** —— 设置 → 第三方插件 → 浏览 → 搜索 “Rememo”。（目录审核通过后可用）

**手动安装** —— 将 `main.js`、`styles.css`、`manifest.json` 放入
`你的库/.obsidian/plugins/rememo/`，然后在 Obsidian 的第三方插件列表里启用 **Rememo**。

需要 Obsidian **1.5.0** 及以上。

## 快速开始

1. 启用 Obsidian 核心插件「**日记**」（Rememo 的读写目标就是日记文件）
2. 打开 Rememo 设置，确认「**Memo 区标题**」与你的日记模板一致（默认 `## Memo`）——新 memo 写在这个标题下；文件里没有该标题时 Rememo 会自动创建
3. 点击左侧栏的 Rememo 图标（或命令面板执行「Open Memos」）打开
4. 输入一条闪念，发送——打开今天的日记，就能看到它变成一张卡片块

## 你的日记文件长什么样

```markdown
## Memo

- 14:32:15 ^a1b2c3
    闪念正文，支持 **粗体**、`代码`、#tag、[[双链]]、![[图片]]，
    空行分段；列表、代码块等块级格式都行

- [x] 14:40:00 ^d4e5f6
    任务卡：勾选会写回头行

- 14:45:00 deletedAt: 2026-09-05 14:45:00 ^g7h8i9
    已删除的卡（留在原处，回收站里可恢复或永久删除）
```

格式约定：头行 = `- [ ]? HH:mm:ss [deletedAt: …] ^id`（纯标识，正文从下一行 4 空格缩进开始，支持完整 Markdown）；`^id` 由 Obsidian 维护。旧版单行格式（正文写在头行里）不渲染，用「数据体检 → 整文件迁移」转成新格式（自动备份）。

## 设置要点

- **Memo 区标题**：读写共用这一个设置——只读该标题下的内容，新 memo 写在该小节末尾（缺失时自动创建，建在文件末尾）。默认 `## Memo`
- **按 Enter 直接发送**：关（默认）= Enter 换行、Ctrl+Enter 发送；开 = 反过来
- **标签位置**：沉底（默认）/ 原位保留在句中
- **发送音效**：内置·发牌声 / 自定义库内路径 / 不播放；带音量滑条
- **回收站**：总开关 + 自动清理保留期（永不 / 7 / 30 / 90 / 180 天）
- **热力图**：显示开关、周起点
- **时间显示格式**：只影响显示，落盘始终 `HH:mm:ss`

## 从命令行构建

```bash
pnpm install
pnpm build      # 产出 main.js + styles.css
```

把产物复制到上面的插件目录，在 Obsidian 里重载插件（若改动未生效，完整重启 Obsidian）。

## 致谢

本项目基于 [Boninall (Quorafind)](https://github.com/Quorafind/) 开发的 [Obsidian-Memos](https://github.com/Quorafind/Obsidian-Memos)，设计灵感来自 [memos](https://github.com/justmemos/memos) 与 [flomo](https://flomoapp.com/)。

## 许可

[MIT](LICENSE)
