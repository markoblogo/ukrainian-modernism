import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { books } from '@/data/books';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const safeLang = (lang === 'uk' || lang === 'fr') ? lang : 'fr';

  const base = 'https://ukrmodernism.abvx.xyz';
  const dict = await getDictionary(safeLang);

  return {
    title: safeLang === 'uk' ? 'Книга в подарунок — Український модернізм' : 'Un livre en cadeau — Modernisme ukrainien',
    description:
      safeLang === 'uk'
        ? 'Завантажте безкоштовно «В житах» Григорія Косинки. Французький переклад у форматах PDF та EPUB.'
        : 'Téléchargez gratuitement « Dans les seigles » de Hryhorii Kosynka. Traduction française en PDF et EPUB.',
    alternates: {
      canonical: `${base}/${safeLang}/gift`,
      languages: {
        fr: `${base}/fr/gift`,
        uk: `${base}/uk/gift`,
      },
    },
    openGraph: {
      title: safeLang === 'uk' ? 'Книга в подарунок' : 'Un livre en cadeau',
      description:
        safeLang === 'uk'
          ? 'Григорій Косинка — «В житах». Французький переклад · PDF та EPUB.'
          : 'Hryhorii Kosynka — « Dans les seigles ». Traduction française gratuite.',
      url: `${base}/${safeLang}/gift`,
      type: 'website',
      images: [{
        url: `${base}/og/books/kosynka-gift.${safeLang}.png`,
        width: 1200,
        height: 630,
        alt: safeLang === 'uk' ? 'Книга в подарунок — Косинка' : 'Livre gratuit — Kosynka en français',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: safeLang === 'uk' ? 'Книга безкоштовно — Косинка' : 'Livre gratuit — Kosynka',
      description: safeLang === 'uk' ? 'Завантаження · PDF та EPUB' : 'Téléchargement gratuit · PDF & EPUB',
      images: [`${base}/og/books/kosynka-gift.${safeLang}.png`],
    },
  };
}

export default async function GiftPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const safeLang = (lang === 'uk' || lang === 'fr') ? lang : 'fr';
  const dict = await getDictionary(safeLang);

  const gift = books.find((b) => b.id === 'kosynka-gift');

  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: '32px 20px' }}>
      <Header lang={safeLang} />

      <h1 style={{ fontSize: 44, lineHeight: 1.1, marginTop: 40 }}>
        {safeLang === 'uk' ? 'Книга в подарунок' : 'Un livre en cadeau'}
      </h1>

      <p style={{ fontSize: 20, opacity: 0.85, marginTop: 16 }}>
        {safeLang === 'uk'
          ? 'Григорій Косинка — «В житах». Французький переклад у форматах PDF та EPUB.'
          : 'Hryhorii Kosynka — « Dans les seigles ». Traduction française en PDF et EPUB.'}
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
        {gift?.downloadPdfUrl && (
          <a
            href={gift.downloadPdfUrl}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: '#222',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            {safeLang === 'uk' ? 'Завантажити PDF' : 'Télécharger PDF'}
          </a>
        )}
        {gift?.downloadEpubUrl && (
          <a
            href={gift.downloadEpubUrl}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: '#f0f0f0',
              color: '#000',
              textDecoration: 'none',
              fontWeight: 600,
              border: '1px solid rgba(0,0,0,0.12)',
            }}
          >
            {safeLang === 'uk' ? 'Завантажити EPUB' : 'Télécharger EPUB'}
          </a>
        )}
      </div>

      <div style={{ marginTop: 48 }}>
        <Footer dict={dict} lang={safeLang} />
      </div>
    </main>
  );
}
