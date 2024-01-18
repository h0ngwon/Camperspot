'use client';
import Link from 'next/link';
import styles from './header.module.css';
import { signOut } from 'next-auth/react';

type Props = {};

const Header = (props: Props) => {
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
        href={`/company/aaa/manage_camp/bbb/manage_camp_area`}
        className={styles.linkBtn}
      >
        캠핑존 관리
      </Link>
      <Link
        href={`/company/aaa/manage_company_user_info`}
        className={styles.linkBtn}
      >
        회원정보관리
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
      <Link
        href={`/company/23bfb168-d019-4c31-8bab-fa46e1e12a9d/manage_reservation`}
        className={styles.linkBtn}
      >
        예약관리
      </Link>
      <Link href={`/camp?sort=인기순&page=1`} className={styles.linkBtn}>
        캠핑장 둘러보기
      </Link>
      <Link href={`/community`} className={styles.linkBtn}>
        커뮤니티
      </Link>
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  );
};

export default Header;
