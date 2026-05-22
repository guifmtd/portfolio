import { site } from "@/lib/config";
import ContactForm from "@/components/ContactForm";
import {
  Section,
  Container,
  Eyebrow,
  Display,
  Body,
} from "@/components/ui";

export const metadata = {
  title: "Contato — guifmtd",
  description: "Vamos conversar sobre seu próximo projeto.",
};

export default function Contato() {
  return (
    <Section spacing="loose" className="pt-32">
      <Container>
        <Eyebrow className="mb-8">Contato</Eyebrow>
        <Display size="xl" className="max-w-[16ch] text-balance">
          Manda o briefing.{" "}
          <span className="italic text-[var(--color-accent)]">
            Eu respondo no WhatsApp.
          </span>
        </Display>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-10">
            <div>
              <Eyebrow className="mb-3">WhatsApp</Eyebrow>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl md:text-3xl hover:text-[var(--color-accent)] transition-colors"
              >
                {site.whatsappDisplay}
              </a>
            </div>
            <div>
              <Eyebrow className="mb-3">Instagram</Eyebrow>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl md:text-3xl hover:text-[var(--color-accent)] transition-colors"
              >
                {site.social.instagramHandle}
              </a>
            </div>
            <div>
              <Eyebrow className="mb-3">Base</Eyebrow>
              <p className="font-display text-2xl md:text-3xl">{site.location}</p>
              <Body size="sm" muted className="mt-2">
                Trabalho remoto com criadores do Brasil inteiro.
              </Body>
            </div>
          </div>

          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
