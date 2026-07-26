export function Hero() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-32 pb-40 text-center">
      <p
        className="animate-fade-rise mb-6 text-xs uppercase tracking-[0.4em] text-muted-foreground"
      >
        Personal Gallery · 个人画作陈列
      </p>

      <h1
        className="animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] sm:text-7xl md:text-8xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        水墨之间
        <br />
        <em className="not-italic text-muted-foreground">静观其象</em>
      </h1>

      <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        Matthew 的个人画作陈列。以数字工笔记录古典人物与日常诗意，
        在留白与墨色之间，安放一份安静的注视。
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground/70">
        A personal gallery of paintings by Matthew — classical figures and
        quiet moments, rendered in digital ink.
      </p>

      <a
        href="#works"
        className="liquid-glass animate-fade-rise-delay-2 mt-12 cursor-pointer rounded-full px-14 py-5 text-base text-foreground transition-transform duration-200 hover:scale-[1.03]"
      >
        浏览作品 · View Works
      </a>
    </section>
  );
}
