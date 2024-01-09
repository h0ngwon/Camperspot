'use client';
import styles from './reservation.module.css';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const onCloseHandler = () => {
    router.back();
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div>예약 모달</div>
        <button className={styles.closeButton} onClick={onCloseHandler}>
          <svg
            width={24}
            viewBox='0 0 24 24'
            aria-hidden='true'
            className='r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03'
          >
            <g>
              <path d='M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z'></path>
            </g>
          </svg>
        </button>
        <h1>예약 및 결제</h1>

        <p>캠핑장 이름</p>
        <p>객실 캠핑장 자리 이름</p>
        <p>인원 성인 2명, 아이 2명</p>
        <div>
          <p>
            일시 2024.01.01(일) 체크인 15:00 ~ 2024.01.02(월) 체크아웃 ~ 12:00
          </p>
          <button>달력 버튼</button>
        </div>
      </div>
    </div>
  );
};

export default page;
