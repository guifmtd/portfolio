import { cn } from "./cn";

interface PlaceholderHueProps {
  /** Matiz HSL base (0–360). Tons vizinhos derivam de offsets fixos. */
  hue: number;
  /** Classes adicionais — usar pra `transition-transform group-hover:scale-[1.03]` etc. */
  className?: string;
}

/**
 * Placeholder cinemático com gradiente HSL. Usado enquanto thumbnails reais
 * dos cases não chegam — visualmente honesto, alinhado com a estética âmbar.
 *
 * Posiciona absoluto inset-0 por padrão; o pai precisa ter `position: relative`
 * e dimensões definidas (aspect-ratio ou h-full).
 */
export function PlaceholderHue({ hue, className }: PlaceholderHueProps) {
  return (
    <div
      className={cn("absolute inset-0", className)}
      style={{
        background: `
          radial-gradient(ellipse at 30% 40%, hsl(${hue} 80% 55% / 0.55) 0%, transparent 60%),
          radial-gradient(ellipse at 70% 60%, hsl(${(hue + 40) % 360} 70% 45% / 0.45) 0%, transparent 65%),
          linear-gradient(135deg, hsl(${hue} 60% 18%), hsl(${(hue + 60) % 360} 50% 10%))
        `,
      }}
    />
  );
}
