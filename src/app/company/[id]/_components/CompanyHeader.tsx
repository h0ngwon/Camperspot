'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/app/api/db';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import styles from '../_styles/CompanyHeader.module.css';
import Image from 'next/image';
import reservationIcon from '@/asset/ico_reservation.png';
import manageCampIcon from '@/asset/ico_managecamp.png';
import manageCompanyIcon from '@/asset/ico_manage_company.png';

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

  // const handleClickMyCamp = () => {
  //   router.push(`/company/${companyId}/manage_camp/added_camp`);
  //   setMyCamp(true);
  //   if (isClickMyCamp === true) {
  //     setMyCamp(false);
  //   }
  // };
  // const handleGoToCampArea = (campId: string) => {
  //   router.push(`/company/${companyId}/manage_camp/${campId}/manage_camp_area`);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.menuTextContain}>
        <Link
          href={`/company/${companyId}/manage_reservation`}
          className={styles.sidebarItem}
        >
          <Image src={reservationIcon} alt='예약관리' width={24} height={24} />
          <h2>예약 현황</h2>
        </Link>
        <Link
          href={`/company/${companyId}/manage_camp/added_camp`}
          className={styles.sidebarItem}
        >
          <Image src={manageCampIcon} alt='캠핑장운영' width={24} height={24} />
          <h2>캠핑장 운영</h2>
        </Link>
        {/* {campData && (
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
        )} */}
        <Link
          href={`/company/${companyId}/manage_company_user_info`}
          className={styles.sidebarItem}
        >
          <Image
            src={manageCompanyIcon}
            alt='계정관리'
            width={24}
            height={24}
          />
          <h2>계정 관리</h2>
        </Link>
      </div>
    </div>
  );
};

export default CompanyHeader;
