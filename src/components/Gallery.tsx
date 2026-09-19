import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { Artwork } from "@/data/artworks";

interface GalleryProps { artworks: Artwork[]; onOpen: (index: number) => void; }
const getFigures = (track: HTMLDivElement) => Array.from(track.querySelectorAll<HTMLElement>("figure[data-index]"));

export function Gallery({ artworks, onOpen }: GalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let locked = false;
    let unlockTimer: number | undefined;
    const getCurrentIndex = () => {
      const items = getFigures(track);
      const center = track.scrollLeft + track.clientWidth / 2;
      let current = 0; let best = Infinity;
      items.forEach((item, index) => { const middle = item.offsetLeft + item.offsetWidth / 2; const distance = Math.abs(middle - center); if (distance < best) { best = distance; current = index; } });
      return { current, items };
    };
    const syncActiveIndex = () => setActiveIndex(getCurrentIndex().current);
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const rect = track.getBoundingClientRect(); const viewportHeight = window.innerHeight || 1;
      if (!(rect.top < viewportHeight * 0.6 && rect.bottom > viewportHeight * 0.4)) return;
      const { current, items } = getCurrentIndex(); if (!items.length) return;
      const goingDown = event.deltaY > 0;
      if ((current === 0 && !goingDown) || (current === items.length - 1 && goingDown)) return;
      event.preventDefault(); if (locked) return;
      const next = goingDown ? Math.min(current + 1, items.length - 1) : Math.max(current - 1, 0); if (next === current) return;
      locked = true; unlockTimer = window.setTimeout(() => { locked = false; }, 650); setActiveIndex(next);
      items[next].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    };
    track.addEventListener("scroll", syncActiveIndex, { passive: true }); window.addEventListener("wheel", onWheel, { passive: false }); syncActiveIndex();
    return () => { track.removeEventListener("scroll", syncActiveIndex); window.removeEventListener("wheel", onWheel); if (unlockTimer) window.clearTimeout(unlockTimer); };
  }, []);
  const scrollTo = (index: number) => { const track = trackRef.current; if (!track || !artworks[index]) return; setActiveIndex(index); getFigures(track)[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); };
  const handleFigureKeyDown = (event: KeyboardEvent<HTMLElement>, index: number) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpen(index); } };
  return (
    <section id="works" className="relative h-screen w-full overflow-hidden bg-black/40" aria-labelledby="works-title">
      <div className="pointer-events-none absolute left-8 top-24 z-10 md:left-12"><p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Selected Works</p><h2 id="works-title" className="mt-2 text-3xl text-foreground md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif" }}>精选作品</h2></div>
      <div ref={trackRef} className="gallery-track flex h-full snap-x snap-mandatory items-center gap-8 overflow-x-auto overflow-y-hidden px-8 pb-0 pt-32 md:gap-16 md:px-16" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} aria-label="作品画廊，可左右滑动浏览">
        {artworks.map((art, index) => <figure key={art.src} data-index={index} tabIndex={0} role="button" aria-label={"打开" + art.title + "作品详情"} className="group relative flex shrink-0 snap-center cursor-pointer flex-col items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black" onClick={() => onOpen(index)} onKeyDown={(event) => handleFigureKeyDown(event, index)}>
          <div className={"relative overflow-hidden rounded-sm shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] " + (art.vertical ? "h-[52vh] w-[min(72vw,42vh)] md:h-[68vh] md:w-[min(42vw,56vh)]" : "h-[46vh] w-[min(86vw,58vh)] md:h-[60vh] md:w-[min(64vw,80vh)]")}>
            <img src={art.src} alt={art.title + " · " + art.en} className="h-full w-full object-contain" loading="lazy" decoding="async" draggable={false} />
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"><span className="liquid-glass mb-6 rounded-full px-6 py-2 text-xs text-foreground">点击查看 · Click to view</span></div>
          </div>
          <figcaption className="mt-5 text-center"><div className="flex items-center justify-center gap-2"><span className="text-lg text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>{art.title}</span><span className="text-xs text-muted-foreground">· {art.subtitle}</span></div><p className="mt-1 text-xs text-muted-foreground/75">{art.en} · {art.year}</p></figcaption>
        </figure>)}
        <div className="w-16 shrink-0 md:w-32" aria-hidden="true" />
      </div>
      <button type="button" aria-label="上一幅作品" className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-3xl text-foreground/70 transition hover:bg-black/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex" onClick={() => scrollTo(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0}>‹</button>
      <button type="button" aria-label="下一幅作品" className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-3xl text-foreground/70 transition hover:bg-black/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex" onClick={() => scrollTo(Math.min(artworks.length - 1, activeIndex + 1))} disabled={activeIndex === artworks.length - 1}>›</button>
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/25 px-3 py-2" aria-label={"第 " + (activeIndex + 1) + " 幅，共 " + artworks.length + " 幅"}>
        {artworks.map((art, index) => <button key={art.src} type="button" aria-label={"查看第 " + (index + 1) + " 幅：" + art.title} aria-current={activeIndex === index ? "true" : undefined} className={"h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white " + (activeIndex === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/80")} onClick={() => scrollTo(index)} />)}
      </div>
      <p className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70 md:block">滚动浏览 · Scroll to explore</p>
      <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 md:hidden">左右滑动 · Swipe to explore</p>
    </section>
  );
}

export type { Artwork } from "@/data/artworks";
