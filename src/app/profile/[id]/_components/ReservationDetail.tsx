'use client';
import { useQuery } from '@tanstack/react-query';
import { getUserReservation } from '../_lib/getUserReservation';
import { useParams } from 'next/navigation';
import styles from '../_styles/ReservationDetail.module.css';

export const ReservationDetail = () => {
  const params = useParams();
  const { id: userId } = params;
  console.log('params', userId);
  const {
    isLoading,
    error,
    data: reservations,
  } = useQuery({
    queryKey: ['mypage', 'profile', 'reservation'],
    queryFn: () => getUserReservation(userId as string),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  console.log('data', reservations);
  return (
    <>
      <div className={styles.div}>
        <p>예약 일시</p>
        <p>캠핑장 이름</p>
        <p>캠핑존 이름</p>
        <p>체크인/아웃</p>
        <p>주소</p>
      </div>
      <div className={styles.divider}></div>
      <ul>
        {reservations &&
          reservations?.map((reservation) => {
            const { id, created_at, check_in_date, check_out_date } =
              reservation;
            const { name: campAreaName } = reservation.camp_area!;
            const { name: campName, address } = reservation.camp_area?.camp!;
            return (
              <li className={styles.li} key={id}>
                <p className={styles.date}>
                  {new Date(created_at).toLocaleDateString('ko', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </p>
                <p>{campName}</p>
                <p>{campAreaName}</p>
                <p className={styles.date}>{check_in_date}</p>
                <p className={styles.date}>{check_out_date}</p>
                <p>{address}</p>
                <button>상세 보기</button>
              </li>
            );
          })}
      </ul>
    </>
  );
};
