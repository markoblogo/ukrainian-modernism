import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { books } from '@/data/books';
import { getDictionary } from '@/get-dictionary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return books.map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const safeLang = (lang === 'uk' || lang === 'fr') ? lang : 'fr';
  const book = books.find((b) => b.id === id);

  if (!book) return {};

  const base = 'https://ukrmodernism.abvx.xyz';
  const title = `${book.title[safeLang]} — ${book.author[safeLang]}`;

  return {
    title,
    description: book.shortDescription[safeLang],
    alternates: {
      canonical: `${base}/${safeLang}/book/${id}`,
      languages: {
        fr: `${base}/fr/book/${id}`,
        uk: `${base}/uk/book/${id}`,
      },
    },
    openGraph: {
      title,
      description: book.shortDescription[safeLang],
      url: `${base}/${safeLang}/book/${id}`,
      type: 'book',
      images: [{
        url: `${base}/og/books/${id}.${safeLang}.png`,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: book.shortDescription[safeLang],
      images: [`${base}/og/books/${id}.${safeLang}.png`],
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const safeLang = (lang === 'uk' || lang === 'fr') ? lang : 'fr';
  const dict = await getDictionary(safeLang);
  const book = books.find((b) => b.id === id);

  if (!book) notFound();

  const title = book.title[safeLang];
  const author = book.author[safeLang];

  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: '32px 20px' }}>
      <Header lang={safeLang} />

      <h1 style={{ fontSize: 44, lineHeight: 1.1, marginTop: 40 }}>{title}</h1>
      <p style={{ fontSize: 22, opacity: 0.8, marginTop: 10 }}>{author}</p>

      <p style={{ fontSize: 18, opacity: 0.9, marginTop: 24 }}>{book.longDescription[safeLang]}</p>

      <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
        {book.type === 'commercial' && book.amazonKindleUrl && (
          <a
            href={book.amazonKindleUrl}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: '#222',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            {safeLang === 'uk' ? dict.hero.buy_kindle : dict.hero.buy_kindle}
          </a>
        )}
        {book.type === 'commercial' && book.amazonPrintUrl && (
          <a
            href={book.amazonPrintUrl}
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
            {safeLang === 'uk' ? dict.hero.buy_print : dict.hero.buy_print}
          </a>
        )}
        {book.type === 'gift' && book.downloadPdfUrl && (
          <a
            href={book.downloadPdfUrl}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: '#222',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            {safeLang === 'uk' ? dict.hero.download_pdf : dict.hero.download_pdf}
          </a>
        )}
        {book.type === 'gift' && book.downloadEpubUrl && (
          <a
            href={book.downloadEpubUrl}
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
            {safeLang === 'uk' ? dict.hero.download_epub : dict.hero.download_epub}
          </a>
        )}
      </div>

      <div style={{ marginTop: 48 }}>
        <Footer dict={dict} lang={safeLang} />
      </div>
    </main>
  );
}
