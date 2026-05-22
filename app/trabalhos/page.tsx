import WorkGrid from "@/components/WorkGrid";
import { Section, Container, Eyebrow, Display } from "@/components/ui";

export const metadata = {
  title: "Trabalhos — guifmtd",
  description:
    "Cortes, conteúdo educacional e comerciais editados para criadores que levam o ofício a sério.",
};

export default function TrabalhosPage() {
  return (
    <Section spacing="loose" className="pt-32">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16 md:mb-24">
          <div className="md:col-span-3">
            <Eyebrow className="mb-6">Trabalhos · 2025</Eyebrow>
          </div>
          <div className="md:col-span-9">
            <Display size="xl" className="text-balance">
              Um recorte do que{" "}
              <span className="italic text-[var(--color-accent)]">já passou</span>{" "}
              pela timeline.
            </Display>
          </div>
        </div>

        <WorkGrid />
      </Container>
    </Section>
  );
}
