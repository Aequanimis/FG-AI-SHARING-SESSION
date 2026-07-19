import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowUpRight, Network, RotateCcw, X } from "lucide-react";
import { coreConcepts, secondaryKnowledgeNodes, type AIKnowledgeNode } from "../../content/ai-knowledge-universe";

type UniverseMode = "overview" | "exploring" | "locked";

const universeDust = Array.from({ length: 76 }, (_, index) => ({
  left: `${(index * 37 + 11) % 97}%`,
  top: `${(index * 53 + 17) % 93}%`,
  delay: `${(index % 9) * 0.31}s`,
  size: index % 11 === 0 ? 3.2 : index % 4 === 0 ? 2.1 : 1.15,
  depth: (index % 3) + 1,
}));

export function ConceptMap() {
  const universeRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const leaveTimerRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [lockedId, setLockedId] = useState<string | null>(null);
  const [exploring, setExploring] = useState(false);

  const allNodes = useMemo(() => [...coreConcepts, ...secondaryKnowledgeNodes], []);
  const activeId = lockedId ?? focusedId ?? hoveredId;
  const activeNode = activeId ? allNodes.find((node) => node.id === activeId) ?? null : null;
  const activeCluster = activeNode?.cluster ?? null;
  const mode: UniverseMode = lockedId ? "locked" : exploring || activeId ? "exploring" : "overview";

  const resetParallax = useCallback(() => {
    const element = universeRef.current;
    if (!element) return;
    element.style.setProperty("--px-far", "0px");
    element.style.setProperty("--py-far", "0px");
    element.style.setProperty("--px-mid", "0px");
    element.style.setProperty("--py-mid", "0px");
    element.style.setProperty("--px-near", "0px");
    element.style.setProperty("--py-near", "0px");
  }, []);

  const resetUniverse = useCallback(() => {
    setHoveredId(null);
    setFocusedId(null);
    setLockedId(null);
    setExploring(false);
    resetParallax();
  }, [resetParallax]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") resetUniverse();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (leaveTimerRef.current !== null) window.clearTimeout(leaveTimerRef.current);
    };
  }, [resetUniverse]);

  const updateParallax = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
    };
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      const element = universeRef.current;
      if (element) {
        const { x, y } = pointerRef.current;
        element.style.setProperty("--px-far", `${(-x * 3).toFixed(2)}px`);
        element.style.setProperty("--py-far", `${(-y * 3).toFixed(2)}px`);
        element.style.setProperty("--px-mid", `${(-x * 7).toFixed(2)}px`);
        element.style.setProperty("--py-mid", `${(-y * 7).toFixed(2)}px`);
        element.style.setProperty("--px-near", `${(-x * 11).toFixed(2)}px`);
        element.style.setProperty("--py-near", `${(-y * 11).toFixed(2)}px`);
      }
      rafRef.current = null;
    });
  };

  const enterUniverse = () => {
    if (leaveTimerRef.current !== null) window.clearTimeout(leaveTimerRef.current);
    setExploring(true);
  };

  const leaveUniverse = () => {
    setHoveredId(null);
    resetParallax();
    leaveTimerRef.current = window.setTimeout(() => {
      if (!lockedId && !focusedId) setExploring(false);
    }, 180);
  };

  const selectNode = (node: AIKnowledgeNode) => {
    setLockedId((current) => current === node.id ? null : node.id);
    setHoveredId(null);
    setExploring(true);
  };

  const cardStyle = activeNode ? {
    "--card-x": `${activeNode.position.x}%`,
    "--card-y": `${Math.max(25, Math.min(73, activeNode.position.y))}%`,
  } as CSSProperties : undefined;

  return (
    <div
      ref={universeRef}
      className="concept-layout knowledge-universe"
      data-mode={mode}
      data-active-cluster={activeCluster ?? "none"}
      onMouseMove={(event) => { enterUniverse(); updateParallax(event); }}
      onMouseLeave={leaveUniverse}
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest("button, .concept-float-card")) resetUniverse();
      }}
      aria-label="以Agent为中心的AI知识宇宙"
    >
      <div className="universe-nebula universe-parallax-far" aria-hidden="true" />
      <div className="universe-dust universe-parallax-far" aria-hidden="true">
        {universeDust.filter((star) => star.depth === 1).map((star, index) => <i key={`far-${index}`} style={{ left: star.left, top: star.top, animationDelay: star.delay, width: star.size, height: star.size }} />)}
      </div>
      <div className="universe-dust universe-parallax-mid" aria-hidden="true">
        {universeDust.filter((star) => star.depth === 2).map((star, index) => <i key={`mid-${index}`} style={{ left: star.left, top: star.top, animationDelay: star.delay, width: star.size, height: star.size }} />)}
      </div>
      <div className="universe-dust universe-parallax-near" aria-hidden="true">
        {universeDust.filter((star) => star.depth === 3).map((star, index) => <i key={`near-${index}`} style={{ left: star.left, top: star.top, animationDelay: star.delay, width: star.size, height: star.size }} />)}
      </div>
      <div className="universe-orbit orbit-a universe-parallax-far" aria-hidden="true" />
      <div className="universe-orbit orbit-b universe-parallax-mid" aria-hidden="true" />

      <svg className="concept-connections universe-parallax-far" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {coreConcepts.map((concept) => (
          <line key={concept.id} x1="50" y1="53" x2={concept.position.x} y2={concept.position.y} className={activeCluster === concept.cluster ? "is-active" : ""} />
        ))}
      </svg>

      <button className="concept-center universe-parallax-mid" type="button" onClick={(event) => { event.stopPropagation(); resetUniverse(); }} aria-label="恢复Agent知识宇宙全局视图">
        <span className="agent-energy" aria-hidden="true" />
        <Network aria-hidden="true" />
        <strong>Agent</strong>
        <span>目标导向的行动系统</span>
        <small><RotateCcw size={10} aria-hidden="true" /> RESET</small>
      </button>

      <div className="concept-core-layer universe-parallax-mid">
        {coreConcepts.map((concept) => {
          const active = activeId === concept.id;
          const muted = activeCluster !== null && activeCluster !== concept.cluster;
          return (
            <button
              type="button"
              data-cluster={concept.cluster}
              className={`concept-node concept-star ${active ? "is-active" : ""} ${muted ? "is-muted" : ""}`}
              style={{ left: `${concept.position.x}%`, top: `${concept.position.y}%` }}
              aria-label={`${concept.label}，${concept.labelZh}：${concept.definition}`}
              aria-selected={active}
              aria-expanded={lockedId === concept.id}
              onMouseEnter={() => !lockedId && setHoveredId(concept.id)}
              onMouseLeave={() => !lockedId && setHoveredId(null)}
              onFocus={() => setFocusedId(concept.id)}
              onBlur={() => setFocusedId(null)}
              onClick={(event) => { event.stopPropagation(); selectNode(concept); }}
              key={concept.id}
            >
              <span className="concept-star-core" aria-hidden="true" />
              <span className="concept-index">{concept.index}</span>
              <strong>{concept.label}</strong>
              <small>{concept.labelZh}</small>
            </button>
          );
        })}
      </div>

      <div className="concept-secondary-layer universe-parallax-near">
        {secondaryKnowledgeNodes.map((node) => {
          const clusterActive = activeCluster === node.cluster;
          const active = activeId === node.id;
          const keyboardVisible = node.defaultVisible || (clusterActive && node.importance >= 2);
          return (
            <button
              type="button"
              className={`concept-secondary depth-${node.depth} importance-${node.importance} ${node.defaultVisible ? "is-default" : ""} ${clusterActive ? "is-cluster-active" : ""} ${active ? "is-active" : ""}`}
              style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
              aria-label={`${node.label}，${node.labelZh}：${node.definition}`}
              aria-selected={active}
              aria-expanded={lockedId === node.id}
              tabIndex={keyboardVisible ? 0 : -1}
              onMouseEnter={() => !lockedId && setHoveredId(node.id)}
              onMouseLeave={() => !lockedId && setHoveredId(null)}
              onFocus={() => setFocusedId(node.id)}
              onBlur={() => setFocusedId(null)}
              onClick={(event) => { event.stopPropagation(); selectNode(node); }}
              key={node.id}
            >
              <i aria-hidden="true" />
              <span>{node.label}</span>
            </button>
          );
        })}
      </div>

      <div className="universe-mode-hint" aria-live="polite">
        <span>{mode === "overview" ? "MOVE TO EXPLORE" : mode === "locked" ? "LOCKED · ESC TO RESET" : "EXPLORE · CLICK TO LOCK"}</span>
        <b>{activeNode ? `${activeNode.label} / ${activeNode.labelZh}` : "8 CORE CONCEPTS · 65 KNOWLEDGE STARS"}</b>
      </div>

      {activeNode && (
        <aside
          className={`concept-float-card ${activeNode.position.x > 50 ? "opens-left" : "opens-right"}`}
          style={cardStyle}
          aria-live="polite"
          onClick={(event) => event.stopPropagation()}
        >
          <button className="concept-card-close" type="button" onClick={resetUniverse} aria-label="关闭概念详情并恢复全局视图"><X aria-hidden="true" /></button>
          <span className="detail-kicker">{activeNode.category === "core" ? "CORE CONCEPT" : `${activeNode.cluster.toUpperCase()} CLUSTER`}</span>
          <div className="detail-name"><strong>{activeNode.label}</strong><span>{activeNode.labelZh}</span></div>
          <p>{activeNode.definition}</p>
          <dl>
            <div><dt>日常类比</dt><dd>{activeNode.analogy}</dd></div>
            <div><dt>在Agent系统中的作用</dt><dd>{activeNode.role}</dd></div>
          </dl>
          <div className="detail-related"><span>RELATED STARS</span><p>{activeNode.relatedConcepts.map((item) => <b key={item}>{item}</b>)}</p></div>
          {activeNode.securityTips && <div className="detail-security"><span>SECURITY</span><code>{activeNode.example}</code><ul>{activeNode.securityTips.map((tip) => <li key={tip}>{tip}</li>)}</ul></div>}
          <div className="detail-source"><span>SOURCE</span><b>{activeNode.source}</b><ArrowUpRight aria-hidden="true" /></div>
        </aside>
      )}
    </div>
  );
}
