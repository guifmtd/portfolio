"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "./cn";

export interface ProjectCardProps {
  /** Slug da URL — /trabalhos/{slug} */
  slug: string;
  /** Nome do cliente — ex: "Felipe Lucchesi" */
  client: string;
  /** Tipo do trabalho — ex: "Corte de podcast" */
  type: string;
  /** Thumbnail do vídeo — screenshot já tratado, sem logo recortado */
  thumbnail: string;
  /** Métrica/resultado opcional — ex: "8k views" */
  metric?: string;
  /** Aspect ratio do card. `reel` = 9/16 vertical (Reels/Shorts/TikTok). */
  aspect?: "video" | "reel" | "square";
  /** Posição na grade — afeta tamanho de fonte */
  size?: "default" | "feature";
  className?: string;
}

const aspectClasses = {
  video: "aspect-[16/10]",
  reel: "aspect-[9/16]",
  square: "aspect-square",
};

export function ProjectCard({
  slug,
  client,
  type,
  thumbnail,
  metric,
  aspect = "video",
  size = "default",
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={`/trabalhos/${slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-[var(--radius-lg)]",
        "bg-[var(--color-bg-elevated)]",
        "transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]",
        aspectClasses[aspect],
        className
      )}
    >
      {/* Thumbnail */}
      <Image
        src={thumbnail}
        alt={`${client} — ${type}`}
        fill
        className={cn(
          "object-cover",
          "transition-transform duration-[var(--duration-slower)] ease-[var(--ease-out)]",
          "group-hover:scale-[1.03]"
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />

      {/* Overlay gradient — só na metade inferior */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/90 via-[var(--color-bg)]/20 to-transparent",
          "opacity-80 group-hover:opacity-100",
          "transition-opacity duration-[var(--duration-base)]"
        )}
      />

      {/* Conteúdo */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        {metric && (
          <div
            className={cn(
              "mb-2 inline-flex items-center gap-1",
              "text-xs font-medium tracking-[0.08em] uppercase",
              "text-[var(--color-accent)]"
            )}
          >
            <span className="h-px w-3 bg-[var(--color-accent)]" />
            {metric}
          </div>
        )}
        <div
          className={cn(
            "font-display font-normal text-[var(--color-fg)] leading-[1.1] tracking-[-0.02em]",
            size === "feature" ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
          )}
        >
          {client}
        </div>
        <div
          className={cn(
            "mt-1 text-xs text-[var(--color-fg-muted)] uppercase tracking-[0.1em]"
          )}
        >
          {type}
        </div>
      </div>
    </Link>
  );
}
