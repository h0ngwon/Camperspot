import Spacer from '@/components/Spacer';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../styles/globals.css';
import '../styles/reset.css';
import Header from './_components/Header';
import Providers from './_components/Providers';
import Footer from './_components/Footer';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
  title: '캠퍼스팟 (Camperspot)',
  description:
    '캠퍼스팟은 캠핑을 즐기는 이용자들에게 간편한 예약 시스템과 활발한 커뮤니티 경험을 제공하며 업체 회원들에게는 간편한 캠핑장 등록 및 관리 기능을 제공하는 서비스입니다.',
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
          <Suspense fallback={<Loading/>}>
          {children}
          </Suspense>
          <Spacer y={80} />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
