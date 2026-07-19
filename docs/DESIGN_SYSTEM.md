# 设计系统

## 视觉母体

网页以 Prisma 式创意站点为视觉母体：黑色页面外层、Inset 留白、大圆角全屏容器、电影感视频、黑色胶囊导航、超大标题与编辑式留白。它不是把企业 PPT 原样网页化。

## 颜色

- Cinema Black `#050505`：页面外层与导航
- Editorial Charcoal `#171715` / `#20201E`：主容器和深灰内容面
- Cream `#F0EADF`：标题、CTA、选中态与少量大面积品牌骨架
- FullGoal Blue `#0B50A2`：标题线、图标、结构辅助
- Highlight Yellow `#FABE00`：当前步骤、批准点和重点
- Risk Red `#CC3333`、Positive Green `#00B050`：只表达风险与完成状态

## 字体与层级

中文使用 Microsoft YaHei、PingFang SC、Noto Sans SC、Source Han Sans SC 等系统无衬线字体；英文 Eyebrow 使用窄体无衬线栈；编辑式数字与部分多样式标题使用 Georgia。普通页标题 `clamp(34px, 3.25vw, 64px)`，Hero 标题 `clamp(60px, 7.8vw, 148px)`。

## 空间与页面骨架

每页外侧保留 6–12px 黑色 Inset，内容容器使用 24–34px 圆角。顶部胶囊导航悬浮在容器内。FullGoal 的标题、来源、页码骨架继续保留，但颜色只作为辅助身份；正文排版优先采用编辑式留白、非对称构图、圆形与胶囊形态。

## 动画

- `WordsPullUp`：标题分词从下方向上进入。
- `WordsPullUpMultiStyle`：Agenda 标题在分词动画中混合奶油、黄色与衬线斜体。
- `ScrollRevealText`：副标题和说明文字随进入视口逐词渐亮。
- `StaggerItem`：Feature 卡片以错峰 `scale + fade + y` 进入。
- Hero 视频覆盖 Noise 纹理；`prefers-reduced-motion` 下关闭噪点动画并将过渡缩至最短。

## 公共素材

运行时优先使用 `public/assets/prisma-reference/` 的本地副本。Hero 使用第一段视频，AI Shift 第一列使用第二段视频，其余三列使用三张宇航员视觉。来源记录见同目录 `SOURCES.md`；视频解码失败时渲染深色 Fallback。

## 组件原则

PresentationShell、18 页数据、Hash、键盘、Overview、Speaker Notes、Fullscreen 与 Source Drawer 保持独立；旧 `#api-key` 与 `#agent-trends` Hash 兼容映射至 `#ai-evolution`。Prisma 视觉层集中在 `src/prisma.css`，媒体封装在 `PrismaMedia.tsx`，标题动效集中在 `Motion.tsx`。
