export type TimelineSource = {
  id: string;
  title: string;
  publisher: string;
  publishedAt: string;
  sourceType: "official-announcement" | "official-research";
  supportedFacts: string[];
  timelineStageId: string;
  verifiedAt: string;
  url: string;
};

export type TimelineEvent = {
  label: string;
  product: string;
  sourceIds: string[];
};

export type TimelineStage = {
  id: string;
  index: string;
  period: string;
  capability: string;
  capabilityZh: string;
  summary: string;
  events: TimelineEvent[];
  accent: "cream" | "blue" | "yellow";
};

export type AgentEraTrend = {
  id: string;
  label: string;
  labelZh: string;
  description: string;
  sourceIds: string[];
  highlight?: boolean;
};

export const timelineSources: TimelineSource[] = [
  { id: "chatgpt-2022", title: "Introducing ChatGPT", publisher: "OpenAI", publishedAt: "2022-11-30", sourceType: "official-announcement", supportedFacts: ["ChatGPT以对话形式向公众开放"], timelineStageId: "conversation-entry", verifiedAt: "2026-07-19", url: "https://openai.com/blog/chatgpt/" },
  { id: "gpt4-2023", title: "GPT-4 Technical Report and System Card", publisher: "OpenAI", publishedAt: "2023-03-14", sourceType: "official-research", supportedFacts: ["GPT-4支持图像与文本输入"], timelineStageId: "multimodal-foundation", verifiedAt: "2026-07-19", url: "https://openai.com/index/gpt-4-research/" },
  { id: "gemini-2023", title: "Introducing Gemini: our largest and most capable AI model", publisher: "Google", publishedAt: "2023-12-06", sourceType: "official-announcement", supportedFacts: ["Gemini原生面向多模态理解"], timelineStageId: "multimodal-foundation", verifiedAt: "2026-07-19", url: "https://blog.google/innovation-and-ai/technology/ai/google-gemini-ai/" },
  { id: "claude3-2024", title: "Introducing the next generation of Claude", publisher: "Anthropic", publishedAt: "2024-03-04", sourceType: "official-announcement", supportedFacts: ["Claude 3模型家族发布"], timelineStageId: "capability-diffusion", verifiedAt: "2026-07-19", url: "https://www.anthropic.com/news/claude-3-family" },
  { id: "llama3-2024", title: "Introducing Meta Llama 3", publisher: "Meta", publishedAt: "2024-04-18", sourceType: "official-announcement", supportedFacts: ["Llama 3开放模型发布"], timelineStageId: "capability-diffusion", verifiedAt: "2026-07-19", url: "https://ai.meta.com/blog/meta-llama-3/" },
  { id: "gpt4o-2024", title: "Hello GPT-4o", publisher: "OpenAI", publishedAt: "2024-05-13", sourceType: "official-announcement", supportedFacts: ["GPT-4o统一处理文本、视觉与音频"], timelineStageId: "capability-diffusion", verifiedAt: "2026-07-19", url: "https://openai.com/index/hello-gpt-4o/" },
  { id: "o1-2024", title: "Learning to reason with LLMs", publisher: "OpenAI", publishedAt: "2024-09-12", sourceType: "official-research", supportedFacts: ["o1通过推理训练处理复杂问题"], timelineStageId: "reasoning-era", verifiedAt: "2026-07-19", url: "https://openai.com/index/learning-to-reason-with-llms/" },
  { id: "deepseek-r1-2025", title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", publisher: "DeepSeek", publishedAt: "2025-01", sourceType: "official-research", supportedFacts: ["DeepSeek-R1公开强化学习推理路线"], timelineStageId: "reasoning-era", verifiedAt: "2026-07-19", url: "https://arxiv.org/abs/2501.12948" },
  { id: "operator-2025", title: "Introducing Operator", publisher: "OpenAI", publishedAt: "2025-01-23", sourceType: "official-announcement", supportedFacts: ["Operator可在浏览器界面采取行动"], timelineStageId: "action-era", verifiedAt: "2026-07-19", url: "https://openai.com/index/introducing-operator/" },
  { id: "deep-research-2025", title: "Introducing deep research", publisher: "OpenAI", publishedAt: "2025-02-02", sourceType: "official-announcement", supportedFacts: ["Deep Research执行多步骤在线研究"], timelineStageId: "action-era", verifiedAt: "2026-07-19", url: "https://openai.com/index/introducing-deep-research/" },
  { id: "gemini25-2025", title: "Gemini 2.5: Our most intelligent AI model", publisher: "Google", publishedAt: "2025-03-25", sourceType: "official-announcement", supportedFacts: ["Gemini 2.5被定义为thinking model"], timelineStageId: "action-era", verifiedAt: "2026-07-19", url: "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-model-thinking-updates-march-2025/" },
  { id: "llama4-2025", title: "The Llama 4 herd", publisher: "Meta", publishedAt: "2025-04-05", sourceType: "official-announcement", supportedFacts: ["Llama 4多模态模型家族发布"], timelineStageId: "action-era", verifiedAt: "2026-07-19", url: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/" },
  { id: "codex-2025", title: "Introducing Codex", publisher: "OpenAI", publishedAt: "2025-05-16", sourceType: "official-announcement", supportedFacts: ["Codex云端软件工程Agent发布"], timelineStageId: "action-era", verifiedAt: "2026-07-19", url: "https://openai.com/index/introducing-codex/" },
  { id: "claude4-2025", title: "Introducing Claude 4", publisher: "Anthropic", publishedAt: "2025-05-22", sourceType: "official-announcement", supportedFacts: ["Claude 4面向高级推理与编码"], timelineStageId: "action-era", verifiedAt: "2026-07-19", url: "https://www.anthropic.com/news/claude-4" },
  { id: "chatgpt-agent-2025", title: "Introducing ChatGPT agent", publisher: "OpenAI", publishedAt: "2025-07-17", sourceType: "official-announcement", supportedFacts: ["ChatGPT agent整合研究与行动能力"], timelineStageId: "action-era", verifiedAt: "2026-07-19", url: "https://openai.com/index/introducing-chatgpt-agent/" },
  { id: "codex-app-2026", title: "Introducing the Codex app", publisher: "OpenAI", publishedAt: "2026-02-02", sourceType: "official-announcement", supportedFacts: ["Codex app支持并行Agent", "Windows版于2026-03-04上线"], timelineStageId: "agent-era", verifiedAt: "2026-07-19", url: "https://openai.com/index/introducing-the-codex-app/" },
  { id: "codex-everything-2026", title: "Codex for (almost) everything", publisher: "OpenAI", publishedAt: "2026-04-16", sourceType: "official-announcement", supportedFacts: ["后台电脑操作", "Skills、Apps、MCP与多Agent协作"], timelineStageId: "agent-era", verifiedAt: "2026-07-19", url: "https://openai.com/index/codex-for-almost-everything/" },
  { id: "workspace-agents-2026", title: "Introducing workspace agents in ChatGPT", publisher: "OpenAI", publishedAt: "2026-04-22", sourceType: "official-announcement", supportedFacts: ["共享Agent可执行长流程", "支持审批和控制"], timelineStageId: "agent-era", verifiedAt: "2026-07-19", url: "https://openai.com/index/introducing-workspace-agents-in-chatgpt/" },
  { id: "codex-anywhere-2026", title: "Work with Codex from anywhere", publisher: "OpenAI", publishedAt: "2026-05-14", sourceType: "official-announcement", supportedFacts: ["移动端查看、审批并改变任务方向"], timelineStageId: "agent-era", verifiedAt: "2026-07-19", url: "https://openai.com/index/work-with-codex-from-anywhere/" },
  { id: "codex-knowledge-2026", title: "Codex is becoming a productivity tool for everyone", publisher: "OpenAI", publishedAt: "2026-06-02", sourceType: "official-announcement", supportedFacts: ["Codex扩展至知识工作流程"], timelineStageId: "agent-era", verifiedAt: "2026-07-19", url: "https://openai.com/index/codex-for-knowledge-work/" },
  { id: "long-running-2026", title: "Codex maxxing: Long-running work", publisher: "OpenAI", publishedAt: "2026-06-22", sourceType: "official-announcement", supportedFacts: ["Agent可持续执行长时间任务"], timelineStageId: "agent-era", verifiedAt: "2026-07-19", url: "https://openai.com/index/codex-maxxing-long-running-work/" },
];

export const timelineStages: TimelineStage[] = [
  { id: "conversation-entry", index: "01", period: "2022", capability: "CONVERSATION", capabilityZh: "对话入口", summary: "自然语言成为普通人使用大模型的入口。", events: [{ label: "PUBLIC DIALOGUE", product: "ChatGPT", sourceIds: ["chatgpt-2022"] }], accent: "cream" },
  { id: "multimodal-foundation", index: "02", period: "2023", capability: "MULTIMODALITY", capabilityZh: "多模态理解", summary: "模型开始跨文本、图像与更多媒介理解信息。", events: [{ label: "VISION + LANGUAGE", product: "GPT-4 · Gemini", sourceIds: ["gpt4-2023", "gemini-2023"] }], accent: "blue" },
  { id: "capability-diffusion", index: "03", period: "2024 H1", capability: "ACCESSIBILITY", capabilityZh: "能力扩散", summary: "更强能力进入更快、更开放、更多样的模型产品。", events: [{ label: "FAST · OPEN · OMNI", product: "Claude 3 · Llama 3 · GPT-4o", sourceIds: ["claude3-2024", "llama3-2024", "gpt4o-2024"] }], accent: "cream" },
  { id: "reasoning-era", index: "04", period: "2024 H2—2025 H1", capability: "REASONING", capabilityZh: "深度推理", summary: "模型用更多计算与训练方法处理复杂推理。", events: [{ label: "THINK BEFORE ANSWERING", product: "o1 · DeepSeek-R1", sourceIds: ["o1-2024", "deepseek-r1-2025"] }], accent: "blue" },
  { id: "action-era", index: "05", period: "2025", capability: "ACTION", capabilityZh: "工具行动", summary: "AI从生成答案走向研究、浏览、编码与执行。", events: [{ label: "RESEARCH · BROWSE · CODE", product: "Deep Research · Operator · Codex · ChatGPT agent", sourceIds: ["operator-2025", "deep-research-2025", "gemini25-2025", "llama4-2025", "codex-2025", "claude4-2025", "chatgpt-agent-2025"] }], accent: "cream" },
  { id: "agent-era", index: "06", period: "2026 · NOW", capability: "HUMAN STEERING", capabilityZh: "人类监督", summary: "更长、更并行的任务，需要人在关键节点持续组织、审查与纠偏。", events: [{ label: "ORCHESTRATED WORK", product: "Codex App · Computer Use · Skills · Mobile Steering · Workspace Agents", sourceIds: ["codex-app-2026", "codex-everything-2026", "workspace-agents-2026", "codex-anywhere-2026", "codex-knowledge-2026", "long-running-2026"] }], accent: "yellow" },
];

export const agentEraTrends: AgentEraTrend[] = [
  { id: "long-running", label: "Long-running Work", labelZh: "长任务", description: "把数小时乃至更长的任务交给Agent持续推进。", sourceIds: ["long-running-2026", "workspace-agents-2026"] },
  { id: "computer-use", label: "Tool & Computer Use", labelZh: "工具与电脑操作", description: "Agent通过工具、浏览器和桌面环境执行真实动作。", sourceIds: ["codex-everything-2026"] },
  { id: "parallel-agents", label: "Parallel Agents", labelZh: "并行Agent", description: "多个Agent并行处理独立工作流，再由人统一审查。", sourceIds: ["codex-app-2026"] },
  { id: "reusable-skills", label: "Reusable Skills", labelZh: "可复用技能", description: "把规则、资料与脚本沉淀为可重复调用的能力。", sourceIds: ["codex-everything-2026"] },
  { id: "human-steering", label: "Human Steering", labelZh: "人类监督", description: "人在关键节点审批、校准并随时改变Agent方向。", sourceIds: ["codex-anywhere-2026", "workspace-agents-2026"], highlight: true },
];

export const getTimelineSources = (ids: string[]) => timelineSources.filter((source) => ids.includes(source.id));
