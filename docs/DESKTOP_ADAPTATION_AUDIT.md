# 全站桌面端适配审计

审计日期：2026-07-19  
范围：16页、顶部导航、Progress Rail、Overview、Speaker Notes、Source Drawer、Footer与Hash导航。

## 实测视口

| 档位 | 视口 | 横向溢出 | 核心区域越界 | 结果 |
|---|---:|---:|---:|---|
| Wide | 1920×1080 | 0 | 0 | 通过 |
| Wide | 1680×1050 | 0 | 0 | 通过 |
| Wide | 1600×900 | 0 | 0 | 通过 |
| Standard | 1440×900 | 0 | 0 | 通过 |
| Standard | 1366×768 | 0 | 0 | 通过 |
| Compact | 1280×720 | 0 | 0 | 通过 |
| Mobile | 390×844 | 0 | 0 | 通过 |

机器可读结果见 `docs/screenshots/page-06-08-and-desktop-audit/desktop-audit.json`；横向溢出单项证明见同目录 `34-horizontal-scroll-proof.json`。

## 修复记录

- 第06页：时间轴宽度与Agent Era宽度重新分配；三上三下排列；1366/1280档单独收紧节点步距；关键字号按桌面档提高。
- 第07页：六步链在桌面使用S形脊柱与错峰节点，移动端改为单列；详情、反馈和案例轨道保持安全区内。
- 第08页：四项非对称支柱在桌面围绕中心核，移动端改为中心核后接四项单列；来源详情在移动端固定于底部安全区。
- 全站：Compact档降低页面留白与组件高度，但不使用全页`scale()`或`zoom`；桌面核心正文不低于14px。
- Closing：移动`THANK YOU`，避免与16/16页码和Footer重叠。

## 交互审计

- 新第07页：Hover、Focus、点击锁定、方向键切换与Esc清除均通过。
- 新第08页：原则Hover/点击、按原则过滤来源抽屉均通过。
- 旧Hash：`chat-vs-agent`、`collaboration-sop`、`stage-gate(s)`、`thinking-framework(s)`均会重定向到新页面。
- 浏览器控制台：未发现应用错误或警告。

## 后续可选优化

- 第12页的Before/After仍使用抽象占位素材；拿到真实授权案例后可替换。
- 第13页ICI页仍建议补充真实脱敏大纲与QA截图。
- 第15页Demo Workflow可在真实培训前补一张实际运行录屏或关键帧。
