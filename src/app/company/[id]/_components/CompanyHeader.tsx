'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/app/api/db';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import styles from '../_styles/CompanyHeader.module.css';
import Image from 'next/image';
import reservationIcon from '@/asset/ico_reservation.png';
import reservationIcon_active from '@/asset/ico_reservation_active.png';
import manageCampIcon from '@/asset/ico_managecamp.png';
import manageCampIcon_active from '@/asset/ico_managecamp_active.png';
import manageCompanyIcon from '@/asset/ico_manage_company.png';
import manageCompanyIcon_active from '@/asset/ico_manage_company_active.png';

type Props = {};

const CompanyHeader = (props: Props) => {
  const [isClickMyCamp, setMyCamp] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const companyId = session?.user.id;

  const pathname = usePathname();

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

  const manageReservationPath = `/company/${companyId}/manage_reservation`;

  const manageCampPath = `/company/${companyId}/manage_camp/added_camp`;

  const manageCompanyUserPath = `/company/${companyId}/manage_company_user_info`;

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
          href={manageReservationPath}
          className={
            pathname === manageReservationPath
              ? styles.active
              : styles.sidebarItem
          }
        >
          {pathname === manageReservationPath ? (
            <Image
              src={reservationIcon_active}
              alt='예약관리'
              width={24}
              height={24}
            />
          ) : (
            <Image
              src={reservationIcon}
              alt='예약관리'
              width={24}
              height={24}
            />
          )}
          <h2>예약 현황</h2>
        </Link>

        <Link
          href={manageCampPath}
          className={
            pathname === manageCampPath ? styles.active : styles.sidebarItem
          }
        >
          {pathname === manageCampPath ? (
            <Image
              src={manageCampIcon_active}
              alt='캠핑장운영'
              width={24}
              height={24}
            />
          ) : (
            <Image
              src={manageCampIcon}
              alt='캠핑장운영'
              width={24}
              height={24}
            />
          )}
          <h2>캠핑장 운영</h2>
        </Link>

        <Link
          href={manageCompanyUserPath}
          className={
            pathname === manageCompanyUserPath
              ? styles.active
              : styles.sidebarItem
          }
        >
          {pathname === manageCompanyUserPath ? (
            <Image
              src={manageCompanyIcon_active}
              alt='계정관리'
              width={24}
              height={24}
            />
          ) : (
            <Image
              src={manageCompanyIcon}
              alt='계정관리'
              width={24}
              height={24}
            />
          )}
          <h2>계정 관리</h2>
        </Link>
      </div>
    </div>
  );
};

export default CompanyHeader;
