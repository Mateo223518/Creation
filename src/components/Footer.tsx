export function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 border-t border-white/10 px-6 py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-xl">
          <p className="mb-5 text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Contact · 联系
          </p>
          <h2
            className="text-4xl leading-tight text-foreground md:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            让下一幅作品，<br />
            从一封信开始。
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            如果你想讨论展览、委托或合作，欢迎来信。请简单介绍你的想法与时间计划，我会尽快回复。
          </p>
          <a
            href="mailto:13902545360@139.com"
            className="mt-7 inline-flex rounded-full bg-white/10 px-6 py-3 text-sm text-foreground transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            13902545360@139.com ↗
          </a>
        </div>

        <div className="flex flex-col gap-3 text-sm text-muted-foreground md:items-end">
          <span
            className="text-3xl text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Matthew
          </span>
          <p>Independent artist · 个人创作者</p>
          <p className="pt-4 text-xs text-muted-foreground/60 md:text-right">
            © {new Date().getFullYear()} Matthew. All works reserved.
            <br />
            作品版权归创作者所有。
          </p>
        </div>
      </div>
    </footer>
  );
}
