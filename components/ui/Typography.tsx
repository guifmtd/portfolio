"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  createElement,
  Children,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "./cn";

/* ============================================================
   Eyebrow — pequeno label uppercase acima de títulos
   ============================================================ */

export function Eyebrow({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ============================================================
   Display — para hero e títulos grandes
   Usa Fraunces (serif). Aceita `italic` para momentos editoriais
   e `reveal` opt-in para entrada palavra-a-palavra (somente
   quando children é string pura — fragmentos React passam direto).
   ============================================================ */

interface DisplayProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3";
  italic?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  reveal?: boolean;
  children: ReactNode;
}

const displaySizes = {
  sm: "text-2xl md:text-3xl",   // 32-48
  md: "text-3xl md:text-4xl",   // 48-72
  lg: "text-4xl md:text-5xl",   // 72-96
  xl: "text-4xl md:text-6xl",   // 72-128 — hero only (token --text-6xl)
};

function DisplayReveal({ text }: { text: string }) {
  const words = text.split(/(\s+)/);
  return (
    <>
      {words.map((w, i) =>
        /^\s+$/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1 + i * 0.04,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {w}
          </motion.span>
        )
      )}
    </>
  );
}

export function Display({
  as = "h1",
  italic = false,
  size = "lg",
  reveal = false,
  className,
  children,
  ...props
}: DisplayProps) {
  const prefersReducedMotion = useReducedMotion();
  const onlyChild = Children.count(children) === 1 ? children : null;
  const canReveal =
    reveal && !prefersReducedMotion && typeof onlyChild === "string";

  return createElement(
    as,
    {
      className: cn(
        "font-display font-normal tracking-[-0.03em] leading-[1.05]",
        italic && "italic",
        displaySizes[size],
        className
      ),
      ...props,
    },
    canReveal ? <DisplayReveal text={onlyChild as string} /> : children
  );
}

/* ============================================================
   Heading — títulos de seção (não-hero)
   ============================================================ */

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const headingSizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

export function Heading({
  as = "h2",
  size = "md",
  className,
  children,
  ...props
}: HeadingProps) {
  return createElement(
    as,
    {
      className: cn(
        "font-sans font-medium tracking-[-0.02em] leading-[1.2] text-[var(--color-fg)]",
        headingSizes[size],
        className
      ),
      ...props,
    },
    children
  );
}

/* ============================================================
   Body — parágrafos. Size `lead` usa Fraunces italic 20px
   para subtítulos editoriais logo abaixo de Display.
   ============================================================ */

interface BodyProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "base" | "lg" | "lead";
  muted?: boolean;
  children: ReactNode;
}

const bodySizes = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  lead: "text-xl md:text-2xl font-display italic leading-[1.4] tracking-[-0.01em]",
};

export function Body({
  size = "base",
  muted = false,
  className,
  children,
  ...props
}: BodyProps) {
  const isLead = size === "lead";
  return (
    <p
      className={cn(
        isLead ? "" : "font-sans leading-[1.65]",
        bodySizes[size],
        muted ? "text-[var(--color-fg-muted)]" : "text-[var(--color-fg)]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
