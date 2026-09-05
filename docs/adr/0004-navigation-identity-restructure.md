# 侧栏重组「统计-导航-内容入口」三段 + 用户名概念连根拔（上游身份区/⋯小菜单退役）

2026-09-06 Roadmap grill 定案（001 号访谈：owner + Claude）。动因：页面级入口（主页/回收站/设置）此前全藏在 UserBanner 的 ⋯ 弹层里，无全局可发现性；而左栏顶部的用户名与头像行是上游 Memos（多人微博式产品）残留——Rememo 是单机个人笔记插件，身份区无存在价值。

**Status**: accepted（2026-09-06 owner 审阅通过；同日实施——侧栏重组/统计行留守/导航竖排四项/随机访问浮窗/设置数据工具区/Import 与用户名连根拔，待 Obsidian 目视）

## 决策要点

1. **用户名概念连根拔**：UserBanner 用户名行与 ⋯ 小菜单整体退役（component+less 清理）；设置项 `UserName` 删除（data.json 残留键无害）；分享图脚注模板占位 `{UserName}` 解析为空串（旧值兼容）。已核实正文/卡片渲染无引用。
2. **统计行留守栏顶**：MEMO/TAG/DAY 计数行保留原位（左栏第一块），DAY 点击弹日记档案（DailyMemoDiaryDialog）不动——它是「日期=阅读」的现行实现，重想归 Roadmap ⑦，不在此批顺手改。
3. **侧栏三段结构**：统计行 → 页面导航 → 内容入口（热力图·查询列表·标签不动）；导航物理位置 = 热力图下、查询列表上（与 2026-09-04 登记意图一致），**竖排菜单项形态**（图标+文字，与查询/标签列表同构同宽）——主列顶页签条被否：240px 窄栏放不下三枚文字页签，且页面切换与内容筛选分层更清晰。
4. **导航项（4 项）**：主页（清筛选回 `/`，沿用现用户名点击语义）/ 回收站（`/recycle`）/ 设置（`app.setting.openTabById('rememo')`——顺带修现存失效：现代码跳旧插件 id `'obsidian-memos'`，改名后已断）/ 🎲 随机访问（动作项：点击抽一卡开浮窗，不参与页面高亮）。
5. **sticky 常驻**：导航于侧栏内 `position:sticky; top:0`——滚到标签深处仍可随时切页；左栏自滚（overflow-y:auto）不受影响。
6. **审计入口下沉**：`MemosSettingTab`（setting.ts:76）底部加「数据工具」区（审计/体检入口），不占导航；`/audit` 路由与页面不动。About 移除（内容并入仓库 README）。**Import（HTML 导入）移除**：UI 入口 + `resourceService.parseHtml`/`memoService.importMemos` 链路整条退役——考古定案（2026-09-06）：它是 2022-01-05 随 1.0.0（上游 Quorafind obsidian-memos，README 自述 highly based on memos 开源项目）带入的「memos 网页端 → Obsidian」迁移通道（解析器期待 `div.memo > div.content > p`+`div.time` 的页面结构，即浏览器另存 memos 网页可满足）；owner 确认 usememos 生态通道无使用场景，删除；从上游迁移走体检整文件迁移（P1.5），README 注明。
7. **随机访问**：入口=导航第 4 动作项 → 从**全部非软删 memo**（含各日期、排除回收站；尊重 HideRefMemosInList）随机抽一 → 只读浮窗：卡片内容渲染 + 日期上下文行（如 `2026-03-02 周一 · 09:14`）+ 「🎲 再抽一张」+「打开当天日记」。浮窗体系复用现 preview 浮窗，不引新 UI 基建。

## Considered Options（被否）

- 主列顶部横贯页签条（最早推荐）：宽内容区真页签、可扩展，但页面入口离内容筛选（左栏）分居两处，主人两轮权衡后选侧栏内落位
- 左栏横排图标页签（240px 内 3×~70px）：观感是妥协产物，文字标签放不下
- 用户名「仅去界面显示、设置项保留」：主人否——概念无价值即连根拔（分享图模板随之拔）
- 统计行随 UserBanner 整块删除：否——DAY 档案入口有真实考古用途
- 审计留在导航 / 只做命令入口：导航项位贵、owner 使用频率不足以占位；命令不可发现（主人原路也找不到）
- Import 保留（改命令 / 维持调研）：owner 定案移除——2022 带入的 usememos 迁移通道无导出端文档、导入无重复保护（重导必产生副本）、owner 场景（上游 memos 直写日记）用不到

## Consequences

- `MenuBtnsPopup` 及其 less 清理；`UserBanner` 收缩为纯统计行（或并入 Sidebar）
- 设置面板少一项（UserName 文本框）；分享图脚注默认模板去掉 `{UserName}` 占位
- 分享图生成代码若引用 settings.UserName 需改（编译期强制发现，类型删除后必查全）
- `resourceService.ts` 大幅收缩（parseHtml/upload 残余移除；服务器 upload 功能早已是死码——`import api` 注释 2022 年遗留）；README 迁移说明指向体检路径
- 移动端：侧栏抽屉内导航自然可见（复用现侧栏），无需另做入口
- 高亮规则 = pathname 精确匹配（`/`、`/recycle`）；`/audit`、`/homeboard` 无高亮项（审计非导航页）
