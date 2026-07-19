import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, CornerDownRight, Sparkles } from "lucide-react";
import { agentEraTrends, getTimelineSources, timelineStages, type AgentEraTrend, type TimelineStage } from "../../content/ai-evolution-timeline";
import type { SourceItem } from "../../types/presentation";

type ActiveTarget = { kind: "stage"; id: string } | { kind: "trend"; id: string };
type DebugMetric = { id: string; x: number; y: number; axisDelta: number };

const toSourceItem = (title: string, ids: string[]): SourceItem => ({
  id: `timeline-${ids.join("-")}`,
  title,
  type: "官方时间节点",
  slideIds: ["ai-evolution"],
  note: "仅列出支持当前节点的官方公告或官方研究；核验日期：2026-07-19。",
  entries: getTimelineSources(ids),
});

export function AiEvolutionTimeline({ onSource }: { onSource: (source: SourceItem) => void }) {
  const [hovered, setHovered] = useState<ActiveTarget | null>(null);
  const [focused, setFocused] = useState<ActiveTarget | null>(null);
  const [locked, setLocked] = useState<ActiveTarget | null>(null);
  const [debugMetrics, setDebugMetrics] = useState<DebugMetric[]>([]);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const axisRef = useRef<HTMLDivElement | null>(null);
  const debugTimeline = Boolean((import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV)
    && new URLSearchParams(window.location.search).has("debugTimeline");
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

  useLayoutEffect(() => {
    if (!debugTimeline) return;
    const measure = () => {
      const canvas = canvasRef.current?.getBoundingClientRect();
      const axis = axisRef.current?.getBoundingClientRect();
      if (!canvas || !axis) return;
      const isVertical = axis.height > axis.width;
      const axisX = axis.left + axis.width / 2;
      const axisY = axis.top + axis.height / 2;
      setDebugMetrics(Array.from(canvasRef.current?.querySelectorAll<HTMLElement>("[data-timeline-dot]") ?? []).map((dot) => {
        const rect = dot.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return {
          id: dot.dataset.timelineDot ?? "?",
          x: Math.round((centerX - canvas.left) * 10) / 10,
          y: Math.round((centerY - canvas.top) * 10) / 10,
          axisDelta: Math.round(Math.abs(isVertical ? centerX - axisX : centerY - axisY) * 10) / 10,
        };
      }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (canvasRef.current) observer.observe(canvasRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [debugTimeline]);

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
    <div
      ref={canvasRef}
      className={`evolution-canvas ${debugTimeline ? "is-debug-timeline" : ""}`}
      onClick={(event) => { if (event.target === event.currentTarget) clear(); }}
      aria-label="AI从2022到2026的能力演进时间线"
    >
      <div className="evolution-glow" aria-hidden="true" />

      <div className="timeline-system">
        <div ref={axisRef} className="timeline-axis" aria-hidden="true"><i /></div>
        <div className="timeline-node-grid" role="list" aria-label="六个AI能力演进节点">
          {timelineStages.map((stage, index) => {
            const target: ActiveTarget = { kind: "stage", id: stage.id };
            const isActive = active?.kind === "stage" && active.id === stage.id;
            const side = index < 3 ? "above" : "below";
            return (
              <button
                type="button"
                className={`timeline-node is-${side} accent-${stage.accent} ${isActive ? "is-active" : ""}`}
                style={{ "--stage-index": index } as React.CSSProperties}
                aria-label={`${stage.period}，${stage.capabilityZh}，${stage.summary}`}
                aria-pressed={locked?.kind === "stage" && locked.id === stage.id}
                onMouseEnter={() => !locked && setHovered(target)}
                onMouseLeave={() => !locked && setHovered(null)}
                onFocus={() => setFocused(target)}
                onBlur={() => setFocused(null)}
                onClick={(event) => { event.stopPropagation(); select(target); }}
                key={stage.id}
                data-timeline-stage={stage.id}
              >
                <span className="timeline-node-dot" data-timeline-dot={stage.id}><i /></span>
                <span className="timeline-node-stem" aria-hidden="true" />
                <span className="timeline-node-copy">
                  <span className="stage-period">{stage.period}</span>
                  <strong>{stage.capabilityZh}</strong>
                  <small>{stage.capability}</small>
                  <em>{stage.index}</em>
                </span>
              </button>
            );
          })}
        </div>
        <div className="timeline-agent-link" aria-hidden="true"><i /><ArrowRight /></div>
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
                aria-label={`${trend.labelZh}，${trend.description}`}
                aria-pressed={locked?.kind === "trend" && locked.id === trend.id}
                onMouseEnter={() => !locked && setHovered(target)}
                onMouseLeave={() => !locked && setHovered(null)}
                onFocus={() => setFocused(target)}
                onBlur={() => setFocused(null)}
                onClick={(event) => { event.stopPropagation(); select(target); }}
                key={trend.id}
                data-agent-trend={trend.id}
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

      {debugTimeline && (
        <aside className="timeline-debug-panel" aria-label="时间轴坐标调试信息">
          <b>DEBUG · UNIFIED AXIS</b>
          {debugMetrics.map((metric) => <span key={metric.id}>{metric.id} x:{metric.x} y:{metric.y} Δ:{metric.axisDelta}px</span>)}
        </aside>
      )}
    </div>
  );
}

function TimelineCallout({ detail, locked, onSource }: { detail: TimelineStage | AgentEraTrend; locked: boolean; onSource: (ids: string[], title: string) => void }) {
  const isStage = "events" in detail;
  const ids = isStage ? detail.events.flatMap((event) => event.sourceIds) : detail.sourceIds;
  const title = isStage ? `${detail.period} · ${detail.capabilityZh}` : `${detail.label} · ${detail.labelZh}`;
  return (
    <aside className={`timeline-callout ${isStage ? "is-stage" : "is-trend"}`} aria-live="polite" data-timeline-callout={detail.id}>
      <span>{locked ? "LOCKED DETAIL" : "CAPABILITY SIGNAL"}</span>
      <strong>{title}</strong>
      <p>{isStage ? detail.summary : detail.description}</p>
      {isStage && detail.events.map((event) => <div className="callout-event" key={event.label}><small>{event.label}</small><b>{event.product}</b></div>)}
      <button type="button" onClick={(event) => { event.stopPropagation(); onSource(ids, title); }}>查看该节点官方来源 <ArrowUpRight aria-hidden="true" /></button>
    </aside>
  );
}
