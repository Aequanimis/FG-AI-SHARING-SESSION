import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownLeft, ArrowRight, Bot, CheckCircle2, MessageCircleMore, PackageCheck, RotateCcw, UserRound } from "lucide-react";
import { collaborationSteps, workflowCaseTrack } from "../../content/human-chat-agent-workflow";

export function HumanChatAgentWorkflow() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [locked, setLocked] = useState<string | null>(null);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeId = locked ?? focused ?? hovered ?? collaborationSteps[0].id;
  const active = useMemo(() => collaborationSteps.find((step) => step.id === activeId) ?? collaborationSteps[0], [activeId]);

  useEffect(() => {
    const clear = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLocked(null);
        setHovered(null);
      }
    };
    window.addEventListener("keydown", clear);
    return () => window.removeEventListener("keydown", clear);
  }, []);

  const moveFocus = (current: number, offset: number) => {
    const next = (current + offset + collaborationSteps.length) % collaborationSteps.length;
    refs.current[next]?.focus();
  };

  return (
    <div className="collaboration-workflow" data-active-step={active.id}>
      <div className="workflow-spine" aria-hidden="true"><i /><ArrowDownLeft /></div>
      <div className="workflow-nodes" role="list" aria-label="六步可控人机协作链">
        {collaborationSteps.map((step, index) => {
          const Icon = step.owner === "human" ? UserRound : step.owner === "chat" ? MessageCircleMore : step.owner === "agent" ? Bot : PackageCheck;
          const selected = step.id === activeId;
          return (
            <button
              ref={(node) => { refs.current[index] = node; }}
              type="button"
              className={`workflow-node owner-${step.owner} ${selected ? "is-active" : ""} ${locked === step.id ? "is-locked" : ""}`}
              style={{ "--workflow-index": index } as React.CSSProperties}
              aria-pressed={locked === step.id}
              aria-label={`${step.title}，${step.actions.join("、")}，输出${step.output}`}
              onMouseEnter={() => !locked && setHovered(step.id)}
              onMouseLeave={() => !locked && setHovered(null)}
              onFocus={() => setFocused(step.id)}
              onBlur={() => setFocused(null)}
              onClick={() => setLocked((value) => value === step.id ? null : step.id)}
              onKeyDown={(event) => {
                if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); event.stopPropagation(); moveFocus(index, 1); }
                if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); event.stopPropagation(); moveFocus(index, -1); }
              }}
              key={step.id}
              data-workflow-step={step.id}
            >
              <span className="workflow-number">{step.index}</span>
              <span className="workflow-icon"><Icon aria-hidden="true" /></span>
              <span className="workflow-label"><small>{step.role}</small><strong>{step.title}</strong></span>
              {(index === 2 || index === 4) && <em>HUMAN GATE</em>}
            </button>
          );
        })}
      </div>

      <aside className="workflow-inspector" aria-live="polite" data-workflow-detail={active.id}>
        <div><span>{active.index} · {active.role}</span>{locked && <b>LOCKED</b>}</div>
        <strong>{active.title}</strong>
        <ul>{active.actions.map((action) => <li key={action}>{action}</li>)}</ul>
        <dl><div><dt>OUTPUT</dt><dd>{active.output}</dd></div><div><dt>RISK</dt><dd>{active.risk}</dd></div></dl>
      </aside>

      <div className="workflow-feedback" aria-label="验收反馈回路">
        <RotateCcw aria-hidden="true" /><span>返工回到Agent</span>
        <ArrowRight aria-hidden="true" /><span>方向变化回到Chat / Human</span>
      </div>

      <div className="workflow-case-track" aria-label="研究汇报案例链">
        <span>CASE · 制作一份研究汇报</span>
        <div>{workflowCaseTrack.map((item, index) => <span key={item}><CheckCircle2 aria-hidden="true" />{item}{index < workflowCaseTrack.length - 1 && <ArrowRight aria-hidden="true" />}</span>)}</div>
      </div>
    </div>
  );
}
