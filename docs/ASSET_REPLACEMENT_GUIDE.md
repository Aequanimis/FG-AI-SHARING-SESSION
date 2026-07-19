# 素材替换指南

## Prisma 公共素材

当前 Hero、AI Shift 视频与三张宇航员视觉位于 `public/assets/prisma-reference/`，组件只引用本地路径。替换时保留 `hero-prisma.mp4`、`secondary-prisma.mp4`、`icon-orbit.webp`、`icon-signal.webp`、`icon-frame.webp` 文件名即可；同时更新同目录 `SOURCES.md`。视频建议 H.264 MP4，并保留深色画面以保证奶油色标题可读。

## Logo

将经过授权的透明背景PNG放到 `public/assets/brand/fullgoal-logo.png`。当前实现默认使用文字 `FULLGOAL`，避免在没有授权素材时临摹商标。若要改用图片，只需在 `BrandHeader` 中读取 `src/config/assets.ts` 的 `assets.logo`。

推荐尺寸：透明PNG，宽 600–1200px，高度按原始比例；不要拉伸或改变Logo配色。

## Before / After

- 组件化代表页：`public/assets/demo/renderer-before.png`
- Image-native代表页：`public/assets/demo/image-native-after.png`

推荐 1600×900 或更高的16:9图片。保持主体安全区，使用 `object-fit: cover` 或 `contain`，禁止直接拉伸。

## ICI与QA截图

- 大纲截图：`public/assets/demo/ici-outline.png`
- QA截图：`public/assets/demo/qa-screenshot.png`

替换前务必裁去本机路径、用户名、文件名中的项目代号、人员信息、批注与未授权页面。建议宽度 1600px 以上。

## Skill运行截图

路径：`public/assets/demo/skill-run.png`。建议使用脱敏的自定义工作流UI，不要伪装成OpenAI官方界面。

## 响应式原则

- 桌面演示优先使用16:9素材。
- 移动端允许容器纵向展开，图片保持原始宽高比。
- 所有素材应配置明确宽高或固定比例，避免页面加载时跳动。
- 素材缺失时保留CSS抽象示意，演示仍应完整可用。
