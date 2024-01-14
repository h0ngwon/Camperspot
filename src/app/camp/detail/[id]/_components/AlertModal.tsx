'use client';
import styles from '../_styles/ConfirmModal.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
};

const AlertModal = ({ title }: Props) => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, []);
  if (!open) return null;

  return (
    <div className={styles.div}>
      {/* 나중에 로고 변경될 수도 있으니 그냥 태그로 넣음 */}
      <svg
        width='100px'
        height='100px'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
      >
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g
          id='SVGRepo_tracerCarrier'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <path
            stroke='#77B255'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M17 5L8 15l-5-4'
          ></path>{' '}
        </g>
      </svg>
      <h2 className={styles.h2}>{title}</h2>
    </div>
  );
};

export default AlertModal;
