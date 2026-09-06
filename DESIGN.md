---
name: Rememo
description: Obsidian 备忘录插件——闪念写进日记;界面安静融入宿主,细节自有脾气
colors:
  # 全部颜色都是 Obsidian 主题变量的语义别名(--memo-* 作用域 memos_view/.dialog-wrapper)。
  # 值随用户主题/accent 自动变,浅深一份书写;frontmatter 保持 var() 引用即规范源,不发明 hex。
  accent: "var(--interactive-accent)"
  accent-hover: "var(--interactive-accent-hover, var(--interactive-accent))"
  on-accent: "var(--text-on-accent, #ffffff)"
  danger: "var(--text-error, #d05d5d)"
  link: "var(--text-accent, var(--interactive-accent))"
  bg: "var(--background-primary)"
  canvas: "var(--background-secondary)"
  surface-hover: "var(--background-modifier-hover)"
  border: "var(--background-modifier-border)"
  border-strong: "var(--background-modifier-border-hover, var(--background-modifier-border))"
  text: "var(--text-normal)"
  text-muted: "var(--text-muted)"
  text-faint: "var(--text-faint)"
  overlay: "var(--background-modifier-cover, rgba(0, 0, 0, 0.5))"
  heat-1: "var(--memo-heat-1)"
  heat-2: "var(--memo-heat-2)"
  heat-3: "var(--memo-heat-3)"
  heat-4: "var(--memo-heat-4)"
typography:
  # 字体一律借宿主:正文 var(--font-text)、界面 var(--font-interface)、等宽 var(--font-monospace)。
  # 插件不内嵌任何字体(font-face 的 src 全部为空)。CJK 兜底栈挂在界面字体上。
  title:
    fontFamily: "var(--font-interface)"
    fontWeight: 700
    fontSize: "17px"
    lineHeight: "40px"
  body:
    fontFamily: "var(--font-text, var(--font-interface))"
  label:
    fontFamily: "var(--font-interface)"
    fontSize: "12px"
    lineHeight: "20px"
  meta:
    fontFamily: "var(--font-interface)"
    fontSize: "13px"
  mono:
    fontFamily: "var(--font-monospace, 'ubuntu-mono', monospace)"
rounded:
  # 借宿主半径,兜底 6/10/16
  sm: "var(--radius-s, 6px)"
  md: "var(--radius-m, 10px)"
  lg: "var(--radius-l, 16px)"
spacing:
  xs: "4px"
  s: "8px"
  m: "12px"
  l: "16px"
  list-gap: "10px"
components:
  memo-card:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  memo-card-hover:
    backgroundColor: "{colors.bg}"
    rounded: "{rounded.md}"
  editor-card:
    backgroundColor: "{colors.bg}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
  button-accent:
    textColor: "{colors.accent}"
    backgroundColor: "color-mix(in srgb, {colors.accent} 12%, {colors.surface-hover})"
    rounded: "{rounded.sm}"
  nav-item:
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    height: "38px"
  nav-item-active:
    textColor: "{colors.accent}"
    rounded: "{rounded.md}"
  dialog-container:
    backgroundColor: "{colors.bg}"
    rounded: "{rounded.md}"
    padding: "16px"
---

# Design System: Rememo

## Overview

**Creative North Star: "安静的日记角落"**

Rememo 是 Obsidian 日记工作流里随时伸出来的一只口袋:底色、字体、强调色全部从用户当前主题借用,界面安静到几乎隐形——但当你的视线或光标落到它身上,它立刻表现出一个**有脾气的插件公民**该有的样子:焦点进入编辑器时 accent 描边亮起、一次扩散的脉冲;三点菜单从右上角 Q 弹而出;删除一条闪念,卡片会碎成纸屑落下。安静是它的底色,脾气是它的细节。

它的设计立场是"宿主皮肤的定制剪裁":调色板交给 Obsidian、骨架与手感留给自己。颜色永远走 `--memo-*` 语义别名(浅深主题一份书写),但圆角、纸影、动效曲线、focus ring、图标语汇是插件自己定死的——这些"针脚"构成它的品牌。密度上它是一台利落的工具:列表卡片单列流、10px 间距、时间戳 12px 淡字,信息层级靠字号、字重和强弱色而非色块。

动效是它的签名之一,但克制而快:所有过渡 ≤200ms,弹层 Q 弹 150ms,进入编辑一次 360ms 脉冲;文字多的卡片动效只位移+淡入,绝不 scale。删除有碎纸、发送有蓄力、任务完成勾选低调度归位——每个"脾气"都有它的语义,不为炫技。`prefers-reduced-motion` 的全局兜底是硬约束,不许破坏。

**Key Characteristics:**
- 颜色零自有:100% 宿主主题变量,浅深一份书写
- 纸感卡片:1px 细边 + 4% 极浅纸影,常态克制、hover 微浮
- 按钮 = 文字 + 淡底:accent 文字 + 12% 淡底 + 45% 描边,绝不 accent 实底白字
- 图标统一 Material 实心(16–20px),muted 基座、currentColor 可染
- 动效快收:≤200ms,只此一套 easing;reduced-motion 已兜底
- 细节处见脾气:focus ring、Q 弹、脉冲、碎纸、斜切任务角标

## Colors

调色板完全借用宿主 Obsidian 主题,插件只定义"角色",不持有色值——换主题、换 accent、切浅深,界面自动跟随。唯一例外是热力图的四级绿阶(宿主不提供,值在 theme.less 按浅深各给一套,组件仍只消费 var 一份)。

### Primary
- **Accent**(var(--interactive-accent)):唯一强调色。主操作文字、激活态文字与加粗、focus ring、焦点/编辑态描边、hover 时刻。按角色小面积使用——激活导航项是"accent 加粗无实底",不是色块。
- **Accent Hover**(var(--interactive-accent-hover, …)):交互加深档。

### Neutral
- **Bg**(var(--background-primary)):卡片/编辑器/弹窗/导航块的底。**本系统里"白卡片"就是它**。
- **Canvas**(var(--background-secondary)):列表画布与主页底,衬托卡片。
- **Surface Hover**(var(--background-modifier-hover)):一切 hover 底、悬停反馈。
- **Border**(var(--background-modifier-border)):1px 卡片边、细滚动条。
- **Border Strong**(var(--background-modifier-border-hover, …)):卡片 hover 时边框的加强档。
- **Text**(var(--text-normal)):正文与主标签。
- **Text Muted**(var(--text-muted)):图标基色、次级说明。
- **Text Faint**(var(--text-faint)):时间戳、状态行、已完成正文置灰、未解析链接。
- **On-Accent**(var(--text-on-accent, #ffffff)):仅在真实需要时用于 accent 底上的文字(刻意保留的灯箱例外)。

### Tertiary / 语义色
- **Danger**(var(--text-error, #d05d5d)):危险操作文字(删除项、确认删除加粗)。
- **Link**(var(--text-accent, …)):链接与可跳转文本。
- **Overlay**(var(--background-modifier-cover, rgba(0,0,0,.5))):全屏弹窗遮罩。

### Named Rules
**The Host-Borrowing Rule.** 颜色只许经 `--memo-*` 语义别名或宿主变量出现,文件里不许出现写死的 `white`/`rgb(…)`/`#hex`——浅深双写已清零,谁写谁负责收回。

## Typography

**Display/Headline Font:** 无——本系统不设展示字体层级,标题只是加粗的界面字体。
**Body Font:** var(--font-text)(Obsidian 正文字体)
**Label Font:** var(--font-interface)(Obsidian 界面字体)
**Mono Font:** var(--font-monospace)

**Character:** 完全借声——字体跟随宿主主题,插件不内嵌、不引入任何字体文件(font-face 的 src 一律为空);CJK 兜底栈(PingFang SC → Noto Sans CJK SC → Microsoft YaHei UI)挂在界面字体声明上。观感 = "用户自己熟悉的 Obsidian 里,一套排版规矩的界面"。

### Hierarchy
- **Title**(700, 17px, 40px 行高):区块标题(主屏标题行/侧栏标题),粗而小,靠字重与文字色站住。
- **Nav**(400→激活 700, 14px):侧栏/页面导航项,激活 = accent + bold,无实底。
- **Body**(400, 主题默认尺寸, var(--font-text)):memo 正文、长内容;跟随阅读字体,保证中文与 Markdown 渲染的观感与日记正文一致。
- **Label**(400, 12px, 20px 行高):时间戳、输入提示、编辑器 tip;faint 色。
- **Meta**(400, 13px):状态行(加载中/无更多)、按钮文字、菜单项。

### Named Rules
**The Borrowed Voice Rule.** 字体家族只许 `var(--font-*)`,任何时候不引入新字体;正文内容(卡片文本、编辑器)一律 `var(--font-text)`,界面 chrome 用 `var(--font-interface)`。

## Layout

单列卡片流是主骨架:侧栏(桌面 240px 常驻 / 移动 320px 抽屉)+ 主区卡片列表,列表 `gap: 10px`,卡片 `12px 16px` 内边距。画布不涂色、透明融入宿主次级背景,卡片靠 `1px 边 + 纸影` 与画布区隔,不用色块分隔。

- 头部条高 40px,标题 17px/700,右侧图标操作热区 ≥24px;移动端标题热区放宽至 60px。
- 细滚动条 6px、thumb 用 border 色,轨道透明——滚动条是 chrome,不是装饰。
- 状态行(无更多/加载)13px faint,列表底部留 32px 呼吸、完成态 48px。
- 弹窗:全屏 fixed 滚动容器、上下 64px 留白,`.dialog-container` 居中,`≤875px` 断点收窄贴边(padding 0 16px)。
- 移动端由 `.mobile-view` 修饰类驱动:编辑器卡宽 `calc(100% - 24px)` 居中、列表两侧 12px、菜单行高收敛。

### 节奏标度(2026-09-06 layout 收口)

- 区块间 8(主列各段/画布↔纸)、列表内 gap 10、纸内 12/16;侧栏分节距 12(统计行↔热力图)、行距 4、行高 38/40。px 直写即可,数值只许出自 4/8/10/12/16 标度。
- 主列左缘单轨:标题/编辑器卡/列表卡片同一左缘(memolist `padding-left: 0`,右 4px 让滚动条)。
- 列表尾:状态行只在有话术时渲染(fetch/空/末页);分页条只在 `totalPages > 1` 出现,单页不摆禁用钮。
- 状态语汇一条轨,**无 accent 实底白字**:页面导航激活 = accent 粗体无底;数据行选中(查询/标签)= accent 12% 淡底 + 粗体;页码与主操作 = btn-accent 公式(12%→22% 淡底 + 45% 描边)。

## Elevation & Depth

扁平 + 纸影体系,不用深阴影。常态元素(卡片)只有 4% 的一层纸影证明自己是"放在画布上的一张纸";交互瞬间微浮;浮层(菜单/弹窗)才允许更大的影子。深度叙事 = 纸的层叠:卡片贴纸、hover 抬纸、弹层浮纸、遮罩压画布。

### Shadow Vocabulary
- **Card**(`0 1px 2px rgba(0,0,0,.04)`):所有常态卡片/编辑器/导航块。克制,不抢内容。
- **Card Hover**(`0 3px 10px rgba(0,0,0,.07)`):卡片 hover 微浮,配 border 同步加深。
- **Float S**(`var(--shadow-s, 0 1px 3px rgba(0,0,0,.12))`):小浮层。
- **Float L**(`var(--shadow-l, 0 8px 24px rgba(0,0,0,.12))`):弹出菜单、弹窗容器。唯一带纵向距离的大影,界定"飘在界面上方的一层"。
- **Overlay**(var(--memo-overlay)):弹窗背板压暗画布,不是影子。

### Named Rules
**The Paper-Stack Rule.** 常态只许 Card 影;影子的层级只在"纸被抬起"时出现(hover、打开)。不要给常态元素加浮层大影,不要给 hover 加位移 transform(会隔离层叠上下文、让弹出菜单被穿透)。

## Shapes

圆角语言:**小控件 6px、卡片与容器 10px、大圆角只给该圆的东西**。四角同圆、无剪角,唯一例外是任务卡左上角的短斜带(12px 高、右端 45° 斜切收口,`clip-path` 多边形)——它是全系统仅有的"非矩形几何",只用于标示任务状态,不许泛化。边框 1px、常态 border 色、hover 换 strong 档;按钮与图标操作在 hover 时用淡底而非描边变化。图标本身是 Material 实心形,圆形按钮/头像/胶囊不出现。

## Components

### Memo Cards(签名组件)
纸感容器:12/16 内边距、10px 圆角、1px 细边、Card 纸影。头部行 26px 高:左侧时间戳 12px faint(hover 转 accent,点击进阅读),任务卡在其右侧带 26px 热区的勾选框(勾选态 muted 置灰、悬停回 accent);右上三点按钮 28px 热区、muted、hover 加深——弹出菜单(112px 起、shadow-l、半径 10px)从锚点右上 Q 弹 150ms。正文宽度 100%、图片行 128px 高、圆角 10px、横向可滚。任务卡:头部斜带(未完成 accent 32% 淡、完成 text 14% 灰)+ 完成态正文置灰(不划线)。删除整卡前有碎纸动画(8 条下落 240–430ms、460ms 收尾,overlay 挂 offsetParent,与 FLIP 并行)。

### Editor Card
与卡片同语汇的输入容器:12/14 内边距、10px 圆角、1px 边 + Card 影;`focus-within` 描边转 accent;进入编辑态常亮 accent 边 + 一次 360ms 光环脉冲。输入体是 Obsidian 原生 MarkdownEditor(粗体/高亮/标签/链接在框内 live preview),框内高亮一律内核渲染、插件不自绘。

### Buttons
- **Primary(btn-accent)**:accent 文字 + accent 12% 淡底 + accent 45% 描边;hover 淡底加深至 22%。**本系统没有 accent 实底白字按钮**——owner 主题 accent 偏浅,实底 + on-accent 白字会白成一片。新主操作按钮一律照此。
- **Icon/ghost 按钮**:透明底、currentColor 图标或 muted 文字、hover 淡底(surface-hover),28px 高的通用行按钮、图标热区 24–28px。
- **Danger 项**:菜单/列表里的删除 = danger 文字;二次确认态加粗。
- 全系统按钮 `background-image: none`(宿主主题会挂渐变,已统一清除)。

### Navigation(侧栏)
竖排卡片块(sticky 贴顶、bg 白卡底遮滚动):项高 38px、14px、padding 0 16px、图标 18px 左距 10px;hover = surface-hover 淡底;**激活 = accent 文字加粗 + 图标染 accent,无实底无边框**。随机访问是动作项、不参与激活高亮。移动端整栏变 320px 抽屉(阴影 Float S、0.4s 滑入)。

### Task Toggle / 任务勾选
卡片头行时间旁的方形勾选热区:26px、图标 18px Material 实心(currentColor);悬停 accent 文字 + 淡底、按下 scale 0.9 一瞬;完成态整体 muted。任务状态永远可改回(hover 仍回 accent)。

### Dialogs
全屏遮罩容器(overlay 背板、上下 64px 留白)内一张浮卡:bg + 10px 圆角 + Float L 影 + 16px 内边距;header(标题 + 24px 关闭钮,hover 淡底)/ content / footer(右对齐操作)三段直挂 `.dialog-container`(再包一层 div 会让通用规则脱靶——token 作用域同样只挂在 `.dialog-wrapper`)。断点 875px 收窄贴边。

### 热力色阶
GitHub 式四级绿阶,是系统里唯一"自有色值"(浅: `#9be9a8 / #40c463 / #30a14e / #216e39`,深:`#0e4429 / #006d32 / #26a641 / #39d353`),但组件只消费 `var(--memo-heat-1..4)` 一份,不许按主题再分支。

## Do's and Don'ts

### Do:
- **Do** 颜色一律走 `--memo-*` 别名或宿主 `var(--background-*/--text-*)`,浅深一份书写。
- **Do** 主操作按钮用 btn-accent 公式:accent 文字 + 12% 淡底 + 45% 描边,hover 22%。
- **Do** 图标用 Material 实心、16–20px,基座 muted、需要强调时 currentColor 染 accent。
- **Do** 可聚焦控件给 2px accent outline + 1px offset 的 `focus-visible` 态。
- **Do** 动效 ≤200ms(弹层 Q 弹 150ms),进入编辑只给一次 360ms 脉冲;列表增删用位移+淡入(FLIP),不 scale 文字。
- **Do** 列表结构用 div(裸 li 会被注入 `•`);新样式文件 `@import './theme.less'` 再消费 token。
- **Do** 弹窗/浮层若是 `showDialog` 的 body 级 portal,确认 token 作用域含 `.dialog-wrapper`;容器三段直挂 `.dialog-container`。

### Don't:
- **Don't** 写死任何颜色(`white`/`rgb`/`#hex`)或复制 `.theme-light`/`.theme-dark` 双份——token 化收口是既成事实。
- **Don't** 用 accent 实底 + on-accent 白字做主按钮;也别给按钮留宿主主题的渐变 background-image。
- **Don't** 引入描边系图标(lucide 等);图标语汇只有 Material 实心。
- **Don't** 给文字多的卡片/正文加 scale 动画(会抖);动效 = 位移 + opacity。
- **Don't** 在 `.memo-wrapper` 上做 hover transform 位移(层叠上下文会让弹出菜单被邻近卡片穿透);视图内浮层别用 `position: fixed`(祖先 `#page-wrapper` 有 transform)。
- **Don't** 给常态元素浮层大影;也别绕过 `prefers-reduced-motion` 的全局兜底。
