'use client';
import Loading from '@/app/loading';
import styles from '../_styles/ReservationList.module.css';
import CampFilter from './CampFilter';
import NothingReservation from './NothingReservation';
import TotalReservationList from './TotalReservationList';
import { useCompanyUserTodayReservationQuery } from '@/hooks/useCompanyUserTodayReservationQuery';

const ReservationList = () => {
  const { isCompanyUserReservationLoading, reservations } =
    useCompanyUserTodayReservationQuery();
  if (isCompanyUserReservationLoading) return <Loading />;

  return (
    <>
      <div className={styles.div}>
        <h3 className={styles.h3}>오늘의 예약 현황</h3>

        {reservations?.length ? (
          <div>
            <CampFilter reservation={reservations} />
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
