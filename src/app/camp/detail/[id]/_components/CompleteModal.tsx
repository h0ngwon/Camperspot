import ModalCloseSvg from '@/components/ModalCloseSvg';
import styles from '../_styles/CompleteModal.module.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import CampingImg from '@/asset/camping_illust.jpg';
import Image from 'next/image';

type Props = {
  title: string;
  onClose: () => void;
};

const CompleteModal = ({ title, onClose }: Props) => {
  const { data: session } = useSession();

  return (
    <div className={styles.div}>
      <h3 className={styles.h3}>예약 및 결제</h3>
      <Link href={`/profile/${session?.user.id}/reservation`}>
        <div className={styles.close} onClick={onClose}>
          <ModalCloseSvg />
        </div>
      </Link>

      <Image
        className={styles.img}
        src={CampingImg}
        alt='image'
        width={150}
        height={150}
      />

      <h2 className={styles.h2}>{title}</h2>
      <Link
        className={styles.link}
        href={`/profile/${session?.user.id}/reservation`}
      >
        예약현황 바로가기
      </Link>
    </div>
  );
};

export default CompleteModal;
