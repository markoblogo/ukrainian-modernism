import type { Book } from '@/data/books';

export const SITE_URL = 'https://ukrmodernism.abvx.xyz';

export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ABVX',
    url: 'https://abvx.xyz',
    sameAs: ['https://abvcreative.medium.com/', 'https://abvx.substack.com/'],
  };
}

export function websiteJsonLd(lang: 'fr' | 'uk') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: lang === 'fr' ? 'Modernisme ukrainien' : 'Український модернізм',
    url: SITE_URL,
    inLanguage: lang,
  };
}

export function seriesJsonLd(lang: 'fr' | 'uk') {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    name: lang === 'fr' ? 'Modernisme ukrainien' : 'Український модернізм',
    url: `${SITE_URL}/${lang}`,
    inLanguage: lang,
    publisher: {
      '@type': 'Organization',
      name: 'ABVX',
      url: 'https://abvx.xyz',
    },
  };
}

export function bookJsonLd(opts: {
  lang: 'fr' | 'uk';
  id: string;
  title: string;
  author: string;
  amazonKindleUrl?: string;
  amazonPrintUrl?: string;
}) {
  const { lang, id, title, author, amazonKindleUrl, amazonPrintUrl } = opts;

  const offers = [
    amazonKindleUrl
      ? {
          '@type': 'Offer',
          url: amazonKindleUrl,
          availability: 'https://schema.org/InStock',
        }
      : null,
    amazonPrintUrl
      ? {
          '@type': 'Offer',
          url: amazonPrintUrl,
          availability: 'https://schema.org/InStock',
        }
      : null,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${SITE_URL}/${lang}#${id}`,
    name: title,
    author: { '@type': 'Person', name: author },
    inLanguage: lang,
    translator: { '@type': 'Person', name: 'Anton Biletskiy-Volokh' },
    publisher: { '@type': 'Organization', name: 'ABVX', url: 'https://abvx.xyz' },
    sameAs: [amazonKindleUrl, amazonPrintUrl].filter(Boolean),
    ...(offers.length ? { offers } : {}),
  };
}

export function giftBookJsonLd(opts: {
  lang: 'fr' | 'uk';
  id: string;
  title: string;
  author: string;
  pdfUrl?: string;
  epubUrl?: string;
}) {
  const { lang, id, title, author, pdfUrl, epubUrl } = opts;

  const offers = [
    pdfUrl
      ? {
          '@type': 'Offer',
          url: `${SITE_URL}${pdfUrl}`,
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        }
      : null,
    epubUrl
      ? {
          '@type': 'Offer',
          url: `${SITE_URL}${epubUrl}`,
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        }
      : null,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${SITE_URL}/${lang}#${id}`,
    name: title,
    author: { '@type': 'Person', name: author },
    inLanguage: lang,
    translator: { '@type': 'Person', name: 'Anton Biletskiy-Volokh' },
    publisher: { '@type': 'Organization', name: 'ABVX', url: 'https://abvx.xyz' },
    ...(offers.length ? { offers } : {}),
  };
}

export function jsonLdForBook(lang: 'fr' | 'uk', book: Book) {
  if (book.type === 'gift') {
    return giftBookJsonLd({
      lang,
      id: book.id,
      title: book.title[lang],
      author: book.author[lang],
      pdfUrl: book.downloadPdfUrl,
      epubUrl: book.downloadEpubUrl,
    });
  }

  return bookJsonLd({
    lang,
    id: book.id,
    title: book.title[lang],
    author: book.author[lang],
    amazonKindleUrl: book.amazonKindleUrl,
    amazonPrintUrl: book.amazonPrintUrl,
  });
}
