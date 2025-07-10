// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (token && (pathname === '/signup' || pathname === '/signin')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!token && (pathname === '/signin' || pathname === '/signup')) {
    return NextResponse.next();
  }

  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/signin', '/signup', '/dashboard/:path*'],
};
