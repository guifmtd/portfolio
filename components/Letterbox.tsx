"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Letterbox cinemático fixo no topo e no rodapé do viewport.
 * Faixa preta sólida com REC ● piscando à direita e timecode rolando
 * à esquerda — enquadra o site inteiro como um clipe.
 *
 * Esconde em viewports estreitas (< md) para não competir com o conteúdo.
 */
export default function Letterbox() {
  const prefersReducedMotion = useReducedMotion();
  const [time, setTime] = useState("00:00:00:00");

  useEffect(() => {
    if (prefersReducedMotion) return;
    const start = Date.now();
    const i = setInterval(() => {
      const ms = Date.now() - start;
      const s = Math.floor(ms / 1000);
      const ff = Math.floor((ms % 1000) / 41); // ~24fps
      const hh = String(Math.floor(s / 3600)).padStart(2, "0");
      const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}:${String(ff).padStart(2, "0")}`);
    }, 1000 / 24);
    return () => clearInterval(i);
  }, [prefersReducedMotion]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden md:block h-7 bg-[var(--color-bg)]" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden md:flex h-7 bg-[var(--color-bg)] items-center justify-between px-6 lg:px-10 font-mono text-[10px] tracking-[0.3em] text-[var(--color-fg-subtle)]">
        <span>{time}</span>
        <span className="flex items-center gap-2">
          {!prefersReducedMotion && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            </span>
          )}
          {prefersReducedMotion && (
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          )}
          REC · 23.976 FPS
        </span>
      </div>
    </>
  );
}
