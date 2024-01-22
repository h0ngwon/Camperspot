'use client';
import { UserReservationInfo } from '@/types/reservation';
import styles from '../_styles/ReservationDetailModal.module.css';
import { IoIosArrowForward } from 'react-icons/io';

const ReservationDetailModal = ({
  reservation,
  onClose,
}: {
  reservation: UserReservationInfo;
  onClose: () => void;
}) => {
  const {
    check_in_date,
    check_out_date,
    client_name,
    client_phone,
    created_at,
    fee,
    people,
    payment_method,
  } = reservation;

  console.log('reservation', reservation);

  const { name: campName, check_in, check_out } = reservation.camp_area?.camp!;
  const { name: campAreaName } = reservation.camp_area!;
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={() => onClose()}>
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
        <div className={styles.div}>
          <h1 className={styles.h1}>예약 및 결제</h1>
          <div className={styles.campInfo}>
            <h3 className={styles.h3}>예약 정보</h3>
            <p>{campName}</p>
            <p>객실 {campAreaName}</p>
            <p>인원 {people}</p>
          </div>

          <div className={styles.dates}>
            일시
            <p>
              {new Date(check_in_date).toLocaleDateString()}
              <p>체크인 ~ {check_in}</p>
            </p>
            <IoIosArrowForward size={25} />
            <p>
              {new Date(check_out_date).toLocaleDateString()}
              <p>체크아웃 ~ {check_out}</p>
            </p>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.prices}>
            <p className={styles.total}>
              예약 금액 <span>{fee.toLocaleString()}원</span>
            </p>
            <p className={styles.total}>
              총 결제 금액{' '}
              <span className={styles.price}>{fee.toLocaleString()}원 </span>
            </p>
          </div>
        </div>
        <div className={styles.payInfo}>
          <h3 className={styles.h3}>결제 정보</h3>
          <div className={styles.personInfo}>
            <p>예약자명 {client_name}</p>
            <p>연락처 {client_phone}</p>
            <p>예약일자 {new Date(created_at).toLocaleString()}</p>
            <p>결제 수단 {payment_method}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailModal;
