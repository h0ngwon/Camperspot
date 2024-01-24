'use client';
import { UserReservationInfo } from '@/types/reservation';
import styles from '../_styles/ReservationDetailModal.module.css';
import ModalCloseSvg from '@/components/ModalCloseSvg';
import ReservationArrowSvg from '@/components/ReservationArrowSvg';

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

  const { name: campName, check_in, check_out } = reservation.camp_area?.camp!;
  const { name: campAreaName } = reservation.camp_area!;
  return (
    <>
      <p className={styles.info}>예약 상세 보기</p>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={() => onClose()}>
          <ModalCloseSvg />
        </button>
        <div className={styles.div}>
          <div className={styles.campInfo}>
            <h3 className={styles.h3}>예약 정보</h3>
            <p className={styles.p}>
              <span className={styles.span}>객실</span>{' '}
              <span className={styles.campName}>{campName}</span>
              {campAreaName}
            </p>
            <p className={styles.p}>
              <span className={styles.span}>인원</span> {people}명
            </p>

            <div className={styles.dates}>
              <span className={styles.span}>일시</span>
              <div>
                <span className={styles.date}>
                  {new Date(check_in_date).toLocaleString('ko', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    weekday: 'narrow',
                  })}
                </span>

                <p className={styles.hour}>체크인 {check_in} ~</p>
              </div>
              <ReservationArrowSvg />

              <div>
                <p className={styles.date}>
                  {new Date(check_out_date).toLocaleString('ko', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    weekday: 'narrow',
                  })}
                </p>
                <p className={styles.hour}>체크아웃 ~ {check_out}</p>
              </div>
            </div>
          </div>
          <div className={styles.payInfo}>
            <h3 className={styles.h3}>예약자 정보</h3>
            <p>예약자명 {client_name}</p>
            <p>연락처 {client_phone}</p>
          </div>
        </div>
        <div className={styles.payInfo}>
          <h3 className={styles.h3}>결제 정보</h3>
          <div className={styles['pay-info']}>
            <div className={styles.pay}>
              결제일시 <p>{new Date(created_at).toLocaleString()}</p>
            </div>
            <div className={styles.pay}>
              상품 가격 <p>{fee.toLocaleString()}원</p>
            </div>
            <div className={styles.pay}>
              결제 수단 <p>{payment_method}</p>
            </div>
          </div>
        </div>
        <div className={styles.divider}></div>

        <div className={styles.prices}>
          {/* <p className={styles.total}>
            예약 금액 <span>{fee.toLocaleString()}원</span>
          </p> */}
          <p className={styles.total}>
            총 결제 금액{' '}
            <span className={styles.price}>{fee.toLocaleString()}원 </span>
          </p>
        </div>
      </div>
    </>
    // </div>
  );
};

export default ReservationDetailModal;
