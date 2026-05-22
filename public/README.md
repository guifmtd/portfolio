# Assets

## Onde colocar o reel

Quando o Rafael tiver o showreel pronto, coloque em:

```
/public/videos/reel.mp4
```

E descomente o bloco `<video>` em `components/HeroReel.tsx` (já tem o placeholder marcado).

## Vídeos dos cases

Pra cada projeto em `lib/works.ts`, o ideal é hospedar no **Vimeo Pro** (oculta vídeos relacionados, controle de domínio).

No arquivo `app/work/[slug]/page.tsx` tem um comentário mostrando onde substituir o placeholder visual por um `<iframe>` do Vimeo:

```tsx
<iframe
  src="https://player.vimeo.com/video/SEU_ID"
  allow="autoplay; fullscreen"
  className="absolute inset-0 w-full h-full"
/>
```

Pra hover preview nos cards, também dá pra adicionar um campo `preview` no `Work` type apontando pra um MP4 curto (5-10s, mudo, 720p) e renderizar em `<video>` no hover.

## Logos de clientes (Marquee)

Hoje o marquee usa nomes em texto display — fica bem cinematográfico. Se preferir logos, cria `/public/logos/{cliente}.svg` e ajusta `components/Marquee.tsx`.

## Favicon e OG image

- `app/favicon.ico` — favicon atual (default Next.js, trocar)
- Para OG image: criar `app/opengraph-image.png` (1200x630) que o Next serve automaticamente
