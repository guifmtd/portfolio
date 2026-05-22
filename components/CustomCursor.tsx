"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "play" | "view" | "click">(
    "default",
  );
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (hidden) setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t || !t.closest) return;
      if (t.closest("[data-cursor='play']")) setVariant("play");
      else if (t.closest("[data-cursor='view']")) setVariant("view");
      else if (t.closest("a, button, [role='button']")) setVariant("click");
      else setVariant("default");
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [hidden, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  const isLabel = variant === "play" || variant === "view";
  const label = variant === "play" ? "PLAY" : variant === "view" ? "VER" : "";

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block transition-opacity duration-200 ${hidden ? "opacity-0" : "opacity-100"}`}
      >
        <div
          className={`rounded-full bg-[var(--color-fg)] transition-all duration-200 ${
            isLabel || variant === "click"
              ? "h-0 w-0 opacity-0"
              : "h-1.5 w-1.5 opacity-100"
          }`}
        />
      </div>
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[9998] hidden md:flex items-center justify-center transition-opacity duration-200 ${hidden ? "opacity-0" : "opacity-100"}`}
      >
        <div
          className={`rounded-full border border-[var(--color-fg)]/40 transition-all duration-300 flex items-center justify-center ${
            isLabel
              ? "h-20 w-20 bg-[var(--color-accent)] border-[var(--color-accent)]"
              : variant === "click"
                ? "h-10 w-10 bg-[var(--color-fg)]/10"
                : "h-8 w-8"
          }`}
        >
          {isLabel && (
            <span className="text-[10px] font-mono tracking-[0.2em] font-medium text-[var(--color-bg)]">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
