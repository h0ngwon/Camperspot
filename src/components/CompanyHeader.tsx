import Link from 'next/link';
import React from 'react';
import styles from './header.module.css';
import { signOut } from 'next-auth/react';

type Props = {};

const CompanyHeader = (props: Props) => {
  return (
    <>
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
        href={`/company/23bfb168-d019-4c31-8bab-fa46e1e12a9d/manage_reservation`}
        className={styles.linkBtn}
      >
        예약관리
      </Link>
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  );
};

export default CompanyHeader;
