import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

export const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });
  const { pathname } = req.nextUrl;
  console.log(token);
  if (pathname.startsWith('/auth')) {
    if (token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (pathname.startsWith('/profile')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
};

export const config = {
  matcher: ['/auth/:path*', '/profile/:path*'],
};
