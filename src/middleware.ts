import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'uk'] as const;
const defaultLocale = 'fr';

type Locale = (typeof locales)[number];

function getLocaleFromPathname(pathname: string): Locale {
  const first = pathname.split('/')[1];
  return (locales as readonly string[]).includes(first) ? (first as Locale) : defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Set a request header so the root layout can set <html lang="..."> correctly.
  const lang = getLocaleFromPathname(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-lang', lang);

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and public assets + crawler files
    '/((?!_next|assets|images|favicon.ico|robots.txt|sitemap.xml|api).*)',
  ],
};
