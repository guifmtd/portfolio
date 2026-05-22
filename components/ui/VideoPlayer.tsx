"use client";

import { useState } from "react";
import { cn } from "./cn";

export interface VideoPlayerProps {
  /** ID do vídeo no Vimeo — ex: "1033134779" */
  vimeoId: string;
  /** Thumbnail mostrada antes do play (recomendado pra performance) */
  poster?: string;
  /** Título acessível */
  title: string;
  /** Aspect ratio. Default 16:9 */
  aspect?: "16/9" | "9/16" | "1/1" | "4/5";
  /** Auto-play (cuidado: muta automaticamente por política do browser) */
  autoplay?: boolean;
  className?: string;
}

const aspectClasses = {
  "16/9": "aspect-video",
  "9/16": "aspect-[9/16]",
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
};

/**
 * VideoPlayer — wrapper de embed Vimeo com poster + lazy load.
 *
 * Estratégia:
 * - Inicialmente mostra poster (peso ~150kb)
 * - Só carrega iframe Vimeo (~700kb) após clique em play
 * - Resultado: site rápido mesmo com muitos vídeos na home
 */
export function VideoPlayer({
  vimeoId,
  poster,
  title,
  aspect = "16/9",
  autoplay = false,
  className,
}: VideoPlayerProps) {
  const [loaded, setLoaded] = useState(autoplay);

  // Quando o iframe carrega — seja por autoplay-on-mount ou pelo clique do usuário —
  // já é gesture válido para iniciar reprodução. `autoplay` prop só decide se entra mutado
  // (autoplay-on-mount precisa muted pela política do browser).
  const embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=${
    autoplay ? 1 : 0
  }&dnt=1&title=0&byline=0&portrait=0`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)]",
        aspectClasses[aspect],
        className
      )}
    >
      {loaded ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Reproduzir ${title}`}
        >
          {poster && (
            <img
              src={poster}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}

          {/* Overlay escurecimento */}
          <div className="absolute inset-0 bg-[var(--color-bg)]/30 transition-opacity duration-[var(--duration-base)] group-hover:bg-[var(--color-bg)]/10" />

          {/* Botão play central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                "flex h-20 w-20 items-center justify-center rounded-full",
                "bg-[var(--color-accent)] text-[var(--color-bg)]",
                "transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)]",
                "group-hover:scale-110"
              )}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
