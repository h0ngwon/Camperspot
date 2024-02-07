import Link from 'next/link';
import styles from '../_styles/NothingReservation.module.css';

export const NothingReservation = ({ text }: { text: string }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{text}</h3>
      <Link className={styles.link} href={'/'}>
        캠핑장 예약하기
      </Link>
    </div>
  );
};
