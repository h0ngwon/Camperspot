import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });
  console.log('token = ', token);
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/auth')) {
    if (token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
};

export const config = {
  matcher: ['/auth/:path*'],
};
