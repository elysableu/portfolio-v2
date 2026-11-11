"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-night-700/70 bg-night-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-sm font-semibold text-ink">
          <span aria-hidden="true" className="text-neon-cyan">
            &gt;_{" "}
          </span>
          {name}
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
          className="rounded-md border border-night-700 px-3 py-1.5 font-mono text-xs text-ink md:hidden"
        >
          {open ? "Close" : "Menu"}
          <span className="sr-only"> menu</span>
        </button>

        <nav
          id="primary-nav"
          aria-label="Primary"
          className={`${open ? "block" : "hidden"} absolute inset-x-0 top-16 border-b border-night-700 bg-night-950/95 md:static md:block md:border-0 md:bg-transparent`}
        >
          <ul className="flex flex-col px-4 py-2 md:flex-row md:gap-8 md:p-0">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm text-ink-muted transition hover:text-neon-cyan md:py-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
