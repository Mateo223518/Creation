export function About() {
  return (
    <section
      id="about"
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center border-t border-white/10 bg-black/15 px-6 py-24 text-center md:py-32"
    >
      <div className="max-w-2xl rounded-3xl bg-black/10 px-6 py-12 backdrop-blur-[2px] sm:px-10 md:py-16">
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
        <p className="mt-10 text-[10px] uppercase tracking-[0.32em] text-muted-foreground/50">
          Artist statement · 创作自述
        </p>
      </div>
    </section>
  );
}
