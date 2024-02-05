'use client';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import styles from '../_styles/CompanyHeader.module.css';
import ManageReservationSvg from '../_svg/ManageReservationSvg';
import ManageReservationBlackSvg from '../_svg/ManageReservationBlackSvg';
import ManageCampSvg from '../_svg/ManageCampSvg';
import ManageCampBlackSvg from '../_svg/ManageCampBlackSvg';
import ManageCompanySvg from '../_svg/ManageCompanySvg';
import ManageCompanyBlackSvg from '../_svg/ManageCompanyBlackSvg';

const CompanyHeader = () => {
  const { data: session } = useSession();
  const companyId = session?.user.id;

  const pathname = usePathname();

  const manageReservationPath = `/company/${companyId}/manage_reservation`;

  const manageCampPath = `/company/${companyId}/manage_camp/added_camp`;

  const manageCompanyUserPath = `/company/${companyId}/manage_company_user_info`;

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
            <ManageReservationBlackSvg />
          ) : (
            <ManageReservationSvg />
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
            <ManageCampBlackSvg />
          ) : (
            <ManageCampSvg />
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
            <ManageCompanyBlackSvg />
          ) : (
            <ManageCompanySvg />
          )}
          <h2>계정 관리</h2>
        </Link>
      </div>
    </div>
  );
};

export default CompanyHeader;
