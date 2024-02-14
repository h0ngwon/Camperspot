import Spacer from '@/components/Spacer';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import '../styles/globals.css';
import '../styles/reset.css';
import Footer from './_components/Footer';
import Header from './_components/Header';
import Providers from './_components/Providers';
import Loading from './loading';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: '캠퍼스팟 (Camperspot)',
  description:
    '캠퍼스팟은 캠핑을 즐기는 이용자들에게 간편한 예약 시스템과 활발한 커뮤니티 경험을 제공하며 업체 회원들에게는 간편한 캠핑장 등록 및 관리 기능을 제공하는 서비스입니다.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: '캠퍼스팟 (Camperspot)',
    description:
      '캠퍼스팟은 캠핑을 즐기는 이용자들에게 간편한 예약 시스템과 활발한 커뮤니티 경험을 제공하며 업체 회원들에게는 간편한 캠핑장 등록 및 관리 기능을 제공하는 서비스입니다.',
    url: 'https://camperspot.vercel.app/',
    siteName: '캠퍼스팟 (Camperspot)',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/documents/a3675ede-5250-4b82-ac07-860ee2899549.png?token=85cZ52VA-p3kywBKeA-2aCfRmnfW4sOUIWeixw8HIrc&height=896&width=962&expires=33243317333',
        width: 800,
        height: 600,
      },
      {
        url: 'https://opengraph.b-cdn.net/production/documents/a3675ede-5250-4b82-ac07-860ee2899549.png?token=85cZ52VA-p3kywBKeA-2aCfRmnfW4sOUIWeixw8HIrc&height=896&width=962&expires=33243317333',
        width: 1800,
        height: 1600,
        alt: '캠퍼스팟',
      },
    ],
    locale: 'ko',
    type: 'website',
  },
};

export const Pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={Pretendard.className}>
        <Providers>
          <div id='modal'></div>
          <Header />
          <Spacer y={80} />
          <Suspense fallback={<Loading />}>
            {children}
            <SpeedInsights />
          </Suspense>
          <Spacer y={80} />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
