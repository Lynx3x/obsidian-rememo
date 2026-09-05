# P2 输入内核——反编译锚点与防坑档案（历史）

> **状态：已解决并定稿（2026-09-05，owner 目视全绿）。** 定案结论、接入手册、踩坑清单见 [CONTEXT.md](CONTEXT.md) §6；决策论证（为什么最终这么选）见 [docs/adr/0001](docs/adr/0001-input-core-native-markdowneditor.md)。
> 本档案只留两类长期有效的东西：**反编译锚点**（app.js 字符偏移，重挖内核时用来定位）与**防踩坑事实**。当年的排查过程、推测、未解问题清单已全部落定或过时，考古请用 git log。

## 1. 环境

- Obsidian 1.13.7（2026-08-12 桌面版），Windows 10
- 插件目录：dev 库的 `.obsidian/plugins/obsidian-rememo`（pnpm + vite，`pnpm build` 出 main.js）
- 关键文件：`src/components/Editor/Editor.tsx`（接入总成）、`src/editor/native.ts`（取内核类）、`src/editor/`（capture/highlight 等）
- Obsidian 内核渲染代码在 `C:\Users\Pc\AppData\Roaming\obsidian\obsidian-1.13.7.asar`（app.js，可解包逆向）

## 2. 内核构造链（embed 场景，反编译结论）

内核自己构造嵌入编辑器 = `new t1(embed)`；super 三参 = `(embed.app, embed.editorEl, embed)`——与插件侧的 `(app, el, controller)` 形态一致，但 **el 必须是 embed 的 editorEl、第三参是带 `save/showPreview/onMarkdownFold/file` 的 embed 本体**。t1 覆写了 `onUpdate`（docChanged → `owner.save()`）与 `getDynamicExtensions`（Escape → `owner.showPreview()` 等）。

## 3. 反编译锚点（app.js 字符偏移，挖深前先来这里）

- `t1`（embed 编辑器类）定义：2577471；`new t1(`：2583127（embed.showEditor 内）
- embed 类（含 showEditor/destroyEditor/onload）：2582402 起
- 基类 MarkdownEditor（get/set/cleanup/destroy/updateEvent/buildLocalExtensions/getLocalExtensions）：getLocalExtensions @ 2542667、buildLocalExtensions @ 2540510、updateEvent @ ~25399xx、destroy/clear/set @ 2537846~2540510 区段
- `syncScroll` 相关：2561473（handleScroll 崩点）、2581178/2583996（controller 契约，owner 侧）
- onUpdate 覆写：2577471（t1，保存到 owner）、2566552（表格类）、2565111（主编辑器类）

## 4. 防踩坑事实（定稿后仍有效的硬约束）

1. `removeHighlights/hasHighlight` 须实例级遮蔽（裸实例没有搜索高亮 field，点击/Esc 会 RangeError）；controller 需有 `syncScroll` 空实现（大段滚动 TypeError）
2. `clear()` 后禁再用 `EditorState.create` 重建（丢内核私有 StateField → RangeError 崩实例）；只能 dispatch 清空，代价 = 发送后 Ctrl+Z 可撤销回旧文（小瑕疵，接受）
3. 内核 placeholder 扩展注入了也不显示 → 用 CSS 叠层（`.cm-host.is-empty::before` + data-placeholder）
4. 插件侧 @codemirror/* 与内核 asar 内副本是不同模块实例——updateListener 等插件侧 facet 对内核建的 state 不生效
5. console.debug/warn 探针会被控制台过滤；插件 disable/enable 可能不重载 main.js——动内核输入通道前先挂 error 级计数探针，并完整重启 Obsidian 验证

## 5. 回退点

- `75b16ec`：自打包 cm6 + window capture 版（非原生内核，功能全自管、稳定可控）
- `7b2c051`：原生架构定稿「全绿」提交
