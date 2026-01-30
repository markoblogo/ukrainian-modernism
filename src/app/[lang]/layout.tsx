import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const safeLang = (lang === 'uk' || lang === 'fr') ? lang : 'fr';
  const dict = await getDictionary(safeLang);

  const base = 'https://ukrmodernism.abvx.xyz';

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${base}/${safeLang}`,
      languages: {
        fr: `${base}/fr`,
        uk: `${base}/uk`,
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${base}/${safeLang}`,
      siteName: 'Ukrainian Modernism',
      locale: safeLang === 'uk' ? 'uk_UA' : 'fr_FR',
      type: 'website',
      images: [{
        url: `${base}/og/og-${safeLang}.jpg`,
        width: 1200,
        height: 630,
        alt: safeLang === 'uk'
          ? 'Український модернізм — французькі переклади'
          : 'Modernisme ukrainien — traductions françaises',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${base}/og/og-x.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
