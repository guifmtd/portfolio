"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "./cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

type ButtonAsButton = SharedProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type ButtonAsLink = SharedProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base = [
  "inline-flex items-center justify-center gap-2",
  "font-sans font-medium",
  "rounded-[var(--radius-md)]",
  "transition-[background-color,border-color,color,opacity,transform]",
  "duration-200 ease-[var(--ease-out)]",
  "disabled:opacity-50",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
  "active:scale-[0.98]",
].join(" ");

const variants: Record<ButtonVariant, string> = {
  primary: [
    "bg-[var(--color-accent)] text-[var(--color-bg)]",
    "hover:bg-[var(--color-accent-hover)]",
  ].join(" "),
  secondary: [
    "bg-transparent text-[var(--color-fg)]",
    "border border-[var(--color-border-strong)]",
    "hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-fg-muted)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--color-fg-muted)]",
    "hover:text-[var(--color-fg)]",
  ].join(" "),
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    iconLeft,
    iconRight,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, target, rel, ...linkRest } = rest as {
      href: string;
      target?: string;
      rel?: string;
      [key: string]: unknown;
    };
    const isExternal = /^https?:/.test(href);
    return (
      <Link
        href={href}
        target={isExternal ? (target ?? "_blank") : target}
        rel={isExternal ? (rel ?? "noopener noreferrer") : rel}
        className={classes}
        {...linkRest}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ComponentPropsWithoutRef<"button">)}
    >
      {content}
    </button>
  );
}
