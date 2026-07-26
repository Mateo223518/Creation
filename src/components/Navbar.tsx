import { useState } from "react";

const navLinks = [
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-30">
      <div className="flex max-w-7xl mx-auto flex-row items-center justify-between px-6 py-5 md:px-8 md:py-6">
        {/* Logo */}
        <a
          href="#"
          className="text-2xl tracking-tight text-foreground md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Matthew
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors hover:text-foreground text-muted-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#works"
          className="liquid-glass hidden md:inline-flex items-center rounded-full px-6 py-2.5 text-sm text-foreground transition-transform duration-200 hover:scale-[1.03] cursor-pointer"
        >
          View Works
        </a>

        {/* Mobile hamburger */}
        <button
          className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 top-0 h-[2px] w-full bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-[2px] w-full bg-current transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 top-[14px] h-[2px] w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden">
          <div className="mx-4 mb-2 rounded-2xl liquid-glass px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base text-foreground/90 border-b border-white/5 last:border-none"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#works"
              onClick={() => setOpen(false)}
              className="mt-3 block rounded-full bg-white/10 py-3 text-center text-sm text-foreground"
            >
              View Works
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
