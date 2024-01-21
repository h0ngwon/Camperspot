import { UserReservationInfo } from '@/types/reservation';
import styles from '../_styles/ReservationList.module.css';
import copy from 'clipboard-copy';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const ReservationList = ({
  reservations,
  isPlanned,
}: {
  reservations: UserReservationInfo;
  isPlanned: boolean;
}) => {
  const handleCopy = (address: string) => {
    copy(address);
    toast.success('클립보드에 복사되었습니다', { position: 'top-right' });
  };
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
              {isPlanned && (
                <p>
                  {address}
                  <span
                    className={styles.copy}
                    onClick={() => handleCopy(address)}
                  >
                    복사하기
                  </span>
                </p>
              )}
              <button>상세 보기</button>
            </li>
          );
        })}
    </>
  );
};

export default ReservationList;
