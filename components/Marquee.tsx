import { clientsHighlight } from "@/lib/config";

export default function Marquee() {
  const list = [...clientsHighlight, ...clientsHighlight];
  return (
    <section className="border-y border-[var(--color-border)] py-10 overflow-hidden">
      <div className="flex gap-16 animate-marquee whitespace-nowrap will-change-transform">
        {list.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="font-display italic text-4xl md:text-6xl text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-slow)]"
          >
            {c}
            <span className="not-italic text-[var(--color-accent)] mx-8">★</span>
          </span>
        ))}
      </div>
    </section>
  );
}
