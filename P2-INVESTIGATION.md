# Rememo P2 输入内核问题移交文档（2026-09-05）

> **状态：已解决 ✅（正门方案，owner 目视全绿）。本文档转为排查历史档案保留**
> 定案：内核最终 state 由首次 `set()` 构建（cmInit=false → getLocalExtensions → buildLocalExtensions 覆写）；修复 = new 后无条件 `native.set(initial)`（空串也调）。见 §7 与 CONTEXT §6。
>
> 用途：把"Obsidian 原生 MarkdownEditor 嵌入"路线的全部已知事实、现象、坑移交他人接手。
> 事实与推测分开标注（【事实】= 探针/复现确认；【推测】= 未证实）。代码在 dev 分支。

## 0. 环境

- Obsidian 1.13.7（2026-08-12 桌面版），Windows 10
- 插件目录：dev 库的 `.obsidian/plugins/obsidian-rememo`（pnpm + vite，`pnpm build` 出 main.js）
- 关键文件：`src/components/Editor/Editor.tsx`（全部接入逻辑）、`src/editor/native.ts`（取内核类）、`src/editor/{capture,suggest,highlight}.ts`
- Obsidian 内核渲染代码在 `C:\Users\Pc\AppData\Roaming\obsidian\obsidian-1.13.7.asar`（app.js，可解包逆向）

## 1. 目标与当前架构

目标：memo 输入框要"Obsidian 原生 Markdown 编辑体验"（打字/续行/IME/格式键如原生）+ 附加能力（发送键、实时格式高亮、`#`/`[[` 联想、占位文字、换行）。

当前架构（能工作的部分）：
1. 用 embed hack 取内核 MarkdownEditor 构造类（与 kanban `getEditorClass` 同款）：瞬时 `app.embedRegistry.embedByExtension.md(...)` → `editable=true; showEditor()` → 沿 `editMode` 原型链取构造器 → `new (该类)(app, el, controller)` 嵌入视图。
2. 编辑器本体工作正常：打字/光标/列表续行/撤销/中文 IME 均正常 → 内核给的基础 state 是完整的 cm6。
3. 控制权在编辑器之外（DOM 通道）：contentDOM `input` 事件驱动发送按钮可用态；`focus/blur` 把 `workspace.activeEditor` 桥到本编辑器（Obsidian 编辑命令 Mod-B/I/E 等路由到 memo 输入，owner 验证"完全是原生体验"）；Ctrl+Enter 发送用 window capture 兜底（Obsidian 全局会吞命中命令的 Mod 键）。
4. 附加观感（换行/高亮/联想/占位）经 cm6 `StateEffect.appendConfig` 注入。

## 2. 核心未解问题（按重要性）

**Q1【核心】：这个裸 MarkdownEditor 实例的最终 EditorState 由哪条路径构建？**

【事实】最终生效 state 的 `state.facet(EditorView.updateListener)` 恒为 0（多次采样）；
【事实】子类覆写 `buildLocalExtensions()` 从未被调用（方法体内打日志，只有手动调用才出现）；
【事实】直接 patch `NativeEditor.prototype.buildLocalExtensions` 会被调用（patch 内日志出现），但返回值（内核原版 + 我们 push 的扩展）仍不在最终 state；
【事实】实例方法覆写 `onUpdate(update, changed)` 从不被调用（说明内核自己的 updateListener 也不在这个最终 state 上）；
【推测】存在"State #1（构造时，含 buildLocalExtensions 结果）→ 内部重初始化 → State #2（最终存活）"的重建阶段，我们观察到的都是 State #2。谁是 State #2 的构建者、何时构建，未抓到（见 Q2）。

**Q2：`StateEffect.appendConfig` 注入为何运行期消失？**

【事实】appendConfig 注入后高亮/联想/换行**确实目视生效过**（owner 多轮确认"全绿"）；
【事实】运行期会整体消失（编辑操作后/随机时机），消失后重载插件不保证恢复，**重启 Obsidian 是否恢复未系统验证**；
【推测】被 `EditorView.setState(newState)` 或整个 EditorView 替换抹掉（cm6 语义：setState 用全新 state 重置整个 view）。曾试图 patch `EditorView.prototype.setState/destroy` 抓调用者+调用栈，但那一轮探针（console.error 级）完全没出现——见 Q3 的加载怀疑，未抓到现场。

**Q3：Obsidian 是否真的加载了最新 main.js？**

【事实】console.debug/warn 探针曾因控制台级别过滤不可见（过滤只显示 errors）→ 换 console.error 后**仍有多轮完全无输出**；
【事实】行为表现与代码版本不完全对应（同一提交曾被报"全绿"后来又"不行"）；
【推测】Obsidian 插件 disable/enable 可能不重新读取/require main.js（模块缓存），**完整重启 Obsidian 才保证加载新文件**。多轮"改了什么都没效果/没探针"可能都是在跑旧 bundle。**接手第一步：验证此点**（重启后看探针/行为是否变化）。

**Q4：正确/稳定的注入方式？**

在不稳定的 appendConfig 之外，是否存在让装饰/联想/keymap 稳定存在于最终 state 的官方/可靠通道？已排除：子类覆写 buildLocalExtensions（不调用）、原型 patch（被调用但结果弃用）、onUpdate（不调用）、plugin.addChild（无改善）。
分析者提示：Obsidian 官方 `registerEditorExtension()` 只作用于正常 Markdown 编辑器，不保证覆盖 `new MarkdownEditor()` 的裸实例（社区 Embeddable CM Markdown Editor 项目将其列为已知限制）。

## 3. 其它已确认事实（防重复踩坑）

1. **`removeHighlights` RangeError**：`this.editor.removeHighlights()` 读 `state.field(搜索高亮 field)`，该 field 由主编辑器外层注入、裸实例没有 → 点击输入框（onViewClick）与按 Esc 触发 → 已用实例级遮蔽（`editorWrapper.removeHighlights = () => undefined`）解决，不再崩。【已修复】
2. **滚动 TypeError**：大段文字滚动时报 `this.owner.syncScroll is not a function`（内核 onScroll 调 controller/owner.syncScroll）→ 刚在 controller 补了 `syncScroll: () => undefined`，**未复测**。【待验证】
3. **`clear()` 禁 `EditorState.create` 重建**：重建会丢内核私有 StateField → RangeError 崩整个实例（曾因此连坏多轮）。只能用 dispatch 清空；代价是发送后 Ctrl+Z 可撤销回旧文（小瑕疵，接受）。
4. **占位文字**：内核 placeholder 扩展注入了也不显示（曾用 appendConfig 试金石失败）→ 已用 CSS 叠层（`.cm-host.is-empty::before` + `data-placeholder`）实现，稳定。
5. **removeHighlights 之外**：点击/编辑/发送/squash 动画全流程已通（owner 曾全绿）。

## 4. 参考实现（社区已验证的同类接入）

- kanban：`src/components/Editor/MarkdownEditor.tsx` + `src/main.ts`（getEditorClass hack、controller 结构、addChild 生命周期、buildLocalExtensions 覆写模板）
- Fevol 的 Embeddable CM Markdown Editor（gist + 文档站）——同样 hack 的整理版，明确标注"第三方 registerEditorExtension 不进入嵌入式 editor"、"undocumented internal API"
- Obsidian developer docs：Editor extensions 页（只讲 registerEditorExtension，不覆盖裸实例）

## 5. 建议的接手步骤

1. 先验证 Q3：完整重启 Obsidian → 在当前诊断版（含 setState/destroy patch 探针，console.error 级）操作 → 确认探针是否出现。
2. 若探针出现：按操作序列（重载 → 空等 3s → 打字 → 双击编辑 → 大段文字滚动）收集 `setState/destroy` 调用栈与 `probeField CREATE` 计数 → 直接定位重建源。
3. 定位后回答 Q1/Q2；再据 Q4 选稳定注入通道或重构方案。

## 6. 回退基线

- `75b16ec`：自打包 cm6 + window capture 版（非原生内核，但功能全自管、稳定可控，是 owner 认可过的可用形态）
- `7b2c051`：当前原生架构"全绿时刻"提交（运行期注入丢失问题仍在）

## 7. 接手后反编译新发现（2026-09-05，1.13.7 app.js，可推翻旧结论）

### 7.1 内核真实构造链（embed 场景）

```js
// markdown embed 的 showEditor() 内:
n || (n = this.editMode = this.addChild(new t1(this)));   // t1 = 嵌入编辑器类, 参数 = embed 实例
n.set(this.text, true);

// t1 构造:
var t1 = function(e) {          // t1 extends zJ
  function t(t) {               // t = embed 实例
    var n = e.call(this, t.app, t.editorEl, t) || this;  // super(embed.app, embed.editorEl, embed)
    n.owner = t;
    ...
```

要点：内核自己构造嵌入编辑器 = **`new t1(embed)`**；super 三参 = `(embed.app, embed.editorEl, embed)`——与 kanban/我们的 `(app, el, controller)` 形态一致，但 el 必须是 **embed 的 editorEl**、第三参是带 `save/showPreview/onMarkdownFold/file` 的 **embed 本体**。t1 覆写了 `onUpdate`（docChanged 时 `owner.save()`）、`getDynamicExtensions`（Escape→`owner.showPreview()` 等）。

### 7.2 【推翻旧结论】最终 state 的正门 = getLocalExtensions() → buildLocalExtensions()

```js
t.prototype.set = function(text, t) {
  var n = this.cm;
  if (t || !this.cmInit) {
    this.cleanup();
    this.editorSuggest.close();
    var i = [this.getLocalExtensions(), NJ.of(this.getDynamicExtensions()), RJ];  // ← 最终 state 扩展组
    ...nt.create({doc: e, extensions: i}); n.setState(s);  // cm.setState(新 state)
    this.cmInit = true;
  } else {
    // cmInit 后:最小 diff dispatch(userEvent:"set")
  }
}
t.prototype.getLocalExtensions = function() {
  var e = this.localExtensions;
  return e || (e = this.localExtensions = this.buildLocalExtensions()), e;  // ← 调用并缓存!
}
```

即：**首次 `set()`（cmInit=false）构建最终 state 的扩展 = `getLocalExtensions()`（内部多态调 `buildLocalExtensions()` 并缓存到实例字段 `localExtensions`）+ dynamic + RJ**。此前"buildLocalExtensions 不被调用/返回值被弃用"的结论**需要重新验证**——很可能只是**触发时机**问题：buildLocalExtensions 只在首设 `set()` 走 setState 分支时被调用，之后 set() 走 dispatch 分支；且结果被**缓存**（`this.localExtensions`），再次调用 getLocalExtensions 返回缓存、不再调 buildLocalExtensions。

### 7.3 重新解释旧探针结果（推测）

- 子类覆写版"从未被调用"：若覆写轮没触发首设 set() 路径（构造器建 cm 时 cmInit 已置位？或 set() 从未在 cmInit=false 时调用），buildLocalExtensions 就只在构造时被调一次——**构造时是否调用待查**（找构造器里 cm 建立代码：锚点 2540510 前文含 `...this.cm.setState(t), this.cmInit=!0`，属某方法结尾，需向前追该方法起点确认是构造器还是 onload）。
- patch 版"被调用但不生效"：patch 出现在首次 getLocalExtensions 调用（构造或首设 set），返回值被缓存进 localExtensions——但若**缓存发生后又有一次 state 重建用了别的扩展来源**（如 clear()/再次 setState），仍会丢。
- onUpdate 从不被调：onUpdate 由 updateEvent（updateListener）驱动，updateEvent 注册在内核原版 buildLocalExtensions 里（`Jo.updateListener.of(this.updateEvent())`）——若 buildLocalExtensions 没进 state，onUpdate 自然不调。**与"打字时 editorSuggest 是否触发"是同一根因的两种表现**（联想不弹也可能源于此！）。

### 7.4 建议的下一步实验（接手人）

1. 子类覆写 `buildLocalExtensions()`（push 我们的扩展 + console 探针），构造后**立即显式调 `native.set(initial)`（哪怕空串）**触发 cmInit=false 的首设路径 → 检查最终 state facet 与高亮。
2. 在覆写版里打印 `this.localExtensions` 在 set 前后的值，确认缓存时序。
3. 反向验证：覆写里 push 一个 `console.log` 的 updateListener，输入后若触发 → 整条链通了（onUpdate/联想也会随之恢复，因为 updateEvent 注册在同一个 buildLocalExtensions 返回值里——前提是它没被我们覆盖掉：覆写时必须先 `super.buildLocalExtensions()` 保留内核原版注册的 updateEvent！）。
4. **不要在覆写里丢掉内核原版内容**——530d1a5 后各版可能一直保留 super 调用，但若曾在覆写里"新建空数组"就会丢掉 updateEvent → 联想/onUpdate 全废。检查历史代码是否有此问题。

### 7.5 反编译锚点（app.js 字符偏移，方便继续挖）

- `t1`（embed 编辑器类）定义：2577471；`new t1(`：2583127（embed.showEditor 内）
- embed 类（含 showEditor/destroyEditor/onload）：2582402 起
- 基类 MarkdownEditor（含 get/set/cleanup/destroy/updateEvent/buildLocalExtensions/getLocalExtensions）：getLocalExtensions @ 2542667、buildLocalExtensions @ 2540510、updateEvent @ ~25399xx、destroy/clear/set @ 2537846~2540510 区段
- `syncScroll` 相关：2561473（handleScroll 崩点）、2581178/2583996（controller 契约，owner 侧）
- onUpdate 覆写：2577471(t1, 保存到 owner)、2566552（表格类）、2565111（主编辑器类）
