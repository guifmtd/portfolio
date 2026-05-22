import Link from "next/link";
import { site } from "@/lib/config";
import { Button, Container, WhatsAppIcon } from "@/components/ui";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)]">
      <Container size="xl" className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="font-mono text-xs tracking-[0.3em] text-[var(--color-fg-subtle)] mb-6">
              VAMOS COMEÇAR
            </p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-balance">
              Tem um projeto na cabeça?{" "}
              <span className="italic text-[var(--color-accent)]">
                Conta pra mim.
              </span>
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                href={site.whatsappUrl}
                variant="primary"
                size="md"
                iconLeft={<WhatsAppIcon />}
              >
                WhatsApp {site.whatsappDisplay}
              </Button>
              <Button
                href={site.social.instagram}
                variant="secondary"
                size="md"
              >
                Instagram {site.social.instagramHandle}
              </Button>
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-[var(--color-fg-subtle)] mb-4">
                NAVEGAÇÃO
              </p>
              <ul className="text-sm">
                <li>
                  <Link
                    href="/"
                    className="block py-2 hover:text-[var(--color-accent)]"
                  >
                    Início
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trabalhos"
                    className="block py-2 hover:text-[var(--color-accent)]"
                  >
                    Trabalhos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sobre"
                    className="block py-2 hover:text-[var(--color-accent)]"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contato"
                    className="block py-2 hover:text-[var(--color-accent)]"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-[var(--color-fg-subtle)] mb-4">
                SOCIAL
              </p>
              <ul className="text-sm">
                <li>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 hover:text-[var(--color-accent)]"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 hover:text-[var(--color-accent)]"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between gap-4 text-xs font-mono tracking-wider text-[var(--color-fg-subtle)]">
          <span>© {year} {site.name.toUpperCase()} — TODOS OS DIREITOS RESERVADOS</span>
          <span>{site.location.toUpperCase()}</span>
        </div>
      </Container>
    </footer>
  );
}
