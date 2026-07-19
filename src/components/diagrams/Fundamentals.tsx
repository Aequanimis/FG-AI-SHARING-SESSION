import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Eye,
  MessageSquareText,
  Network,
  Play,
  RefreshCw,
  Route,
  Search,
  Wrench,
} from "lucide-react";
import { assets } from "../../config/assets";
import { Stagger, StaggerItem } from "../ui/Motion";
export { ConceptMap } from "./KnowledgeUniverse";

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

function ShiftVideo({ active }: { active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (active && !reducedMotion) {
      void video.play().catch(() => undefined);
      return;
    }
    video.pause();
    if (video.readyState >= 1) video.currentTime = Math.min(0.12, video.duration || 0.12);
  }, [active, failed]);

  return (
    <div className={`shift-media shift-video ${failed ? "is-fallback" : ""}`} aria-hidden="true">
      {!failed && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={(event) => {
            event.currentTarget.pause();
            event.currentTarget.currentTime = Math.min(0.12, event.currentTarget.duration || 0.12);
          }}
          onError={() => setFailed(true)}
        >
          <source src={assets.prismaSecondaryVideo} type="video/mp4" />
        </video>
      )}
      {failed && <div className="shift-video-fallback"><span>GENERATIVE MOTION</span></div>}
    </div>
  );
}

export function ShiftRail() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);
  const active = hovered ?? focused ?? locked;

  return (
    <Stagger className="shift-rail">
      {shiftItems.map(({ name, text, icon: Icon, media }, index) => (
        <StaggerItem className="shift-step-shell" key={name}>
          <button
            type="button"
            className={`shift-step ${active === index ? "is-active" : ""}`}
            aria-pressed={locked === index}
            aria-label={`0${index + 1} ${name}：${text}`}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setFocused(index)}
            onBlur={() => setFocused(null)}
            onClick={() => setLocked((current) => current === index ? null : index)}
          >
            {media === "video" ? <ShiftVideo active={active === index} /> : <img className="shift-media" src={media} alt="" aria-hidden="true" />}
            <div className="shift-shade" aria-hidden="true" />
            <span className="shift-number">0{index + 1}</span>
            <span className="shift-icon"><Icon size={25} strokeWidth={1.7} aria-hidden="true" /></span>
            <strong>{name}</strong>
            <p>{text}</p>
            <ArrowUpRight className="shift-arrow" size={20} aria-hidden="true" />
          </button>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

const capabilityLayers = [
  {
    id: "model",
    index: "01",
    name: "Model / LLM",
    label: "能力内核",
    tags: "理解 · 推理 · 判断 · 生成",
    text: "模型提供基础智能，但无法自动获得材料和执行权限。",
  },
  {
    id: "chat",
    index: "02",
    name: "Chat",
    label: "人机入口",
    tags: "对话 · 文件 · 搜索 · 记忆",
    text: "Chat让人更方便地使用模型和上下文。",
  },
  {
    id: "agent",
    index: "03",
    name: "Agent",
    label: "任务系统",
    tags: "目标 · 规划 · 工具 · 反馈",
    text: "Agent围绕目标组织模型、上下文和工具完成工作。",
  },
] as const;

const formulaExplanations = {
  model: "能力内核：提供理解、推理、判断与生成能力。",
  chat: "人机入口：把对话、文件、搜索和记忆带进上下文。",
  agent: "任务系统：围绕目标连接能力、材料、工具与反馈循环。",
} as const;

export function AgentFormula() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [locked, setLocked] = useState<string | null>(null);
  const active = hovered ?? focused ?? locked;
  const explanation = formulaExplanations[(active ?? "agent") as keyof typeof formulaExplanations];

  return (
    <Stagger className="formula-layout">
      <StaggerItem className="stack-diagram">
        <div className="axis-heading"><span>CAPABILITY AXIS</span><b>能力内核 → 人机入口 → 任务系统</b></div>
        <div className="capability-spine" aria-hidden="true"><i /><i /><i /></div>
        <div className="capability-layers" aria-label="Model、Chat、Agent三层连续关系">
          {capabilityLayers.map((layer) => (
            <button
              type="button"
              className={`stack-layer stack-${layer.id} ${active === layer.id ? "is-active" : ""}`}
              data-layer={layer.id}
              aria-pressed={locked === layer.id}
              onMouseEnter={() => setHovered(layer.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setFocused(layer.id)}
              onBlur={() => setFocused(null)}
              onClick={() => setLocked((current) => current === layer.id ? null : layer.id)}
              key={layer.id}
            >
              <span className="layer-index">{layer.index}</span>
              <span className="layer-copy"><small>{layer.label}</small><strong>{layer.name}</strong><b>{layer.tags}</b><p>{layer.text}</p></span>
              <ArrowUpRight aria-hidden="true" />
            </button>
          ))}
        </div>
      </StaggerItem>

      <StaggerItem className="formula-system-wrap">
        <div className="formula-card" data-active={active ?? "idle"}>
          <div className="formula-heading"><span>Agent</span><b>=</b><small>GOAL-DRIVEN SYSTEM</small></div>
          <div className="formula-track" aria-hidden="true"><span /><i /><i /><i /></div>
          <div className="formula-equation">
            <div className="formula-module module-model"><Brain aria-hidden="true" /><span><small>大脑</small><strong>Model</strong><b>理解与决策</b></span></div>
            <div className="formula-plus">+</div>
            <div className="formula-module module-context"><Eye aria-hidden="true" /><span><small>眼睛</small><strong>Context</strong><b>材料、记忆与状态</b></span></div>
            <div className="formula-plus">+</div>
            <div className="formula-module module-tools"><Wrench aria-hidden="true" /><span><small>手脚</small><strong>Tools</strong><b>搜索、代码与执行</b></span></div>
          </div>
          <div className="formula-explainer"><span>{explanation}</span></div>
          <div className="agent-loop" aria-label="Agent运行循环：观察、规划、行动、验证、调整">
            {[
              ["观察", "Observe", Search],
              ["规划", "Plan", Route],
              ["行动", "Act", ArrowUpRight],
              ["验证", "Verify", CheckCircle2],
              ["调整", "Adjust", RefreshCw],
            ].map(([name, english, Icon], index) => (
              <div className="loop-node" key={String(name)}><Icon aria-hidden="true" /><span><strong>{String(name)}</strong><small>{String(english)}</small></span>{index < 4 && <i aria-hidden="true">→</i>}</div>
            ))}
          </div>
        </div>
      </StaggerItem>
    </Stagger>
  );
}

const concepts = [
  { name: "Model", zh: "模型", text: "AI负责理解、推理、判断与生成的能力核心。", analogy: "员工的大脑", role: "决定Agent能否理解问题并作出可靠决策。", related: ["Token", "Transformer", "Reasoning", "Multimodality"], satellites: ["Token", "Embedding", "Transformer", "Attention"] },
  { name: "Context", zh: "上下文", text: "AI在当前决策时能够看到的全部信息。", analogy: "摆在员工桌面上的材料", role: "决定Agent能看到哪些文件、规则、历史记录和任务状态。", related: ["Memory", "RAG", "Context Window", "State"], satellites: ["Context Window", "Memory", "RAG", "Retrieval"] },
  { name: "Prompt", zh: "提示词", text: "人给AI的目标、要求、边界与输出方式。", analogy: "任务说明书", role: "把人的意图转成Agent可执行、可检查的指令。", related: ["System Prompt", "Few-shot", "Chain-of-thought", "Structured Outputs"], satellites: ["System Prompt", "Few-shot", "Chain-of-thought", "Structured Outputs"] },
  { name: "Tool", zh: "工具", text: "让AI能够搜索、读取、计算和操作外部环境的能力。", analogy: "员工的电脑和软件", role: "把模型的判断转化为真实世界中的动作。", related: ["Tool Calling", "Browser", "File", "Computer Use"], satellites: ["Tool Calling", "Browser", "File", "Computer Use"] },
  { name: "API", zh: "应用程序接口", text: "软件与软件之间交换请求和结果的标准窗口。", analogy: "对外服务窗口", role: "让产品以稳定、可编程的方式调用模型或其他服务。", related: ["SDK", "Request", "Response", "Rate Limit"], satellites: ["SDK", "Request / Response", "Function Calling", "Rate Limit"] },
  { name: "MCP", zh: "模型上下文协议", text: "AI连接外部数据、工具与服务的一种标准化协议。", analogy: "统一规格的转接头", role: "减少Agent接入不同工具和数据源时的重复适配。", related: ["Protocol", "Tools Registry", "External Services", "Shared Context"], satellites: ["Protocol", "Tools Registry", "External Services", "Shared Context"] },
  { name: "Skill", zh: "技能", text: "针对一类任务封装的可复用流程、资料与脚本。", analogy: "公司的标准操作手册", role: "让Agent按稳定方法重复完成某一类工作。", related: ["SOP", "References", "Scripts", "Workflow"], satellites: ["SOP", "References", "Scripts", "Reusable Task"] },
  { name: "Harness", zh: "运行与验收环境", text: "包围模型的权限、状态、日志、重试、评估与质量系统。", analogy: "办公环境和管理制度", role: "确保Agent可以被管理、追踪、复现和验收。", related: ["Evaluation", "Benchmark", "QA", "Run Log"], satellites: ["Evaluation", "Benchmark", "Regression", "Run Log"] },
] as const;

const conceptPositions = [
  { x: 18, y: 19, angle: -148, length: 36 },
  { x: 50, y: 11, angle: -90, length: 39 },
  { x: 82, y: 19, angle: -32, length: 36 },
  { x: 90, y: 50, angle: 0, length: 40 },
  { x: 80, y: 82, angle: 40, length: 38 },
  { x: 50, y: 90, angle: 90, length: 40 },
  { x: 20, y: 82, angle: 140, length: 38 },
  { x: 10, y: 50, angle: 180, length: 40 },
] as const;

const satelliteOffsets = [[-58, -38], [48, -35], [-70, 40], [58, 42]] as const;
const universeDust = Array.from({ length: 30 }, (_, index) => ({
  left: `${(index * 37 + 11) % 97}%`,
  top: `${(index * 53 + 17) % 93}%`,
  delay: `${(index % 7) * .41}s`,
  size: `${index % 5 === 0 ? 3 : 1.5}px`,
}));

export function LegacyConceptMap() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);
  const active = hovered ?? focused ?? locked;
  const selected = active === null ? null : concepts[active];

  return (
    <div className="concept-layout">
      <div
        className={`concept-orbit concept-universe ${active !== null ? "has-active" : ""}`}
        role="tablist"
        aria-label="以Agent为中心的AI知识宇宙"
        onMouseLeave={() => setHovered(null)}
        onClick={(event) => {
          if (!(event.target as HTMLElement).closest("button")) setLocked(null);
        }}
      >
        <div className="universe-nebula" aria-hidden="true" />
        <div className="universe-dust" aria-hidden="true">
          {universeDust.map((star, index) => <i key={index} style={{ left: star.left, top: star.top, animationDelay: star.delay, width: star.size, height: star.size }} />)}
        </div>
        <div className="universe-orbit orbit-a" aria-hidden="true" />
        <div className="universe-orbit orbit-b" aria-hidden="true" />
        {conceptPositions.map((position, index) => (
          <div
            className={`concept-connection ${active === index ? "is-active" : ""}`}
            style={{ "--line-angle": `${position.angle}deg`, "--line-length": `${position.length}%` } as CSSProperties}
            aria-hidden="true"
            key={`line-${concepts[index].name}`}
          />
        ))}
        <button className="concept-center" type="button" onClick={() => setLocked(null)} aria-label="恢复Agent知识宇宙全局视图">
          <span className="agent-energy" aria-hidden="true" />
          <Network aria-hidden="true" /><strong>Agent</strong><span>目标导向的行动系统</span>
        </button>
        {concepts.map((concept, index) => (
          <div className={`concept-cluster cluster-${index + 1} ${active === index ? "is-active" : ""}`} key={concept.name}>
            <button
              type="button"
              role="tab"
              aria-selected={active === index}
              className={`concept-node concept-star node-${index + 1} ${active === index ? "active" : ""}`}
              style={{ left: `${conceptPositions[index].x}%`, top: `${conceptPositions[index].y}%` }}
              onMouseEnter={() => setHovered(index)}
              onFocus={() => setFocused(index)}
              onBlur={() => setFocused(null)}
              onClick={() => setLocked((current) => current === index ? null : index)}
            >
              <span className="concept-star-core" aria-hidden="true" />
              <strong>{concept.name}</strong><small>{concept.zh}</small>
            </button>
            {concept.satellites.map((satellite, satelliteIndex) => (
              <span
                className="concept-satellite"
                style={{
                  left: `calc(${conceptPositions[index].x}% + ${satelliteOffsets[satelliteIndex][0]}px)`,
                  top: `calc(${conceptPositions[index].y}% + ${satelliteOffsets[satelliteIndex][1]}px)`,
                }}
                key={satellite}
              ><i aria-hidden="true" /><b>{satellite}</b></span>
            ))}
          </div>
        ))}
      </div>
      <div className="concept-detail" role="tabpanel">
        <span className="detail-kicker">{selected ? "STAR MAP EXPLAINER" : "KNOWLEDGE UNIVERSE"}</span>
        <div className="detail-name"><strong>{selected?.name ?? "Agent"}</strong><span>{selected?.zh ?? "智能体"}</span></div>
        <p>{selected?.text ?? "围绕目标组织模型、上下文、指令、工具与工作环境，并通过反馈循环持续推进任务。"}</p>
        <dl>
          <div><dt>日常类比</dt><dd>{selected?.analogy ?? "一名在完整工作环境中执行任务的员工"}</dd></div>
          <div><dt>在Agent系统中的作用</dt><dd>{selected?.role ?? "把八个概念连接成一个可以理解、行动、验证和调整的工作系统。"}</dd></div>
        </dl>
        <div className="detail-related"><span>RELATED STARS</span><p>{(selected?.related ?? ["Model", "Context", "Prompt", "Tools"]).map((item) => <b key={item}>{item}</b>)}</p></div>
      </div>
    </div>
  );
}
