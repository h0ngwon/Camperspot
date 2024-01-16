import styles from '../_styles/Reservation.module.css';
import type { CompanyReservationInfo } from '@/types/reservation';

const Reservation = ({
  reservation,
}: {
  reservation: CompanyReservationInfo;
}) => {
  console.log('reservation!!!', reservation);
  const { id, created_at, client_name, client_phone, people } = reservation;
  const { camp_name } = reservation.camp_area?.camp!;
  const { camp_area_name } = reservation.camp_area!;
  return (
    <>
      <li className={styles.li}>
        <p>
          {new Date(created_at).toLocaleString('ko', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </p>
        <p>{client_name}</p>
        <p>{camp_name}</p>
        <p>{camp_area_name} </p>
        <p>{people}</p>
        <p>{client_phone}</p>
      </li>
    </>
  );
};

export default Reservation;
