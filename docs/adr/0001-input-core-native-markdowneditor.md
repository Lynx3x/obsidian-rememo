# 输入内核采用 Obsidian 原生 MarkdownEditor 子类，由首次 set() 构建真正 state

2026-09-05 定案，owner 目视全绿。输入框要「类 Obsidian 原生」的编辑体验（打字/光标/IME/撤销 + 格式高亮/联想/占位等插件能力），此前三条路线失败在同一根因上：**内核 MarkdownEditor 构造器只建空壳编辑器（`cmInit=false`），真正可用的编辑 state 由第一次 `set(文本)` 构建**。定案做法：取内核类 → 子类实例 → `new` 后**无条件首设 `set(initial)`（空串也调）**，让子类覆写的 `buildLocalExtensions()` 经官方建态路径进入最终 state；交互控制（发送/命令路由/按钮可用态）放编辑器外层 DOM 接管。操作手册见 CONTEXT §6，反编译锚点见 P2-INVESTIGATION.md。

**Status**: accepted（2026-09-05；此前路线被此定案取代，见下）

## Considered Options（三条路，为何只剩第四条）

1. **自打包 cm6 迷你编辑器 + window capture 兜底**（提交 75b16ec）——曾是可用的完整形态，但编辑器与 Obsidian 内核文本域完全割裂，后续被原生路线取代；**保留为回退点**。
2. **appendConfig 向裸实例注入扩展**——注入对象是**空壳 state**，任何一次首设 `set()` 会用全新 state 整个换掉，运行期随机消失（「时好时坏」的直接表现）。
3. **子类覆写 `buildLocalExtensions()` 但不触发首设 set()**——该覆写只在首设 `set()` 路径被调用并缓存；initial 为空时不调 `set()` → 覆写从未进 state（探针「从未被调用」现象的真相，P2-INVESTIGATION §7.3 复盘）。
4. ✅ **原生 MarkdownEditor 子类 + 无条件首设 `set(initial)` + `super.buildLocalExtensions()` 保留内核原版 + DOM 外层控制**——唯一稳定通道。

## Consequences

- 接入步骤、顺序、代码锚点：CONTEXT §6（唯一操作手册，本文件不重复）。
- 扩展注入受内核建态路径限制：updateListener 等插件侧 facet 对内核建的 state 不生效（插件 @codemirror/* 与内核 asar 副本非同模块实例）；联想走内核原生 editorSuggest（7c65cc9 起，自产联想退役）。
- 踩坑清单（clear() 重建崩实例、探针被过滤、disable/enable 不重载 main.js 等）：CONTEXT §6 坑列表。
- 回退点：75b16ec（自打包 cm6 可用版）；定稿提交：7b2c051。
