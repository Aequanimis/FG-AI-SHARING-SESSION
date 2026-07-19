import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CornerDownRight, Sparkles } from "lucide-react";
import { agentEraTrends, getTimelineSources, timelineStages, type AgentEraTrend, type TimelineStage } from "../../content/ai-evolution-timeline";
import type { SourceItem } from "../../types/presentation";

type ActiveTarget = { kind: "stage"; id: string } | { kind: "trend"; id: string };

const toSourceItem = (title: string, ids: string[]): SourceItem => {
  const entries = getTimelineSources(ids);
  return {
    id: `timeline-${ids.join("-")}`,
    title,
    type: "官方时间节点",
    slideIds: ["ai-evolution"],
    note: "仅列出支持当前节点的官方公告或官方研究；核验日期：2026-07-19。",
    entries,
  };
};

export function AiEvolutionTimeline({ onSource }: { onSource: (source: SourceItem) => void }) {
  const [hovered, setHovered] = useState<ActiveTarget | null>(null);
  const [focused, setFocused] = useState<ActiveTarget | null>(null);
  const [locked, setLocked] = useState<ActiveTarget | null>(null);
  const active = locked ?? focused ?? hovered;

  useEffect(() => {
    const clear = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLocked(null);
        setHovered(null);
        setFocused(null);
      }
    };
    window.addEventListener("keydown", clear);
    return () => window.removeEventListener("keydown", clear);
  }, []);

  const detail = useMemo(() => {
    if (!active) return null;
    if (active.kind === "stage") return timelineStages.find((stage) => stage.id === active.id) ?? null;
    return agentEraTrends.find((trend) => trend.id === active.id) ?? null;
  }, [active]);

  const select = (target: ActiveTarget) => setLocked((current) => current?.kind === target.kind && current.id === target.id ? null : target);
  const clear = () => {
    setLocked(null);
    setHovered(null);
    setFocused(null);
  };

  return (
    <div className="evolution-canvas" onClick={(event) => { if (event.target === event.currentTarget) clear(); }} aria-label="AI从2022到2026的能力演进时间线">
      <div className="evolution-glow" aria-hidden="true" />
      <div className="timeline-track" aria-hidden="true"><i /></div>
      <div className="timeline-stages">
        {timelineStages.map((stage, index) => {
          const target: ActiveTarget = { kind: "stage", id: stage.id };
          const isActive = active?.kind === "stage" && active.id === stage.id;
          return (
            <button
              type="button"
              className={`timeline-stage accent-${stage.accent} ${isActive ? "is-active" : ""}`}
              style={{ "--stage-index": index } as React.CSSProperties}
              aria-label={`${stage.period}，${stage.capabilityZh}：${stage.summary}`}
              aria-pressed={locked?.kind === "stage" && locked.id === stage.id}
              onMouseEnter={() => !locked && setHovered(target)}
              onMouseLeave={() => !locked && setHovered(null)}
              onFocus={() => setFocused(target)}
              onBlur={() => setFocused(null)}
              onClick={(event) => { event.stopPropagation(); select(target); }}
              key={stage.id}
            >
              <span className="stage-dot"><i /></span>
              <span className="stage-period">{stage.period}</span>
              <strong>{stage.capability}</strong>
              <small>{stage.capabilityZh}</small>
              <em>{stage.index}</em>
            </button>
          );
        })}
      </div>

      <div className="agent-endpoint" aria-label="2026 Agent Era能力簇">
        <div className="endpoint-core">
          <span><Sparkles size={13} /> AGENT ERA</span>
          <strong>WORK<br />SYSTEM</strong>
          <small>LONG · PARALLEL · STEERABLE</small>
        </div>
        <div className="trend-satellites">
          {agentEraTrends.map((trend, index) => {
            const target: ActiveTarget = { kind: "trend", id: trend.id };
            const isActive = active?.kind === "trend" && active.id === trend.id;
            return (
              <button
                type="button"
                className={`trend-satellite ${trend.highlight ? "is-highlight" : ""} ${isActive ? "is-active" : ""}`}
                style={{ "--trend-index": index } as React.CSSProperties}
                aria-label={`${trend.labelZh}：${trend.description}`}
                aria-pressed={locked?.kind === "trend" && locked.id === trend.id}
                onMouseEnter={() => !locked && setHovered(target)}
                onMouseLeave={() => !locked && setHovered(null)}
                onFocus={() => setFocused(target)}
                onBlur={() => setFocused(null)}
                onClick={(event) => { event.stopPropagation(); select(target); }}
                key={trend.id}
              >
                <span>{trend.label}</span><small>{trend.labelZh}</small><ArrowUpRight aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      {detail && (
        <TimelineCallout
          detail={detail}
          locked={Boolean(locked)}
          onSource={(ids, title) => onSource(toSourceItem(title, ids))}
        />
      )}

      <aside className="evolution-note">
        <CornerDownRight aria-hidden="true" />
        <p>四年时间，AI从“会聊天的模型”，逐渐演变为“可以被组织和监督的工作系统”。</p>
      </aside>
      <div className="evolution-hint">HOVER / FOCUS TO EXPLORE · CLICK TO LOCK · ESC TO CLEAR</div>
    </div>
  );
}

function TimelineCallout({ detail, locked, onSource }: { detail: TimelineStage | AgentEraTrend; locked: boolean; onSource: (ids: string[], title: string) => void }) {
  const isStage = "events" in detail;
  const ids = isStage ? detail.events.flatMap((event) => event.sourceIds) : detail.sourceIds;
  const title = isStage ? `${detail.period} · ${detail.capabilityZh}` : `${detail.label} · ${detail.labelZh}`;
  return (
    <aside className={`timeline-callout ${isStage ? "is-stage" : "is-trend"}`} aria-live="polite">
      <span>{locked ? "LOCKED DETAIL" : "CAPABILITY SIGNAL"}</span>
      <strong>{title}</strong>
      <p>{isStage ? detail.summary : detail.description}</p>
      {isStage && detail.events.map((event) => <div className="callout-event" key={event.label}><small>{event.label}</small><b>{event.product}</b></div>)}
      <button type="button" onClick={(event) => { event.stopPropagation(); onSource(ids, title); }}>查看该节点官方来源 <ArrowUpRight aria-hidden="true" /></button>
    </aside>
  );
}
