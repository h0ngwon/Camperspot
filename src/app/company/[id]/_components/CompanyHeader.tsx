'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { supabase } from '@/app/api/db';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type Props = {};

const CompanyHeader = (props: Props) => {
  const [isClickMyCamp, setMyCamp] = useState(false);

  const route = useRouter();
  const { data: session } = useSession();
  const companyId = session?.user.id;

  const {
    data: campData,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('camp')
        .select('*')
        .eq('company_id', companyId as string);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    console.log(error);
    return <div>에러발생</div>;
  }

  const handleClickMyCamp = () => {
    setMyCamp(true);
  };
  const handleGoToCampArea = (campId: string) => {
    route.push(`/company/${companyId}/manage_camp/${campId}/manage_camp_area`);
  };
  return (
    <>
      <Link href={`/company/${companyId}/manage_camp/add_camp`}>
        캠핑장등록
      </Link>
      {campData && (
        <div>
          <h1 onClick={handleClickMyCamp}>내캠핑장</h1>
          {isClickMyCamp ? (
            <ul>
              {campData.length !== 0
                ? campData.map((item) => {
                    return (
                      <li
                        key={item.id}
                        onClick={() => handleGoToCampArea(item.id)}
                      >
                        {item.name}
                      </li>
                    );
                  })
                : ''}
            </ul>
          ) : (
            ''
          )}
        </div>
      )}
      <Link href={`/company/${companyId}/manage_company_user_info`}>
        회원정보관리
      </Link>
      <Link href={`/company/${companyId}/manage_reservation`}>예약관리</Link>
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  );
};

export default CompanyHeader;
