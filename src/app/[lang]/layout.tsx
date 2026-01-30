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
      // Use a real file to avoid 404 for crawlers. Replace later with a dedicated 1200x630 og image.
      images: [{ url: `${base}/abvx-logo.jpg` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${base}/abvx-logo.jpg`],
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
