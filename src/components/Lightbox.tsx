import { useCallback, useEffect, useRef, useState } from "react";
import type { Artwork } from "@/data/artworks";

interface LightboxProps {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  artworks: Artwork[];
}

const clampZoom = (value: number) => Math.min(Math.max(1, value), 5);

export function Lightbox({ index, onClose, onPrev, onNext, artworks }: LightboxProps) {
  const art = artworks[index];
  const [zoom, setZoom] = useState(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const resetZoom = useCallback(() => setZoom(1), []);
  useEffect(() => resetZoom(), [index, resetZoom]);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key === "ArrowLeft") { event.preventDefault(); onPrev(); }
      if (event.key === "ArrowRight") { event.preventDefault(); onNext(); }
      if (event.key === "Tab") {
        const root = rootRef.current;
        if (!root) return;
        const items = Array.from(root.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])"));
        const first = items[0];
        const last = items[items.length - 1];
        if (first && last && event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (first && last && !event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [onClose, onNext, onPrev]);

  const changeZoom = (delta: number) => setZoom((value) => clampZoom(+(value + delta).toFixed(2)));

  return (
    <div ref={rootRef} role="dialog" aria-modal="true" aria-labelledby="lightbox-title" tabIndex={-1} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md md:p-8" onClick={onClose}>
      <button ref={closeRef} type="button" aria-label="关闭作品详情" className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-foreground/80 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-6 md:top-6" onClick={(event) => { event.stopPropagation(); onClose(); }}>✕</button>
      <button type="button" aria-label="上一幅作品" className="absolute left-1 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-foreground/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-8" onClick={(event) => { event.stopPropagation(); onPrev(); }}>‹</button>
      <div className="flex max-h-[90vh] max-w-[90vw] flex-col items-center" onClick={(event) => event.stopPropagation()}>
        <img src={art.src} alt={art.title + " · " + art.en} className="max-h-[52vh] w-auto select-none object-contain shadow-2xl md:max-h-[68vh]" draggable={false} onWheel={(event) => { event.preventDefault(); changeZoom(event.deltaY > 0 ? -0.25 : 0.25); }} onDoubleClick={() => setZoom((value) => value > 1 ? 1 : 2.5)} style={{ transform: "scale(" + zoom + ")", transition: "transform .25s ease-out", cursor: zoom > 1 ? "grab" : "zoom-in", touchAction: "manipulation", willChange: "transform" }} />
        <div className="mt-5 max-w-2xl text-center md:mt-6">
          <div className="flex items-center justify-center gap-3"><h2 id="lightbox-title" className="text-2xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>{art.title}</h2><span className="text-sm text-muted-foreground">· {art.subtitle}</span></div>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground/85">{art.desc}</p>
          {art.enDesc && <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground/60">{art.enDesc}</p>}
          <p className="mt-3 text-xs text-muted-foreground/60" aria-live="polite">{art.en} · {art.year} · {index + 1} / {artworks.length} · {Math.round(zoom * 100)}%</p>
        </div>
        <p className="mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">滚轮缩放 · 双击放大 · Esc 关闭</p>
      </div>
      <button type="button" aria-label="下一幅作品" className="absolute right-1 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-foreground/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8" onClick={(event) => { event.stopPropagation(); onNext(); }}>›</button>
    </div>
  );
}
