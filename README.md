# FG AI Sharing Session

一套面向公司内部分享会的浏览器演示项目。主题为“AI 不只是聊天：从 Chat 规划、Agent 执行到 Skill 复用”，以 FullGoal PPT Master 为脱敏案例。

视觉采用 Prisma 式创意网页母体：Inset 电影容器、全屏视频与 Noise、黑色胶囊导航、奶油色超大标题、滚动文字和错峰卡片动画；FullGoal 仅提供品牌身份与蓝/黄色辅助强调。

## 安装与启动

```powershell
npm install
npm run dev
```

生产构建与代码检查：

```powershell
npm run build
npm run lint
```

## 演示操作

- `← / ↑`、`PageUp`：上一页
- `→ / ↓`、`Space`、`PageDown`：下一页
- `Home / End`：首尾页
- `O`：总览模式
- `N`：讲者备注
- `F`：浏览器全屏
- `Esc`：关闭当前浮层

页面地址会同步 `#slide-id`，刷新后可恢复到同一页。鼠标滚轮、触控板和总览页点击均可导航。

## 修改内容与素材

- 16 页文案与讲者备注：`src/content/session.ts`
- 第07页协作链数据：`src/content/human-chat-agent-workflow.ts`
- 第08页方法来源：`src/content/collaboration-foundations.ts`
- 品牌变量：`src/config/brand.ts` 与 `src/index.css`
- 素材路径：`src/config/assets.ts`
- Prisma 视觉覆盖层：`src/prisma.css`
- Prisma 本地公共素材与来源：`public/assets/prisma-reference/`
- 授权 Logo：`public/assets/brand/`
- 案例图与截图：`public/assets/demo/`

替换图片时保持文件名即可，无需改组件代码。详细规则见 `docs/ASSET_REPLACEMENT_GUIDE.md`。

## 隐私注意事项

项目只包含公开概念、用户提供的脱敏案例总结与抽象占位图，不包含真实 API Key、人员信息、客户信息、未授权模板、私有测试报告或原始内部材料。`.env.local` 已被忽略；不要将密钥写入源码或提交到 Git。

## 已知限制

- 未提供授权 Logo 时，界面使用文字 `FULLGOAL` 占位。
- Before / After、ICI 与 QA 页面当前使用抽象示意，不冒充真实案例截图。
- Demo Workflow 仅为本地交互模拟，不调用任何真实 API。
- 部分浏览器需要用户手势才能进入全屏。
- 视频文件约 34 MB；加载或解码失败时会显示深色 Fallback，不影响内容与导航。
