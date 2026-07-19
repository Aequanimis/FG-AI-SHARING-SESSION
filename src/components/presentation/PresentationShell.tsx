import { useCallback, useEffect, useRef, useState } from "react";
import { getSlideIndexFromHash, normalizeSlideId, slides } from "../../content/session";
import type { SourceItem } from "../../types/presentation";
import { OverviewGrid } from "./OverviewGrid";
import { ProgressRail, SourceDrawer, SpeakerNotesPanel, TopNavigation } from "./Chrome";
import { SlideSection } from "./SlideSection";

export function PresentationShell() {
  const [currentIndex, setCurrentIndex] = useState(() => getSlideIndexFromHash());
  const [overview, setOverview] = useState(false);
  const [notes, setNotes] = useState(false);
  const [source, setSource] = useState<SourceItem | null>(null);
  const [fullscreen, setFullscreen] = useState(Boolean(document.fullscreenElement));
  const keyLock = useRef(false);

  const navigate = useCallback((id: string, behavior: ScrollBehavior = "smooth") => {
    const normalizedId = normalizeSlideId(id);
    const target = document.getElementById(normalizedId);
    if (!target) return;
    const index = slides.findIndex((slide) => slide.id === normalizedId);
    if (index >= 0) setCurrentIndex(index);
    setOverview(false);
    target.scrollIntoView({ behavior, block: "start" });
  }, []);

  const move = useCallback((offset: number) => {
    if (keyLock.current) return;
    keyLock.current = true;
    const next = Math.max(0, Math.min(slides.length - 1, currentIndex + offset));
    navigate(slides[next].id);
    window.setTimeout(() => { keyLock.current = false; }, 440);
  }, [currentIndex, navigate]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      setFullscreen(Boolean(document.fullscreenElement));
    }
  }, []);

  useEffect(() => {
    const initial = slides[getSlideIndexFromHash()];
    requestAnimationFrame(() => navigate(initial.id, "auto"));
  }, [navigate]);

  useEffect(() => {
    const onHashChange = () => {
      const rawId = window.location.hash.replace(/^#/, "");
      const normalizedId = normalizeSlideId(rawId);
      if (!slides.some((slide) => slide.id === normalizedId)) return;
      if (rawId !== normalizedId) window.history.replaceState(null, "", `#${normalizedId}`);
      navigate(normalizedId, "auto");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [navigate]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number((visible.target as HTMLElement).dataset.slideIndex);
      if (Number.isNaN(index)) return;
      setCurrentIndex(index);
      const id = slides[index].id;
      if (window.location.hash !== `#${id}`) window.history.replaceState(null, "", `#${id}`);
    }, { threshold: [0.45, 0.65, 0.85] });
    document.querySelectorAll<HTMLElement>(".slide-section").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.key === "Escape") { setOverview(false); setNotes(false); setSource(null); return; }
      if (event.key.toLowerCase() === "o") { event.preventDefault(); setOverview((value) => !value); return; }
      if (event.key.toLowerCase() === "n") { event.preventDefault(); setNotes((value) => !value); return; }
      if (event.key.toLowerCase() === "f") { event.preventDefault(); void toggleFullscreen(); return; }
      if (overview || notes || source) return;
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); move(1); }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); move(-1); }
      if (event.key === "Home") { event.preventDefault(); navigate(slides[0].id); }
      if (event.key === "End") { event.preventDefault(); navigate(slides[slides.length - 1].id); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, navigate, notes, overview, source, toggleFullscreen]);

  const current = slides[currentIndex];
  return (
    <div className="presentation-shell">
      <TopNavigation current={current} isOverview={overview} isNotes={notes} isFullscreen={fullscreen} onNavigate={navigate} onOverview={() => setOverview((value) => !value)} onNotes={() => setNotes((value) => !value)} onFullscreen={() => void toggleFullscreen()} />
      <main className="slide-deck">
        {slides.map((slide, index) => <SlideSection key={slide.id} slide={slide} current={index === currentIndex} onNavigate={navigate} onSource={setSource} />)}
      </main>
      <ProgressRail slides={slides} currentIndex={currentIndex} onNavigate={navigate} />
      {overview && <OverviewGrid slides={slides} currentIndex={currentIndex} onSelect={navigate} onClose={() => setOverview(false)} />}
      {notes && <SpeakerNotesPanel slide={current} onClose={() => setNotes(false)} />}
      {source && <SourceDrawer source={source} onClose={() => setSource(null)} />}
    </div>
  );
}
