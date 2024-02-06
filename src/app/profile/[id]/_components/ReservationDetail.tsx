'use client';
import { useQuery } from '@tanstack/react-query';
import { getUserReservation } from '../_lib/getUserReservation';
import { useParams } from 'next/navigation';
import styles from '../_styles/ReservationDetail.module.css';
import ReservationList from './ReservationList';
import { NothingReservation } from './NothingReservation';

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
  const currentDate = new Date();

  const plannedReservation = reservations?.filter(
    (reservation) =>
      // 체크인이 내일 이후부터
      new Date(reservation.check_in_date).getTime() >
      new Date(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1,
        ),
      ).getTime(),
  );

  const passedReservation = reservations?.filter(
    (reservation) =>
      // 체크인이 예약 당일인 경우도 포함
      new Date(
        new Date(reservation.check_in_date).setHours(0, 0, 0, 0),
      ).getTime() <= new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className={styles.layout}>
      <h3 className={styles.h3}>예약 현황</h3>
      <p className={styles.p1}>이용 전</p>
      {plannedReservation?.length ? (
        <ul className={styles.ul}>
          <ReservationList
            reservations={plannedReservation!}
            isPlanned={true}
          />
        </ul>
      ) : (
        <NothingReservation />
      )}

      <p className={styles.p1}>이용 완료</p>
      <ul className={styles.ul}>
        <ReservationList reservations={passedReservation!} isPlanned={false} />
      </ul>
    </div>
  );
};
