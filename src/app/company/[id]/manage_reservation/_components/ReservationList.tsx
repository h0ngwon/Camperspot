'use client';
import Reservation from './Reservation';
import { useQuery } from '@tanstack/react-query';
import { getCompanyReservation } from '../../_lib/getCompanyUserReservation';
import styles from '../_styles/ReservationList.module.css';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import NothingReservation from './NothingReservation';
import TotalReservationList from './TotalReservationList';
import { getTodayReservation } from '../../_lib/getTodayReservation';

const ReservationList = () => {
  const params = useParams();
  const currentDate = new Date();
  const [filter, setFilter] = useState<string>('ongoing');
  const { isLoading, data: reservation } = useQuery({
    queryKey: ['company', 'reservation', 'today'],
    queryFn: () => getTodayReservation(params.id as string),
  });
  if (isLoading) return <p>Loading...</p>;

  const onGoingReservation = reservation?.filter(
    (reservation) =>
      reservation.camp_area?.camp?.check_in! <=
      currentDate.getHours() + ':' + currentDate.getMinutes(),
  );
  const upComingReservation = reservation?.filter(
    (reservation) =>
      reservation.camp_area?.camp?.check_in! >
      currentDate.getHours() + ':' + currentDate.getMinutes(),
  );
  console.log('onGoing', onGoingReservation, 'unComing', upComingReservation);
  return (
    <>
      <div className={styles.div}>
        <h3 className={styles.h3}>오늘의 예약 현황</h3>
        {reservation?.length ? (
          <div>
            <li onClick={() => setFilter('ongoing')}>
              이용 중 {onGoingReservation?.length}팀
            </li>
            <li onClick={() => setFilter('upcoming')}>
              체크인 예정 {upComingReservation?.length}팀
            </li>
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
                {filter === 'ongoing'
                  ? onGoingReservation?.map((reservation) => (
                      <Reservation
                        key={reservation.id}
                        reservation={reservation}
                      />
                    ))
                  : upComingReservation?.map((reservation) => (
                      <Reservation
                        key={reservation.id}
                        reservation={reservation}
                      />
                    ))}
                {/* {reservation?.map((reservation) => (
                  <Reservation key={reservation.id} reservation={reservation} />
                ))} */}
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
