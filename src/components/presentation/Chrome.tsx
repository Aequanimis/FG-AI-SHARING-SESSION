import { BookOpenText, Expand, Grid3X3, Home, Minimize, X } from "lucide-react";
import { brand, chapterMeta } from "../../config/brand";
import { slides as deckSlides, sources } from "../../content/session";
import type { SlideData, SourceItem } from "../../types/presentation";

interface NavigationProps {
  current: SlideData;
  isOverview: boolean;
  isNotes: boolean;
  isFullscreen: boolean;
  onNavigate: (id: string) => void;
  onOverview: () => void;
  onNotes: () => void;
  onFullscreen: () => void;
}

export function BrandHeader({ dark = false }: { dark?: boolean }) {
  return <div className={`brand-mark ${dark ? "dark" : ""}`} aria-label="FULLGOAL文字标识">{brand.name}</div>;
}

export function TopNavigation({ current, isOverview, isNotes, isFullscreen, onNavigate, onOverview, onNotes, onFullscreen }: NavigationProps) {
  const navItems = [chapterMeta.opening, chapterMeta.ai, chapterMeta.method, chapterMeta.skill];
  return (
    <nav className="top-nav" aria-label="演示主导航">
      <button type="button" className="nav-home" onClick={() => onNavigate("hero")} aria-label="返回封面" title="返回封面"><Home size={17} /></button>
      <div className="chapter-links">
        {navItems.map((item) => <button type="button" className={current.chapterLabel === item.label || (current.chapter === "opening" && item === chapterMeta.opening) ? "active" : ""} onClick={() => onNavigate(item.firstSlide)} key={item.label}>{item.short}</button>)}
      </div>
      <div className="utility-links">
        <button type="button" className={isOverview ? "active" : ""} onClick={onOverview} aria-label="切换总览模式" title="总览（O）"><Grid3X3 size={17} /><span>Overview</span></button>
        <button type="button" className={isNotes ? "active" : ""} onClick={onNotes} aria-label="切换讲者备注" title="讲者备注（N）"><BookOpenText size={17} /><span>Notes</span></button>
        <button type="button" onClick={onFullscreen} aria-label="切换浏览器全屏" title="全屏（F）">{isFullscreen ? <Minimize size={17} /> : <Expand size={17} />}<span>Fullscreen</span></button>
      </div>
    </nav>
  );
}

export function SlideFooter({ slide, onSource }: { slide: SlideData; onSource: (source: SourceItem) => void }) {
  const source = sources.find((item) => item.slideIds.includes(slide.id));
  return (
    <footer className="slide-footer">
      <button type="button" disabled={!source} onClick={() => source && onSource(source)} title={source ? "查看来源说明" : slide.sourceNote}>{slide.sourceNote}</button>
      <span>{slide.chapterLabel}</span>
      <b>{String(slide.pageNumber).padStart(2, "0")} / {deckSlides.length}</b>
    </footer>
  );
}

export function ProgressRail({ slides, currentIndex, onNavigate }: { slides: SlideData[]; currentIndex: number; onNavigate: (id: string) => void }) {
  return (
    <aside className="progress-rail" aria-label="页面进度">
      <div className="progress-count"><strong>{String(currentIndex + 1).padStart(2, "0")}</strong><span>/ {slides.length}</span></div>
      <div className="progress-dots">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.id}
            className={`${index === currentIndex ? "active" : ""} chapter-${slide.chapter}`}
            onClick={() => onNavigate(slide.id)}
            aria-label={`跳转到第${slide.pageNumber}页：${slide.title}`}
            title={`${slide.pageNumber}. ${slide.title}`}
          />
        ))}
      </div>
    </aside>
  );
}

export function SpeakerNotesPanel({ slide, onClose }: { slide: SlideData; onClose: () => void }) {
  return (
    <aside className="notes-panel" role="dialog" aria-modal="true" aria-label="讲者备注">
      <header><div><small>SPEAKER NOTES</small><strong>{slide.title}</strong></div><button type="button" onClick={onClose} aria-label="关闭讲者备注"><X /></button></header>
      <div className="notes-scroll">
        <section><span>建议时间</span><strong className="notes-time">{slide.speakerNotes.duration}</strong></section>
        <section><span>讲解要点</span><ol>{slide.speakerNotes.points.map((point) => <li key={point}>{point}</li>)}</ol></section>
        <section><span>承上</span><p>{slide.speakerNotes.bridgeFrom}</p></section>
        <section><span>启下</span><p>{slide.speakerNotes.transitionTo}</p></section>
        {slide.speakerNotes.action && <section className="action-note"><span>现场操作</span><p>{slide.speakerNotes.action}</p></section>}
      </div>
    </aside>
  );
}

export function SourceDrawer({ source, onClose }: { source: SourceItem; onClose: () => void }) {
  return (
    <aside className="source-drawer" role="dialog" aria-modal="true" aria-label="来源说明">
      <header><div><small>SOURCE NOTE</small><strong>{source.title}</strong></div><button type="button" onClick={onClose} aria-label="关闭来源说明"><X /></button></header>
      <dl><div><dt>类型</dt><dd>{source.type}</dd></div><div><dt>支持页面</dt><dd>{source.slideIds.join(" · ")}</dd></div><div><dt>说明</dt><dd>{source.note}</dd></div></dl>
      {source.entries && <div className="source-entry-list">{source.entries.map((entry) => <article key={entry.id}><div><span>{entry.publisher} · {entry.publishedAt}</span><b>{entry.title}</b></div><p>{entry.supportedFacts.join("；")}</p><a href={entry.url} target="_blank" rel="noreferrer">打开官方来源 ↗</a></article>)}</div>}
    </aside>
  );
}
