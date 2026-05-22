"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Work } from "@/lib/works";
import { PlaceholderHue } from "./ui";

type Props = {
  work: Work;
  index?: number;
  large?: boolean;
  /** Quando true, ignora o aspect-ratio e estica pra ocupar a altura do pai. */
  fill?: boolean;
  /** Card mais denso (homepage 3-col) — reduz título e padding. */
  compact?: boolean;
};

export default function WorkCard({
  work,
  index = 0,
  large = false,
  fill = false,
  compact = false,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const aspectClass = fill
    ? "h-full"
    : large
      ? "aspect-[16/9]"
      : "aspect-[4/3]";

  const caseNum = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/trabalhos/${work.slug}`}
      data-cursor="view"
      className={`group block ${fill ? "h-full" : ""}`}
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] ${aspectClass}`}
      >
        {!work.placeholder ? (
          <>
            <PlaceholderHue
              hue={work.hue}
              className="transition-transform duration-[var(--duration-slower)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0 opacity-30 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-[var(--duration-base)]" />
          </>
        ) : (
          <>
            {/* Background placeholder premium — frame perfurado + slate diagonal */}
            <div className="absolute inset-0 bg-[var(--color-bg-elevated)]" />
            <div
              aria-hidden
              className="film-perfs pointer-events-none absolute top-0 bottom-0 left-2 w-1.5 opacity-70"
            />
            <div
              aria-hidden
              className="film-perfs pointer-events-none absolute top-0 bottom-0 right-2 w-1.5 opacity-70"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, transparent 0% 48%, rgba(212,160,86,0.05) 49% 51%, transparent 52% 100%)",
              }}
            />
            {/* Nome do cliente em destaque Fraunces italic */}
            <div className="absolute inset-0 flex items-center justify-center px-8 pointer-events-none">
              <span
                className={`font-display italic text-center text-[var(--color-fg-muted)] opacity-70 group-hover:opacity-90 transition-opacity duration-[var(--duration-slow)] text-balance ${
                  large ? "text-5xl md:text-7xl" : "text-3xl md:text-5xl"
                }`}
              >
                {work.client}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />
          </>
        )}

        {work.placeholder && (
          <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[var(--color-fg-muted)] border border-[var(--color-border-strong)] bg-[var(--color-bg)]/70 backdrop-blur-sm px-2.5 py-1.5 rounded-[var(--radius-sm)] uppercase">
            <svg
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              className="transition-transform duration-[var(--duration-base)] group-hover:rotate-[-12deg]"
            >
              <rect
                x="1"
                y="5"
                width="8"
                height="6"
                rx="1"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M3 5V3.5a2 2 0 1 1 4 0V5"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            Locked · Case_{caseNum}
          </span>
        )}

        <div className={`absolute inset-0 flex flex-col justify-between ${compact ? "p-4 md:p-5" : "p-6 md:p-8"}`}>
          <div className="flex justify-between items-start text-[10px] font-mono tracking-[0.25em] text-[var(--color-fg-muted)]">
            <span>
              {caseNum} · {work.category.toUpperCase()}
            </span>
            <span>{work.year}</span>
          </div>

          <div>
            <p className="text-[10px] font-mono tracking-[0.25em] text-[var(--color-fg-subtle)] mb-2">
              {work.client.toUpperCase()} · {work.duration}
            </p>
            {!work.placeholder && (
              <h3
                className={`font-display font-normal tracking-[-0.02em] ${
                  large
                    ? "text-4xl md:text-6xl"
                    : compact
                      ? "text-lg md:text-xl"
                      : "text-2xl md:text-4xl"
                } leading-[0.95]`}
              >
                {work.title}
              </h3>
            )}
            <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-fg-muted)] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-[var(--duration-slow)]">
              <span>{work.placeholder ? "Drop iminente" : "Ver case"}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 h-px bg-[var(--color-accent)] w-0 group-hover:w-full transition-all duration-[var(--duration-slow)]" />
      </motion.div>
    </Link>
  );
}
