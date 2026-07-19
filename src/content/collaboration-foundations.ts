export type FoundationSource = {
  id: string;
  title: string;
  publisher: string;
  publishedAt: string;
  sourceType: "official-research" | "official-guide" | "official-standard" | "official-documentation";
  supportedFacts: string[];
  supportedClaim: string;
  practicalUse: string;
  verifiedAt: string;
  url: string;
};

export type CollaborationFoundation = {
  id: string;
  index: string;
  label: string;
  title: string;
  summary: string;
  sourceMeaning: string;
  practicalTranslation: string;
  workflowLinks: string[];
  sourceIds: string[];
  accent: "cream" | "blue" | "yellow" | "green";
};

export const foundationSources: FoundationSource[] = [
  { id: "anthropic-effective-agents", title: "Building effective agents", publisher: "Anthropic", publishedAt: "2024-12-19", sourceType: "official-research", supportedFacts: ["成功的Agent实践通常采用简单、可组合的模式", "工作流可加入程序化Gate并组合迭代"], supportedClaim: "复杂度应按需要逐步增加，工作流应保持简单、透明、可组合。", practicalUse: "把复杂任务拆为可检查步骤，并在必要位置设置Gate。", verifiedAt: "2026-07-19", url: "https://www.anthropic.com/engineering/building-effective-agents" },
  { id: "openai-practical-guide", title: "A practical guide to building agents", publisher: "OpenAI", publishedAt: "2025", sourceType: "official-guide", supportedFacts: ["Agent由Model、Tools与Instructions三类核心组件构成", "失败时应停止并把控制权交还用户"], supportedClaim: "Agent以模型做判断、以工具行动，并在清晰指令与护栏中运行。", practicalUse: "把执行交给Agent，同时明确工具范围、停止条件与人工接管。", verifiedAt: "2026-07-19", url: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/" },
  { id: "nist-ai-rmf", title: "Artificial Intelligence Risk Management Framework (AI RMF 1.0)", publisher: "NIST", publishedAt: "2023-01-26", sourceType: "official-standard", supportedFacts: ["AI风险治理需要明确组织角色、职责和监督机制"], supportedClaim: "人工角色、责任、问责与监督应被明确设计。", practicalUse: "在人机协作链中设置目标批准与结果验收两个人工Gate。", verifiedAt: "2026-07-19", url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10" },
  { id: "nist-human-ai", title: "AI Risk Management and Human-AI Interaction", publisher: "NIST AI Resource Center", publishedAt: "2023", sourceType: "official-standard", supportedFacts: ["人类与AI的角色应被定义和区分", "监督设计应考虑人与AI之间的有效协作"], supportedClaim: "Human-in-the-loop不是口号，而是角色、权限和反馈机制的设计。", practicalUse: "让人负责目标、批准和证据判断，让AI负责规划或执行。", verifiedAt: "2026-07-19", url: "https://airc.nist.gov/airmf-resources/airmf/appendices/app-c-ai-risk-management-and-human-ai-interaction/" },
  { id: "anthropic-evals", title: "Demystifying evals for AI agents", publisher: "Anthropic", publishedAt: "2026-01-09", sourceType: "official-research", supportedFacts: ["Agent评估应验证结果而非只观察过程", "自动评分需要与人工验证结合"], supportedClaim: "长任务质量需要围绕结果、证据和独立评估来判断。", practicalUse: "把文件、截图、测试和事实核验作为验收证据。", verifiedAt: "2026-07-19", url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" },
  { id: "github-review-copilot", title: "Review output created by GitHub Copilot", publisher: "GitHub Docs", publishedAt: "持续更新", sourceType: "official-documentation", supportedFacts: ["Copilot生成的Pull Request应接受与人工提交同等严格的审查", "合并前应检查代码变更"], supportedClaim: "AI产物仍需由人依据独立标准复核。", practicalUse: "Agent交付后由人检查差异、测试与最终文件，再决定通过或返工。", verifiedAt: "2026-07-19", url: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output" },
];

export const collaborationFoundations: CollaborationFoundation[] = [
  { id: "simple-composable", index: "01", label: "SIMPLE & COMPOSABLE", title: "简单、可组合的工作流", summary: "先用清晰步骤解决问题，再按证据增加复杂度。", sourceMeaning: "Anthropic强调简单、透明、可组合的Agent模式。", practicalTranslation: "六步协作链可停、可改、可独立验收。", workflowLinks: ["Chat整理与规划", "Agent分阶段执行"], sourceIds: ["anthropic-effective-agents"], accent: "cream" },
  { id: "model-tools-instructions", index: "02", label: "MODEL + TOOLS + INSTRUCTIONS", title: "模型、工具、指令与运行循环", summary: "能力、行动边界与执行规则共同决定Agent表现。", sourceMeaning: "OpenAI把Model、Tools、Instructions定义为Agent的三个核心组件。", practicalTranslation: "给Agent明确工具、边界、停止条件与阶段产物。", workflowLinks: ["Chat整理与规划", "Agent分阶段执行"], sourceIds: ["openai-practical-guide"], accent: "blue" },
  { id: "human-in-the-loop", index: "03", label: "HUMAN-IN-THE-LOOP", title: "人工监督与批准门", summary: "人掌握目标、批准、问责与最终判断。", sourceMeaning: "NIST要求定义并区分人类与AI角色，设计有效监督。", practicalTranslation: "在规划后与交付后设置两个人工Gate。", workflowLinks: ["Human定义目标", "Human判断与批准", "Human验收与反馈"], sourceIds: ["nist-ai-rmf", "nist-human-ai", "openai-practical-guide"], accent: "yellow" },
  { id: "evidence-evaluation", index: "04", label: "EVIDENCE & EVALUATION", title: "证据、评估与独立复核", summary: "结果必须被文件、测试、事实或人工检查所证明。", sourceMeaning: "Anthropic与GitHub均强调结果评估和人工复核。", practicalTranslation: "模型不能给自己发通过证；验收必须引用独立证据。", workflowLinks: ["Human验收与反馈", "沉淀为Skill"], sourceIds: ["anthropic-evals", "github-review-copilot"], accent: "green" },
];

export const getFoundationSources = (ids: string[]) => foundationSources.filter((source) => ids.includes(source.id));
