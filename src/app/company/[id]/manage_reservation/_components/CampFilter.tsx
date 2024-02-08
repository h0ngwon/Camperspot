import Drop from '@/components/Drop';
import { CompanyReservationInfo } from '@/types/reservation';
import { useState } from 'react';
import ExclamationMarkSvg from '../../_svg/ExclamationMarkSvg';
import styles from '../_styles/CampFilter.module.css';
import NothingReservation from './NothingReservation';
import Reservation from './Reservation';

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [campFilter, setCampFilter] = useState<string>(campFilters[0]!);
  const [filter, setFilter] = useState<string>('ongoing');

  const handleSelectFilter = (filter: string) => {
    setCampFilter(filter);
    setIsOpen(false);
  };

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

  return (
    <>
      <div className={styles['drop-btn-box']}>
        <div className={styles.div}>
          <button
            className={styles['drop-btn']}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <p>{campFilter}</p>
            <Drop color={'white'} />
          </button>
          <p>의 현황입니다.</p>
        </div>
        {isOpen && (
          <ul className={styles.filters}>
            {campFilters.map((filter) => (
              <li
                key={filter}
                className={styles.filter}
                onClick={() => handleSelectFilter(filter!)}
              >
                {filter}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.standard}>
        <ExclamationMarkSvg /> <p>현재 시간 기준</p>
      </div>

      <div className={styles.buttons}>
        <li
          className={`${styles.li} ${
            filter === 'ongoing' ? styles.active : ''
          }`}
          onClick={() => setFilter('ongoing')}
        >
          이용 중{'   '}
          <span className={styles.span}> {onGoingReservation?.length}팀</span>
        </li>
        <li
          className={`${styles.li} ${
            filter === 'upcoming' ? styles.active : ''
          }`}
          onClick={() => setFilter('upcoming')}
        >
          체크인 예정{'   '}
          <span className={styles.span}> {upComingReservation?.length}팀</span>
        </li>
      </div>

      <div
        className={
          (filter === 'ongoing' && onGoingReservation.length) ||
          (filter === 'upcoming' && upComingReservation.length)
            ? styles.scroll
            : undefined
        }
      >
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>체크인 날짜</th>
              <th className={styles.th}>예약자명</th>
              <th className={styles.th}>캠핑장/캠핑존</th>
              <th className={styles.th}>인원</th>
              <th className={styles.th}>예약자 연락처</th>
              <th className={styles.th}></th>
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
          </tbody>
        </table>
      </div>
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
