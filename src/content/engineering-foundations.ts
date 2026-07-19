export type EngineeringSource = {
  id: string;
  title: string;
  publisher: string;
  publishedAt: string;
  url: string;
  principleId: string;
  supportedClaim: string;
  sourceType: "official" | "standard" | "engineering-practice";
  verifiedAt: string;
};

export type EngineeringPrinciple = {
  id: string;
  index: string;
  label: string;
  labelZh: string;
  shortPrinciple: string;
  engineeringMeaning: string;
  workflowTranslation: string;
  analogy: string;
  relatedWorkflowSteps: string[];
  sourceIds: string[];
  highlight?: boolean;
};

export const engineeringSources: EngineeringSource[] = [
  {
    id: "nasa-logical-decomposition",
    title: "NASA Systems Engineering Handbook · Logical Decomposition",
    publisher: "NASA",
    publishedAt: "2016",
    url: "https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf",
    principleId: "decompose-complexity",
    supportedClaim: "系统工程通过递归的逻辑分解，把高层目标与需求转化为下一层可处理的问题与功能。",
    sourceType: "standard",
    verifiedAt: "2026-07-19",
  },
  {
    id: "microsoft-cqrs-separation",
    title: "CQRS Pattern · Separation of Concerns",
    publisher: "Microsoft Azure Architecture Center",
    publishedAt: "n.d.",
    url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs",
    principleId: "separation-of-concerns",
    supportedClaim: "将不同责任分离到清晰的模型与边界中，可以简化设计并提高可维护性。",
    sourceType: "official",
    verifiedAt: "2026-07-19",
  },
  {
    id: "agile-principles-feedback",
    title: "Principles behind the Agile Manifesto",
    publisher: "Agile Manifesto",
    publishedAt: "2001",
    url: "https://agilemanifesto.org/principles.html",
    principleId: "iterate-with-feedback",
    supportedClaim: "频繁交付、持续反馈与定期复盘，让团队在变化中逐步调整做法。",
    sourceType: "official",
    verifiedAt: "2026-07-19",
  },
  {
    id: "google-small-changes",
    title: "Google Engineering Practices · Small CLs",
    publisher: "Google",
    publishedAt: "n.d.",
    url: "https://google.github.io/eng-practices/review/developer/small-cls.html",
    principleId: "iterate-with-feedback",
    supportedClaim: "小而自洽的变更更易被快速、深入地评审，也更容易回退和控制风险。",
    sourceType: "engineering-practice",
    verifiedAt: "2026-07-19",
  },
  {
    id: "nasa-verification-evidence",
    title: "NASA Systems Engineering Handbook · Product Verification",
    publisher: "NASA",
    publishedAt: "2016",
    url: "https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf",
    principleId: "verify-before-accept",
    supportedClaim: "产品验证需要依据预先定义的方法与成功标准，并形成可审查的客观证据。",
    sourceType: "standard",
    verifiedAt: "2026-07-19",
  },
  {
    id: "google-code-review",
    title: "Google Engineering Practices · What to Look for in a Code Review",
    publisher: "Google",
    publishedAt: "n.d.",
    url: "https://google.github.io/eng-practices/review/reviewer/looking-for.html",
    principleId: "verify-before-accept",
    supportedClaim: "评审应检查设计、功能、复杂度、测试与每一行变更，不能只接受作者的自我判断。",
    sourceType: "engineering-practice",
    verifiedAt: "2026-07-19",
  },
];

export const engineeringPrinciples: EngineeringPrinciple[] = [
  {
    id: "decompose-complexity",
    index: "01",
    label: "DECOMPOSE COMPLEXITY",
    labelZh: "复杂问题先分解",
    shortPrinciple: "把不可控的大问题，拆成可理解、可执行、可验收的小问题。",
    engineeringMeaning: "系统工程先从目标与约束出发，通过逻辑分解建立下一层功能、需求和接口，使复杂度能够被逐层管理。",
    workflowTranslation: "Human先定义目标与边界，Chat再把任务拆成阶段、依赖、检查点和可交付产物。",
    analogy: "像把一座大桥拆成基础、桥墩、桥面与验收标准，而不是要求一个角色一次完成整座桥。",
    relatedWorkflowSteps: ["01 Human 定义目标", "02 Chat 澄清与拆解", "03 Human 批准方案"],
    sourceIds: ["nasa-logical-decomposition"],
  },
  {
    id: "separation-of-concerns",
    index: "02",
    label: "SEPARATION OF CONCERNS",
    labelZh: "不同角色承担不同职责",
    shortPrinciple: "目标、规划、执行与验收由不同责任边界承接。",
    engineeringMeaning: "架构设计通过分离关注点降低耦合：每个模块围绕清晰职责工作，并通过明确接口协同。",
    workflowTranslation: "Human掌握目标与批准，Chat负责理解和规划，Agent负责工具执行，最终验收仍由Human完成。",
    analogy: "像读写模型各自优化自己的责任，角色之间通过接口交接，不让一个模块包揽全部逻辑。",
    relatedWorkflowSteps: ["02 Chat 澄清与拆解", "04 Agent 分阶段执行", "05 Human 验收与反馈"],
    sourceIds: ["microsoft-cqrs-separation"],
  },
  {
    id: "iterate-with-feedback",
    index: "03",
    label: "ITERATE WITH FEEDBACK",
    labelZh: "小步迭代并持续反馈",
    shortPrinciple: "用短周期交付与真实反馈，持续校正方向和质量。",
    engineeringMeaning: "敏捷与工程评审强调频繁交付可工作的增量、保持变更足够小，并定期依据反馈调整行为。",
    workflowTranslation: "Agent按阶段交付文件、截图和测试结果；Human在每个Gate反馈，错误在局部返工而不是末尾推倒重来。",
    analogy: "像连续提交小变更，每一次都可评审、可运行、可回退。",
    relatedWorkflowSteps: ["03 Human 批准方案", "04 Agent 分阶段执行", "05 Human 验收与反馈"],
    sourceIds: ["agile-principles-feedback", "google-small-changes"],
    highlight: true,
  },
  {
    id: "verify-before-accept",
    index: "04",
    label: "VERIFY BEFORE ACCEPT",
    labelZh: "交付前必须验证",
    shortPrinciple: "结论必须通过标准、测试和独立证据，而不是模型自评。",
    engineeringMeaning: "验证把产品与预先定义的需求、方法和成功标准进行比较，并保留可审查的客观证据。",
    workflowTranslation: "Human检查事实、文件、构建、截图与来源；未通过就把问题送回分解和执行环节。",
    analogy: "像代码合并前的测试与Review：作者说“完成了”不等于系统已经可接受。",
    relatedWorkflowSteps: ["04 Agent 分阶段执行", "05 Human 验收与反馈", "06 沉淀为Skill"],
    sourceIds: ["nasa-verification-evidence", "google-code-review"],
  },
];

export const getEngineeringSources = (ids: string[]) => engineeringSources.filter((source) => ids.includes(source.id));
