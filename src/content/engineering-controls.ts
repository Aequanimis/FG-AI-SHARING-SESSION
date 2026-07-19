export type EngineeringControl = {
  id: string;
  index: string;
  label: string;
  labelZh: string;
  risk: string;
  controls: string[];
  tone: "blue" | "yellow" | "green";
};

export const engineeringControls: EngineeringControl[] = [
  {
    id: "privacy-boundary",
    index: "01",
    label: "PRIVACY BOUNDARY",
    labelZh: "隐私边界",
    risk: "内部模板、材料、输出和日志进入公开仓库。",
    controls: ["Public / Private物理隔离", "不只依赖.gitignore", "私有目录不进入打包产物"],
    tone: "blue",
  },
  {
    id: "template-fingerprint",
    index: "02",
    label: "TEMPLATE FINGERPRINT",
    labelZh: "模板指纹与完整性校验",
    risk: "同名模板可能已经被修改，生成结果产生品牌漂移。",
    controls: ["SHA-256模板指纹", "生成前验证", "版本不一致时停止"],
    tone: "blue",
  },
  {
    id: "exact-content-recovery",
    index: "03",
    label: "EXACT CONTENT RECOVERY",
    labelZh: "精确内容回填",
    risk: "Image-native视觉改变文字、数字、单位、时间或来源。",
    controls: ["AI负责构图", "程序回填精确内容", "关键数字与来源单独核验"],
    tone: "green",
  },
  {
    id: "approval-gates",
    index: "04",
    label: "APPROVAL GATES",
    labelZh: "人工批准门",
    risk: "错误大纲或视觉路线被批量放大。",
    controls: ["大纲批准门", "A/B/C代表页批准门", "未确认不继续"],
    tone: "yellow",
  },
  {
    id: "evidence-qa",
    index: "05",
    label: "EVIDENCE-BASED QA",
    labelZh: "证据化质量验收",
    risk: "Agent报告完成，但真实文件可能缺页、错位或不可使用。",
    controls: ["检查真实文件", "数据与来源QA", "页面截图与跨页一致性", "独立验收"],
    tone: "green",
  },
];

