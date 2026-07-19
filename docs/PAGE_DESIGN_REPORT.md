# FG AI Sharing Session｜18页逐页设计报告

更新时间：2026-07-19  
用途：帮助内容负责人、设计人员和开发人员逐页判断“为什么这样设计、改哪里、改动会影响什么”。

## 一、调整时先记住三个文件

1. **改文字、页序、备注、来源**：`src/content/session.ts`
2. **改每页图形结构或交互**：`src/components/diagrams/` 与 `src/components/presentation/SlideRenderer.tsx`
3. **改颜色、尺寸、留白、圆角和响应式**：`src/prisma.css`

全局标题使用 `WordsPullUp`，Agenda 使用 `WordsPullUpMultiStyle`，副标题使用 `ScrollRevealText`。这些动效在 `src/components/ui/Motion.tsx` 中统一调整。

## 二、全局视觉规则

- 外层为纯黑背景，页面主体采用 6–12px Inset 留白和 24–34px 大圆角容器。
- 主色为黑、深灰、奶油色；FullGoal Blue 和 Yellow 只负责结构及重点提示。
- 顶部导航为黑色胶囊；每页保留 Eyebrow、FULLGOAL、来源和页码。
- 普通页标题保持左上锚点一致，正文区允许非对称构图。
- 奶油色表示“重要、选中、可行动”；黄色表示“当前、批准、关键节点”。
- 所有页面均兼容 1920×1080、1440×900、1366×768 和 390×844。

---

## 01｜Hero｜AI不只是聊天

**页面目标**  
用第一眼建立“AI已经从聊天进入工作过程”的情绪，不承担复杂解释。

**当前设计**

- 全屏本地视频作为背景，外层保持黑色 Inset 与大圆角。
- 视频上覆盖暗部渐变和 Noise，确保奶油色标题可读。
- 左下是超大主标题、主题副标题与一句介绍；右下是 Human → Chat → Agent → Skill 四角色和奶油色 CTA。
- 视觉重心位于左下与右下，视频人物位于中央，构成三角关系。

**动画与交互**

- 标题逐词向上进入；副标题和说明逐词渐亮。
- “开始分享”跳转到 Agenda。
- 视频自动播放、静音、循环；失败时显示深色 Fallback。

**建议调整**

- 想更震撼：增大 `.visual-hero .slide-copy h1`，但不要超过两行。
- 想更清楚：加强 `.hero-media .video-shade` 左下暗度。
- 更换视频时，应让主要人物避开左下标题与右下 CTA。

**修改位置**

- 组件：`HumanAgentNetwork`、`PrismaVideo`
- 样式：`.visual-hero`、`.hero-media`、`.hero-network`、`.hero-cta`
- 素材：`public/assets/prisma-reference/hero-prisma.mp4`

## 02｜Agenda｜今天主要分享三件事

**页面目标**  
让观众在 10 秒内记住三章结构，并允许现场直接跳转。

**当前设计**

- 黑色编辑式页面，上部使用多样式超大标题。
- 下部是三条横向章节入口，不使用普通白色卡片。
- 大号衬线斜体编号、粗体章节名、说明和奶油色圆形箭头形成层级。
- 中间保留较大留白，避免像目录表格。

**动画与交互**

- 标题采用 MultiStyle 逐词上拉。
- Hover 时整行向右位移，箭头旋转。
- 三条入口分别跳转到第 3、8、12 页。

**建议调整**

- 如果现场屏幕较矮，可减少标题与章节入口之间留白。
- 章节名最好维持 4–6 个汉字，避免入口换行。
- Yellow 只应出现在标题少量词组，不建议整句变黄。

**修改位置**

- 组件：`AgendaVisual`
- 样式：`.visual-agenda`、`.agenda-list`

## 03｜AI Shift｜AI开始能够完成工作

**页面目标**  
用视觉化方式说明 AI 能力从“生成”扩展到“理解、行动、持续执行”。

**当前设计**

- Prisma Features 式四列纵向大卡片。
- 四张卡片初始全部灰度、低饱和、略压暗，没有默认高亮项。
- 第一列使用本地 `secondary-prisma.mp4`；后三列依次使用 `icon-orbit.webp`、`icon-signal.webp`、`icon-frame.webp`。
- 每列下部统一显示编号、图标、关键词和一句解释。
- 生成素材强调“从无到有”的花卉与生命感；理解使用静坐宇航员；行动使用站立姿态；持续执行使用漂浮于任务空间的像素宇航员。

**动画与交互**

- 四列按顺序执行 Scale、Fade 和向上进入动画。
- Hover、Tab 聚焦或点击时，同一时间只激活一张卡片：恢复色彩、提升亮度、卡片微放大、媒体执行轻微 Ken Burns 动态。
- 视频默认暂停并停在起始画面；激活“生成”时静音循环播放，离开或切换后暂停并回到起始帧。
- 点击可锁定当前卡片；移动端使用横向滑动和点击切换，不会同时播放多个视频。
- `prefers-reduced-motion` 下视频不启动，复杂变换和星点动画关闭。

**建议调整**

- 当前四张素材已形成统一的宇航员/探索视觉体系，若未来改为业务场景，应四张一起替换，不建议混入单张办公图库图。
- “持续执行”仍是相对抽象的像素宇航员，如果未来有统一授权的系统循环视觉，可优先替换这一张。
- 调整媒体时继续保持四张初始明暗一致，避免默认状态出现隐性主卡。

**修改位置**

- 组件：`ShiftRail`
- 样式：`.shift-rail`、`.shift-step`、`.shift-media`
- 素材：`secondary-prisma.mp4` 与三个 WebP 文件
- 验收截图：`docs/screenshots/page-03-04-05-refactor/01—06`

## 04｜Agent Formula｜模型、Chat与Agent

**页面目标**  
纠正“Agent就是更大的模型”的误解，并给出易记公式。

**当前设计**

- 区域 A 是“能力内核 → 人机入口 → 任务系统”的能力主轴，三层错位递进并由一条竖向能力脊柱连接。
- Model 使用深灰，Chat 加入 FullGoal Blue，Agent 使用克制的奶油色重点。
- 区域 B 使用大号 `Agent =`、蓝色连接轨道及 Model / Context / Tools 三个组成模块。
- 三个模块分别对应“大脑｜理解与决策”“眼睛｜材料、记忆与状态”“手脚｜搜索、代码与执行”。
- 区域 C 是 Observe / Plan / Act / Verify / Adjust 五节点运行循环，解释 Agent 为什么不是一次性回答。
- 页面底部结论由现有 Key Message 机制承载，没有新增长段落。

**动画与交互**

- 左侧结构、右侧公式、连接轨道和运行循环按顺序进入，总节奏控制在约 2 秒内。
- Hover / 聚焦 / 点击 Model 时，右侧 Model 高亮，Context 与 Tools 降低透明度。
- Hover / 聚焦 / 点击 Chat 时，右侧 Context 高亮，说明 Chat 是把材料与历史带入模型的人机入口。
- Hover / 聚焦 / 点击 Agent 时，三个组成模块和运行循环同步增强。
- 默认状态所有信息均可见，Agent 只保留轻微层级重点。
- 页脚来源可打开 AI Agent 基础框架抽屉。

**建议调整**

- 当前信息密度已接近本页上限，不建议再增加公式第四项或更长定义。
- 如果分享对象完全非技术，可将 `Context` 中文副标签进一步放大；不要删除英文名称。
- 未来若调整内容，优先改三层的一句话解释，不改变能力主轴与公式的对应关系。

**修改位置**

- 组件：`AgentFormula`
- 样式：`.formula-layout`、`.stack-diagram`、`.stack-agent`、`.formula-card`
- 内容与讲者备注：`src/content/session.ts` 第 04 页配置
- 验收截图：`docs/screenshots/page-03-04-05-refactor/07—11`

## 05｜Concept Map｜八个AI概念

**页面目标**  
把八个抽象词汇组织成一个可探索、可锁定、可逐层理解的 Agent 知识宇宙。

**当前设计**

- 星图已从矩形内容面板扩展为整页底层空间，标题、导航和信息层浮在星场上方；常驻右侧详情栏已取消。
- Agent 是中央能量核心，包含柔和光晕、双轨道和低速呼吸效果，不与八个概念并列。
- Model、Context、Prompt、Tool、API、MCP、Skill、Harness 作为八颗冰蓝主星围绕中心分布。
- 八个星簇共配置 65 个次级知识节点；API Key已加入API星簇，默认仅展示高权重标签，激活星簇后才显示该簇完整节点。
- CSS 轨道、神经连线、三层星尘和轻星云形成“星空海＋神经网络”的空间层次。
- 详情改成靠近节点的浮动卡片：左侧节点向右展开，右侧节点向左展开；移动端改为底部抽屉。

**知识来源**

- 八个主概念与定义沿用当前项目 `AI Agent基础框架` 和原有 `session.ts` 内容。
- 已读取用户提供的《AI大模型知识点全景图-73页.pdf》。该PDF是扫描图片型文件，因此采用逐页图像渲染、缩略图总览与主题标题人工校准方式提取知识点。
- 65 个次级概念覆盖 Token、Embedding、Transformer、Context Window、RAG、Prompt、Function Calling、API Key、MCP、Agent Harness、评测与安全等主题。
- 每个节点均在 `src/content/ai-knowledge-universe.ts` 中记录中英文名、定义、类比、作用、关联概念、重要度、LOD、位置、深度、星簇和来源页码。

**动画与交互**

- 页面包含 `overview`、`exploring`、`locked` 三种状态。进入探索后标题降至11%透明度并轻微上移、缩小和模糊；点击节点后保持锁定。
- Hover 主星或重要次级星时，节点放大、连线增强、相关星簇完整点亮、无关星群降噪，浮动详情同步更新。
- 点击中心 Agent、星图空白或按 Esc 均可复位；Agent 复位同时清除锁定、浮动卡片、标题弱化和视差变量。
- 鼠标移动通过 `requestAnimationFrame` 更新 CSS 变量，驱动远/中/近三层分别约3px、7px、11px视差，不触发React逐帧重渲染。
- 主星和重要次级星均为键盘可访问按钮，支持 Tab、Enter、Space、Esc，并提供 `aria-label`、`aria-expanded`、`aria-selected`。
- 移动端保留八颗主星，默认隐藏次级标签，激活后仅显示高权重节点，详情从底部展开。
- `prefers-reduced-motion` 下停止轨道旋转、星点闪烁、神经脉冲和能量呼吸。

**建议调整**

- 当前默认保持全局视图，适合先讲八颗主星；现场建议按 Model → Context → Tool → Skill 顺序演示。
- 65个节点已经接近本页信息密度上限；新增术语时建议替换同星簇低重要度节点，不继续增加总量。
- 如需进一步增强，可在不改变结构的前提下补充星簇色彩编码，但不建议加入写实星空图或额外面板。

**修改位置**

- 组件：`src/components/diagrams/KnowledgeUniverse.tsx`
- 数据：`src/content/ai-knowledge-universe.ts`
- 样式：`src/prisma.css` 中 `Knowledge Universe final refactor` 区段
- 内容与讲者备注：`src/content/session.ts` 第 05 页配置
- 验收截图：`docs/screenshots/page-05-universe-final/01—17`

## 06｜AI Evolution Timeline｜从ChatGPT到Agent时代

**页面目标**  
把旧第06页的API知识与旧第07页的Agent趋势合并进一条能力演进叙事：API与API Key留在第05页知识宇宙，第06页解释AI如何从对话入口走向可监督的工作系统。

**当前设计**

- 横向蓝色光轨串联2022—2026六个能力阶段，奇偶节点上下错位，形成电影式节奏。
- 右侧不是产品Logo墙，而是Agent Era终点核心与五个趋势卫星：长任务、工具与电脑操作、并行Agent、可复用Skills、Human Steering。
- 终点使用奶油色与黄色，Human Steering保持唯一黄色趋势胶囊；FullGoal Blue只负责时间线和结构提示。
- 数据与官方来源独立维护在 `src/content/ai-evolution-timeline.ts`，来源包含标题、发布者、日期、支持事实、阶段、核验日和URL。

**动画与交互**

- 时间线约2秒完成光轨绘制、六阶段错峰淡入与终点簇收束；`prefers-reduced-motion` 下静态呈现。
- Hover、Tab聚焦显示浮动解释；点击锁定；点击空白或按Esc清除。
- 五个趋势卫星同样支持Hover、Focus、Click，移动端改为纵向时间轴与底部解释抽屉。
- 解释卡中的“查看该节点官方来源”会打开按当前阶段过滤后的Source Drawer。

**建议调整**

- 演讲时建议依次激活2022、Reasoning、2025 Action、2026 Agent Era，再点Human Steering收束。
- 如后续更新产品，只在相应能力阶段补充事件与来源，不把时间线改成Logo墙。
- 第05页API Key只保留掩码示例 `sk-************ABCD`；禁止加入真实Key或环境变量截图。

**修改位置**

- 组件：`src/components/diagrams/AiEvolutionTimeline.tsx`
- 数据：`src/content/ai-evolution-timeline.ts`
- 样式：`src/prisma.css` 中 `Slide 06 · AI Evolution` 区段
- 内容与讲者备注：`src/content/session.ts` 第 06 页配置

## 07｜Chat vs Agent｜角色分工

**页面目标**  
明确 Chat 与 Agent 并非能力高低关系，而是规划者与执行者的刻意分工。

**当前设计**

- 左右两块深灰角色面板，中间是“规划 → 人判断 → 执行”的桥。
- Chat 使用蓝色倾向，Agent 使用黄色倾向。
- 每侧七项工作以紧凑矩阵展示。

**动画与交互**

- 深色面板淡入；本页不提供点击，方便讲者直接对比。

**建议调整**

- 如果观众只需记住分工，可把七项缩减到四项。
- 中间“人判断”是关键，不能被缩得太小。
- 可用现场案例替换其中一两个抽象任务词。

**修改位置**

- 组件：`ChatAgentComparison`
- 样式：`.comparison-grid`、`.role-panel`、`.role-list`、`.role-bridge`

## 08｜Collaboration SOP｜六步协作法

**页面目标**  
让六步方法可被逐项讲解，而不是一次展示全部细节。

**当前设计**

- 上方六个深灰步骤按钮构成横向控制条。
- 选中步骤使用奶油色。
- 下方四列只保留顶部细线与文字，分别回答人、AI、输出和失败。
- 页面采用较大留白，避免变成流程管理 Dashboard。

**动画与交互**

- 点击任意步骤切换详情。
- `Alt + ← / →` 可以切换步骤。

**建议调整**

- 最适合现场边讲边点击，不建议一次把六步详情全部展开。
- 四列文字尽量控制在 12–16 个汉字。
- 可把默认步骤改为最想重点讲的“和Chat规划”。

**修改位置**

- 组件：`WorkflowStepper`
- 样式：`.workflow-layout`、`.workflow-track`、`.workflow-detail`

## 09｜Stage-Gate｜执行—检查—继续

**页面目标**  
把阶段门呈现为“必须判断后才能继续”的机制，而非普通时间线。

**当前设计**

- 五组执行节点、Gate 菱形和验收问题横向排列。
- 下方四条原则分别表达停止、重新批准和证据优先。
- Yellow 用于关键 Gate，红绿只在风险或完成语义中出现。

**动画与交互**

- 节点按顺序进入；无点击，保证流程方向稳定。

**建议调整**

- 如果信息显拥挤，可只保留三道核心 Gate。
- 验收问题应使用疑问句，不要改成动作描述。
- 证据原则建议始终保留在最右或最下方。

**修改位置**

- 组件：`StageGateTimeline`
- 样式：`.gate-layout`、`.gate-line`、`.gate-diamond`、`.gate-principles`

## 10｜Thinking Framework｜八种方法论

**页面目标**  
把前面零散做法归纳为一个“可控人机协作”系统。

**当前设计**

- 奶油色中心圆表示核心目标。
- 八个深灰框架节点分布在外围，形成方法网络。
- 页面由中心向外阅读，而不是按普通列表阅读。

**动画与交互**

- 标题逐词进入，节点保持稳定。
- 移动端自动转换为纵向网格。

**建议调整**

- 八项已经接近信息上限，不建议继续增加。
- 可按听众删减到四项核心方法，但保持中心圆不变。
- 英文较长的节点应避免继续加副标题。

**修改位置**

- 组件：`ThinkingFramework`
- 样式：`.framework-map`、`.framework-center`、`.framework-item`

## 11｜Skill Problem｜问题远不止排版

**页面目标**  
从业务问题自然进入 FullGoal PPT Master 案例，不直接炫耀技术方案。

**当前设计**

- 五个问题组成问题区，下面或右侧用八步流程回应。
- 页面保持深色，FullGoal 仅作为案例身份出现。
- 视觉逻辑是“问题很多 → 需要一条完整生产线”。

**动画与交互**

- 问题与流程按顺序进入。

**建议调整**

- 五个问题最好保持真实、具体，不要变成产品宣传口号。
- 如果增加新问题，应同步判断是否需要修改流程。
- 可把最重要的问题放大，而不是让所有问题等权。

**修改位置**

- 组件：`ProblemToWorkflow`
- 样式：`.problem-flow`、`.problem-list`、`.solution-flow`

## 12｜Project Evolution｜五次认知升级

**页面目标**  
说明最终方案不是一次设计出来的，而是经过五轮问题暴露和修正。

**当前设计**

- 左侧纵向时间线呈现五个阶段及“发现”。
- 右侧大圆角深灰面板总结最终混合方案。
- 奶油色圆形编号与 Yellow 小标题构成阅读锚点。

**动画与交互**

- 时间线从上到下进入；总结面板稍后出现。

**建议调整**

- 如果要增加第六阶段，应先考虑合并前两阶段，避免时间线过长。
- “发现”比“做了什么”更重要，应保留问题导向写法。
- 可把当前阶段高亮为黄色，适合项目仍在继续时使用。

**修改位置**

- 组件：`ProjectEvolutionTimeline`
- 样式：`.evolution-layout`、`.evolution-line`、`.evolution-stage`、`.evolution-result`

## 13｜Template Modes｜固定骨架与A/B/C

**页面目标**  
解释“让AI发挥”与“遵守公司模板”可以同时成立。

**当前设计**

- 左侧奶油色模板骨架是全套页面中刻意保留的唯一大面积浅色内容。
- 骨架内部正文区为深灰，表示只有这里可以变化。
- 右侧 A/B/C 控制器展示三种正文复杂度。

**动画与交互**

- 点击 A/B/C 切换正文结构、标题和说明。
- 选中模式使用奶油色按钮。

**建议调整**

- 此页有意接近 PPT，是“被解释的对象”，不是网页母体回退。
- 如果需要更 Prisma，可把外壳奶油色面积缩小，但不要丢掉固定/可变边界。
- A/B/C 项目数最好保持三项，便于视觉对比。

**修改位置**

- 组件：`ABCModeSelector`
- 样式：`.template-layout`、`.fixed-shell`、`.variable-content`、`.mode-selector`

## 14｜Image-native Pivot｜Before / After

**页面目标**  
解释组件化与 Image-native 的取舍，并得出混合路线结论。

**当前设计**

- 大型横向 Before / After 比较器占据页面主体。
- 左侧是组件化抽象图，右侧是更自由的视觉区域。
- 中间 Yellow 分割线和圆形手柄承担交互提示。
- 右侧或下方深色说明块给出混合路线。

**动画与交互**

- 拖动透明 Range 控件改变分割比例。

**建议调整**

- 这是最值得替换真实素材的一页；当前只是抽象示意。
- 两张替换图必须使用完全相同宽高比和相似内容主题。
- 不要让图片中的真实数据、客户名或内部信息进入公开截图。

**修改位置**

- 组件：`BeforeAfterComparison`
- 样式：`.before-after-wrap`、`.before-after`、`.renderer-mock`、`.image-mock`
- 素材槽：`renderer-before`、`image-native-after`

## 15｜ICI Case｜真实材料验证

**页面目标**  
用可核验数字说明 Skill 已完成什么，同时明确尚未完成的工作。

**当前设计**

- 上方四个 KPI：146、26、13、2。
- 中间细长叙事链说明材料如何被重组。
- 下方使用完成 / 未完成双栏，避免把测试项目包装成完整交付。

**动画与交互**

- KPI 按顺序进入；页面无点击，保持证据页稳定。

**建议调整**

- 所有数字必须可追溯，不能用估算值。
- 新增截图时建议只放脱敏大纲或 QA 结果，不放原始材料。
- “尚未完成”区域必须保留，这是本页可信度来源。

**修改位置**

- 组件：`MetricGroup`
- 样式：`.ici-layout`、`.metric-group`、`.narrative-flow`、`.status-columns`
- 素材槽：`ici-outline`、`qa-screenshot`

## 16｜Skill Architecture｜Skill工作系统

**页面目标**  
让非开发者理解 Skill 不只是长 Prompt，而是规则、参考和执行工具的组合。

**当前设计**

- 左侧模拟文件树，深色终端感强调结构化能力。
- 右侧三层渐进披露：发现、理解、执行。
- Yellow 用于目录与执行层提示，蓝色用于层级关系。

**动画与交互**

- 文件树与三层说明错峰出现。

**建议调整**

- 面向非技术受众时，可以隐藏具体文件名，只保留三层披露。
- 面向开发者时，可增加“每个目录解决什么问题”，但不要展示 Private 内容。
- 文件树行数最好控制在 7 行以内。

**修改位置**

- 组件：`SkillArchitecture`
- 样式：`.architecture-layout`、`.file-tree`、`.disclosure-layers`

## 17｜How to Use｜三步使用与演示

**页面目标**  
消除“使用 Skill 必须先学代码”的顾虑，并演示人工批准门禁。

**当前设计**

- 左侧三步使用说明，右侧深色 Agent Console。
- Console 内有六个状态节点；运行时依次从待运行变为完成。
- 人工批准处使用 Yellow，完成状态使用 Green。

**动画与交互**

- 点击“运行演示”启动本地模拟。
- 流程在“等待用户批准”处停止。
- 点击“批准并继续”后完成代表页与 QA。

**建议调整**

- 现场演示前先运行一次，确认按钮状态已复位。
- 不要把等待时间设置得过长，当前节奏适合讲解。
- 如增加步骤，需同步检查移动端 Console 高度。

**修改位置**

- 组件：`DemoWorkflow`
- 样式：`.demo-layout`、`.use-steps`、`.agent-console`、`.approval-bar`

## 18｜Closing｜真正可复用的是什么

**页面目标**  
把 25–30 分钟内容压缩成一句结论和四个角色，形成可记忆收尾。

**当前设计**

- 深色电影感结尾，超大结论位于上部。
- 下部四个圆角角色块重复 Human、Chat、Agent、Skill 分工。
- 页面尽量少信息，保留停顿和问答空间。

**动画与交互**

- 结论逐词上拉；四角色错峰出现。
- 无跳转按钮，键盘可返回或进入 Overview。

**建议调整**

- 结尾标题不要超过两行。
- 如果需要加入联系人或二维码，应放右下角并保持较小。
- 不建议重新加入复杂流程图，否则会削弱收束感。

**修改位置**

- 组件：`ClosingRoles`
- 样式：`.visual-closing`、`.closing-roles`、`.thank-you`

---

## 三、优先调整建议

如果只做一轮调整，建议按以下顺序：

1. **第14页**：用真正的 Before / After 替换抽象示意，提升案例说服力。
2. **第15页**：补充脱敏 ICI 大纲或 QA 截图，让数字与成果形成证据闭环。
3. **第07–10页**：根据听众技术程度删减术语和次级文字。
4. **第03页**：确认宇航员视觉是否符合公司内部分享语境；如不符合再统一替换。
5. **第01页**：最后再决定 Hero 视频和主标题，因为它影响整套演示的第一印象。

## 四、调整后检查清单

- 标题是否在 1920×1080 和 1366×768 都不超过三行。
- 是否仍以黑、深灰、奶油色为主，而不是重新变成浅色 PPT。
- FullGoal Blue 是否只用于结构辅助。
- Yellow 是否只表达当前项、关键点或批准点。
- 页面是否出现新的横向滚动。
- 新图片是否有裁切、拉伸、文字过小或敏感信息。
- 新增交互是否仍支持键盘、移动端和 `prefers-reduced-motion`。
- 修改 `session.ts` 后是否仍保持 18 页页码、Hash 和 Speaker Notes 对应。
- 旧 `#api-key` 与 `#agent-trends` 是否仍正确落到新 `#ai-evolution`。
