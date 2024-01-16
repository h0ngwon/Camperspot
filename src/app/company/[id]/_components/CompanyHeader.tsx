import Link from 'next/link';
import React from 'react';

type Props = {};

const CompanyHeader = (props: Props) => {
  return (
    <>
      <Link href={'/manage_company_info'}>회원정보</Link>
    </>
  );
};

export default CompanyHeader;
