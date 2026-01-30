import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

// Keep root metadata minimal; per-language metadata is generated in /[lang]/layout.tsx
export const metadata: Metadata = {
  applicationName: 'Ukrainian Modernism',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const lang = h.get('x-lang') ?? 'fr';

  return (
    <html lang={lang} className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
