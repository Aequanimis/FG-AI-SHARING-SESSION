import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleDashed,
  FileCheck2,
  FileOutput,
  FileText,
  Image,
  LockKeyhole,
  Play,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Upload,
  Workflow,
  XCircle,
} from "lucide-react";
import { approvedIciOutline, iciTaskPrompt, initialIciOutline, outlineRevisions } from "../../content/ici-outline-demo";
import { engineeringControls } from "../../content/engineering-controls";
import {
  buildSteps,
  deliveryFormats,
  iciCompleted,
  iciEvidence,
  iciPending,
  materialScanSteps,
  part3Progress,
  productionPipeline,
  researchPipeline,
  visualRoutes,
  type PipelineNode,
  type RouteId,
} from "../../content/part3-demo";

type DemoState = {
  materialLoaded: boolean;
  taskSent: boolean;
  outlineRevised: boolean;
  outlineApproved: boolean;
  selectedRoute: RouteId | null;
  buildStarted: boolean;
};

const defaultDemoState: DemoState = {
  materialLoaded: false,
  taskSent: false,
  outlineRevised: false,
  outlineApproved: false,
  selectedRoute: null,
  buildStarted: false,
};

const storageKey = "fg-part3-demo-state";
let memoryState = defaultDemoState;

const readDemoState = () => {
  try {
    const saved = window.localStorage.getItem(storageKey);
    memoryState = saved ? { ...defaultDemoState, ...JSON.parse(saved) as Partial<DemoState> } : memoryState;
  } catch {
    memoryState = { ...memoryState };
  }
  return memoryState;
};

const writeDemoState = (patch: Partial<DemoState>) => {
  memoryState = { ...readDemoState(), ...patch };
  try { window.localStorage.setItem(storageKey, JSON.stringify(memoryState)); } catch { /* local simulation remains usable */ }
  window.dispatchEvent(new CustomEvent("fg-part3-demo-change"));
};

function usePart3DemoState() {
  const [state, setState] = useState<DemoState>(() => readDemoState());
  useEffect(() => {
    const sync = () => setState({ ...readDemoState() });
    window.addEventListener("fg-part3-demo-change", sync);
    return () => window.removeEventListener("fg-part3-demo-change", sync);
  }, []);
  return [state, writeDemoState] as const;
}

function WorkspaceProgress({ stage }: { stage: number }) {
  return <div className="workspace-progress" aria-label={`当前阶段：${part3Progress[stage]}`}>
    {part3Progress.map((item, index) => <div className={`${index < stage ? "is-done" : ""} ${index === stage ? "is-current" : ""}`} key={item}>
      <span>{index < stage ? <Check size={12} /> : String(index + 1).padStart(2, "0")}</span><b>{item}</b>{index < part3Progress.length - 1 && <ArrowRight size={13} />}
    </div>)}
  </div>;
}

function WorkspaceShell({ stage, left, right }: { stage: number; left: ReactNode; right: ReactNode }) {
  return <div className="ai-workspace" data-stage={part3Progress[stage]}>
    <WorkspaceProgress stage={stage} />
    <div className="workspace-body">
      <section className="workspace-conversation" aria-label="任务对话与状态"><header><span><i />ICI · CHAPTER 4</span><small>AI WORKSPACE</small></header>{left}</section>
      <section className="artifact-canvas" aria-label="Artifact Canvas"><header><span>ARTIFACT CANVAS</span><small>PUBLIC RESEARCH TASK</small></header>{right}</section>
    </div>
  </div>;
}

function FileContextCard({ compact = false }: { compact?: boolean }) {
  return <div className={`part3-file-card ${compact ? "is-compact" : ""}`}>
    <FileText aria-hidden="true" /><div><strong>ICI 2026 Investment Company Fact Book.pdf</strong><p><span>PDF</span><span>PUBLIC SOURCE</span><span>CHAPTER 4</span></p></div><CheckCircle2 aria-label="已加入上下文" />
  </div>;
}

export function MaterialUploadScene() {
  const [state, update] = usePart3DemoState();
  const [scanStep, setScanStep] = useState(state.taskSent ? materialScanSteps.length : 0);
  useEffect(() => {
    if (!state.taskSent || scanStep >= materialScanSteps.length) return;
    const timer = window.setTimeout(() => setScanStep((value) => value + 1), 480);
    return () => window.clearTimeout(timer);
  }, [scanStep, state.taskSent]);
  const reset = () => { memoryState = { ...defaultDemoState }; try { window.localStorage.removeItem(storageKey); } catch { /* no-op */ } window.dispatchEvent(new CustomEvent("fg-part3-demo-change")); setScanStep(0); };
  const left = <div className="material-conversation">
    <div className="conversation-empty"><Sparkles /><strong>{state.taskSent ? "材料已进入研究上下文" : "从材料和问题开始"}</strong><p>{state.taskSent ? "正在把第四章从原始报告目录转成可讨论的研究问题。" : "当前阶段只理解材料并生成大纲，不直接制作PPT。"}</p></div>
    {state.taskSent && <div className="message-bubble is-user"><small>YOU · OUTLINE ONLY</small><p>{iciTaskPrompt}</p></div>}
    <div className={`workspace-composer ${state.materialLoaded ? "has-file" : ""}`}>
      {state.materialLoaded && <FileContextCard />}
      <p>{state.materialLoaded ? iciTaskPrompt : "输入分析思路，或加载预设演示任务…"}</p>
      <div><button type="button" onClick={() => update({ materialLoaded: true })}><Upload size={15} />上传文件</button>
        {!state.materialLoaded && <button className="is-primary" type="button" onClick={() => update({ materialLoaded: true })}>加载ICI演示任务</button>}
        {state.materialLoaded && !state.taskSent && <button className="is-primary" type="button" onClick={() => { update({ taskSent: true }); setScanStep(0); }}><Send size={15} />发送并分析</button>}
        {state.taskSent && <button type="button" onClick={reset}><RefreshCw size={14} />Reset Demo</button>}</div>
    </div>
  </div>;
  const right = <div className={`material-artifact ${state.taskSent ? "is-scanning" : ""}`}>
    <div className="artifact-grid" aria-hidden="true" />
    <div className="document-ghost"><FileText /><span>{state.materialLoaded ? "CHAPTER 4" : "WAITING FOR MATERIALS"}</span><small>{state.materialLoaded ? "EXCHANGE-TRADED FUNDS" : "DROP A PUBLIC RESEARCH FILE"}</small></div>
    {state.taskSent && <><div className="scan-beam" aria-hidden="true" /><div className="page-particles" aria-hidden="true">{[63, 65, 67, 70, 72, 75, 78, 81].map((page) => <i key={page}>P.{page}</i>)}</div>
      <div className="scan-status">{materialScanSteps.map((item, index) => <span className={index < scanStep ? "done" : index === scanStep ? "current" : ""} key={item}>{index < scanStep ? <Check /> : <CircleDashed />}{item}</span>)}</div></>}
  </div>;
  return <WorkspaceShell stage={0} left={left} right={right} />;
}

export function OutlineApprovalScene() {
  const [state, update] = usePart3DemoState();
  const revised = state.outlineRevised || state.outlineApproved;
  const left = <div className="outline-conversation">
    <FileContextCard compact />
    <div className="ai-analysis-stack">
      <div><span>01</span><p><strong>材料理解</strong>ETF同时服务短期交易、风险转移和长期配置。</p></div>
      <div><span>02</span><p><strong>核心问题</strong>高频交易为何没有同比例冲击底层资产？</p></div>
      <div className="active"><span>03</span><p><strong>{revised ? "研究问题链" : "AI初版大纲"}</strong>{revised ? "从统计目录转向机制解释。" : "正确、完整，但仍像原报告目录。"}</p></div>
    </div>
    <div className="outline-actions">
      {!revised && <button type="button" onClick={() => update({ outlineRevised: true })}><Sparkles size={15} />演示三处叙事修改</button>}
      {revised && !state.outlineApproved && <button className="is-approval" type="button" onClick={() => update({ outlineApproved: true })}><LockKeyhole size={15} />确认研究大纲</button>}
      {state.outlineApproved && <span><CheckCircle2 />OUTLINE APPROVED</span>}
    </div>
  </div>;
  const shown = state.outlineApproved ? approvedIciOutline : initialIciOutline;
  const right = <div className={`outline-board ${revised ? "is-revised" : ""} ${state.outlineApproved ? "is-approved" : ""}`}>
    <div className="outline-track" aria-hidden="true" />
    {shown.map((title, index) => {
      const revision = outlineRevisions.find((item) => item.index === index);
      const changed = revised && Boolean(revision) && !state.outlineApproved;
      return <div className={`outline-item ${changed ? "is-changed" : ""}`} style={{ "--outline-index": index } as CSSProperties} key={`${index}-${title}`}>
        <span>{String(index + 1).padStart(2, "0")}</span><p>{changed && <del>{revision?.from}</del>}<strong>{changed ? revision?.to : title}</strong></p><i />
      </div>;
    })}
    <div className="outline-board-status"><b>{state.outlineApproved ? "APPROVED RESEARCH STORY" : revised ? "STATISTICS → QUESTION CHAIN" : "AI DRAFT · 09 PAGES"}</b><span>{state.outlineApproved ? "10页确认版" : revised ? "3处关键叙事修改" : "等待用户判断"}</span></div>
  </div>;
  return <WorkspaceShell stage={1} left={left} right={right} />;
}

export function VisualRouteSelector() {
  const [state, update] = usePart3DemoState();
  const selected = state.selectedRoute;
  const left = <div className="route-conversation">
    <FileContextCard compact />
    <div className="message-bubble is-ai"><small>AI · VISUAL EXPLORATION</small><p>大纲已经确认。我将基于同一品牌骨架，为代表页生成三种正文视觉路线。</p></div>
    <div className="route-preflight">{["读取品牌规则", "锁定标题区域", "锁定来源与页码", "生成A / B / C视觉路线"].map((item, index) => <span className={index < 3 ? "done" : "running"} key={item}>{index < 3 ? <Check /> : <Sparkles />}{item}</span>)}</div>
    {selected ? <div className="route-choice"><span>SELECTED ROUTE</span><strong>{selected}｜{visualRoutes.find((route) => route.id === selected)?.title}</strong><button type="button" onClick={() => update({ selectedRoute: null })}>重新选择</button></div> : <button className="select-b-demo" type="button" onClick={() => update({ selectedRoute: "B", outlineApproved: true })}>现场选择 B｜机制解释型</button>}
  </div>;
  const right = <div className={`visual-route-stage ${selected ? "has-selection" : ""}`}>
    {visualRoutes.map((route, index) => <button type="button" aria-pressed={selected === route.id} className={`route-card route-${route.id.toLowerCase()} ${selected === route.id ? "is-selected" : ""}`} onClick={() => update({ selectedRoute: route.id, outlineApproved: true })} style={{ "--route-index": index } as CSSProperties} key={route.id}>
      <div className="route-image"><img src={route.asset} alt={`${route.id}方案：${route.title}`} /><span>{route.recommended ? "RECOMMENDED" : "VISUAL ROUTE"}</span></div>
      <div><span>{route.id}</span><p><strong>{route.title}</strong><small>{route.note}</small></p><i>{selected === route.id ? "SELECTED ROUTE" : "VIEW ROUTE"}</i></div>
    </button>)}
  </div>;
  return <WorkspaceShell stage={2} left={left} right={right} />;
}

export function SelectedRouteBuild() {
  const [state, update] = usePart3DemoState();
  const [completed, setCompleted] = useState(state.buildStarted ? 5 : 2);
  const selectedRoute = visualRoutes.find((route) => route.id === (state.selectedRoute ?? "B")) ?? visualRoutes[1];
  useEffect(() => {
    if (!state.buildStarted || completed >= buildSteps.length - 1) return;
    const timer = window.setTimeout(() => setCompleted((value) => value + 1), 520);
    return () => window.clearTimeout(timer);
  }, [completed, state.buildStarted]);
  const left = <div className="build-conversation">
    <div className="message-bubble is-user"><small>YOU · ROUTE SELECTION</small><p>选择B｜机制解释型。请保持这一视觉方向继续生成。</p></div>
    <div className="message-bubble is-ai"><small>AI · DIRECTION LOCKED</small><p>已锁定机制解释型，将以“二级市场—一级市场申赎—底层资产”为机制主轴继续生成。</p></div>
    <div className="build-status-list">{buildSteps.map((item, index) => <span className={index < completed ? "done" : index === completed ? "running" : ""} key={item}>{index < completed ? <Check /> : index === completed ? <Sparkles /> : <CircleDashed />}{item}</span>)}</div>
    {!state.buildStarted && <button className="build-run" type="button" onClick={() => { update({ selectedRoute: "B", buildStarted: true }); setCompleted(2); }}><Play size={15} />运行生成演示</button>}
  </div>;
  const right = <div className="selected-build-artifact">
    <div className="slide-stack" aria-label="选定的机制解释型代表页"><i /><i /><div><img src={selectedRoute.asset} alt="B方案机制解释型代表页" /><span>ROUTE B · MECHANISM</span></div></div>
    <div className="delivery-formats">{deliveryFormats.map((item) => <div className={`format-${item.id}`} key={item.id}>{item.id === "preview" ? <Image /> : item.id === "vector" ? <FileOutput /> : <FileCheck2 />}<p><strong>{item.title}</strong><span>{item.format}</span><small>{item.note}</small></p><em>{item.status}</em></div>)}</div>
  </div>;
  return <WorkspaceShell stage={3} left={left} right={right} />;
}

function PipelineButton({ node, active, onActivate }: { node: PipelineNode; active: boolean; onActivate: () => void }) {
  return <button type="button" className={`${active ? "is-active" : ""} ${node.gate ? "is-gate" : ""}`} onMouseEnter={onActivate} onFocus={onActivate} onClick={onActivate}>
    <small>{node.owner}</small><strong>{node.label}</strong>{node.gate && <em>{node.gate}</em>}
  </button>;
}

export function ProductionPipelineBlueprint() {
  const allNodes = [...researchPipeline, ...productionPipeline];
  const [activeId, setActiveId] = useState("outline-gate");
  const active = allNodes.find((node) => node.id === activeId) ?? allNodes[0];
  return <div className="pipeline-blueprint">
    <div className="workspace-curtain left"><span>CONVERSATION LAYER</span></div><div className="workspace-curtain right"><span>ARTIFACT LAYER</span></div>
    <header><Workflow /><div><span>PIPELINE BLUEPRINT · STATEFUL PRODUCTION</span><strong>前台对话被打开，露出后台生产系统</strong></div><small>REAL SKILL STRUCTURE</small></header>
    <div className="pipeline-lanes">
      <section><label>UPPER LAYER · RESEARCH &amp; DECISION</label><div>{researchPipeline.map((node) => <PipelineButton node={node} active={activeId === node.id} onActivate={() => setActiveId(node.id)} key={node.id} />)}</div></section>
      <div className="integrity-line"><span>SOURCE &amp; DATA INTEGRITY LINE</span>{["数字", "单位", "时间", "口径", "来源"].map((item) => <i key={item}>{item}</i>)}</div>
      <section><label>LOWER LAYER · VISUAL &amp; DELIVERY</label><div>{productionPipeline.map((node) => <PipelineButton node={node} active={activeId === node.id} onActivate={() => setActiveId(node.id)} key={node.id} />)}</div></section>
    </div>
    <aside className="pipeline-inspector"><span>{active.owner} · {active.gate ?? "CONTROLLED STEP"}</span><strong>{active.label}</strong><dl><div><dt>INPUT</dt><dd>{active.input}</dd></div><div><dt>OUTPUT</dt><dd>{active.output}</dd></div><div><dt>FAILURE PATH</dt><dd>{active.failure}</dd></div></dl></aside>
  </div>;
}

export function IciEvidenceWall() {
  return <div className="ici-evidence-wall">
    <section className="ici-source-panel"><div className="ici-cover-placeholder"><span>ICI</span><strong>2026<br />INVESTMENT<br />COMPANY<br />FACT BOOK</strong><small>PUBLIC SOURCE · ABSTRACT COVER SLOT</small></div><p><b>CHAPTER 4</b><span>Exchange-Traded Funds</span></p></section>
    <section className="evidence-chain"><header><span>RESEARCH EVIDENCE CHAIN</span><strong>真实材料如何变成研究叙事</strong></header>{iciEvidence.map((item, index) => <div key={item.label}><p><strong>{item.value}</strong><em>{item.unit}</em><span>{item.label}</span></p>{index < iciEvidence.length - 1 && <ArrowRight />}</div>)}</section>
    <section className="evidence-artifacts"><div className="evidence-route"><img src="/assets/part3/visual-routes/route-b-mechanism.png" alt="已生成的B方案机制解释型代表视觉" /><span>SELECTED ROUTE · B</span></div><div className="evidence-placeholders"><div><FileText /><strong>ici-outline</strong><span>13页研究叙事 · 结构记录</span></div><div><ShieldCheck /><strong>qa-result</strong><span>全套跨页QA · 尚未完成</span></div></div></section>
    <div className="evidence-status"><section className="done"><header><CheckCircle2 /><strong>已完成</strong></header>{iciCompleted.map((item) => <span key={item}><Check />{item}</span>)}</section><section className="pending"><header><CircleDashed /><strong>尚未完成</strong></header>{iciPending.map((item) => <span key={item}><CircleDashed />{item}</span>)}</section></div>
  </div>;
}

export function EngineeringControlRoom() {
  const [activeId, setActiveId] = useState(engineeringControls[3].id);
  const active = useMemo(() => engineeringControls.find((item) => item.id === activeId) ?? engineeringControls[0], [activeId]);
  return <div className="engineering-control-room">
    <div className="control-radar" aria-label="五项工程控制轨道">
      <div className="control-core"><ShieldCheck /><small>FULLGOAL PPT MASTER</small><strong>SKILL CORE</strong><span>RULES · STATE · EVIDENCE</span></div>
      <div className="control-orbits" aria-hidden="true">{engineeringControls.map((item, index) => <i style={{ "--orbit": index } as CSSProperties} key={item.id} />)}</div>
      {engineeringControls.map((item, index) => <button type="button" className={`control-node tone-${item.tone} ${activeId === item.id ? "is-active" : ""}`} style={{ "--control-index": index } as CSSProperties} onMouseEnter={() => setActiveId(item.id)} onFocus={() => setActiveId(item.id)} onClick={() => setActiveId(item.id)} key={item.id}><span>{item.index}</span><p><small>{item.label}</small><strong>{item.labelZh}</strong></p><i><em>RISK</em><ArrowRight /><b>CONTROL</b></i></button>)}
    </div>
    <aside className={`control-inspector tone-${active.tone}`}><header><span>{active.index} · {active.label}</span><strong>{active.labelZh}</strong></header><div className="risk-block"><XCircle /><p><small>RISK</small>{active.risk}</p></div><div className="control-list"><ShieldCheck />{active.controls.map((item) => <span key={item}><Check />{item}</span>)}</div></aside>
  </div>;
}
