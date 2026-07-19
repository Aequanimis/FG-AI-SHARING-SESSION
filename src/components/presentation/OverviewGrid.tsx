import { X } from "lucide-react";
import type { SlideData } from "../../types/presentation";

export function OverviewGrid({ slides, currentIndex, onSelect, onClose }: { slides: SlideData[]; currentIndex: number; onSelect: (id: string) => void; onClose: () => void }) {
  return (
    <div className="overview-layer" role="dialog" aria-modal="true" aria-label="演示总览">
      <header><div><small>OVERVIEW · 19 SLIDES</small><strong>选择页面继续演示</strong></div><button type="button" onClick={onClose} aria-label="关闭总览"><X /></button></header>
      <div className="overview-grid">
        {slides.map((slide, index) => (
          <button type="button" className={`overview-card ${index === currentIndex ? "active" : ""} theme-${slide.theme}`} onClick={() => onSelect(slide.id)} key={slide.id}>
            <div className="overview-mini">
              <span>{slide.eyebrow}</span><strong>{slide.title}</strong><i /><p>{slide.keyMessage}</p><b>FULLGOAL</b>
            </div>
            <footer><span>{String(slide.pageNumber).padStart(2, "0")}</span><p>{slide.chapterLabel}</p>{index === currentIndex && <em>当前页</em>}</footer>
          </button>
        ))}
      </div>
    </div>
  );
}
