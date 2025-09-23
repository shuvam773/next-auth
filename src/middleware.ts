import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protect authenticated pages and prevent logged-in users from visiting auth pages
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isProtectedPage = pathname.startsWith('/profile');

  // If logged in and trying to access login/signup, redirect to profile
  if (token && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/profile';
    return NextResponse.redirect(url);
  }

  // If not logged in and trying to access protected pages, redirect to login
  if (!token && isProtectedPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Exclude API routes, static assets, and Next internals
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};


