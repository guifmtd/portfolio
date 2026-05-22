import Link from "next/link";
import HeroReel from "@/components/HeroReel";
import WorkGrid from "@/components/WorkGrid";
import ServicesGrid from "@/components/ServicesGrid";
import Testimonials from "@/components/Testimonials";
import { site } from "@/lib/config";
import {
  Section,
  Container,
  Eyebrow,
  Display,
  Heading,
  Body,
  Button,
} from "@/components/ui";

export default function Home() {
  return (
    <>
      <HeroReel />

      <Section spacing="loose">
        <Container>
          <div className="flex items-end justify-between mb-12 md:mb-20 gap-6">
            <div>
              <Eyebrow className="mb-6">Trabalhos selecionados</Eyebrow>
              <Heading size="lg" className="max-w-[18ch] text-balance">
                Cortes, educacional, comercial.
              </Heading>
            </div>
            <Link
              href="/trabalhos"
              className="hidden md:inline text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              Ver todos →
            </Link>
          </div>

          <WorkGrid limit={6} compact />

          <div className="mt-16 flex justify-center md:hidden">
            <Button href="/trabalhos" variant="secondary" size="lg">
              Ver portfolio completo →
            </Button>
          </div>
        </Container>
      </Section>

      <ServicesGrid />
      <Testimonials />

      <Section className="bg-[var(--color-bg-elevated)]">
        <Container size="narrow">
          <Eyebrow className="mb-6">Quem está por trás</Eyebrow>
          <Display size="md" className="mb-8">
            Edito desde criança.{" "}
            <span className="italic text-[var(--color-fg-muted)]">
              Profissionalmente, há pouco mais de 10 meses.
            </span>
          </Display>
          <Body size="lg" muted className="mb-6">
            {site.about.p1}
          </Body>
          <Body muted>{site.about.p2}</Body>
        </Container>
      </Section>
    </>
  );
}
