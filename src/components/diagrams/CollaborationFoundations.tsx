import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Orbit, ShieldCheck } from "lucide-react";
import { collaborationFoundations, getFoundationSources } from "../../content/collaboration-foundations";
import type { SourceItem } from "../../types/presentation";

export function CollaborationFoundations({ onSource }: { onSource: (source: SourceItem) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [locked, setLocked] = useState<string | null>(null);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeId = locked ?? focused ?? hovered;
  const active = useMemo(() => collaborationFoundations.find((item) => item.id === activeId) ?? null, [activeId]);

  useEffect(() => {
    const clear = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setLocked(null); setHovered(null); }
    };
    window.addEventListener("keydown", clear);
    return () => window.removeEventListener("keydown", clear);
  }, []);

  const openSource = (ids: string[], title: string) => onSource({
    id: `foundation-${ids.join("-")}`,
    title,
    type: "方法基础 · 官方来源",
    slideIds: ["method-foundations"],
    note: "这不是四家机构共同发布的统一框架，而是基于成熟原则完成的业务化整合；核验日期：2026-07-19。",
    entries: getFoundationSources(ids),
  });

  return (
    <div className="foundations-map" data-active-foundation={activeId ?? "overview"}>
      <div className="foundation-orbits" aria-hidden="true"><i /><i /><i /></div>
      <div className="foundation-core"><Orbit aria-hidden="true" /><small>CONTROLLED HUMAN–AI COLLABORATION</small><strong>可控人机协作</strong><span>目标 · 工具 · 监督 · 证据</span></div>
      <div className="foundation-pillars" role="list" aria-label="四项方法基础">
        {collaborationFoundations.map((item, index) => (
          <button
            ref={(node) => { refs.current[index] = node; }}
            type="button"
            className={`foundation-pillar accent-${item.accent} ${activeId === item.id ? "is-active" : ""}`}
            style={{ "--foundation-index": index } as React.CSSProperties}
            aria-pressed={locked === item.id}
            onMouseEnter={() => !locked && setHovered(item.id)}
            onMouseLeave={() => !locked && setHovered(null)}
            onFocus={() => setFocused(item.id)}
            onBlur={() => setFocused(null)}
            onClick={() => setLocked((value) => value === item.id ? null : item.id)}
            onKeyDown={(event) => {
              if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); event.stopPropagation(); refs.current[(index + 1) % collaborationFoundations.length]?.focus(); }
              if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); event.stopPropagation(); refs.current[(index - 1 + collaborationFoundations.length) % collaborationFoundations.length]?.focus(); }
            }}
            key={item.id}
            data-foundation={item.id}
          >
            <span>{item.index}</span><small>{item.label}</small><strong>{item.title}</strong><p>{item.summary}</p><ArrowUpRight aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="foundation-evidence-ring"><ShieldCheck aria-hidden="true" /><span>OFFICIAL EVIDENCE RING</span><b>Anthropic · OpenAI · NIST · GitHub</b></div>
      {active && (
        <aside className="foundation-inspector" aria-live="polite" data-foundation-detail={active.id}>
          <span>{locked ? "LOCKED PRINCIPLE" : "PRINCIPLE IN PRACTICE"}</span>
          <strong>{active.title}</strong>
          <p><b>来源含义</b>{active.sourceMeaning}</p>
          <p><b>业务转译</b>{active.practicalTranslation}</p>
          <div>{active.workflowLinks.map((link) => <small key={link}>{link}</small>)}</div>
          <button type="button" onClick={() => openSource(active.sourceIds, active.title)}>查看该原则来源 <ArrowUpRight aria-hidden="true" /></button>
        </aside>
      )}
      <p className="foundation-disclaimer">INTEGRATED BUSINESS TRANSLATION · 非任何机构联合发布的官方框架</p>
    </div>
  );
}
