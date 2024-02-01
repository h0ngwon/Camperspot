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

const ReservationList = () => {
  // const currentDate = new Date();
  const params = useParams();
  // const [startDate, setStartDate] = useState<Date>(
  //   new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
  // );
  // const [endDate, setEndDate] = useState<Date>(getEndDate);
  // const [text, setText] = useState<string>('');
  // const [result, setResult] = useState<CompanyReservationInfo[]>();
  // const [isSearch, setIsSearch] = useState<boolean>(false);

  // console.log('reservations', reservations);

  // if (isLoading) return <p>Loading...</p>;

  // const filterReservation = reservations?.filter(
  //   (reservation) =>
  //     new Date(reservation.created_at).toDateString() ===
  //     new Date().toDateString(),
  // );

  return (
    <>
      <div className={styles.div}>
        <h3 className={styles.h3}>오늘의 예약 현황</h3>
        {/* {filterReservation?.length ? (
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>예약일시</th>
                  <th className={styles.th}>예약자명</th>
                  <th className={styles.th}>캠핑장/캠핑존</th>
                  <th className={styles.th}>체크인/아웃</th>
                  <th className={styles.th}>인원</th>
                  <th className={styles.th}>예약자 연락처</th>
                </tr>
              </thead>
              <tbody>
                {filterReservation?.map((reservation) => (
                  <Reservation key={reservation.id} reservation={reservation} />
                ))}
              </tbody>
            </table> */}
        {/* </div>
        ) : (
          <NothingReservation text={'오늘 예약 현황이 없습니다.'} />
        )}
      </div> */}
      </div>
      <TotalReservationList />
    </>
  );
};

export default ReservationList;
