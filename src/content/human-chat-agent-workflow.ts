export type WorkflowRole = "human" | "chat" | "agent" | "skill";

export type CollaborationStep = {
  id: string;
  index: string;
  title: string;
  role: string;
  owner: WorkflowRole;
  actions: string[];
  output: string;
  risk: string;
};

export const collaborationSteps: CollaborationStep[] = [
  { id: "human-goal", index: "01", title: "Human定义目标", role: "GOAL OWNER", owner: "human", actions: ["提供材料", "明确结果", "设定边界"], output: "任务边界", risk: "目标模糊，后续越做越偏" },
  { id: "chat-plan", index: "02", title: "Chat整理与规划", role: "PLANNER", owner: "chat", actions: ["阅读材料", "澄清需求", "拆解任务"], output: "大纲与执行方案", risk: "直接执行，缺少可讨论的方案" },
  { id: "human-approval", index: "03", title: "Human判断与批准", role: "APPROVAL GATE", owner: "human", actions: ["修改方向", "冻结结构", "决定继续"], output: "已批准方案", risk: "错误方向被自动化放大" },
  { id: "agent-execute", index: "04", title: "Agent分阶段执行", role: "EXECUTOR", owner: "agent", actions: ["使用工具", "修改文件", "生成产物"], output: "阶段成果", risk: "执行范围漂移或缺少记录" },
  { id: "human-evidence", index: "05", title: "Human验收与反馈", role: "EVIDENCE GATE", owner: "human", actions: ["检查事实", "查看产物", "决定返工"], output: "验收结论", risk: "用模型自评代替独立证据" },
  { id: "skill-reuse", index: "06", title: "沉淀为Skill", role: "REUSABLE SYSTEM", owner: "skill", actions: ["保存规则", "固化流程", "重复使用"], output: "可复用Skill", risk: "过早固化尚未稳定的流程" },
];

export const workflowCaseTrack = ["提出研究汇报目标", "Chat整理叙事与页纲", "人工批准结构", "Agent生成并检查产物", "人工验收事实与视觉", "固化为PPT Skill"];
