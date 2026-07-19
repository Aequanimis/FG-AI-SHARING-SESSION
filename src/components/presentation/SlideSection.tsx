import type { SlideData, SourceItem } from "../../types/presentation";
import { assets } from "../../config/assets";
import { AnimatedBlueLine, AnimatedTitle, ScrollRevealText, WordsPullUp, WordsPullUpMultiStyle } from "../ui/Motion";
import { PrismaVideo } from "../ui/PrismaMedia";
import { BrandHeader, SlideFooter } from "./Chrome";
import { KeyMessage, SlideVisual } from "./SlideRenderer";

export function SlideSection({ slide, current, onNavigate, onSource }: { slide: SlideData; current: boolean; onNavigate: (id: string) => void; onSource: (source: SourceItem) => void }) {
  const isHero = slide.visualType === "hero";
  const isClosing = slide.visualType === "closing";
  const isAgenda = slide.visualType === "agenda";
  return (
    <section id={slide.id} data-slide-index={slide.pageNumber - 1} className={`slide-section theme-${slide.theme} visual-${slide.visualType} ${current ? "is-current" : ""}`} aria-label={`第${slide.pageNumber}页：${slide.title}`}>
      <div className="slide-frame">
        {isHero && <PrismaVideo className="hero-media" src={assets.prismaHeroVideo} label="Prisma Hero video" noise />}
        <BrandHeader dark={slide.theme === "navy"} />
        <div className={`slide-copy ${isHero || isClosing ? "special-copy" : ""}`}>
          <AnimatedTitle><p className="eyebrow">{slide.eyebrow}</p></AnimatedTitle>
          <h1>{isAgenda ? <WordsPullUpMultiStyle text={slide.title} /> : <WordsPullUp text={slide.title} />}</h1>
          <h2><ScrollRevealText text={slide.subtitle} /></h2>
          {!isHero && !isClosing && <AnimatedBlueLine />}
          {(isHero || isClosing) && <p className="slide-intro"><ScrollRevealText text={slide.body} /></p>}
        </div>
        <div className="slide-visual"><SlideVisual slide={slide} onNavigate={onNavigate} onSource={onSource} /></div>
        {!isHero && !isClosing && <KeyMessage slide={slide} />}
        {isClosing && <div className="thank-you">THANK YOU</div>}
        <SlideFooter slide={slide} onSource={onSource} />
      </div>
    </section>
  );
}
