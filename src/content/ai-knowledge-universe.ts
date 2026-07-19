export type KnowledgeCluster = "model" | "context" | "prompt" | "tool" | "api" | "mcp" | "skill" | "harness";

export type KnowledgePosition = { x: number; y: number };

export type AIKnowledgeNode = {
  id: string;
  label: string;
  labelZh: string;
  category: "core" | "secondary";
  definition: string;
  analogy: string;
  role: string;
  relatedConcepts: string[];
  importance: 1 | 2 | 3;
  defaultVisible: boolean;
  position: KnowledgePosition;
  depth: 1 | 2 | 3;
  cluster: KnowledgeCluster;
  source: string;
  securityTips?: string[];
  example?: string;
};

export type CoreConcept = AIKnowledgeNode & {
  category: "core";
  index: string;
  angle: number;
  lineLength: number;
};

const PDF_SOURCE = "《AI大模型知识点全景图-73页》";

export const coreConcepts: CoreConcept[] = [
  { id: "model", index: "01", label: "Model", labelZh: "模型", category: "core", definition: "AI负责理解、推理、判断与生成的能力核心。", analogy: "员工的大脑", role: "决定Agent能否理解问题并作出可靠决策。", relatedConcepts: ["Token", "Transformer", "Reasoning", "Multimodality"], importance: 3, defaultVisible: true, position: { x: 18, y: 30 }, depth: 1, cluster: "model", source: `${PDF_SOURCE}第2—14页`, angle: -156, lineLength: 35 },
  { id: "context", index: "02", label: "Context", labelZh: "上下文", category: "core", definition: "AI在当前决策时能够看到的全部信息。", analogy: "摆在员工桌面上的材料", role: "决定Agent能看到哪些文件、规则、历史记录和任务状态。", relatedConcepts: ["Context Window", "Memory", "RAG", "Retrieval"], importance: 3, defaultVisible: true, position: { x: 38, y: 19 }, depth: 1, cluster: "context", source: `${PDF_SOURCE}第6、17、24—29、38—40页`, angle: -116, lineLength: 31 },
  { id: "prompt", index: "03", label: "Prompt", labelZh: "提示词", category: "core", definition: "人给AI的目标、要求、边界与输出方式。", analogy: "任务说明书", role: "把人的意图转成Agent可执行、可检查的指令。", relatedConcepts: ["System Prompt", "Few-shot", "Chain-of-thought", "Structured Outputs"], importance: 3, defaultVisible: true, position: { x: 64, y: 18 }, depth: 1, cluster: "prompt", source: `${PDF_SOURCE}第18—23、29、72页`, angle: -66, lineLength: 31 },
  { id: "tool", index: "04", label: "Tool", labelZh: "工具", category: "core", definition: "让AI能够搜索、读取、计算和操作外部环境的能力。", analogy: "员工的电脑和软件", role: "把模型的判断转化为真实世界中的动作。", relatedConcepts: ["Tool Calling", "Function Calling", "ReAct", "Computer Use"], importance: 3, defaultVisible: true, position: { x: 86, y: 34 }, depth: 1, cluster: "tool", source: `${PDF_SOURCE}第15—16、31—37页`, angle: -24, lineLength: 38 },
  { id: "api", index: "05", label: "API", labelZh: "应用程序接口", category: "core", definition: "让程序按照固定格式调用模型、工具或外部服务的标准入口。", analogy: "不同软件之间的标准服务窗口。", role: "让产品以稳定、可编程的方式调用模型、工具或外部服务。", relatedConcepts: ["Endpoint", "Request", "Response", "SDK", "Streaming", "Authentication", "Rate Limit", "API Key"], importance: 3, defaultVisible: true, position: { x: 84, y: 70 }, depth: 1, cluster: "api", source: "项目既有API教学框架；PDF第21、31页", angle: 24, lineLength: 37 },
  { id: "mcp", index: "06", label: "MCP", labelZh: "模型上下文协议", category: "core", definition: "AI连接外部数据、工具与服务的一种标准化协议。", analogy: "统一规格的转接头", role: "减少Agent接入不同工具和数据源时的重复适配。", relatedConcepts: ["Host", "Client", "Server", "Resources"], importance: 3, defaultVisible: true, position: { x: 62, y: 82 }, depth: 1, cluster: "mcp", source: `${PDF_SOURCE}第41页`, angle: 66, lineLength: 31 },
  { id: "skill", index: "07", label: "Skill", labelZh: "技能", category: "core", definition: "针对一类任务封装的可复用流程、资料与脚本。", analogy: "公司的标准操作手册", role: "让Agent按稳定方法重复完成某一类工作。", relatedConcepts: ["SOP", "References", "Scripts", "Workflow"], importance: 3, defaultVisible: true, position: { x: 36, y: 82 }, depth: 1, cluster: "skill", source: "项目既有Skill案例；PDF第42、58、60页", angle: 114, lineLength: 31 },
  { id: "harness", index: "08", label: "Harness", labelZh: "运行与验收环境", category: "core", definition: "包围模型的权限、状态、日志、重试、评估与质量系统。", analogy: "办公环境和管理制度", role: "确保Agent可以被管理、追踪、复现和验收。", relatedConcepts: ["Compaction", "Evaluation", "Observability", "Guardrails"], importance: 3, defaultVisible: true, position: { x: 14, y: 68 }, depth: 1, cluster: "harness", source: `${PDF_SOURCE}第39、42—44、58、62、66、68页`, angle: 156, lineLength: 36 },
];

type SecondarySeed = [
  id: string, label: string, labelZh: string, cluster: KnowledgeCluster,
  definition: string, source: string, importance: 1 | 2 | 3,
  defaultVisible: boolean, x: number, y: number, depth: 1 | 2 | 3,
  relatedConcepts: string[],
];

const clusterAnalogy: Record<KnowledgeCluster, string> = {
  model: "大脑内部的一种认知零件",
  context: "给员工准备和整理工作材料",
  prompt: "任务说明书中的一条关键写法",
  tool: "员工可调用的一种工作能力",
  api: "软件服务窗口中的一项约定",
  mcp: "统一转接系统中的一个部件",
  skill: "可复用工作手册中的一个模块",
  harness: "保障工作可控、可查、可验的一层设施",
};

const clusterRole: Record<KnowledgeCluster, string> = {
  model: "影响模型如何表示信息、计算关系并生成结果。",
  context: "影响Agent拿到什么材料以及如何保持任务连续性。",
  prompt: "把意图、边界和输出约束传递给模型。",
  tool: "让Agent从回答问题扩展到执行真实动作。",
  api: "让系统之间可以稳定、安全地交换请求与结果。",
  mcp: "让Agent用统一方式发现并调用外部能力。",
  skill: "把一次成功做法沉淀为可重复使用的能力。",
  harness: "让长任务具备权限、记忆、观测、评估和安全边界。",
};

const seeds: SecondarySeed[] = [
  ["token", "Token", "词元", "model", "模型读取与生成文本时使用的最小离散单位。", "第2页", 3, true, 7, 18, 2, ["Embedding", "Context Window"]],
  ["embedding", "Embedding", "向量表示", "model", "把词、图像或对象映射为可计算的高维向量。", "第3页", 3, true, 15, 13, 2, ["Token", "Vector Database"]],
  ["transformer", "Transformer", "Transformer架构", "model", "通过注意力机制并行建模序列关系的主流模型架构。", "第4页", 3, true, 26, 11, 2, ["Attention", "Positional Encoding"]],
  ["attention", "Attention", "注意力机制", "model", "动态判断输入中哪些部分与当前计算最相关。", "第5页", 3, true, 8, 31, 2, ["Transformer", "Flash Attention"]],
  ["positional-encoding", "Positional Encoding", "位置编码", "model", "为序列元素补充顺序与相对位置信息。", "第7页", 2, false, 25, 24, 3, ["Transformer", "Context Window"]],
  ["moe", "MoE", "混合专家", "model", "用路由器为每个输入选择部分专家网络参与计算。", "第8页", 2, false, 10, 42, 3, ["Transformer", "Pretraining"]],
  ["pretraining", "Pretraining", "预训练", "model", "在大规模数据上学习通用语言与世界知识的训练阶段。", "第9页", 2, false, 23, 37, 3, ["SFT", "Multimodality"]],
  ["multimodality", "Multimodality", "多模态", "model", "让模型联合理解或生成文本、图像、音频等多种信息。", "第14页", 2, false, 31, 29, 3, ["Embedding", "Tool Use"]],

  ["context-window", "Context Window", "上下文窗口", "context", "单次推理中模型可以直接处理的信息容量。", "第6页", 3, true, 34, 8, 2, ["Token", "Compaction"]],
  ["rag", "RAG", "检索增强生成", "context", "先检索外部资料，再把结果放进上下文辅助生成。", "第17页", 3, true, 47, 8, 2, ["Retrieval", "Vector Database"]],
  ["chunk", "Chunk", "文本分块", "context", "把长文档切成适合检索与送入模型的小段。", "第24页", 2, false, 30, 20, 3, ["Embedding", "RAG"]],
  ["vector-database", "Vector Database", "向量数据库", "context", "存储向量并按语义相似度检索内容的数据库。", "第25页", 2, true, 49, 20, 3, ["Embedding", "Hybrid Search"]],
  ["hybrid-search", "Hybrid Search", "混合检索", "context", "组合关键词检索与向量检索，兼顾精确匹配和语义召回。", "第26页", 2, false, 27, 31, 3, ["Vector Database", "Reranking"]],
  ["reranking", "Reranking", "重排序", "context", "对初步召回结果再次评分，选出更相关的材料。", "第27页", 2, false, 45, 30, 3, ["Retrieval Eval", "RAG"]],
  ["context-management", "Context Management", "上下文管理", "context", "在有限窗口内组织、筛选和更新任务信息。", "第38页", 3, false, 55, 13, 2, ["Memory", "Compaction"]],
  ["memory", "Memory", "记忆", "context", "跨轮次保存用户偏好、事实和任务状态的机制。", "第40页", 3, true, 55, 27, 2, ["Context Management", "Structured Notes"]],

  ["system-prompt", "System Prompt", "系统提示词", "prompt", "为模型设定角色、原则、边界和长期行为的高优先级指令。", "第18页", 3, true, 58, 7, 2, ["Meta Prompting", "Guardrails"]],
  ["few-shot", "Few-shot", "少样本示例", "prompt", "用少量输入输出示例向模型展示任务规律。", "第19页", 3, true, 71, 7, 2, ["System Prompt", "Structured Outputs"]],
  ["chain-of-thought", "Chain-of-thought", "思维链", "prompt", "通过中间推理步骤提高复杂问题处理能力的方法。", "第20页", 2, true, 76, 18, 3, ["Reasoning", "Reflection"]],
  ["structured-outputs", "Structured Outputs", "结构化输出", "prompt", "约束模型按照JSON Schema等固定结构返回结果。", "第21页", 3, true, 60, 20, 2, ["JSON Schema", "Function Calling"]],
  ["prompt-caching", "Prompt Caching", "提示缓存", "prompt", "复用重复提示前缀的计算结果以降低延迟和成本。", "第22页", 2, false, 72, 30, 3, ["Context Window", "KV Cache"]],
  ["meta-prompting", "Meta Prompting", "元提示", "prompt", "让模型帮助设计、检查或改写提示词。", "第23页", 2, false, 56, 31, 3, ["System Prompt", "Evaluation"]],
  ["query-rewrite", "Query Rewrite", "查询改写", "prompt", "把用户问题改写为更适合检索或执行的查询。", "第29页", 2, false, 80, 28, 3, ["RAG", "Hybrid Search"]],
  ["prompt-injection", "Prompt Injection", "提示注入", "prompt", "通过恶意内容诱导模型忽略原有指令或泄露信息。", "第72页", 3, false, 82, 11, 2, ["Guardrails", "Model Jailbreaking"]],

  ["tool-calling", "Tool Calling", "工具调用", "tool", "模型根据任务选择工具并生成调用参数。", "第15页", 3, true, 90, 20, 2, ["Function Calling", "ReAct"]],
  ["tool-use", "Tool Use", "工具使用", "tool", "模型读取工具结果并继续推理或采取下一步动作。", "第16页", 3, true, 94, 32, 2, ["Tool Calling", "Planning"]],
  ["function-calling", "Function Calling", "函数调用", "tool", "以结构化函数名和参数连接模型与程序能力。", "第31页", 3, true, 78, 38, 2, ["Structured Outputs", "API"]],
  ["react", "ReAct", "推理与行动", "tool", "在推理、调用工具和观察结果之间循环推进任务。", "第32页", 3, true, 93, 45, 2, ["Planning", "Reflection"]],
  ["planning", "Planning", "任务规划", "tool", "把目标拆成可执行步骤并根据结果调整顺序。", "第33页", 2, false, 77, 50, 3, ["ReAct", "Multi-agent"]],
  ["reflection", "Reflection", "反思", "tool", "检查中间结果、发现错误并修正下一步策略。", "第34页", 2, false, 92, 56, 3, ["Evaluation", "ReAct"]],
  ["computer-use", "Computer Use", "电脑操作", "tool", "让Agent理解并操作浏览器或桌面软件界面。", "第36页", 3, false, 84, 27, 2, ["Tool Use", "Human-in-the-loop"]],
  ["human-in-loop", "Human-in-the-loop", "人在回路", "tool", "在关键决策或高风险动作前引入人的确认和纠偏。", "第37页", 3, false, 96, 64, 2, ["Guardrails", "Planning"]],

  ["endpoint", "Endpoint", "接口端点", "api", "某项服务可被调用的具体URL与操作入口。", "项目既有API教学框架", 3, true, 91, 72, 2, ["Request", "Authentication"]],
  ["request", "Request", "请求", "api", "客户端发送给服务端的参数、指令和上下文。", "项目既有API教学框架", 3, true, 78, 63, 2, ["Endpoint", "Response"]],
  ["response", "Response", "响应", "api", "服务端返回的状态、结果、错误或流式事件。", "项目既有API教学框架", 3, true, 95, 79, 2, ["Request", "Streaming"]],
  ["authentication", "Authentication", "身份认证", "api", "通过API Key或令牌验证调用者身份与权限。", "项目既有API教学框架", 3, true, 73, 75, 2, ["Rate Limit", "Guardrails"]],
  ["api-key", "API Key", "接口密钥", "api", "用于识别调用者、校验权限并关联用量或计费的秘密凭证。", "项目既有API安全教学框架", 3, true, 82, 91, 2, ["Authentication", "Rate Limit", "Environment Variable"]],
  ["rate-limit", "Rate Limit", "速率限制", "api", "限制单位时间内调用次数或资源消耗的规则。", "项目既有API教学框架", 2, false, 87, 88, 3, ["Authentication", "Cost Tracking"]],
  ["sdk", "SDK", "开发工具包", "api", "封装接口细节、帮助开发者快速调用服务的代码库。", "项目既有API教学框架", 2, false, 72, 89, 3, ["Endpoint", "Streaming"]],
  ["streaming", "Streaming", "流式返回", "api", "服务端逐段发送生成结果，降低用户等待感。", "项目既有API教学框架；PDF第55页", 2, false, 98, 91, 3, ["Response", "vLLM"]],
  ["json-schema", "JSON Schema", "JSON结构约束", "api", "定义结构化数据字段、类型和必填规则的规范。", "第21、31页", 2, false, 81, 82, 3, ["Structured Outputs", "Function Calling"]],

  ["mcp-host", "MCP Host", "MCP宿主", "mcp", "承载模型、协调多个MCP客户端的应用程序。", "第41页", 3, true, 68, 91, 2, ["MCP Client", "MCP Server"]],
  ["mcp-client", "MCP Client", "MCP客户端", "mcp", "在宿主中与一个MCP Server维持连接的协议组件。", "第41页", 3, true, 57, 93, 2, ["MCP Host", "Transport"]],
  ["mcp-server", "MCP Server", "MCP服务端", "mcp", "通过MCP向Agent暴露工具、资源和提示模板的服务。", "第41页", 3, true, 70, 78, 2, ["Tools Registry", "Resources"]],
  ["mcp-tools", "Tools Registry", "工具注册表", "mcp", "声明可调用工具及其参数结构的能力清单。", "第41页", 2, true, 51, 84, 3, ["MCP Server", "Function Calling"]],
  ["mcp-resources", "Resources", "资源", "mcp", "由服务端提供、可读取的文件、数据或上下文对象。", "第41页", 2, false, 65, 69, 3, ["MCP Server", "RAG"]],
  ["mcp-prompts", "Prompts", "提示模板", "mcp", "服务端提供的可复用提示模板和参数化工作入口。", "第41页", 2, false, 48, 74, 3, ["MCP Server", "Skill"]],
  ["mcp-sampling", "Sampling", "采样请求", "mcp", "由服务端请求宿主模型参与生成的一种协议能力。", "第41页", 1, false, 78, 96, 3, ["MCP Host", "Sampling"]],
  ["mcp-transport", "Transport", "传输层", "mcp", "通过stdio或HTTP等方式传递MCP消息。", "第41页", 2, false, 54, 70, 3, ["MCP Client", "MCP Server"]],

  ["sop", "SOP", "标准操作流程", "skill", "把任务步骤、判断点和交付标准写成稳定流程。", "项目既有Skill案例", 3, true, 30, 92, 2, ["Workflow", "Evaluation Rubric"]],
  ["references", "References", "参考资料", "skill", "为特定任务准备的规则、知识、范例和数据说明。", "项目既有Skill案例", 3, true, 41, 95, 2, ["Templates", "RAG"]],
  ["scripts", "Scripts", "脚本", "skill", "把重复、确定的操作固化为可执行程序。", "项目既有Skill案例", 3, true, 26, 80, 2, ["Workflow", "Versioning"]],
  ["workflow", "Workflow", "工作流", "skill", "按顺序连接输入、处理、检查和输出的任务路径。", "项目既有Skill案例；PDF第42页", 3, true, 45, 79, 2, ["SOP", "Agent Harness"]],
  ["reusable-task", "Reusable Task", "可复用任务", "skill", "可在相似场景反复触发、输入输出边界清晰的任务单元。", "项目既有Skill案例", 2, false, 17, 91, 3, ["SOP", "Templates"]],
  ["templates", "Templates", "模板", "skill", "预先定义的内容结构、字段和视觉规范。", "项目既有Skill案例", 2, false, 22, 70, 3, ["References", "Structured Outputs"]],
  ["evaluation-rubric", "Evaluation Rubric", "验收量表", "skill", "把质量要求转成可逐项检查和评分的标准。", "第58、60页", 3, false, 46, 91, 2, ["Benchmarks", "Golden Datasets"]],
  ["versioning", "Versioning", "版本管理", "skill", "记录流程、脚本和资料的变更，使能力可回退和复现。", "项目既有Skill案例", 2, false, 15, 77, 3, ["Scripts", "Regression Tests"]],

  ["agent-harness", "Agent Harness", "Agent运行框架", "harness", "围绕Agent组织上下文、工具、循环、状态与权限的运行外壳。", "第42页", 3, true, 8, 79, 2, ["Context Management", "Observability"]],
  ["compaction", "Compaction", "上下文压缩", "harness", "把长历史压缩为保留关键事实和状态的短摘要。", "第39页", 3, true, 4, 66, 2, ["Context Window", "Memory"]],
  ["jit-retrieval", "Just-in-time Retrieval", "即时检索", "harness", "只在需要时取回最相关的信息，避免上下文长期堆积。", "第43页", 2, true, 19, 60, 3, ["RAG", "Context Management"]],
  ["structured-notes", "Structured Notes", "结构化笔记", "harness", "用固定字段记录事实、决策、待办和任务状态。", "第44页", 2, true, 5, 52, 3, ["Memory", "Compaction"]],
  ["evaluation", "Evaluation", "评估", "harness", "用数据集、指标和人工标准判断系统质量。", "第58、60—65页", 3, false, 21, 49, 2, ["Benchmarks", "Regression Tests"]],
  ["regression-tests", "Regression Tests", "回归测试", "harness", "在版本变化后重复测试，防止旧能力意外退化。", "第62页", 3, false, 5, 91, 2, ["Evaluation", "Versioning"]],
  ["observability", "Observability", "可观测性", "harness", "通过日志、追踪和指标理解Agent每一步发生了什么。", "第66页", 3, false, 24, 63, 2, ["Cost Tracking", "Model Monitoring"]],
  ["guardrails", "Guardrails", "安全护栏", "harness", "在输入、输出和工具动作周围设置安全与合规边界。", "第68—73页", 3, false, 16, 46, 2, ["Prompt Injection", "Human-in-the-loop"]],
];

export const secondaryKnowledgeNodes: AIKnowledgeNode[] = seeds.map((seed) => {
  const [id, label, labelZh, cluster, definition, page, importance, defaultVisible, x, y, depth, relatedConcepts] = seed;
  return {
    id,
    label,
    labelZh,
    category: "secondary",
    definition,
    analogy: clusterAnalogy[cluster],
    role: clusterRole[cluster],
    relatedConcepts,
    importance,
    defaultVisible,
    position: { x, y },
    depth,
    cluster,
    source: page.startsWith("第") ? `${PDF_SOURCE}${page}` : page,
    ...(id === "api-key" ? {
      securityTips: ["不要写进公开代码", "不要上传到GitHub", "使用环境变量或受保护配置", "泄露后立即撤销并轮换"],
      example: "sk-************ABCD",
    } : {}),
  };
});

export const knowledgeUniverse = [...coreConcepts, ...secondaryKnowledgeNodes];

export const knowledgeSourceSummary = {
  file: "AI大模型知识点全景图-73页.pdf",
  pages: 73,
  extractedTopics: 65,
  method: "逐页图像渲染后按主题标题与图示人工校准；PDF为扫描图片，无可提取文字层。",
};
