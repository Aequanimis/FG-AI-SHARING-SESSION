import { useEffect, useState } from "react";
import { Bot, Check, CircleStop, FileCheck2, Lightbulb, MessageCircleMore, UserRoundCheck } from "lucide-react";

export function ChatAgentComparison() {
  return (
    <div className="comparison-grid">
      <section className="role-panel chat-panel">
        <div className="role-top"><MessageCircleMore aria-hidden="true" /><span><small>顾问 / 架构师</small><strong>Chat</strong></span></div>
        <div className="role-list"><p>理解问题</p><p>梳理材料</p><p>明确目标</p><p>设计Workflow</p><p>规划大纲</p><p>讨论取舍</p><p>制定验收标准</p></div>
      </section>
      <div className="role-bridge"><span>规划</span><i>→</i><b>人在关键节点判断</b><i>→</i><span>执行</span></div>
      <section className="role-panel agent-panel">
        <div className="role-top"><Bot aria-hidden="true" /><span><small>执行者 / 项目同事</small><strong>Agent</strong></span></div>
        <div className="role-list"><p>读取文件</p><p>修改代码</p><p>运行脚本</p><p>生成文档</p><p>调用工具</p><p>批量处理</p><p>测试与交付</p></div>
      </section>
    </div>
  );
}

const workflow = [
  { name: "提供材料", human: "准备背景、约束与参考案例", ai: "读取并建立上下文", output: "材料包与边界清单", fail: "材料不全却直接开始" },
  { name: "和Chat规划", human: "说明目标与取舍", ai: "拆解任务、设计阶段成果", output: "工作流与验收草案", fail: "只得到宽泛建议" },
  { name: "人工调整", human: "删无效步骤、修重点", ai: "解释影响并更新方案", output: "批准后的执行计划", fail: "把错误方向自动化" },
  { name: "Agent执行", human: "授权范围并关注异常", ai: "读文件、运行工具、生成成果", output: "可检查的文件与记录", fail: "执行范围不断漂移" },
  { name: "阶段验收", human: "按独立标准判断", ai: "提供测试、截图与差异", output: "通过 / 返工 / 停止", fail: "用模型自评替代证据" },
  { name: "沉淀为Skill", human: "确认流程稳定且值得复用", ai: "整理SOP、规则与脚本", output: "可安装的重复能力", fail: "过早固化不稳定流程" },
];

export function WorkflowStepper() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (!document.querySelector("#collaboration-sop")?.classList.contains("is-current")) return;
      if (event.altKey && event.key === "ArrowRight") setActive((value) => Math.min(workflow.length - 1, value + 1));
      if (event.altKey && event.key === "ArrowLeft") setActive((value) => Math.max(0, value - 1));
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);
  const selected = workflow[active];
  return (
    <div className="workflow-layout">
      <div className="workflow-track" role="tablist" aria-label="六步协作SOP">
        {workflow.map((step, index) => (
          <button type="button" role="tab" aria-selected={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)} key={step.name}>
            <span>0{index + 1}</span><strong>{step.name}</strong>
          </button>
        ))}
      </div>
      <div className="workflow-detail" role="tabpanel">
        <div><small>人负责什么</small><strong>{selected.human}</strong></div>
        <div><small>AI负责什么</small><strong>{selected.ai}</strong></div>
        <div><small>阶段输出</small><strong>{selected.output}</strong></div>
        <div className="risk"><small>常见失败</small><strong>{selected.fail}</strong></div>
      </div>
      <span className="keyboard-hint">Alt + ← / → 切换步骤</span>
    </div>
  );
}

const gates = [
  ["材料读取", "Gate 1", "材料是否完整"],
  ["工作流与大纲", "Gate 2", "逻辑是否正确"],
  ["Agent执行", "Gate 3", "成果是否符合要求"],
  ["自动测试", "Gate 4", "数据和文件是否有效"],
  ["最终交付", "Gate 5", "是否可以发布或复用"],
];

export function StageGateTimeline() {
  return (
    <div className="gate-layout">
      <div className="gate-line">
        {gates.map(([stage, gate, question], index) => (
          <div className="gate-stage" key={gate}>
            <div className="execution-node"><span>{index + 1}</span><strong>{stage}</strong></div>
            <div className="gate-diamond"><span>{gate}</span></div>
            <p>{question}</p>
          </div>
        ))}
      </div>
      <div className="gate-principles">
        <p><CircleStop size={17} /> 没确认大纲，不生产</p>
        <p><CircleStop size={17} /> 数据冲突，立即停止</p>
        <p><UserRoundCheck size={17} /> 目标改变，重新批准</p>
        <p><FileCheck2 size={17} /> 文件与测试才是证据</p>
      </div>
    </div>
  );
}

const frameworks = [
  ["需求工程", "目标、用户、交付物、限制"],
  ["上下文工程", "正确时间看到正确材料"],
  ["Planner–Executor", "方案设计与实际执行分开"],
  ["Human-in-the-loop", "关键判断由人确认"],
  ["Stage-Gate", "每阶段通过后再继续"],
  ["Evaluation-driven", "独立标准与测试验收"],
  ["Artifact-first", "围绕文件与成果协作"],
  ["Skillization", "稳定流程沉淀为能力"],
];

export function ThinkingFramework() {
  return (
    <div className="framework-map">
      <div className="framework-center"><Lightbulb aria-hidden="true" /><strong>可控的人机协作</strong><span>目标 · 分工 · 证据 · 复用</span></div>
      {frameworks.map(([name, text], index) => (
        <div className={`framework-item framework-${index + 1}`} key={name}>
          <span>0{index + 1}</span><strong>{name}</strong><p>{text}</p>
        </div>
      ))}
    </div>
  );
}

export function ProblemToWorkflow() {
  const problems = ["长报告难拆页", "摘抄不是研究叙事", "自由生图破坏模板", "文字与数字不可靠", "长Prompt无法稳定复用"];
  const flow = ["读取材料", "核验数据", "重组叙事", "逐页大纲", "视觉模式", "用户批准", "单页生产", "QA"];
  return (
    <div className="problem-flow">
      <div className="problem-list">{problems.map((problem, index) => <div key={problem}><span>0{index + 1}</span><p>{problem}</p></div>)}</div>
      <div className="solution-flow">{flow.map((item, index) => <div key={item}><Check size={15} aria-hidden="true" /><span>{item}</span>{index < flow.length - 1 && <i>→</i>}</div>)}</div>
    </div>
  );
}
