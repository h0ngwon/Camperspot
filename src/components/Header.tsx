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
        href={`/camp/detail/d88d1256-6202-469d-81e8-b8d12f629206`}
        className={styles.linkBtn}
      >
        캠프상세
      </Link>
      <Link href={`/camp/detail/aaa/reservation`} className={styles.linkBtn}>
        예약
      </Link>
      <Link href={`/company/aaa`} className={styles.linkBtn}>
        company
      </Link>
<<<<<<< HEAD

=======
      <Link
        href={`/company/23bfb168-d019-4c31-8bab-fa46e1e12a9d/manage_reservation`}
        className={styles.linkBtn}
      >
        예약관리
      </Link>
>>>>>>> 7a2d0e45573fa71d4b1a86222015618892a9a10a
      <Link href={`/camp?sort=인기순&page=1`} className={styles.linkBtn}>
        캠핑장 둘러보기
      </Link>
      <Link href={`/profile/${session?.user.id}`} className={styles.linkBtn}>
        마이페이지
      </Link>
      <Link href={`/community`} className={styles.linkBtn}>
        커뮤니티
      </Link>
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  );
};

export default Header;
