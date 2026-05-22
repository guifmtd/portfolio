import { site } from "@/lib/config";
import {
  Section,
  Container,
  Eyebrow,
  Display,
  Body,
} from "@/components/ui";

export const metadata = {
  title: "Sobre — guifmtd",
  description: site.subheadline,
};

export default function Sobre() {
  return (
    <>
      <Section spacing="loose" className="pt-32">
        <Container>
          <Eyebrow className="mb-8">Sobre / guifmtd</Eyebrow>
          <Display size="xl" className="max-w-[14ch] text-balance">
            Edição que <span className="italic text-[var(--color-accent)]">prende</span>{" "}
            do primeiro frame.
          </Display>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <Body size="lg" muted className="mb-6">
            {site.about.p1}
          </Body>
          <Body size="lg" muted>
            {site.about.p2}
          </Body>
        </Container>
      </Section>

    </>
  );
}
