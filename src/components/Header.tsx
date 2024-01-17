'use client';
import Link from 'next/link';
import styles from './header.module.css';
import { signOut, useSession } from 'next-auth/react';

type Props = {};

const Header = (props: Props) => {
  const { data: session } = useSession();
  return (
    <>
      <Link href={`/auth/signin`} className={styles.linkBtn}>
        Auth
      </Link>
      <Link
        href={`/company/aaa/manage_camp/add_camp`}
        className={styles.linkBtn}
      >
        캠핑장등록
      </Link>
      <Link
        href={`/camp/detail/d88d1256-6202-469d-81e8-b8d12f629206`}
        className={styles.linkBtn}
      >
        캠프상세
      </Link>
      <Link
        href={`/camp/detail/d88d1256-6202-469d-81e8-b8d12f629206/reservation`}
        className={styles.linkBtn}
      >
        예약
      </Link>
      <Link href={`/company/aaa`} className={styles.linkBtn}>
        company
      </Link>
      <Link href={`/company/aaa/manage_reservation`} className={styles.linkBtn}>
        예약관리
      </Link>
      <Link href={`/camp`} className={styles.linkBtn}>
        캠핑장 둘러보기
      </Link>
      <Link href={`/profile/${session?.user.id}`} className={styles.linkBtn}>
        마이페이지
      </Link>
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  );
};

export default Header;
