"use client";

import { motion } from "motion/react";
import { services } from "@/lib/config";
import { Container, Section } from "@/components/ui";

export default function ServicesGrid() {
  return (
    <Section spacing="loose">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16 md:mb-24">
          <div className="md:col-span-4">
            <p className="font-mono text-xs tracking-[0.3em] text-[var(--color-fg-subtle)] mb-6">
              SERVIÇOS · {String(services.length).padStart(2, "0")}
            </p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-balance">
              Tudo que acontece{" "}
              <span className="italic text-[var(--color-accent)]">depois</span> da
              gravação.
            </h2>
          </div>
        </div>

        <ul className="border-t border-[var(--color-border)]">
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative group border-b border-[var(--color-border)] isolate"
            >
              {/* Bg fill — sutil preenchimento no hover (desktop) */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-[var(--color-bg-elevated)] opacity-0 md:group-hover:opacity-100 transition-opacity duration-[var(--duration-base)]"
              />
              {/* Playhead bar — linha vertical accent (cursor do Premiere) */}
              <span
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-px bg-[var(--color-accent)] origin-top scale-y-0 md:group-hover:scale-y-100 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)]"
              />

              <div className="relative flex items-start gap-5 md:gap-10 py-6 md:py-10 px-3 md:px-6">
                {/* Número */}
                <span className="font-mono text-xs tracking-[0.25em] text-[var(--color-fg-subtle)] mt-2 md:mt-4 shrink-0 w-8 md:w-12 tabular-nums md:group-hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]">
                  {s.n}
                </span>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-balance transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] md:group-hover:translate-x-2">
                    {s.title}
                  </h3>
                  <div className="max-h-40 md:max-h-0 md:group-hover:max-h-40 overflow-hidden transition-[max-height] duration-[var(--duration-slow)] ease-[var(--ease-out)]">
                    <p className="mt-3 md:mt-5 text-base text-[var(--color-fg-muted)] leading-relaxed text-pretty max-w-2xl">
                      {s.desc}
                    </p>
                  </div>
                </div>

                {/* Arrow circular — só desktop, aparece no hover */}
                <span
                  aria-hidden
                  className="hidden md:grid shrink-0 mt-2 md:mt-3 h-10 w-10 rounded-full border border-[var(--color-border-strong)] place-items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)] transition-all duration-[var(--duration-base)] text-[var(--color-fg-muted)]"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h12M8 2l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
