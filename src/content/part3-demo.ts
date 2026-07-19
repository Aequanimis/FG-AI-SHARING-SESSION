export const part3Progress = ["MATERIALS", "OUTLINE", "VISUAL ROUTES", "BUILD", "DELIVERY"];

export const materialScanSteps = ["读取文件", "定位第四章", "识别图表与关键数字", "理解用户分析思路"];

export const visualRoutes = [
  {
    id: "A" as const,
    title: "经典研究型",
    note: "结论优先，适合数据比较与正式研究汇报",
    asset: "/assets/part3/visual-routes/route-a-classic-research.png",
  },
  {
    id: "B" as const,
    title: "机制解释型",
    note: "机制优先，适合解释为什么与如何发生",
    asset: "/assets/part3/visual-routes/route-b-mechanism.png",
    recommended: true,
  },
  {
    id: "C" as const,
    title: "综合重点型",
    note: "KPI、机制与启示组合，适合高信息密度重点页",
    asset: "/assets/part3/visual-routes/route-c-integrated.png",
  },
];

export type RouteId = (typeof visualRoutes)[number]["id"];

export const buildSteps = [
  "读取品牌骨架",
  "生成机制型视觉",
  "回填精确文字与数字",
  "写入来源与页码",
  "检查页面边界",
  "准备输出格式",
];

export const deliveryFormats = [
  { id: "preview", title: "Preview Image", format: "PNG / WebP", status: "AVAILABLE", note: "快速预览与分享" },
  { id: "vector", title: "Vector Asset", format: "SVG", status: "WORKFLOW DEMO", note: "高清矢量资产，可继续嵌入或加工" },
  { id: "deck", title: "Editable Deck", format: "PPTX", status: "REQUIRES BUILD", note: "主要文字可编辑，复杂视觉以高质量素材嵌入" },
];

export type PipelineNode = {
  id: string;
  label: string;
  owner: "Human" | "Chat / Model" | "Agent" | "Program" | "Skill";
  input: string;
  output: string;
  failure: string;
  gate?: string;
};

export const researchPipeline: PipelineNode[] = [
  { id: "materials", label: "资料输入", owner: "Human", input: "研究材料与任务问题", output: "输入清单与边界", failure: "材料或目标不完整" },
  { id: "parse", label: "文档解析", owner: "Agent", input: "PDF / Word / Excel", output: "结构化材料", failure: "页面、表格或编码失败" },
  { id: "integrity", label: "数据与来源核验", owner: "Program", input: "数字、单位、时间、口径、来源", output: "Source Map", failure: "数据冲突则停止" },
  { id: "narrative", label: "研究叙事重组", owner: "Chat / Model", input: "材料理解与核心问题", output: "故事线与逐页大纲", failure: "退化为原报告目录" },
  { id: "outline-gate", label: "大纲批准", owner: "Human", input: "当前版本与修改记录", output: "Approved Outline", failure: "未确认不得进入视觉", gate: "OUTLINE APPROVED?" },
];

export const productionPipeline: PipelineNode[] = [
  { id: "routes", label: "A / B / C路线", owner: "Chat / Model", input: "固定品牌骨架与批准大纲", output: "三种正文组织方式", failure: "只换颜色、不换结构" },
  { id: "visual-gate", label: "代表页批准", owner: "Human", input: "可比较的代表页", output: "Approved Visual Route", failure: "未确认不得批量生产", gate: "VISUAL ROUTE APPROVED?" },
  { id: "image-native", label: "Image-native生成", owner: "Agent", input: "批准方向与页面Brief", output: "高完成度视觉层", failure: "文字数字不可直接信任" },
  { id: "exact", label: "精确内容回填", owner: "Program", input: "批准文字与数据", output: "确定性内容层", failure: "单位、时间或来源漂移" },
  { id: "qa", label: "页面与跨页QA", owner: "Skill", input: "真实文件与证据", output: "Evidence Gate", failure: "缺页、溢出或方向漂移", gate: "EVIDENCE GATE" },
  { id: "output", label: "输出", owner: "Program", input: "通过QA的产物", output: "PNG / SVG / PPTX", failure: "格式或可编辑性不满足" },
];

export const iciEvidence = [
  { value: "146", unit: "页", label: "原始Fact Book" },
  { value: "CH.04", unit: "", label: "研究范围" },
  { value: "26", unit: "项", label: "核心数字核验" },
  { value: "13", unit: "页", label: "研究叙事重组" },
  { value: "A/B/C", unit: "", label: "代表视觉路线" },
];

export const iciCompleted = ["第四章定位", "文字与图表提取", "26项核心数据核验", "13页叙事重组", "A/B/C代表视觉生成"];
export const iciPending = ["完整13页批量生成", "最终SVG导出", "完整可编辑PPTX", "全套跨页QA"];

