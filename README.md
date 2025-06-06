# Obsidian Memos Plus

[中文文档](./document/chinese.md)

一个 Obsidian 备忘录插件的增强版，基于原[Obsidian-Memos 插件](https://github.com/Quorafind/Obsidian-Memos)开发，保留了其核心功能的同时进行了改进和扩展。本项目灵感来源于开源项目[memos](https://github.com/justmemos/memos)和[flomo](https://flomoapp.com/)的理念。

![](https://raw.githubusercontent.com/Quorafind/Obsidian-Memos/main/document/Memos-Desktop.png)
![](https://raw.githubusercontent.com/Quorafind/Obsidian-Memos/main/document/Memos-Mobile.png)

## 简介

1. 所有备忘录来源于您的日记笔记，因此需要启用 Obsidian 的"日记"核心插件才能正常工作。
2. 插件会处理日记中指定标题下的内容，默认为`# Journal`标题下的内容。
3. 新建的备忘录会添加到您在设置中指定的标题下，默认为`# Journal`（现在您可以设置为任何其他标题）。
4. 当您创建查询时，系统会在您的日记文件夹中自动生成 query.md 文件。
5. 当您删除备忘录时，它会被发送到日记文件夹中的 delete.md 文件，请不要直接编辑该文件。

## 使用方法

1. 首先确保您已启用 Obsidian 的"日记"核心插件。
2. 检查设置，设置您要处理的标题和插入新备忘录的位置，或者留空以将条目写入日记文件的底部。
3. 打开备忘录并点击"NOTEIT"按钮。
4. 如果您允许在备忘录上添加评论，需要确保已启用"dataview"插件。

备忘录将以项目符号格式和当前时间添加到您的日记中。

### 示例

```markdown
-   22:15 {您输入的备忘录内容}
```

解析时使用以下格式添加备忘录到列表：

-   日记中的 `- 19:00` 格式
-   日记中的 `- [ ] 19:00` 格式

## 功能特点

### 备忘录列表

在一个页面中显示所有来自日记的备忘录，方便阅读和管理。

### 分享备忘录和时间线

您可以通过图片分享任何备忘录和每日备忘录。

### 标签列表

内置仅用于备忘录的标签列表，显示备忘录中的标签。

### 查询列表

您可以设置包含多个变量的查询来筛选备忘录，并可以添加、置顶或删除这些查询。

### 备忘录热图

类似 GitHub 贡献图的视图，显示每天的备忘录数量，可点击筛选特定日期的备忘录。

### 用户横幅

您可以在设置中设置您的名字。点击用户名旁边的三个点，可以找到备忘录的设置和回收站。

在每个备忘录中，您可以使用 MARK 将其链接到另一个备忘录，还可以删除、分享等操作。

提示：

1. 双击备忘录可以编辑内容。
2. Ctrl+点击可以跳转到备忘录的源文件。

### 搜索和过滤

每次在备忘录中搜索都会过滤匹配的备忘录（显示在一个页面中），插件内置了四个过滤器，帮助您更轻松地使用备忘录。

### 更多设置选项

您可以在设置中找到许多有趣的功能，不妨尝试一下。

### 为热图设置不同颜色

您可以在这里下载 CSS 片段：[Heatmap-color](./document/Heatmap-css-snippet.css)

## 安装方法

### 从 Obsidian 插件市场安装

💜: 直接从 Obsidian 插件市场安装。

### 使用 BRAT 安装

��: 将 `[您的GitHub用户名]/obsidian-memos-plus` 添加到 BRAT。

### 手动下载安装

🚚: 下载最新版本。解压并将三个文件(main.js, manifest.json, styles.css)放入 `{{obsidian_vault}}/.obsidian/plugins/obsidian-memos-plus` 文件夹。

## 关于作者

<!-- 这里是您的个人信息位置 -->
<!-- 您可以添加您的个人介绍、联系方式、其他项目链接等 -->

## 致谢

本项目基于[Boninall (Quorafind)](https://github.com/Quorafind/)开发的[Obsidian-Memos](https://github.com/Quorafind/Obsidian-Memos)插件。感谢原作者的创意和贡献，使这个有用的工具成为可能。

## 支持项目

如果您喜欢这个插件，可以通过以下方式支持：

<!-- 这里是您的赞助信息位置 -->
<!-- 您可以添加您的赞助链接、二维码等 -->

## 许可证

本项目采用 MIT 许可证。详情请参阅[LICENSE](LICENSE)文件。
