import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/utils/SmoothScroll";
import { ThemeProvider } from "@/components/theme/ThemeContext";

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
    
    // Cargar diseño visual
    const designTheme = localStorage.getItem('designTheme') || 'neumorphic';
    document.body.setAttribute('data-design', designTheme);
  } catch (err) {
    console.warn('No se pudo leer el tema inicial', err);
  }
})();
`;

// Registrar Service Worker
const registerSW = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('SW registrado:', reg.scope))
      .catch((err) => console.warn('SW error:', err));
  });
}
`;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbbf24' },
    { media: '(prefers-color-scheme: dark)', color: '#0F141A' },
  ],
};

export const metadata: Metadata = {
  title: "NeumorStudio | Interfaces neumorficas + automatizacion",
  description:
    "Estudio que disena webs neumorficas, capta leads y automatiza respuestas para que tu negocio no pierda oportunidades.",
  keywords: ['diseno web', 'neumorfismo', 'leads', 'automatizacion', 'n8n', 'landing page'],
  authors: [{ name: 'NeumorStudio' }],
  creator: 'NeumorStudio',
  publisher: 'NeumorStudio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'NeumorStudio',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://neumorstudio.com',
    siteName: 'NeumorStudio',
    title: 'NeumorStudio | Diseno que conecta',
    description: 'Webs con panel propio, leads centralizados y automatizaciones.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NeumorStudio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeumorStudio | Diseno que conecta',
    description: 'Webs con panel propio, leads centralizados y automatizaciones.',
    images: ['/images/og-image.png'],
    creator: '@neumorstudio',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON === 'true'

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preload crítico para LCP */}
        {isComingSoon && (
          <>
            <link
              rel="preload"
              href="/images/video-poster.jpg"
              as="image"
              fetchPriority="high"
            />
            <link
              rel="preload"
              href="/videos/VideoIntroducción.mp4"
              as="video"
              type="video/mp4"
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        data-design="neumorphic"
      >
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <script dangerouslySetInnerHTML={{ __html: registerSW }} />
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
