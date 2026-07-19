import { useState } from "react";
import { Brain, Braces, Eye, FileKey2, MessageSquareText, Network, Play, Wrench } from "lucide-react";
import { assets } from "../../config/assets";
import { Stagger, StaggerItem } from "../ui/Motion";
import { PrismaVideo } from "../ui/PrismaMedia";

export function HumanAgentNetwork({ onStart }: { onStart: () => void }) {
  const nodes = ["人", "Chat", "Agent", "Skill"];
  return (
    <div className="hero-network" aria-label="人、Chat、Agent与Skill流程示意">
      <div className="network-flow" aria-hidden="true">
        {nodes.map((node, index) => (
          <div className="network-step" key={node}>
            <span className="network-index">0{index + 1}</span>
            <span className="network-node">{node}</span>
            {index < nodes.length - 1 && <span className="network-link" />}
          </div>
        ))}
      </div>
      <button className="hero-cta" type="button" onClick={onStart}>
        <Play size={18} fill="currentColor" aria-hidden="true" /> 开始分享
      </button>
    </div>
  );
}

const shiftItems = [
  { name: "生成", text: "生成文字、图片、代码和摘要", icon: MessageSquareText, media: "video" },
  { name: "理解", text: "读取文档、图片、项目文件和历史上下文", icon: Eye, media: assets.prismaOrbit },
  { name: "行动", text: "调用搜索、代码、浏览器、文件与电脑工具", icon: Wrench, media: assets.prismaSignal },
  { name: "持续执行", text: "围绕目标运行多步任务并根据结果调整", icon: Network, media: assets.prismaFrame },
];

export function ShiftRail() {
  return (
    <Stagger className="shift-rail">
      {shiftItems.map(({ name, text, icon: Icon, media }, index) => (
        <StaggerItem className="shift-step" key={name}>
          {media === "video" ? (
            <PrismaVideo className="shift-media" src={assets.prismaSecondaryVideo} label="AI能力演进辅助视频" />
          ) : (
            <img className="shift-media" src={media} alt="" aria-hidden="true" />
          )}
          <div className="shift-shade" aria-hidden="true" />
          <span className="shift-number">0{index + 1}</span>
          <Icon size={25} strokeWidth={1.7} aria-hidden="true" />
          <strong>{name}</strong>
          <p>{text}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function AgentFormula() {
  return (
    <div className="formula-layout">
      <div className="stack-diagram" aria-label="Model、Chat、Agent三层关系">
        <div className="stack-layer stack-agent"><span>上层</span><strong>Agent</strong><p>持续规划 · 调用工具 · 根据结果调整</p></div>
        <div className="stack-layer stack-chat"><span>中层</span><strong>Chat</strong><p>对话 · 文件 · 搜索 · 记忆</p></div>
        <div className="stack-layer stack-model"><span>底层</span><strong>Model / LLM</strong><p>理解 · 推理 · 判断 · 生成</p></div>
      </div>
      <div className="formula-card">
        <div className="formula-heading">Agent</div>
        <div className="formula-equation">
          <div><Brain aria-hidden="true" /><strong>Model</strong><span>大脑</span></div>
          <b>+</b>
          <div><Eye aria-hidden="true" /><strong>Context</strong><span>眼睛</span></div>
          <b>+</b>
          <div><Wrench aria-hidden="true" /><strong>Tools</strong><span>手脚</span></div>
        </div>
      </div>
    </div>
  );
}

const concepts = [
  { name: "Model", text: "AI的理解与决策核心。", analogy: "员工的大脑" },
  { name: "Context", text: "AI当前能够看到的全部材料和状态。", analogy: "摆在桌面的材料" },
  { name: "Prompt", text: "人给AI的目标、要求和约束。", analogy: "任务说明书" },
  { name: "Tool", text: "搜索、代码、文件、浏览器等外部能力。", analogy: "电脑和软件" },
  { name: "API", text: "软件与软件之间沟通的标准接口。", analogy: "服务窗口" },
  { name: "MCP", text: "AI连接外部数据和工具的标准化方式。", analogy: "统一转接头" },
  { name: "Skill", text: "针对一类任务封装的可复用SOP。", analogy: "公司的标准操作手册" },
  { name: "Harness", text: "模型外面的权限、工具、日志、重试、状态与验收系统。", analogy: "办公环境和管理制度" },
];

export function ConceptMap() {
  const [active, setActive] = useState(0);
  const selected = concepts[active];
  return (
    <div className="concept-layout">
      <div className="concept-orbit" role="tablist" aria-label="AI概念">
        <div className="concept-center"><Network aria-hidden="true" /><strong>Agent</strong><span>目标导向的行动系统</span></div>
        {concepts.map((concept, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === index}
            className={`concept-node node-${index + 1} ${active === index ? "active" : ""}`}
            onClick={() => setActive(index)}
            key={concept.name}
          >
            {concept.name}
          </button>
        ))}
      </div>
      <div className="concept-detail" role="tabpanel">
        <span className="detail-kicker">SELECTED CONCEPT</span>
        <strong>{selected.name}</strong>
        <p>{selected.text}</p>
        <div><span>日常类比</span><b>{selected.analogy}</b></div>
      </div>
    </div>
  );
}

export function ApiFlowDiagram() {
  const steps = ["你的程序", "API请求", "AI服务", "模型 / 工具", "返回结果", "文档 / 图片 / 网页"];
  return (
    <div className="api-layout">
      <div className="api-flow">
        {steps.map((step, index) => (
          <div className="api-step" key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>
            {index < steps.length - 1 && <i aria-hidden="true">→</i>}
          </div>
        ))}
      </div>
      <div className="key-panel">
        <div className="key-title"><FileKey2 aria-hidden="true" /><span><strong>API Key</strong><small>身份凭证 + 计费凭证</small></span></div>
        <code>OPENAI_API_KEY=sk-************ABCD</code>
        <div className="fake-key"><Braces size={16} aria-hidden="true" /> 示例Key，不可使用</div>
        <ol>
          <li>不要写进公开代码</li><li>不要上传到GitHub</li><li>保存在环境变量或受保护配置中</li>
        </ol>
      </div>
    </div>
  );
}

const trendItems = [
  ["Long-running Work", "更长时间、多步骤任务"],
  ["Parallel Agents", "隔离环境并行推进"],
  ["Computer Use", "理解并操作浏览器和桌面软件"],
  ["Reusable Skills", "流程可封装、安装与共享"],
  ["Human Steering", "审查、调整与批准下一步"],
];

export function TrendRail() {
  return (
    <div className="trend-wrap">
      <Stagger className="trend-rail">
        {trendItems.map(([name, text], index) => (
          <StaggerItem className="trend-item" key={name}>
            <div className="trend-marker"><span>0{index + 1}</span></div>
            <strong>{name}</strong><p>{text}</p>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="codex-strip"><span>近期Codex能力方向</span><p>Windows桌面应用 · Goal Mode · Appshots · 浏览器标注 · Skills · Computer Use · 远程继续任务</p></div>
    </div>
  );
}
