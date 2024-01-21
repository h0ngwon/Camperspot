import { UserReservationInfo } from '@/types/reservation';
import styles from '../_styles/ReservationList.module.css';

const ReservationList = ({
  reservations,
}: {
  reservations: UserReservationInfo;
}) => {
  return (
    <>
      {reservations &&
        reservations?.map((reservation) => {
          const { id, created_at, check_in_date, check_out_date } = reservation;
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
              <p className={styles.date}>{`${new Date(
                check_in_date,
              ).toLocaleDateString('ko', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
              })} - ${new Date(check_out_date).toLocaleDateString('ko', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
              })}`}</p>
              {/* <p className={styles.date}>{check_out_date}</p> */}
              <p>{address}</p>
              <button>상세 보기</button>
            </li>
          );
        })}
    </>
  );
};

export default ReservationList;
