const navLinks = [
  { label: "Works", href: "#works", active: false },
  { label: "About", href: "#about", active: false },
  { label: "Contact", href: "#contact", active: false },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-30">
      <div className="flex max-w-7xl mx-auto flex-row items-center justify-between px-8 py-6">
        {/* Logo */}
        <a
          href="#"
          className="text-3xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Matthew
        </a>

        {/* Nav links */}
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

        {/* CTA */}
        <a
          href="#works"
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground transition-transform duration-200 hover:scale-[1.03] cursor-pointer"
        >
          View Works
        </a>
      </div>
    </nav>
  );
}
