'use client';
import { useQuery } from '@tanstack/react-query';
import styles from '../_styles/ReservationList.module.css';
import { useParams } from 'next/navigation';
import NothingReservation from './NothingReservation';
import TotalReservationList from './TotalReservationList';
import { getTodayReservation } from '../../_lib/getTodayReservation';
import CampFilter from './CampFilter';
import Loading from '@/app/loading';

const ReservationList = () => {
  const params = useParams();
  const { isLoading, data: reservation } = useQuery({
    queryKey: ['company', 'reservation', 'today'],
    queryFn: () => getTodayReservation(params.id as string),
  });
  if (isLoading) return <Loading />;

  return (
    <>
      <div className={styles.div}>
        <h3 className={styles.h3}>오늘의 예약 현황</h3>

        {reservation?.length ? (
          <div>
            <CampFilter reservation={reservation} />
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
