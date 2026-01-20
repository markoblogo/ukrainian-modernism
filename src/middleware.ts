import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let locales = ["fr", "uk"];
let defaultLocale = "fr";

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = defaultLocale;
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next) and public assets
        "/((?!_next|assets|images|favicon.ico|api).*)"
    ],
};
