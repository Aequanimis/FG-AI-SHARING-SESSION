import { useEffect, useRef, useState } from "react";
import { Check, CheckCircle2, CircleDashed, Folder, Pause, Play, ShieldCheck, Sparkles } from "lucide-react";

const evolution = [
  ["Stage 1", "让AI模仿历史PPT", "只学到了表面排版"],
  ["Stage 2", "分析正式模板和历史页面", "必须区分品牌规范与个人习惯"],
  ["Stage 3", "增加研究叙事和逐页大纲", "真正困难的是内容如何展开"],
  ["Stage 4", "增加用户批准和生产门禁", "Agent必须知道何时停下等人决策"],
  ["Stage 5", "从组件化Renderer转向Image-native", "过度追求可编辑会损失视觉完成度"],
];

export function ProjectEvolutionTimeline() {
  return (
    <div className="evolution-layout">
      <div className="evolution-line">
        {evolution.map(([stage, title, finding], index) => (
          <div className="evolution-stage" key={stage}>
            <span className="evolution-index">{String(index + 1).padStart(2, "0")}</span>
            <div><small>{stage}</small><strong>{title}</strong><p><b>发现：</b>{finding}</p></div>
          </div>
        ))}
      </div>
      <div className="evolution-result"><span>最终方案</span><strong>固定品牌骨架</strong><i>+</i><strong>AI组织内容</strong><i>+</i><strong>Image-native视觉</strong><i>+</i><strong>程序保证精确</strong></div>
    </div>
  );
}

const modes = {
  A: { title: "经典研究型", note: "清楚、克制、数据优先", items: ["结论 + 双图", "一图一表", "标准数据页"] },
  B: { title: "机制表达型", note: "强调流程、逻辑与机制", items: ["飞轮", "流程 / 传导链", "双层市场"] },
  C: { title: "综合重点型", note: "信息更丰富，适合重点页", items: ["KPI + 图表 + 表格", "机制 + 结论", "多模块综合页"] },
};

export function ABCModeSelector() {
  const [active, setActive] = useState<keyof typeof modes>("A");
  const selected = modes[active];
  return (
    <div className="template-layout">
      <div className="fixed-shell">
        <div className="shell-header"><span>PAGE TITLE</span><b>FULLGOAL</b></div>
        <div className="shell-line" />
        <div className={`variable-content mode-${active.toLowerCase()}`}>
          <span>可变正文内容区</span>
          {selected.items.map((item) => <div key={item}>{item}</div>)}
        </div>
        <div className="shell-footer"><span>来源 / 说明</span><span>14</span></div>
        {['Logo', '标题区', '蓝线', '字体', '来源', '页码', '页脚'].map((item) => <em key={item}>{item}</em>)}
      </div>
      <div className="mode-selector">
        <div role="tablist" aria-label="正文模式">
          {(Object.keys(modes) as Array<keyof typeof modes>).map((mode) => <button type="button" role="tab" aria-selected={active === mode} className={active === mode ? "active" : ""} onClick={() => setActive(mode)} key={mode}>{mode}</button>)}
        </div>
        <strong>{active}｜{selected.title}</strong><p>{selected.note}</p>
        <ul>{selected.items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
        <span className="lock-note"><ShieldCheck size={17} />品牌骨架保持不动</span>
      </div>
    </div>
  );
}

export function BeforeAfterComparison() {
  const [value, setValue] = useState(52);
  return (
    <div className="before-after-wrap">
      <div className="before-after" style={{ "--split": `${value}%` } as React.CSSProperties}>
        <div className="visual-mock renderer-mock">
          <span className="mock-tag">BEFORE · 组件化Renderer</span>
          <div className="mock-header" /><div className="mock-grid"><i /><i /><i /><i /></div><div className="mock-chart">{[55, 78, 42, 66, 84].map((height, index) => <b style={{ height: `${height}%` }} key={index} />)}</div>
        </div>
        <div className="visual-mock image-mock">
          <span className="mock-tag">AFTER · Image-native</span>
          <div className="image-field"><Sparkles aria-hidden="true" /><strong>机制关系更自然</strong><p>层次、留白与视觉节奏作为整体生成</p><span>抽象示意 · 可替换素材</span></div>
        </div>
        <div className="split-line" aria-hidden="true"><span>↔</span></div>
        <input aria-label="拖动比较Before与After" type="range" min="15" max="85" value={value} onChange={(event) => setValue(Number(event.target.value))} />
      </div>
      <div className="hybrid-route"><span>固定V3品牌骨架</span><i>+</i><span>Image-native正文视觉</span><i>+</i><span>关键内容确定性后处理</span><strong>AI负责视觉，程序负责精确</strong></div>
    </div>
  );
}

const metrics = [["146", "页", "完整读取ICI Fact Book"], ["26", "个", "核心数字完成核验"], ["13", "页", "重组为研究汇报大纲"], ["2", "页", "完成两类代表页测试"]];
const narrative = ["交易活跃与长期配置反差", "ETF三重身份", "波动期风险转移", "一二级市场机制", "长期账户", "家庭选择", "资金流", "双飞轮", "中国市场对照", "业务启示"];

export function MetricGroup() {
  return (
    <div className="ici-layout">
      <div className="metric-group">{metrics.map(([number, unit, text]) => <div key={text}><p><strong>{number}</strong><span>{unit}</span></p><small>{text}</small></div>)}</div>
      <div className="narrative-flow">{narrative.map((item, index) => <span key={item}>{item}{index < narrative.length - 1 && <i>→</i>}</span>)}</div>
      <div className="status-columns">
        <section className="done"><strong><CheckCircle2 />已完成</strong><p>材料解析 · 数据核验 · 13页大纲 · 代表页Image-native生产 · 品牌区域后处理</p></section>
        <section className="todo"><strong><CircleDashed />尚未完成</strong><p>13页完整视觉稿 · 最终PPTX还原</p></section>
      </div>
    </div>
  );
}

export function SkillArchitecture() {
  return (
    <div className="architecture-layout">
      <div className="file-tree" aria-label="Skill目录结构">
        <p><Folder /> <strong>fullgoal-ppt-master/</strong></p>
        <p className="level-1"><span>├──</span> SKILL.md</p>
        <p className="level-1"><span>├──</span> policies/ <small>template · page-role · abc-mode</small></p>
        <p className="level-1"><span>├──</span> references/ <small>brand · writing · prompts</small></p>
        <p className="level-1"><span>├──</span> schemas/ <small>input-schema</small></p>
        <p className="level-1"><span>├──</span> scripts/ <small>render · qa · integrity-check</small></p>
        <p className="level-1"><span>└──</span> examples/ <small>mini-case</small></p>
      </div>
      <div className="disclosure-layers">
        <div><span>第一层</span><strong>发现</strong><p>Agent只看到Skill名称和用途</p></div>
        <div><span>第二层</span><strong>理解</strong><p>需要时读取完整SOP</p></div>
        <div><span>第三层</span><strong>执行</strong><p>加载详细规则、资产与脚本</p></div>
      </div>
    </div>
  );
}

const demoSteps = ["读取Skill", "读取材料", "输出大纲", "等待用户批准", "生成代表页", "QA检查"];

export function DemoWorkflow() {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (!running) return;
    if (step >= 3) { setRunning(false); return; }
    timer.current = window.setTimeout(() => setStep((value) => value + 1), 620);
    return () => { if (timer.current !== null) window.clearTimeout(timer.current); };
  }, [running, step]);
  const run = () => { setStep(-1); setRunning(true); };
  const approve = () => { setStep(4); setRunning(true); };
  useEffect(() => {
    if (running && step === 4) timer.current = window.setTimeout(() => { setStep(5); setRunning(false); }, 700);
    return () => { if (timer.current !== null) window.clearTimeout(timer.current); };
  }, [running, step]);
  return (
    <div className="demo-layout">
      <div className="use-steps">
        <div><span>01</span><strong>安装或选择Skill</strong><p>FullGoal PPT Master</p></div>
        <div><span>02</span><strong>上传材料并提出任务</strong><p>先输出逐页大纲、核心内容与建议视觉</p></div>
        <div><span>03</span><strong>逐阶段确认</strong><p>大纲 → 代表页 → 视觉方向 → QA</p></div>
      </div>
      <div className="agent-console">
        <header><div><i /><i /><i /></div><span>WORKFLOW DEMO · 本地模拟</span><button type="button" onClick={run} disabled={running}><Play size={15} />运行演示</button></header>
        <div className="console-body">
          {demoSteps.map((item, index) => {
            const finished = index <= step && !(index === 3 && step === 3);
            const waiting = index === 3 && step === 3;
            return <div className={`${finished ? "finished" : ""} ${waiting ? "waiting" : ""}`} key={item}><span>{finished ? <Check size={15} /> : waiting ? <Pause size={15} /> : <CircleDashed size={15} />}</span><p>{item}</p><small>{finished ? "完成" : waiting ? "等待人工判断" : "待运行"}</small></div>;
          })}
        </div>
        {step === 3 && <div className="approval-bar"><span><Pause size={16} />流程已在批准点停止</span><button type="button" onClick={approve}>批准并继续</button></div>}
        {step === 5 && <div className="approval-bar success"><span><CheckCircle2 size={16} />演示流程完成</span><button type="button" onClick={run}>重新运行</button></div>}
      </div>
    </div>
  );
}

export function ClosingRoles() {
  const roles = [["人", "目标、判断和责任"], ["Chat", "理解、规划和校准"], ["Agent", "调用工具并完成执行"], ["Skill", "沉淀可重复能力"]];
  return <div className="closing-roles">{roles.map(([name, text], index) => <div key={name}><span>0{index + 1}</span><strong>{name}</strong><p>{text}</p></div>)}</div>;
}
