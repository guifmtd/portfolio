"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import WorkCard from "./WorkCard";
import { works, categories, type Category } from "@/lib/works";

type Props = { showFilters?: boolean; limit?: number; compact?: boolean };

export default function WorkGrid({ showFilters = false, limit, compact = false }: Props) {
  const [filter, setFilter] = useState<Category | "Todos">("Todos");

  const filtered = useMemo(() => {
    const list = filter === "Todos" ? works : works.filter((w) => w.category === filter);
    return limit ? list.slice(0, limit) : list;
  }, [filter, limit]);

  const gridClass = compact
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    : "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6";

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-10 md:mb-16">
          {(["Todos", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-sm px-5 min-h-11 inline-flex items-center rounded-[var(--radius-md)] border transition-all duration-[var(--duration-base)] ${
                filter === c
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-bg)]"
                  : "border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              }`}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono tracking-widest text-[var(--color-fg-subtle)]">
            {String(filtered.length).padStart(2, "0")} PROJETOS
          </span>
        </div>
      )}

      <motion.div layout className={gridClass}>
        {filtered.map((w, i) => {
          const isLarge = !compact && i % 5 === 0;
          return (
            <div key={w.slug} className={isLarge ? "md:col-span-2" : ""}>
              <WorkCard work={w} index={i} large={isLarge} compact={compact} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
