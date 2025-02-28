import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // List of paths that require authentication
  const protectedPaths = [
    '/dashboard',
    '/reservation/confirm',
    '/profile',
  ];

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // If it's a protected path and the user is not authenticated
  if (isProtectedPath && !session) {
    // Redirect to the login page
    const url = new URL('/auth/signin', request.url);
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // If the user is already authenticated and tries to access auth pages
  const authPaths = ['/auth/signin', '/auth/signup'];
  const isAuthPath = authPaths.some(path => 
    request.nextUrl.pathname === path
  );

  if (isAuthPath && session) {
    // Redirect to dashboard if already logged in
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/reservation/confirm/:path*',
    '/profile/:path*',
    '/auth/signin',
    '/auth/signup',
  ],
};
