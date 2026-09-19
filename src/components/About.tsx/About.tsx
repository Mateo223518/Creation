export function About() {
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
