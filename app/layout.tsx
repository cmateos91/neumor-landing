import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/utils/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const setInitialTheme = `
(() => {
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored === 'dark' || (!stored && prefersDark);
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
  } catch (err) {
    console.warn('No se pudo leer el tema inicial', err);
  }
})();
`;

export const metadata: Metadata = {
  title: "NeumorStudio | Interfaces neumórficas + automatización",
  description:
    "Estudio que diseña webs neumórficas, capta leads y automatiza respuestas con n8n para que tu negocio no pierda oportunidades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
