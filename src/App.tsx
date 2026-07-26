import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Gallery, type Artwork } from "@/components/Gallery";

// Vite base path (deploys under /Creation/ on GitHub Pages)
const base = import.meta.env.BASE_URL;
const asset = (p: string) => `${base}${p}`;

const VIDEO_SRC = asset("background.mp4");

const artworks: Artwork[] = [
  {
    src: asset("artworks/baochai.jpg"),
    title: "薛宝钗",
    subtitle: "蘅芜君",
    en: "Xue Baochai",
    desc: "好风凭借力，送我上青云",
    year: "2025.11.27",
    vertical: true,
  },
  {
    src: asset("artworks/daiyu.jpg"),
    title: "林黛玉",
    subtitle: "潇湘妃子",
    en: "Lin Daiyu",
    desc: "竹影潇湘，泪尽而终",
    year: "2025.11.30",
    vertical: true,
  },
  {
    src: asset("artworks/pipa-lady.jpg"),
    title: "琵琶仕女",
    subtitle: "白描",
    en: "Lady with Pipa",
    desc: "飞天飘带，琵琶半掩",
    year: "2026.04.11",
    vertical: true,
  },
  {
    src: asset("artworks/monkey-king.jpg"),
    title: "齐天大圣",
    subtitle: "孙悟空",
    en: "Monkey King",
    desc: "金箍棒起，旌旗猎猎",
    year: "2026.03.19",
    vertical: false,
  },
  {
    src: asset("artworks/christmas-tree.jpg"),
    title: "圣诞树",
    subtitle: "水彩小品",
    en: "Christmas Tree",
    desc: "冬日梦境，星辉点点",
    year: "2025.12.25",
    vertical: false,
  },
  {
    src: asset("artworks/cat-sketch.jpg"),
    title: "猫",
    subtitle: "铅笔素描",
    en: "Cat",
    desc: "静坐观人，眼波流转",
    year: "2026.04.24",
    vertical: false,
  },
];

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
  artworks,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  artworks: Artwork[];
}) {
  const art = artworks[index];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-foreground/80 transition-colors hover:text-foreground"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
      >
        ✕
      </button>

      <button
        className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-foreground/60 transition-colors hover:text-foreground md:left-8"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous"
      >
        ‹
      </button>

      <div
        className="flex max-h-[90vh] max-w-[90vw] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={art.src}
          alt={`${art.title} · ${art.en}`}
          className="max-h-[78vh] w-auto object-contain shadow-2xl"
          draggable={false}
        />
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              className="text-2xl text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {art.title}
            </span>
            <span className="text-sm text-muted-foreground">
              · {art.subtitle}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground/80">{art.desc}</p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            {art.en} · {art.year} · {index + 1} / {artworks.length}
          </p>
        </div>
      </div>

      <button
        className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-foreground/60 transition-colors hover:text-foreground md:right-8"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
}

function About() {
  return (
    <section
      id="about"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center"
    >
      <div className="max-w-2xl">
        <p className="mb-6 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          About · 关于
        </p>
        <h2
          className="text-4xl text-foreground md:text-5xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          以墨为语
        </h2>
        <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
          我是 Matthew，一名独立创作者。
          画里多见古典人物——红楼梦中人、飞天仕女、齐天大圣，
          也偶有水彩小品与日常素描。
          偏爱工笔线条与水墨晕染，相信留白自有千言。
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground/70">
          I'm Matthew, an independent artist. My work centers on classical
          Chinese figures — characters from Dream of the Red Chamber, flying
          apsaras, the Monkey King — alongside occasional watercolor studies
          and sketches. I work in fine line and ink wash, trusting that what is
          left blank speaks as loudly as what is drawn.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 border-t border-white/10 px-8 py-16"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div>
          <span
            className="text-3xl text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Matthew
          </span>
          <p className="mt-2 text-xs text-muted-foreground/60">
            个人画作陈列 · Personal Gallery
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 md:items-end">
          <p className="text-sm text-muted-foreground">联系 · Contact</p>
          <a
            href="mailto:hello@matthew.art"
            className="text-sm text-foreground/80 transition-colors hover:text-foreground"
          >
            hello@matthew.art
          </a>
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} Matthew. All works reserved.
            <br />
            作品版权归创作者所有。
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) =>
      i === null ? i : (i - 1 + artworks.length) % artworks.length
    );
  const nextImage = () =>
    setLightboxIndex((i) => (i === null ? i : (i + 1) % artworks.length));

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 z-0 h-full w-full object-cover"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="fixed inset-0 z-0 bg-background/50" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <Hero />
        <Gallery artworks={artworks} onOpen={openLightbox} />
        <About />
        <Footer />
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          artworks={artworks}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}

export default App;
