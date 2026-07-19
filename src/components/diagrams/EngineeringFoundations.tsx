import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Orbit, ShieldCheck } from "lucide-react";
import { engineeringPrinciples, getEngineeringSources } from "../../content/engineering-foundations";
import type { SourceItem } from "../../types/presentation";

export function EngineeringFoundations({ onSource }: { onSource: (source: SourceItem) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [locked, setLocked] = useState<string | null>(null);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeId = locked ?? focused ?? hovered;
  const active = useMemo(() => engineeringPrinciples.find((item) => item.id === activeId) ?? null, [activeId]);

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

  const openSource = (ids: string[], title: string) => onSource({
    id: `engineering-foundation-${ids.join("-")}`,
    title,
    type: "软件与系统工程基础 · 官方来源",
    slideIds: ["method-foundations"],
    note: "这些来源证明相应工程原则已经存在；本页是对成熟思想的业务化转译，并非NASA、Microsoft、Agile Manifesto与Google联合发布或共同背书的框架。核验日期：2026-07-19。",
    entries: getEngineeringSources(ids).map((source) => ({
      ...source,
      supportedFacts: [source.supportedClaim],
      practicalUse: engineeringPrinciples.find((principle) => principle.id === source.principleId)?.workflowTranslation,
    })),
  });

  return (
    <div className="engineering-foundations" data-active-principle={activeId ?? "overview"}>
      <div className="engineering-loop" aria-hidden="true">
        {["top", "right", "bottom", "left"].map((side) => <span className={`engineering-flow is-${side}`} key={side}><i /><ArrowRight /></span>)}
      </div>

      <div className="engineering-core">
        <Orbit aria-hidden="true" />
        <small>ENGINEER</small>
        <strong>THE PROCESS</strong>
        <span>把过程设计好</span>
      </div>

      <div className="engineering-principles" role="list" aria-label="四项工程方法基础">
        {engineeringPrinciples.map((item, index) => {
          const publishers = [...new Set(getEngineeringSources(item.sourceIds).map((source) => source.publisher.split(" ")[0]))];
          return (
            <button
              ref={(node) => { refs.current[index] = node; }}
              type="button"
              className={`engineering-principle ${item.highlight ? "is-highlight" : ""} ${activeId === item.id ? "is-active" : ""}`}
              style={{ "--principle-index": index } as React.CSSProperties}
              aria-pressed={locked === item.id}
              onMouseEnter={() => !locked && setHovered(item.id)}
              onMouseLeave={() => !locked && setHovered(null)}
              onFocus={() => setFocused(item.id)}
              onBlur={() => setFocused(null)}
              onClick={() => setLocked((value) => value === item.id ? null : item.id)}
              onKeyDown={(event) => {
                if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); event.stopPropagation(); refs.current[(index + 1) % engineeringPrinciples.length]?.focus(); }
                if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); event.stopPropagation(); refs.current[(index - 1 + engineeringPrinciples.length) % engineeringPrinciples.length]?.focus(); }
              }}
              key={item.id}
              data-engineering-principle={item.id}
            >
              <span className="engineering-index">{item.index}</span>
              <small>{item.label}</small>
              <strong>{item.labelZh}</strong>
              <p>{item.shortPrinciple}</p>
              <em>{publishers.join(" / ")}</em>
              <ArrowUpRight aria-hidden="true" />
            </button>
          );
        })}
      </div>

      {active && (
        <aside className="engineering-inspector" aria-live="polite" data-engineering-detail={active.id}>
          <div className="engineering-inspector-head">
            <span>{locked ? "LOCKED PRINCIPLE" : "ENGINEERING TRANSLATION"}</span>
            <b>{active.index}</b>
          </div>
          <strong>{active.labelZh}</strong>
          <div className="engineering-translation-grid">
            <section><small>工程原义</small><p>{active.engineeringMeaning}</p></section>
            <section><small>协作转译</small><p>{active.workflowTranslation}</p></section>
          </div>
          <div className="engineering-analogy"><span>ANALOGY</span><p>{active.analogy}</p></div>
          <div className="engineering-workflow-links">{active.relatedWorkflowSteps.map((link) => <small key={link}>{link}</small>)}</div>
          <button type="button" onClick={() => openSource(active.sourceIds, active.labelZh)}>查看工程来源 <ArrowUpRight aria-hidden="true" /></button>
        </aside>
      )}

      <div className="engineering-source-line"><ShieldCheck aria-hidden="true" /><span>SOFTWARE &amp; SYSTEMS ENGINEERING FOUNDATIONS</span><b>NASA / Agile / Microsoft / Google</b></div>
      <p className="engineering-disclaimer">BUSINESS INTEGRATION · 来源证明原则存在，不代表四方联合发布或背书</p>
    </div>
  );
}
