"use client";

import { motion, useReducedMotion } from "motion/react";
import { process } from "@/lib/config";
import { Section, Container, Eyebrow, Heading } from "./ui";

/**
 * Seção "Como trabalho" — timeline horizontal (md+) / vertical (mobile)
 * com animação de montagem: a linha cresce e os nós aparecem em
 * stagger, sincronizados com a passagem da linha.
 *
 * Mantém o nome Testimonials.tsx para facilitar o swap quando entrarem
 * depoimentos reais.
 */
export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  const lineDuration = 1.2;
  // Cada nó aparece conforme a "cabeça" da linha cruza ele.
  const nodeDelay = (i: number) =>
    process.length > 1
      ? (i / (process.length - 1)) * lineDuration + 0.1
      : 0.1;

  const lineTransition = {
    duration: lineDuration,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  return (
    <Section spacing="loose">
      <Container size="wide">
        <Eyebrow className="mb-6">Como trabalho</Eyebrow>
        <Heading
          size="lg"
          className="mb-16 md:mb-24 max-w-[18ch] text-balance"
        >
          Critério antes da{" "}
          <span className="italic text-[var(--color-accent)]">timeline.</span>
        </Heading>

        <ol
          aria-label="Etapas do processo"
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12"
        >
          {/* Trilho subjacente — sempre visível, indica o "espaço" da timeline */}
          <span
            aria-hidden
            className="hidden md:block absolute top-3 left-3 right-3 h-px bg-[var(--color-border-strong)]"
          />
          <span
            aria-hidden
            className="md:hidden absolute top-3 bottom-3 left-3 w-px bg-[var(--color-border-strong)]"
          />

          {/* Linha accent — horizontal (desktop) */}
          <motion.span
            aria-hidden
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            whileInView={
              prefersReducedMotion ? undefined : { scaleX: 1 }
            }
            viewport={{ once: true, margin: "-100px" }}
            transition={lineTransition}
            style={{ transformOrigin: "left" }}
            className="hidden md:block absolute top-3 left-3 right-3 h-px bg-[var(--color-accent)]"
          />

          {/* Linha accent — vertical (mobile) */}
          <motion.span
            aria-hidden
            initial={prefersReducedMotion ? false : { scaleY: 0 }}
            whileInView={
              prefersReducedMotion ? undefined : { scaleY: 1 }
            }
            viewport={{ once: true, margin: "-100px" }}
            transition={lineTransition}
            style={{ transformOrigin: "top" }}
            className="md:hidden absolute top-3 bottom-3 left-3 w-px bg-[var(--color-accent)]"
          />

          {process.map((step, i) => (
            <li
              key={step.n}
              className="relative flex md:flex-col items-start gap-5 md:gap-6"
            >
              {/* Nó */}
              <motion.span
                aria-hidden
                initial={
                  prefersReducedMotion ? false : { opacity: 0, scale: 0 }
                }
                whileInView={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 1, scale: 1 }
                }
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.4,
                  delay: nodeDelay(i),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              </motion.span>

              {/* Conteúdo */}
              <motion.div
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 12 }
                }
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: nodeDelay(i) + 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex-1 min-w-0"
              >
                <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-fg-subtle)] mb-3">
                  [ {step.n} ]
                </div>
                <h3 className="font-display text-3xl md:text-4xl leading-tight mb-3 text-balance">
                  {step.title}
                </h3>
                <p className="text-base text-[var(--color-fg-muted)] leading-relaxed text-pretty">
                  {step.desc}
                </p>
              </motion.div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
