import type { Metadata, Viewport } from 'next';
import { Inter, Orbitron, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/providers/app-providers';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { LoadingScreen } from '@/components/ui/loading-screen';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900']
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Cosmos Academy — Platform Eksplorasi Alam Semesta & Peradaban Luar Angkasa',
    template: '%s · Cosmos Academy'
  },
  description:
    'Cosmos Academy menggabungkan edukasi astronomi akurat (📚 Fakta Ilmiah) dengan fiksi ilmiah interaktif (🛸 Fiksi Ilmiah): Tata Surya 3D, Black Hole Explorer, Alien Codex, Simulator Perjalanan Antarbintang, dan lainnya.',
  keywords: [
    'astronomi',
    'edukasi luar angkasa',
    'tata surya 3D',
    'black hole',
    'fiksi ilmiah',
    'alien codex',
    'eksoplanet',
    'cosmos academy'
  ],
  authors: [{ name: 'Cosmos Academy' }],
  openGraph: {
    title: 'Cosmos Academy — Fakta & Fiksi Alam Semesta',
    description:
      'Belajar astronomi dari data NASA/ESA, lalu berlayar ke peradaban alien fiktif. Satu stasiun, dua dunia konten.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Cosmos Academy'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosmos Academy',
    description: 'Platform eksplorasi alam semesta & peradaban luar angkasa.'
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: '#0a0e1a',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-cosmos-void font-sans antialiased">
        <AppProviders>
          <LoadingScreen />
          <CustomCursor />
          <SiteHeader />
          <main className="relative">{children}</main>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
