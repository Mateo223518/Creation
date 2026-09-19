import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const closeOnOutsidePointer = (event: PointerEvent) => { if (!navRef.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape); document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => { document.removeEventListener("keydown", closeOnEscape); document.removeEventListener("pointerdown", closeOnOutsidePointer); };
  }, [open]);
  const closeMenu = () => setOpen(false);
  return (
    <nav ref={navRef} className="fixed left-0 right-0 top-0 z-30" aria-label="主导航">
      <div className="mx-auto flex max-w-7xl flex-row items-center justify-between px-6 py-5 md:px-8 md:py-6">
        <a href="#" aria-label="返回首页" className="text-2xl tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:text-3xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Matthew</a>
        <div className="hidden items-center gap-8 md:flex">{navLinks.map((link) => <a key={link.label} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{link.label}</a>)}</div>
        <a href="#works" className="liquid-glass hidden cursor-pointer items-center rounded-full px-6 py-2.5 text-sm text-foreground transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:inline-flex">View Works</a>
        <button type="button" className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "关闭菜单" : "打开菜单"} aria-expanded={open} aria-controls="mobile-menu">
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span className={"absolute left-0 top-0 h-[2px] w-full bg-current transition-transform duration-300" + (open ? " translate-y-[7px] rotate-45" : "")} />
            <span className={"absolute left-0 top-[7px] h-[2px] w-full bg-current transition-opacity duration-300" + (open ? " opacity-0" : " opacity-100")} />
            <span className={"absolute left-0 top-[14px] h-[2px] w-full bg-current transition-transform duration-300" + (open ? " -translate-y-[7px] -rotate-45" : "")} />
          </span>
        </button>
      </div>
      {open && <div id="mobile-menu" className="md:hidden"><div className="liquid-glass mx-4 mb-2 rounded-2xl px-6 py-4">{navLinks.map((link) => <a key={link.label} href={link.href} onClick={closeMenu} className="block border-b border-white/10 py-3 text-base text-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white last:border-none">{link.label}</a>)}<a href="#works" onClick={closeMenu} className="mt-3 block rounded-full bg-white/10 py-3 text-center text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">View Works</a></div></div>}
    </nav>
  );
}
