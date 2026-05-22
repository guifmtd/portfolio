import type { Metadata } from "next";
import { fraunces, inter, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";
import { site } from "@/lib/config";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import Letterbox from "@/components/Letterbox";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReadyProvider } from "@/components/ReadyProvider";

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="grain min-h-screen flex flex-col">
        <ThemeProvider>
          <ReadyProvider>
            <Loader />
            <CustomCursor />
            <Letterbox />
            <SmoothScroll>
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
            </SmoothScroll>
            <WhatsAppFAB />
          </ReadyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
