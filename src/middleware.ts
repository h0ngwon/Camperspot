import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

export const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/auth')) {
    if (token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (pathname.startsWith('/profile')) {
    console.log(token);
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (token) {
      if (token.role !== 'user') {
        return NextResponse.redirect(new URL('/', req.url));
      }

      // if(!pathname.includes(userId)) {
      //   return NextResponse.redirect(new URL('/', req.url));
      // }
    }
  }

  if (pathname.startsWith('/company')) {
    if (token) {
      if ((token.role as string) !== 'company') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
};

export const config = {
  matcher: ['/auth/:path*', '/profile/:path*', '/company/:path*'],
};
