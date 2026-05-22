"use client";

import { useState, FormEvent } from "react";
import { site } from "@/lib/config";
import { WhatsAppIcon } from "@/components/ui";

const projectTypes = [
  "Cortes",
  "Educacional",
  "Comercial",
  "Podcast",
  "Mercado Financeiro",
  "Outro",
];

type Status = "idle" | "sent" | "blocked";

export default function ContactForm() {
  const [type, setType] = useState(projectTypes[0]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `Oi, Gui! Tudo bem?

Sou ${name} e quero conversar sobre um projeto de ${type}.

${message}`;
    const url = `${site.whatsappUrl}?text=${encodeURIComponent(text)}`;
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win || win.closed || typeof win.closed === "undefined") {
      setFallbackUrl(url);
      setStatus("blocked");
    } else {
      setStatus("sent");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 md:p-10 bg-[var(--color-bg-elevated)]"
    >
      <div className="mb-8">
        <label className="font-mono text-xs tracking-[0.3em] text-[var(--color-fg-subtle)] mb-4 block">
          TIPO DE PROJETO
        </label>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setType(p)}
              aria-pressed={type === p}
              className={`text-sm px-5 min-h-11 inline-flex items-center rounded-[var(--radius-md)] border transition-colors ${
                type === p
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-bg)]"
                  : "border-[var(--color-border-strong)] hover:border-[var(--color-fg-muted)]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <label className="block mb-6">
        <span className="font-mono text-xs tracking-[0.3em] text-[var(--color-fg-subtle)] block mb-2">
          NOME
        </span>
        <input
          required
          name="name"
          type="text"
          autoComplete="name"
          inputMode="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent border-b border-[var(--color-border-strong)] py-3 outline-none focus:border-[var(--color-accent)] transition-colors text-lg"
          placeholder="Seu nome"
        />
      </label>

      <label className="block mb-8">
        <span className="font-mono text-xs tracking-[0.3em] text-[var(--color-fg-subtle)] block mb-2">
          CONTA UM POUCO DO PROJETO
        </span>
        <textarea
          required
          name="message"
          rows={5}
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-transparent border-b border-[var(--color-border-strong)] py-3 outline-none focus:border-[var(--color-accent)] transition-colors text-lg resize-none"
          placeholder="Briefing, referências, deadline..."
        />
      </label>

      <button
        type="submit"
        disabled={status === "sent"}
        className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-[var(--color-accent)] text-[var(--color-bg)] px-8 py-4 rounded-[var(--radius-md)] font-medium hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-50 active:scale-[0.98]"
      >
        {status === "sent" ? (
          <>
            <CheckIcon />
            Abrindo WhatsApp
          </>
        ) : (
          <>
            <WhatsAppIcon />
            Continuar no WhatsApp →
          </>
        )}
      </button>

      {status === "blocked" && fallbackUrl && (
        <div
          role="alert"
          aria-live="polite"
          className="mt-6 border border-[var(--color-border-strong)] rounded-[var(--radius-md)] p-5 bg-[var(--color-bg-subtle)]"
        >
          <p className="text-sm text-[var(--color-fg-muted)] mb-3">
            O navegador bloqueou a janela do WhatsApp. Toca no link abaixo pra
            continuar a conversa:
          </p>
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium"
          >
            <WhatsAppIcon />
            Abrir conversa →
          </a>
        </div>
      )}
    </form>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8.5l3.2 3L13 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
