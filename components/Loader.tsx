"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReady } from "./ReadyProvider";

export default function Loader() {
  const { setReady } = useReady();
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem("loader-seen");
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || prefersReducedMotion) {
      sessionStorage.setItem("loader-seen", "1");
      setReady(true);
      const id = requestAnimationFrame(() => setShow(false));
      return () => cancelAnimationFrame(id);
    }

    const start = performance.now();
    const duration = 1800;

    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("loader-seen", "1");
        setTimeout(() => {
          setShow(false);
          setReady(true);
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setReady]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-[var(--color-bg)] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[var(--color-fg)] text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--color-fg-subtle)] mb-6">
              PORTFOLIO / {new Date().getFullYear()}
            </p>
            <h1 className="font-display text-5xl md:text-7xl tracking-tight">
              gui
              <span className="italic text-[var(--color-accent)]">fmtd</span>
            </h1>
          </motion.div>

          <div className="absolute bottom-10 left-0 right-0 px-8 flex items-end justify-between font-mono text-xs tracking-widest text-[var(--color-fg-subtle)]">
            <span>CARREGANDO</span>
            <span className="font-display text-4xl text-[var(--color-fg)] tabular-nums">
              {String(count).padStart(3, "0")}
            </span>
          </div>

          <div
            className="absolute bottom-0 left-0 h-px bg-[var(--color-accent)]"
            style={{ width: `${count}%`, transition: "width 60ms linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
