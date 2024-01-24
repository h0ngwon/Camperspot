'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/app/api/db';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import styles from '../_styles/CompanyHeader.module.css';

type Props = {};

const CompanyHeader = (props: Props) => {
  const [isClickMyCamp, setMyCamp] = useState(false);

  const router = useRouter();
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
    router.push(`/company/${companyId}/manage_camp/added_camp`);
    setMyCamp(true);
    if (isClickMyCamp === true) {
      setMyCamp(false);
    }
  };
  const handleGoToCampArea = (campId: string) => {
    router.push(`/company/${companyId}/manage_camp/${campId}/manage_camp_area`);
  };
  return (
    <>
      <Link
        href={`/company/${companyId}/manage_reservation`}
        className={styles.sidebarItem}
      >
        예약관리
      </Link>
      <Link
        href={`/company/${companyId}/manage_camp/add_camp`}
        className={styles.sidebarItem}
      >
        캠핑장등록
      </Link>
      {campData && (
        <div>
          <h1 onClick={handleClickMyCamp} className={styles.sidebarItemMycamp}>
            내캠핑장
          </h1>
          {isClickMyCamp ? (
            <ul>
              {campData.length !== 0
                ? campData.map((item) => {
                    return (
                      <li
                        key={item.id}
                        onClick={() => handleGoToCampArea(item.id)}
                        className={styles.myCampItem}
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
      <Link
        href={`/company/${companyId}/manage_company_user_info`}
        className={styles.sidebarItem}
      >
        회원정보관리
      </Link>
    </>
  );
};

export default CompanyHeader;
