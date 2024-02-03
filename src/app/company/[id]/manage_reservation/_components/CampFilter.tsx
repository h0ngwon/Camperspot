import { CompanyReservationInfo } from '@/types/reservation';
import { useState } from 'react';
import Reservation from './Reservation';
import styles from '../_styles/CampFilter.module.css';
import NothingReservation from './NothingReservation';

const CampFilter = ({
  reservation,
}: {
  reservation: CompanyReservationInfo[];
}) => {
  const currentDate = new Date();
  const campFilters = Array.from(
    new Set(
      reservation?.map((reservation) => reservation.camp_area?.camp?.name),
    ),
  );
  const [campFilter, setCampFilter] = useState<string>(campFilters[0]!);
  const [filter, setFilter] = useState<string>('ongoing');

  const filterReservation = reservation.filter(
    (reservation) => reservation.camp_area?.camp?.name === campFilter,
  );
  const onGoingReservation = filterReservation?.filter(
    (reservation) =>
      reservation.camp_area?.camp?.check_in! <=
      currentDate.getHours() + ':' + currentDate.getMinutes(),
  );
  const upComingReservation = filterReservation?.filter(
    (reservation) =>
      reservation.camp_area?.camp?.check_in! >
      currentDate.getHours() + ':' + currentDate.getMinutes(),
  );
  console.log('onGoing', onGoingReservation, 'unComing', upComingReservation);

  return (
    <>
      <ul>
        {campFilters.map((filter) => (
          <li onClick={() => setCampFilter(filter!)}>{filter}</li>
        ))}
      </ul>
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
                <Reservation key={reservation.id} reservation={reservation} />
              ))
            : upComingReservation?.map((reservation) => (
                <Reservation key={reservation.id} reservation={reservation} />
              ))}

          {/* {reservation?.map((reservation) => (
                  <Reservation key={reservation.id} reservation={reservation} />
                ))} */}
        </tbody>
      </table>
      {filter === 'ongoing' && !onGoingReservation.length && (
        <NothingReservation
          text={`${campFilter}에서 이용 중인 예약이 없습니다.`}
        />
      )}
      {filter === 'upcoming' && !upComingReservation.length && (
        <NothingReservation
          text={`${campFilter}에서 예정된 예약이 없습니다.`}
        />
      )}
    </>
  );
};

export default CampFilter;
