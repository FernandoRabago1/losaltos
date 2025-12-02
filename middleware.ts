import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { locales, defaultLocale, isValidLocale } from './lib/i18n/config';

const authMiddleware = NextAuth(authConfig).auth;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes - use auth middleware
  if (pathname.startsWith('/admin')) {
    return authMiddleware(request as any);
  }

  // API routes and static files - skip
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/uploads') ||
    /\.(png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|mov)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Get preferred locale from cookie or accept-language header
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const preferredLocale = cookieLocale && isValidLocale(cookieLocale)
    ? cookieLocale
    : defaultLocale;

  // If root path, redirect to preferred locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }

  // If no locale in path and not root, redirect to preferred locale
  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(`/${preferredLocale}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/(es|en|zh|ja|pt)/:path*',
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|uploads|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$|.*\\.mp4$|.*\\.webm$|.*\\.mov$).*)',
  ],
};
