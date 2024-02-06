'use client';
import ModalCloseSvg from '@/components/ModalCloseSvg';
import styles from '../_styles/CompleteModal.module.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import CheckSvg from '../_svg/CheckSvg';

type Props = {
  title: string;
  onClose: () => void;
};

const CompleteModal = ({ title, onClose }: Props) => {
  const { data: session } = useSession();

  return (
    <div className={styles.div}>
      <Link href={`/profile/${session?.user.id}/reservation`}>
        <div className={styles.close} onClick={onClose}>
          <ModalCloseSvg />
        </div>
      </Link>
      <CheckSvg />
      <h2 className={styles.h2}>{title}</h2>
      <Link legacyBehavior href={`/profile/${session?.user.id}/reservation`}>
        <a className={styles.link} id='link' onClick={onClose}>
          예약현황 바로가기
        </a>
      </Link>
    </div>
  );
};

export default CompleteModal;
