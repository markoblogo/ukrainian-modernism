import type { Metadata } from 'next';
import Script from 'next/script';
import { getDictionary } from '@/get-dictionary';
import { orgJsonLd, websiteJsonLd } from '@/lib/jsonld';

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
      images: [
        {
          url: `${base}/og/og-${safeLang}.jpg`,
          width: 1200,
          height: 630,
          alt:
            safeLang === 'uk'
              ? 'Український модернізм — французькі переклади'
              : 'Modernisme ukrainien — traductions françaises',
        },
      ],
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

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = (lang === 'uk' || lang === 'fr') ? lang : 'fr';

  return (
    <>
      <Script
        id="jsonld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
      />
      <Script
        id="jsonld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd(safeLang)) }}
      />
      {children}
    </>
  );
}
