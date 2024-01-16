'use client';
import Reservation from './Reservation';
import { useQuery } from '@tanstack/react-query';
import { getCompanyReservation } from '../_lib/reservation';
import styles from '../_styles/ReservationList.module.css';

const ReservationList = ({ companyId }: { companyId: string }) => {
  const {
    isLoading,
    error,
    data: reservations,
  } = useQuery({
    queryKey: ['reservations'],
    queryFn: () => getCompanyReservation(companyId),
  });

  const filterReservation = reservations?.filter(
    (reservation) =>
      new Date(reservation.created_at).toDateString() ===
      new Date().toDateString(),
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!reservations?.length) return <p>예약 현황이 없습니다.</p>;

  return (
    <>
      <h3 className={styles.h3}>오늘의 예약 현황</h3>
      <div className={styles.div}>
        <p>예약일시</p>
        <p>예약자명</p>
        <p>캠핑명</p>
        <p>캠핑존</p>
        <p>인원</p>
        <p>예약자 연락처</p>
      </div>
      {!filterReservation?.length && <p>오늘 예약 현황이 없습니다.</p>}
      <ul>
        {filterReservation?.map((reservation) => (
          <Reservation key={reservation.id} reservation={reservation} />
        ))}
      </ul>
      <h3 className={styles.h3}>전체 예약 현황</h3>
      <div className={styles.div}>
        <p>예약일시</p>
        <p>예약자명</p>
        <p>캠핑명</p>
        <p>캠핑존</p>
        <p>인원</p>
        <p>예약자 연락처</p>
      </div>
      <ul>
        {reservations?.map((reservation) => (
          <Reservation key={reservation.id} reservation={reservation} />
        ))}
      </ul>
    </>
  );
};

export default ReservationList;
