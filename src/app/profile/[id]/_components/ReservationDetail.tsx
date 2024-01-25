'use client';
import { useQuery } from '@tanstack/react-query';
import { getUserReservation } from '../_lib/getUserReservation';
import { useParams } from 'next/navigation';
import styles from '../_styles/ReservationDetail.module.css';
import ReservationList from './ReservationList';

export const ReservationDetail = () => {
  const params = useParams();
  const { id: userId } = params;
  const {
    isLoading,
    error,
    data: reservations,
  } = useQuery({
    queryKey: ['mypage', 'profile', 'reservation'],
    queryFn: () => getUserReservation(userId as string),
  });

  const plannedReservation = reservations?.filter(
    (reservation) =>
      new Date(reservation.check_in_date).getTime() >=
        new Date(new Date().setHours(0, 0, 0)).getTime() &&
      new Date(reservation.check_out_date).getTime() >
        new Date(new Date().setHours(0, 0, 0)).getTime(),
  );

  const passedReservation = reservations?.filter(
    (reservation) =>
      new Date(reservation.check_out_date).getTime() < new Date().getTime(),
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className={styles.layout}>
      <h3 className={styles.h3}>예약 현황</h3>
      <p className={styles.p1}>이용 예정</p>
      <div className='container'>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>예약 일시</th>
              <th className={styles.th}>캠핑장 이름</th>
              <th className={styles.th}>캠핑존 이름</th>
              <th className={styles.th}>체크인/아웃</th>
              <th className={styles.th}>주소</th>
            </tr>
          </thead>

          <tbody>
            <ReservationList
              reservations={plannedReservation!}
              isPlanned={true}
            />
          </tbody>
        </table>
      </div>
      <p className={styles.p2}>이용 후</p>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>예약 일시</th>
              <th className={styles.th}>캠핑장 이름</th>
              <th className={styles.th}>캠핑존 이름</th>
              <th className={styles.th}>체크인/아웃</th>
              <th className={styles.th}></th>
            </tr>
          </thead>

          <tbody>
            <ReservationList
              reservations={passedReservation!}
              isPlanned={false}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};
