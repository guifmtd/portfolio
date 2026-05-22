"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/config";
import { WhatsAppIcon } from "@/components/ui";

export default function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.9;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      data-cursor="click"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-[var(--z-nav)] md:hidden h-14 w-14 rounded-full bg-[var(--color-whatsapp)] text-white grid place-items-center shadow-[0_8px_24px_rgba(0,0,0,0.35)] active:scale-95 transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
