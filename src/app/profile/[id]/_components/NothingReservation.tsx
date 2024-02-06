import Link from 'next/link';
import styles from '../_styles/NothingReservation.module.css';

export const NothingReservation = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>예약된 캠핑장이 없습니다.</h3>
      <Link className={styles.link} href={'/'}>
        캠핑장 예약하기
      </Link>
    </div>
  );
};
