'use client';
import Reservation from './Reservation';
import { useQuery } from '@tanstack/react-query';
import { getCompanyReservation } from '../../_lib/getCompanyUserReservation';
import styles from '../_styles/ReservationList.module.css';
import React, { useState } from 'react';
import { NAME_REGEX, PHONE_REGEX } from '@/app/_utils/regex';
import { CompanyReservationInfo } from '@/types/reservation';
import { useParams } from 'next/navigation';
import NothingReservation from './NothingReservation';
import ResrevationSearchSvg from '../../_svg/ResrevationSearchSvg';

import TotalReservationList from './TotalReservationList';
import { getTodayReservation } from '../../_lib/getTodayReservation';

const ReservationList = () => {
  const params = useParams();
  const { isLoading, data: reservation } = useQuery({
    queryKey: ['company', 'reservation', 'today'],
    queryFn: () => getTodayReservation(params.id as string),
  });
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className={styles.div}>
        <h3 className={styles.h3}>오늘의 예약 현황</h3>
        {reservation?.length ? (
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>체크인/아웃</th>
                  <th className={styles.th}>예약자명</th>
                  <th className={styles.th}>캠핑장/캠핑존</th>
                  <th className={styles.th}>인원</th>
                  <th className={styles.th}>예약자 연락처</th>
                </tr>
              </thead>
              <tbody>
                {reservation?.map((reservation) => (
                  <Reservation key={reservation.id} reservation={reservation} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NothingReservation text={'오늘 예약 현황이 없습니다.'} />
        )}
      </div>
      <TotalReservationList />
    </>
  );
};

export default ReservationList;
