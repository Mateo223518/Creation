export function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/10 px-8 py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div>
          <span className="text-3xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Matthew</span>
          <p className="mt-2 text-xs text-muted-foreground/60">个人画作陈列 · Personal Gallery</p>
        </div>
        <div className="flex flex-col items-center gap-3 md:items-end">
          <p className="text-sm text-muted-foreground">联系 · Contact</p>
          <a href="mailto:13902545360@139.com" className="text-sm text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">13902545360@139.com</a>
          <p className="text-xs text-muted-foreground/60">© {new Date().getFullYear()} Matthew. All works reserved.<br />作品版权归创作者所有。</p>
        </div>
      </div>
    </footer>
  );
}
