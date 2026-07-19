# FG AI Sharing Session｜16页逐页设计报告

更新时间：2026-07-19。视觉母体为Prisma式创意网页；黑、深灰、奶油色为主，FullGoal Blue / Yellow只作辅助。

## 01｜Hero

- 目标：用电影感建立“AI不只是聊天”。
- 设计：Inset全屏视频、Noise、黑色胶囊导航、超大奶油标题、右下角色链与CTA。
- 调整点：视频遮罩在 `.hero-media .video-shade`；标题尺度在 `.visual-hero .slide-copy h1`。

## 02｜Agenda

- 目标：10秒记住三章结构。
- 设计：三条大型编辑式入口、大编号、Hover位移与旋转箭头；不使用白色卡片。
- 跳转：第03、07、09页。

## 03｜AI Shift

- 目标：说明生成→理解→行动→持续执行。
- 设计：Prisma Features四列；首列Secondary视频，后三列本地图标；默认灰度，单项激活恢复色彩。

## 04｜Agent Formula

- 目标：区分Model、Chat、Agent并解释Agent工作系统。
- 设计：左侧三层能力轴，右侧Model + Context + Tools与Observe—Plan—Act—Verify—Adjust循环。

## 05｜Knowledge Universe

- 目标：把八个概念放入Agent中心知识宇宙。
- 设计：主星、次级星、神经连接与解释卡；Hover探索、点击锁定、Esc复位。

## 06｜AI Evolution

- 目标：在一页中读懂2022—2026的六次能力迁移。
- 结构：横线、六个圆点与六组内容统一放入同一个六列Grid坐标系；横线和圆点共享`--timeline-axis-y`，节点内容只在轴线上下分区，不再参与圆点定位。
- 设计：01—03内容位于轴线上方，04—06位于下方；年份、中文标题、英文关键词和编号均归属各自节点。右侧Agent Era保持独立终点模块，由2026节点通过专属连接段进入，不挤占六节点坐标。
- 交互：Hover/Focus显示产品与解释；点击锁定；来源按节点过滤。开发环境可使用`?debugTimeline`查看每个圆点的实际坐标与轴线误差。
- 跨尺寸验收：1920×1080、1600×900、1440×900、1366×768、1280×720的横轴误差均为0px；390×844竖轴调试误差为0.8px，无横向溢出，节点顺序严格递增。没有使用scale/zoom压缩页面。

## 07｜Human–Chat–Agent Workflow

- 目标：把旧角色分工、六步SOP和Stage-Gate压缩成一条持续反馈链。
- 设计：六个错峰节点沿S形脊柱展开；第03与05步突出Human Gate；下方保留返工回路和“研究汇报→PPT Skill”案例轨道。
- 交互：Hover/Focus预览，点击锁定，方向键切换，Esc清除；详情显示动作、阶段输出与风险。

## 08｜Method Foundations

- 目标：说明Human—Chat—Agent方法是对成熟软件工程、系统工程与架构设计思想的业务化转译，而不是AI平台给出的Agent使用规则。
- 来源：以NASA Systems Engineering Handbook、Agile Manifesto原则、Microsoft Azure Architecture Center与Google Engineering Practices为一手依据，分别支撑复杂度分解、关注点分离、反馈迭代和交付前验证。
- 设计：奶油色中心圆“ENGINEER THE PROCESS”连接四个非对称深灰节点，箭头按左上→右上→右下→左下→左上的方向形成反馈闭环；FullGoal蓝黄只用于选中态、流程提示和来源强调。
- 交互：Hover/Focus即时预览，点击锁定，Tab与方向键移动，Enter/Space确认，Esc退出；详情采用“工程原义 / 协作转译”双栏，并补充类比、流程步骤与工程来源。
- 口径：Source Drawer明确标注各机构分别支持的工程原则、核验日期和官方链接，同时声明本页不是NASA、Microsoft、Agile Manifesto与Google联合发布或共同背书的框架。
- 响应式：桌面保持四角闭环与中心圆，移动端改为中心圆、四原则纵向阅读和底部详情面板；各验收尺寸无横向溢出。

## 09｜Start with Materials

- 目标：从ICI公开材料、分析问题和“只生成大纲”的阶段边界启动任务。
- 设计：AI Workspace左侧承载任务输入，右侧Artifact Canvas用文件轮廓、扫描线和页码粒子表现第四章读取；支持加载预设、发送分析和Reset Demo。

## 10｜Outline Before Slides

- 目标：把正确但平铺的报告目录改造成研究问题链，并设置显式大纲批准门。
- 设计：左侧延续材料上下文，右侧Outline Board演示三处标题Diff、关系线重组与10页确认版；未批准不进入视觉探索。

## 11｜Three Visual Routes

- 目标：在固定品牌骨架中比较A经典研究型、B机制解释型和C综合重点型。
- 设计：真实A/B/C代表页构成有纵深的Visual Route Stage；Hover回正上浮，点击锁定，现场默认选择B。

## 12｜Generate the Selected Route

- 目标：区分Image-native视觉生成、精确内容回填和文件输出。
- 设计：B方案放大为主Artifact并保留后续页面轮廓；PNG标记可预览，SVG明确为流程演示，PPTX明确需要构建。

## 13｜Behind the Conversation

- 目标：展示真实Skill背后的有状态生产流水线，而不是虚构的长Prompt。
- 设计：前台工作台向两侧打开，露出研究决策层与视觉交付层；Outline、Visual Route与Evidence三道门禁通过Source & Data Integrity Line贯通。

## 14｜Real Material Validation

- 目标：使用ICI第四章说明当前真实进度，并把未完成状态作为可信度的一部分。
- 设计：Evidence Wall连接146页材料、第四章、26项数字、13页叙事和A/B/C代表视觉；真实B方案与`ici-outline`、`qa-result`占位并列。

## 15｜Engineering Controls

- 目标：解释为什么稳定复用需要Skill承载隐私、模板、精确内容、批准和QA控制。
- 设计：Control Room以Skill Core为中心，五道不同半径的Safety Rails展示`RISK → CONTROL`；Hover显示具体风险与控制动作。

## 16｜Closing

- 目标：收束Human、Chat、Agent、Skill四种角色。
- 设计：极简深色结束页与四角色胶囊；动态页码显示16/16。

## 响应式调整规则

- Wide：宽度≥1600且高度≥900，保留完整留白和最大字号。
- Standard：1366–1599或高度768–899，压缩留白但不缩放页面。
- Compact：高度<820，使用真实字体与组件重排；禁止`scale()`或`zoom`压缩全页。
- Mobile：≤900px转为单列流式布局，浮层固定在安全区内。
