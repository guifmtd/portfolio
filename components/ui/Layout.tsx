import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";

/* ============================================================
   Container — limita largura e dá padding lateral
   ============================================================ */

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide" | "xl";
  children: ReactNode;
}

const containerSizes = {
  narrow: "max-w-3xl",       // 768px — texto longo
  default: "max-w-7xl",      // 1280px — padrão
  wide: "max-w-[1440px]",    // 1440px — galerias
  xl: "max-w-[1600px]",      // 1600px — hero / grids cheios
};

export function Container({
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-8 lg:px-12",
        containerSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ============================================================
   Section — bloco vertical com espaçamento consistente
   ============================================================ */

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "tight" | "default" | "loose";
  children: ReactNode;
}

const sectionSpacings = {
  tight: "py-12 md:py-16",
  default: "py-16 md:py-24",
  loose: "py-24 md:py-32",
};

export function Section({
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(sectionSpacings[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}
