import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Routes qui nécessitent une authentification
const protectedPaths = [
  '/dashboard',
  '/rh/create',
  '/admin',
];

// Routes réservées aux invités (déjà connectés redirigés)
const guestOnlyPaths = [
  '/auth/login',
  '/auth/join',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Récupérer le token JWT
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;

  // Vérifier si la route actuelle est protégée
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Vérifier si la route est réservée aux invités
  const isGuestOnlyPath = guestOnlyPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Rediriger les utilisateurs non authentifiés vers login
  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Rediriger les utilisateurs déjà authentifiés loin des pages guest-only
  if (isGuestOnlyPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configuration du matcher pour les routes à surveiller
export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf :
     * - api (API routes)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico (favicon)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
