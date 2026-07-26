import { useEffect, useRef } from "react";

export interface Artwork {
  src: string;
  title: string;
  subtitle: string;
  en: string;
  desc: string;
  year: string;
  vertical: boolean;
}

interface GalleryProps {
  artworks: Artwork[];
  onOpen: (index: number) => void;
}

export function Gallery({ artworks, onOpen }: GalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // 滚轮纵向转横向滚动
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (e: WheelEvent) => {
      // 优先用纵向滚轮驱动横向
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section
      id="works"
      className="relative h-screen w-full overflow-hidden bg-black/40"
    >
      {/* 板块标题 */}
      <div className="pointer-events-none absolute left-8 top-24 z-10 md:left-12">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Selected Works
        </p>
        <h2
          className="mt-2 text-3xl text-foreground md:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          精选作品
        </h2>
      </div>

      {/* 横向滚动轨道 */}
      <div
        ref={trackRef}
        className="gallery-track flex h-full snap-x snap-mandatory items-center gap-8 overflow-x-auto overflow-y-hidden px-8 pb-0 pt-32 md:gap-16 md:px-16"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {artworks.map((art, i) => (
          <figure
            key={art.src}
            className="group relative flex shrink-0 snap-center cursor-pointer flex-col items-center"
            onClick={() => onOpen(i)}
          >
            <div
              className={`relative overflow-hidden rounded-sm shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] ${
                art.vertical ? "h-[68vh] w-auto" : "h-[60vh] w-auto"
              }`}
            >
              <img
                src={art.src}
                alt={`${art.title} · ${art.en}`}
                className="h-full w-full object-contain"
                loading="lazy"
                draggable={false}
              />
              {/* 悬停遮罩 */}
              <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="liquid-glass mb-6 rounded-full px-6 py-2 text-xs text-foreground">
                  点击查看 · Click to view
                </span>
              </div>
            </div>

            {/* 作品信息 */}
            <figcaption className="mt-5 text-center">
              <div className="flex items-center justify-center gap-2">
                <span
                  className="text-lg text-foreground"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {art.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  · {art.subtitle}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground/70">
                {art.en} · {art.year}
              </p>
            </figcaption>
          </figure>
        ))}

        {/* 末尾留白 */}
        <div className="w-16 shrink-0 md:w-32" />
      </div>

      {/* 滚动提示 */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <p className="flex items-center gap-3 text-xs text-muted-foreground/60">
          <span className="inline-block h-px w-10 bg-muted-foreground/40" />
          滚动浏览 · Scroll to explore
          <span className="inline-block h-px w-10 bg-muted-foreground/40" />
        </p>
      </div>
    </section>
  );
}
