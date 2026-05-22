"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site, clientsHighlight } from "@/lib/config";
import { Eyebrow, Display, Body, Button } from "./ui";
import { useReady } from "./ReadyProvider";

const FPS = 23.976;
const FRAME_MS = 1000 / FPS;
const BOOT_TC_MS = (4 * 60 + 57) * 1000 + 12 * FRAME_MS;

function formatTC(elapsedMs: number) {
  const totalFrames = Math.floor(elapsedMs / FRAME_MS);
  const ff = totalFrames % Math.round(FPS);
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}:${String(ff).padStart(2, "0")}`;
}

export default function HeroReel() {
  const prefersReducedMotion = useReducedMotion();
  const { ready } = useReady();
  const sectionRef = useRef<HTMLElement>(null);
  const [tc, setTc] = useState("00:04:57:12");

  useEffect(() => {
    if (prefersReducedMotion) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      setTc(formatTC(BOOT_TC_MS + (now - start)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const reelY = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);
  const playheadX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const taglineEnd = site.tagline
    .replace(site.taglineItalic, "")
    .trim()
    .replace(/[.,]+$/, "");
  const marqueeNames = [...clientsHighlight, ...clientsHighlight];

  const fade = (delay = 0) =>
    prefersReducedMotion
      ? { initial: false as const, animate: undefined, transition: undefined }
      : {
          initial: { opacity: 0, y: 16 },
          animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          transition: {
            delay,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        };

  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: false as const, animate: undefined, transition: undefined }
      : {
          initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
          animate: ready
            ? { opacity: 1, clipPath: "inset(0 0 0% 0)" }
            : { opacity: 0, clipPath: "inset(0 0 100% 0)" },
          transition: {
            delay,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden pt-32 flex flex-col"
    >
      {/* Background — bg base sem vinheta (a vinheta criava contraste com o Letterbox global) */}
      <div className="absolute inset-0 -z-10 bg-[var(--color-bg)]" />

      {/* Letterbox bars — apenas no Hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-[var(--color-bg)] z-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-[var(--color-bg)] z-20"
      />

      {/* HUD — uma linha só, mono, três blocos */}
      <motion.div
        {...fade(0.4)}
        aria-hidden
        className="absolute top-24 left-6 md:left-10 right-6 md:right-10 z-10 flex items-center justify-between gap-4 font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-[var(--color-fg-subtle)]"
      >
        <div className="flex items-center gap-3">
          <span
            className={`h-2 w-2 rounded-full bg-[var(--color-live)] ${
              prefersReducedMotion ? "" : "animate-rec"
            }`}
          />
          <span className="text-[var(--color-fg-muted)]">REC</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">TAKE_A · 23.976 FPS</span>
        </div>
        <div className="hidden md:block tabular-nums">TC {tc}</div>
        <div className="hidden lg:block">CENA 01 / 05</div>
        <div className="md:hidden tabular-nums">{tc}</div>
      </motion.div>

      {/* Conteúdo principal — grid 5/7 em desktop, stack no mobile */}
      <div className="relative z-10 flex-1 px-6 md:px-10 mt-6 md:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[60vh]">
          {/* Coluna esquerda — tipografia editorial */}
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : { y: headlineY, opacity: headlineOpacity }
            }
            className="lg:col-span-7 xl:col-span-6"
          >
            <motion.div {...fade(0.55)}>
              <Eyebrow className="mb-6">{site.role}</Eyebrow>
            </motion.div>

            <motion.div {...reveal(0.65)}>
              <Display size="xl" className="mb-8 text-balance">
                {taglineEnd}
                <span className="italic text-[var(--color-accent)]">
                  <span className="font-mono not-italic text-[var(--color-fg-subtle)] text-[0.6em] align-middle mr-1">
                    ⟨
                  </span>
                  {site.taglineItalic}
                  <span className="font-mono not-italic text-[var(--color-fg-subtle)] text-[0.6em] align-middle ml-1">
                    ⟩
                  </span>
                  .
                </span>
              </Display>
            </motion.div>

            <motion.div {...fade(0.9)}>
              <Body size="lg" muted className="mb-8 max-w-xl">
                {site.subheadline}
              </Body>
            </motion.div>

            <motion.div
              {...fade(1.05)}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <Button href="/trabalhos" variant="primary" size="lg">
                Ver trabalhos
              </Button>
              <Button href="/contato" variant="secondary" size="lg">
                Falar comigo →
              </Button>
            </motion.div>

            <motion.p
              {...fade(1.25)}
              className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-[var(--color-fg-subtle)] uppercase"
            >
              {site.credentials}
            </motion.p>
          </motion.div>

          {/* Coluna direita — Showreel slot (LOCKED enquanto não há vídeo) */}
          <motion.div
            {...fade(1.0)}
            style={prefersReducedMotion ? undefined : { y: reelY }}
            className="lg:col-span-5 xl:col-span-6 w-full"
          >
            <ShowreelSlot vimeoId={site.showreelVimeoId} />
          </motion.div>
        </div>
      </div>

      {/* Marquee — prova social no rodapé do hero */}
      <motion.div
        {...fade(1.4)}
        className="relative z-10 mt-12 md:mt-16 mb-12 border-y border-[var(--color-border)] py-6 overflow-hidden"
      >
        <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-fg-subtle)] mb-4 px-6 md:px-10">
          EDITEI PARA
        </div>
        <div
          className={`flex gap-12 whitespace-nowrap will-change-transform ${
            prefersReducedMotion
              ? "flex-wrap justify-center gap-x-8 gap-y-3 px-6"
              : "animate-marquee"
          }`}
        >
          {marqueeNames.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="font-display italic text-2xl md:text-4xl text-[var(--color-fg-muted)]"
            >
              {c}
              <span className="not-italic text-[var(--color-accent)] mx-6">
                ★
              </span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scrub bar — timeline do scroll global */}
      <div
        aria-hidden
        className="absolute bottom-8 left-0 right-0 h-px bg-[var(--color-border-strong)] z-20"
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { left: playheadX }}
          className="absolute top-1/2 -translate-y-1/2 h-1 w-1 bg-[var(--color-accent)]"
        />
      </div>

      {/* Scroll hint */}
      <motion.div
        {...fade(1.6)}
        aria-hidden
        className="absolute bottom-12 left-6 md:left-10 z-10 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-[var(--color-fg-subtle)]"
      >
        <span className={prefersReducedMotion ? "" : "animate-scroll-hint"}>
          ⌃
        </span>
        <span>SCROLL</span>
      </motion.div>
    </section>
  );
}

function ShowreelSlot({ vimeoId }: { vimeoId: string | null }) {
  if (vimeoId) {
    return (
      <div
        data-cursor="play"
        className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-black"
      >
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&muted=1&loop=1&autopause=0`}
          allow="autoplay; fullscreen; picture-in-picture"
          title="Showreel"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full"
        />
      </div>
    );
  }

  return (
    <div
      data-cursor="view"
      className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)]"
    >
      {/* Perfurações 35mm nas laterais */}
      <div
        aria-hidden
        className="film-perfs pointer-events-none absolute top-0 bottom-0 left-2 w-1.5"
      />
      <div
        aria-hidden
        className="film-perfs pointer-events-none absolute top-0 bottom-0 right-2 w-1.5"
      />

      {/* Slate diagonal sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, transparent 0% 48%, rgba(212,160,86,0.06) 49% 51%, transparent 52% 100%)",
        }}
      />

      {/* Badge LOCKED */}
      <div className="absolute top-4 left-4 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[var(--color-fg-muted)] border border-[var(--color-border-strong)] bg-[var(--color-bg)]/60 backdrop-blur-sm px-2.5 py-1.5 rounded-[var(--radius-sm)]">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
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
        LOCKED · SHOWREEL_2026
      </div>

      {/* TC badge canto superior direito */}
      <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.25em] text-[var(--color-fg-subtle)] tabular-nums">
        TAKE 01 · 00:00:30:00
      </div>

      {/* Slate central — fraunces italic com nome do estúdio */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-fg-subtle)] mb-3">
          REEL EM MONTAGEM
        </span>
        <span className="font-display italic text-3xl md:text-4xl text-[var(--color-fg-muted)]">
          drop iminente
        </span>
      </div>

      {/* Footer info bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-[var(--color-fg-subtle)]">
        <span>SCN 01 · 16:9 · 23.976</span>
        <span className="hidden sm:inline">guifmtd · 2026</span>
      </div>
    </div>
  );
}
