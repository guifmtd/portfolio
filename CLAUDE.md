# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Next.js dev server at http://localhost:3000 (Turbopack)
- `npm run build` — production build
- `npm start` — run the production build
- `npm run lint` — ESLint flat config (`eslint.config.mjs`, extends `next/core-web-vitals`)

No test framework is configured.

## Stack

- Next.js 16 (App Router) with React 19 and TypeScript (strict).
- Tailwind CSS v4 via `@tailwindcss/postcss` — no `tailwind.config`; theme tokens live inside `app/globals.css` under `@theme`.
- `motion` (Framer Motion v12 line) for animations, `lenis` for smooth scroll, `clsx` + `tailwind-merge` (consumed via [components/ui/cn.ts](components/ui/cn.ts)).
- Path alias `@/*` maps to the repo root (e.g. `@/lib/config`, `@/components/ui`).

## Architecture

Single-purpose marketing/portfolio site for the video editor **guifmtd (Guilherme)**. All content is Portuguese (`lang="pt-BR"`). Rotas em pt-BR: `/`, `/trabalhos`, `/trabalhos/[slug]`, `/sobre`, `/contato`.

### Content lives in `lib/`, not in components
Two source-of-truth modules feed every page — edit these instead of hardcoding copy:
- [lib/config.ts](lib/config.ts) — site identity (`site`), `clientsHighlight`, `services`. Note: `email` is `null` by design. WhatsApp (`5511975725353`) is the primary contact channel.
- [lib/works.ts](lib/works.ts) — `Work` type and the `works[]` array. Today all 9 entries são `category: "Cortes"` com `vimeoId` real; o `type Category` ainda lista `Educacional`/`Comercial`/`Podcast`/`Mercado Financeiro` para uso futuro. Adicionar entrada com `placeholder: true` faz `WorkCard` e a detail page renderizarem badge "EM BREVE" — remover o flag quando o case real cair. `vimeoId` opcional alterna a detail page entre placeholder com gradiente e `<VideoPlayer>` ao vivo.

### Two component layers
- [components/ui/](components/ui/) — **Design System v2** primitives (`Button`, `Display`, `Heading`, `Body`, `Eyebrow`, `Container`, `Section`, `ProjectCard`, `VideoPlayer`, `cn`). Import via the barrel: `import { Button, Display, Container } from "@/components/ui"`. Do NOT add ad-hoc primitives elsewhere when one of these fits.
- [components/](components/) — v1 composite components preserved with motion/Lenis/cursor effects re-skinned with the new tokens: `Nav`, `Footer`, `HeroReel` (the home hero — 2-col layout with REC HUD background), `WorkCard` (motion + hue gradient + grain + EM BREVE badge), `WorkGrid`, `Marquee`, `ServicesGrid`, `Testimonials`, `ContactForm`, `MagneticButton`, `Loader`, `CustomCursor`, `SmoothScroll`.

### Layout & globals
[app/layout.tsx](app/layout.tsx) wraps every route with `<Loader/>`, `<CustomCursor/>`, `<SmoothScroll>` (Lenis), `<Nav/>`, `<Footer/>`. Fonts (Fraunces display, Inter sans, JetBrains Mono) load via `next/font/google` in [lib/fonts.ts](lib/fonts.ts) and expose CSS variables `--font-display`, `--font-sans`, `--font-mono`.

### Design tokens (`app/globals.css`)
- **Colors**: `--color-bg` (`#0a0a0a`), `--color-bg-elevated`, `--color-bg-subtle`, `--color-fg` (off-white `#fafaf5`), `--color-fg-muted`, `--color-fg-subtle`, `--color-border`, `--color-border-strong`, `--color-accent` (âmbar `#d4a056`), `--color-accent-hover`, `--color-accent-subtle`, `--color-whatsapp`. Always reference these via `bg-[var(--color-bg)]` etc — never hex literals.
- **Type scale**: `--text-xs` through `--text-5xl` (1.25 modular).
- **Motion**: `--ease-out`, `--ease-in-out`, `--duration-fast|base|slow|slower`.
- **Custom utilities** kept from v1: `.grain` (SVG noise overlay on `<body>`), `.animate-marquee`, `.text-balance`, `.text-pretty`, `html.lenis` rules.
- Global `cursor: none` + hidden scrollbars are intentional (`<CustomCursor/>` provides the replacement; hover-less devices fall back automatically).

### Conventions
- Pesos de fonte: só `400` e `500` (`font-normal` / `font-medium`). Nada de `font-bold`/`font-semibold`/`font-extrabold` — hierarquia se faz com tamanho e família.
- Títulos hero usam `<Display>` (Fraunces) com fragmentos em `italic` para tom editorial.
- Títulos de seção usam `<Heading>` (Inter, peso 500). Eyebrows uppercase via `<Eyebrow>` (âmbar).
- Wrappers de layout: sempre `<Container>` + `<Section>` em vez de `<div className="max-w-7xl ...">`.
- CTAs: `<Button variant="primary|secondary|ghost|whatsapp">`. Para navegação, envelopar com `<Link href="...">`.

### Pendências conhecidas
Os 9 trabalhos têm vídeo real, mas o `description` ainda usa `PLACEHOLDER_COPY` em [lib/works.ts](lib/works.ts) — atualizar conforme o Gui mandar a copy real de cada case. Depoimentos em [lib/works.ts](lib/works.ts) também são placeholders. Email não está configurado por escolha — WhatsApp é o canal.
