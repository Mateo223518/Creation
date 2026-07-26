import { useState, useEffect, useCallback, useRef } from "react";
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
    desc: "宝钗立于蘅芜苑中，牡丹开处，人淡如菊。手执团扇半遮面，眉眼间是世故里的从容，也是闺阁中难言的克制。借柳絮喻志——好风凭借力，送我上青云——是女儿身里藏着的一颗丈夫心。",
    enDesc: "Baochai stands amid peonies in the Hengwu Garden, serene as chrysanthemum among them. Fan half-raised, her gaze holds both worldly composure and an unspoken restraint. Through willow catkins she voices ambition — 'on a fair wind I rise to the blue clouds' — a strategist's heart within a daughter's form.",
    year: "2025.11.27",
    vertical: true,
  },
  {
    src: asset("artworks/daiyu.jpg"),
    title: "林黛玉",
    subtitle: "潇湘妃子",
    en: "Lin Daiyu",
    desc: "潇湘馆外竹影婆娑，黛玉倚窗而立，帕上点点是泪亦是墨。她葬花于暮春，把落红与自己一并埋进诗里。眉间一缕清愁，为的是那还未说出口的缘分，也是这世间看不透的聚散。竹影潇湘，泪尽而终。",
    enDesc: "Beyond the Bamboo Lodge shadows sway; Daiyu leans at the window, her handkerchief stained with tears that are also ink. She buries fallen petals in late spring, interring the blossoms and herself in verse. That furrow between her brows is for a fate not yet spoken, for the partings this world never makes clear.",
    year: "2025.11.30",
    vertical: true,
  },
  {
    src: asset("artworks/pipa-lady.jpg"),
    title: "琵琶仕女",
    subtitle: "白描",
    en: "Lady with Pipa",
    desc: "灵感取自白居易《琵琶行》。江州月夜，浔阳江头，她抱琵琶半遮面，弦上三两声，已惹得满座重闻皆掩泣。白描线条里飞天飘带翻飞如水波，琵琶半掩着她欲语还休的神情——千载之下，那声'同是天涯沦落人'仍在弦上未散。",
    enDesc: "Inspired by Bai Juyi's 'Song of the Pipa.' On a moonlit night at Jiangzhou, by the Xunyang River, she cradles the pipa with face half-hidden; two or three notes already move the whole gathering to tears. In pure linework, flying ribbons ripple like water, the instrument half-veiling a look between speech and silence — a thousand years on, 'we are both wanderers fallen to the world's edge' still lingers on those strings.",
    year: "2026.04.11",
    vertical: true,
  },
  {
    src: asset("artworks/monkey-king.jpg"),
    title: "齐天大圣",
    subtitle: "孙悟空",
    en: "Monkey King",
    desc: "齐天大圣立于花果山巅，金箍棒横扫九霄，旌旗猎猎作响。他踏碎凌霄的桀骜，是天地间不肯低头的那股气。披挂鲜烈，眼神灼灼——五百年五行山下，也压不灭的，是一颗齐天的心。",
    enDesc: "The Great Sage stands atop Mount Huaguo, golden staff sweeping the nine heavens, banners cracking in the wind. His defiance that shattered the Heavenly Palace is the one breath in all the world that will not bow. Armor blazing, eyes burning bright — five centuries beneath Five-Elements Mountain could not quench a heart that rivals heaven.",
    year: "2026.03.19",
    vertical: false,
  },
  {
    src: asset("artworks/christmas-tree.jpg"),
    title: "圣诞树",
    subtitle: "水彩小品",
    en: "Christmas Tree",
    desc: "冬夜窗前，圣诞树亮起暖光，星辉点点落在未眠人的肩上。水彩晕染开的，是雪意、是岁末、是漂泊者忽然柔软的一刻。不必有故事，那一点温热的光，就足以把整个冬天照亮。",
    enDesc: "By the window on a winter night, the tree glows warm, stray stars of light settling on the shoulders of one who cannot sleep. Watercolor spreads into snow-sense, year-end, the sudden softening of a wanderer. It needs no story — that one warm glow is enough to light the whole winter through.",
    year: "2025.12.25",
    vertical: false,
  },
  {
    src: asset("artworks/cat-sketch.jpg"),
    title: "猫",
    subtitle: "铅笔素描",
    en: "Cat",
    desc: "猫蜷在旧书堆上，半阖着眼，像是听了一下午的雨。铅笔的灰度里藏着它的傲慢与温存——它不在意你看它，你却忍不住一直看它。眼波流转间，是这屋子里最安静的一位住客。",
    enDesc: "The cat curls on a stack of old books, eyes half-closed, as if it had listened to the rain all afternoon. In the pencil's grayscale hides its pride and its tenderness — it does not care that you watch it, yet you cannot look away. In its slow glance, the quietest tenant of the house.",
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
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    moved: boolean;
  } | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  // 切画时重置缩放与平移
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [index]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    // 捕获阶段拦截滚轮：缩放图片，阻止冒泡到 gallery 切画
    const onWheelCapture = (e: WheelEvent) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const d = e.deltaY > 0 ? -0.25 : 0.25;
      setZoom((z) => Math.min(Math.max(1, +(z + d).toFixed(2)), 5));
    };
    window.addEventListener("wheel", onWheelCapture, {
      capture: true,
      passive: false,
    });

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("wheel", onWheelCapture, { capture: true } as any);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  // 双击切换放大/还原
  const onDoubleClick = () => {
    if (zoom > 1) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    } else {
      setZoom(2.5);
    }
  };

  // 放大后拖动平移
  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    dragRef.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: pan.x,
      oy: pan.y,
      moved: false,
    };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) d.moved = true;
    setPan({ x: d.ox + dx, y: d.oy + dy });
  };
  const endDrag = () => {
    dragRef.current = null;
  };

  // 背景点击关闭（拖动时不关闭）
  const onBackdropClick = () => {
    if (dragRef.current?.moved) {
      dragRef.current.moved = false;
      return;
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onBackdropClick}
    >
      <button
        className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-foreground/80 transition-colors hover:text-foreground"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
      >
        ✕
      </button>

      <button
        className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-foreground/60 transition-colors hover:text-foreground md:left-8"
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
          className="max-h-[70vh] w-auto select-none object-contain shadow-2xl"
          draggable={false}
          onDoubleClick={onDoubleClick}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: dragRef.current ? "none" : "transform 0.3s ease-out",
            cursor: zoom > 1 ? (dragRef.current ? "grabbing" : "grab") : "zoom-in",
            willChange: "transform",
          }}
        />
        <div className="mt-6 max-w-2xl text-center">
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
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground/85">
            {art.desc}
          </p>
          {art.enDesc && (
            <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground/60">
              {art.enDesc}
            </p>
          )}
          <p className="mt-3 text-xs text-muted-foreground/50">
            {art.en} · {art.year} · {index + 1} / {artworks.length} · {Math.round(zoom * 100)}%
          </p>
        </div>
        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
          滚轮缩放 · 双击放大 · 拖动平移
        </p>
      </div>

      <button
        className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-foreground/60 transition-colors hover:text-foreground md:right-8"
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