import { notFound } from "next/navigation";
import Link from "next/link";
import { works } from "@/lib/works";
import {
  Container,
  Eyebrow,
  Display,
  Heading,
  VideoPlayer,
  PlaceholderHue,
} from "@/components/ui";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};
  return {
    title: `${work.title} — ${work.client}`,
    description: work.description,
  };
}

export default async function TrabalhoDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  const idx = works.findIndex((w) => w.slug === slug);
  const next = works[(idx + 1) % works.length];

  return (
    <article className="pt-32 pb-24">
      {/* Meta header */}
      <Container className="mb-10 md:mb-16">
        <Link
          href="/trabalhos"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)] mb-12 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M13 7H1M6 2L1 7l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          TODOS OS TRABALHOS
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <Eyebrow className="mb-6">
              {work.client} · {work.category} · {work.year}
            </Eyebrow>
            <Display size="xl" className="text-balance">
              {work.title}
            </Display>
            {work.placeholder && (
              <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-fg-muted)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-3 py-1.5 rounded-[var(--radius-sm)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                Case em breve
              </span>
            )}
          </div>
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="font-mono text-xs tracking-widest text-[var(--color-fg-subtle)] mb-1">
                FUNÇÃO
              </div>
              <div>{work.role}</div>
            </div>
            <div>
              <div className="font-mono text-xs tracking-widest text-[var(--color-fg-subtle)] mb-1">
                DURAÇÃO
              </div>
              <div>{work.duration}</div>
            </div>
          </div>
        </div>
      </Container>

      {/* Video / placeholder */}
      <Container>
        {work.vimeoId ? (
          <VideoPlayer vimeoId={work.vimeoId} title={work.title} aspect="16/9" />
        ) : (
          <div
            className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)]"
            data-cursor="play"
          >
            <PlaceholderHue hue={work.hue} />
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-20 w-20 md:h-28 md:w-28 rounded-full bg-[var(--color-accent)] grid place-items-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M10 6l16 10L10 26V6z"
                    fill="currentColor"
                    className="text-[var(--color-bg)]"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Container>

      {/* Story */}
      <Container className="mt-24 md:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Eyebrow>Sobre</Eyebrow>
          </div>
          <div className="md:col-span-8">
            <Display size="md" className="text-balance">
              {work.description}
            </Display>
          </div>
        </div>
      </Container>

      {/* Next */}
      <div className="mt-24 md:mt-40 border-t border-[var(--color-border)]">
        <Link
          href={`/trabalhos/${next.slug}`}
          data-cursor="view"
          className="block px-6 md:px-10 py-16 md:py-24 group hover:bg-[var(--color-bg-elevated)] transition-colors"
        >
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Eyebrow className="mb-4">Próximo projeto</Eyebrow>
              <Heading
                as="h3"
                size="lg"
                className="font-display font-normal text-4xl md:text-7xl leading-none tracking-[-0.03em] group-hover:text-[var(--color-accent)] transition-colors"
              >
                {next.title}
              </Heading>
              <p className="mt-3 text-sm text-[var(--color-fg-subtle)] font-mono tracking-wider">
                {next.client.toUpperCase()} · {next.category.toUpperCase()}
              </p>
            </div>
            <div className="h-16 w-16 rounded-full border border-[var(--color-border-strong)] grid place-items-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg)] transition-all">
              <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
}
