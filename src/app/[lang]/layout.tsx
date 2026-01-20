import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../globals.css';
import { getDictionary } from '@/get-dictionary';

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

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as 'fr' | 'uk');

    return {
        title: dict.meta.title,
        description: dict.meta.description,
        alternates: {
            canonical: `https://ukrainian-modernism.abvx.xyz/${lang}`,
            languages: {
                'fr': 'https://ukrainian-modernism.abvx.xyz/fr',
                'uk': 'https://ukrainian-modernism.abvx.xyz/uk',
            },
        },
        openGraph: {
            title: dict.meta.title,
            description: dict.meta.description,
            url: `https://ukrainian-modernism.abvx.xyz/${lang}`,
            siteName: 'Ukrainian Modernism',
            locale: lang === 'uk' ? 'uk_UA' : 'fr_FR',
            type: 'website',
            images: [
                {
                    url: 'https://ukrainian-modernism.abvx.xyz/og-image.jpg',
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.meta.title,
            description: dict.meta.description,
            images: ['https://ukrainian-modernism.abvx.xyz/twitter-card.jpg'],
        },
        robots: {
            index: true,
            follow: true,
        }
    };
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    return (
        <html lang={lang} className={`${inter.variable} ${playfair.variable}`}>
            <body>{children}</body>
        </html>
    );
}
