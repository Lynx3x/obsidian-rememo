// P2 — Obsidian 全局键盘吞键兜底（见 CONTEXT §6 排查结论）：
//
// Obsidian 内核在 window 上以 **capture 阶段**（内核最早注册）监听 keydown，
// 命中其 scope 命令（Mod-B/Mod-I/Mod-E 粗斜体、Mod-Enter 勾选任务等）即
// preventDefault + stopPropagation → 事件到不了我们 cm6 的 contentDOM，
// 所以 cm keymap 与 domEventHandlers 全收不到（普通键/纯 Enter 不命中命令，正常）。
//
// 解法：在 window 同一 capture 层**后注册**一个兜底监听——Obsidian 用的是
// stopPropagation（非 stopImmediate），同层后续监听仍会收到事件：
// 命中 memo 私有热键时直接执行与 cm keymap 相同的动作（keys/format 共用函数），
// 再 stopImmediatePropagation 吞掉事件，阻止它继续下传到 contentDOM
// （避免事件没被 Obsidian 吞时 cm keymap 二次触发）。
import type { EditorView } from '@codemirror/view';

export interface CaptureBinding {
  /** 键位匹配（自行判断修饰键与目标） */
  match(e: KeyboardEvent): boolean;
  /** 动作：对焦点所在实例的 view 执行（语义与 cm keymap 同源） */
  run(view: EditorView): void;
}

interface Holder {
  view: EditorView;
  binds: CaptureBinding[];
}

const holders = new Set<Holder>();
let installed = false;

function onWindowKeydown(e: KeyboardEvent): void {
  // IME 组合中交给编辑器自己；事件目标不在任何 rememo cm6 内 → 放行
  if (e.isComposing) return;
  const target = e.target instanceof Node ? e.target : null;
  if (!target) return;
  let holder: Holder | undefined;
  for (const h of holders) {
    if (h.view.dom.contains(target)) {
      holder = h;
      break;
    }
  }
  if (!holder) return;

  for (const b of holder.binds) {
    if (b.match(e)) {
      if (e.defaultPrevented) {
        // Obsidian 已先行命中并执行了同键命令（作用在 workspace.activeEditor
        // = 主编辑器）——此处如实报告，供后续决定是否加 activeEditor 挡刀层
        console.debug('[rememo-kb] 按键已被 Obsidian 抢先处理（可能作用于主编辑器）', {
          key: e.key,
          ctrlKey: e.ctrlKey,
          metaKey: e.metaKey,
        });
      }
      b.run(holder.view);
      e.preventDefault();
      e.stopPropagation(); // 事件不再下传到 contentDOM
      e.stopImmediatePropagation(); // 同层更晚注册的监听（其它插件）也拦掉
      return;
    }
  }
}

/**
 * 为单个 cm6 实例挂载/卸载 window capture 兜底（内部单监听器，多实例共享）。
 * Obsidian 拦截的是「命中其命令的 Mod 组合键」——普通键与纯 Enter 不会被吞，
 * 兜底只覆盖 binds 里列出的键，其余按键一律放行。
 */
export function attachKeyCapture(view: EditorView, binds: CaptureBinding[]): () => void {
  holders.add({ view, binds });
  if (!installed) {
    window.addEventListener('keydown', onWindowKeydown, true);
    installed = true;
  }
  return () => {
    for (const h of holders) {
      if (h.view === view) {
        holders.delete(h);
        break;
      }
    }
    if (!holders.size && installed) {
      window.removeEventListener('keydown', onWindowKeydown, true);
      installed = false;
    }
  };
}
