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
        笔起墨落，古人与日常皆入画来。
        留白处，自有千言。
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground/70">
        Where brush meets ink, the classical and the everyday become image.
        In the blank space, a quiet contemplation.
      </p>

      <a
        href="#works"
        className="liquid-glass animate-fade-rise-delay-2 mt-12 cursor-pointer rounded-full px-10 py-4 text-base text-foreground transition-transform duration-200 hover:scale-[1.03] md:px-14 md:py-5"
      >
        浏览作品 · View Works
      </a>
    </section>
  );
}
