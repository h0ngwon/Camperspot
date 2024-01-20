'use client';
import Link from 'next/link';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';

type Props = {};

const CompanyHeader = (props: Props) => {
  const { data: session } = useSession();
  const id = session?.user.id;

  return (
    <>
      <Link href={`/company/${id}/manage_camp/add_camp`}>캠핑장등록</Link>
      <Link href={`/company/${id}/manage_company_user_info`}>회원정보관리</Link>
      <Link href={`/company/${id}/manage_reservation`}>예약관리</Link>
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  );
};

export default CompanyHeader;
