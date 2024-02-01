import Image from 'next/image';
import empty_camp from '@/asset/ico_empty_camp.png';
import styles from '../_styles/NothingReservation.module.css';

const NothingReservation = ({ text }: { text: string }) => {
  return (
    <div className={styles.div}>
      <Image src={empty_camp} alt='예약 없을때 나오는 이미지' />
      <p className={styles.p}> {text}</p>
    </div>
  );
};

export default NothingReservation;
