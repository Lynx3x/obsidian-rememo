// P2 转向（决策 7 修订，2026-09-05 owner 拍板）—— 接入 Obsidian 原生编辑器体系。
//
// 自打包 cm6 + window capture 兜底（capture.ts）退役的根因（逆向 obsidian.asar 实锤）：
// Obsidian 内核在 window capture 阶段抢先拦截命中其命令的 Mod 组合键，第三方编辑器
// 永远无法完全复刻原生体验（格式键/IME/联想/续行语义…）。kanban 的解法 = 不用自己的
// cm6，而是拿到内核 MarkdownEditor 构造器直接子类化，让编辑器成为"Obsidian 原生编辑器"。
//
// 取类方式（mgmeyers/obsidian-kanban main.ts getEditorClass 同款 hack）：
// 瞬时创建 md embed → 切编辑态 → 沿 editMode 原型链取 MarkdownEditor 构造器。
// 依赖内部 API（embedRegistry/showEditor/editMode），Obsidian 1.13.7 已验证存在；
// 内核大版本升级可能失效——失败时返回 null，由调用方降级提示而非崩溃。

let cachedClass: any = null;

export function getNativeMarkdownEditorClass(app: any): any {
  if (cachedClass) return cachedClass;
  try {
    // 1) 瞬时 md embed（detached 容器，不落盘不渲染）
    const md = app.embedRegistry.embedByExtension.md(
      { app, containerEl: createDiv(), state: {} },
      null,
      '',
    );
    // 2) 切编辑态：editMode = 内核 MarkdownEditor（或其子类）实例
    md.load();
    md.editable = true;
    md.showEditor();
    const editorInstance = md.editMode;
    if (!editorInstance) throw new Error('embed.editMode 为空');
    // 3) 原型链倒退一层拿基类构造器：实例 → (Embed 子类原型) → MarkdownEditor.prototype
    cachedClass = Object.getPrototypeOf(Object.getPrototypeOf(editorInstance)).constructor;
    md.unload();
    if (typeof cachedClass !== 'function') {
      cachedClass = null;
      throw new Error('editMode 原型链构造器非函数');
    }
    return cachedClass;
  } catch (err) {
    console.error('[rememo] 取内核 MarkdownEditor 构造器失败（内核 API 变动？）', err);
    return null;
  }
}
