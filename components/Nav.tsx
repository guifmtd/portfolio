"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, ThemeToggle } from "@/components/ui";

const links = [
  { href: "/", label: "Início" },
  { href: "/trabalhos", label: "Trabalhos" },
  { href: "/sobre", label: "Sobre" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[var(--z-nav)] transition-all duration-[var(--duration-slow)] ${
          scrolled
            ? "bg-[var(--color-bg)]/70 backdrop-blur-md border-b border-[var(--color-border)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl md:text-2xl tracking-tight"
          >
            gui
            <span className="italic text-[var(--color-accent)]">fmtd</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-sm transition-colors ${
                    active
                      ? "text-[var(--color-fg)]"
                      : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-0 right-0 -bottom-2 h-px bg-[var(--color-accent)]"
                    />
                  )}
                </Link>
              );
            })}
            <ThemeToggle className="ml-2" />
            <Link
              href="/contato"
              className="text-sm bg-[var(--color-accent)] text-[var(--color-bg)] px-4 py-2 rounded-[var(--radius-md)] hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Vamos conversar
            </Link>
          </nav>

          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex flex-col gap-1.5 p-2 -mr-2"
            >
              <span
                className={`block h-px w-6 bg-[var(--color-fg)] transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-6 bg-[var(--color-fg)] transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-6 bg-[var(--color-fg)] transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden bg-[var(--color-bg)] pt-24 px-6 flex flex-col">
          <nav className="flex flex-col gap-6">
            {links.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`font-display text-4xl ${
                    active
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-fg)]"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-10">
            <Button
              href="/contato"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Vamos conversar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
