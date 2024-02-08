'use client';
import Loading from '@/app/loading';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getTodayReservation } from '../../_lib/getTodayReservation';
import styles from '../_styles/ReservationList.module.css';
import CampFilter from './CampFilter';
import NothingReservation from './NothingReservation';
import TotalReservationList from './TotalReservationList';

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

            {/* <table className={styles.table}>
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
                ))} 
              </tbody>
            </table> */}
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
