'use client';
import type { UserReservationInfo } from '@/types/reservation';
import type { CompanyReservationInfo } from '@/types/reservation';
import styles from '../_styles/ReservationDetailModal.module.css';
import ReservationArrowSvg from '@/components/ReservationArrowSvg';
import ModalCloseSvg from '@/components/ModalCloseSvg';

const ReservationDetailModal = ({
  reservation,
  onClose,
}: {
  reservation: Omit<UserReservationInfo, 'photo_url'> | CompanyReservationInfo;
  onClose: () => void;
}) => {
  const {
    id,
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
        <button className={styles['close-btn']} onClick={() => onClose()}>
          <ModalCloseSvg />
        </button>
        <div>
          <div className={styles['camp-info']}>
            <h3 className={styles.h3}>예약 정보</h3>
            <p>
              <span className={styles['camping-zone']}>캠핑존 </span>{' '}
              <span className={styles['camp-name']}>{campName}</span>
              {campAreaName}
            </p>
            <p>
              <span className={styles.span}>인원</span> {people}명
            </p>

            <div className={styles.div}>
              <span className={styles.span}>일시</span>
              <div className={styles.dates}>
                <div>
                  <span className={styles.date}>
                    {new Date(check_in_date)
                      .toLocaleString('ko', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        weekday: 'narrow',
                      })
                      .replace(/\.\s*\((.)\)$/, ' ($1)')}
                  </span>

                  <p className={styles.hour}>체크인 {check_in} ~</p>
                </div>
                <ReservationArrowSvg />

                <div>
                  <p className={styles.date}>
                    {new Date(check_out_date)
                      .toLocaleString('ko', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        weekday: 'narrow',
                      })
                      .replace(/\.\s*\((.)\)$/, ' ($1)')}
                  </p>
                  <p className={styles.hour}>체크아웃 ~ {check_out}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['person-info']}>
            <h3 className={styles.h3}>예약자 정보</h3>
            <div className={styles.person}>
              예약자명 <p>{client_name}</p>
            </div>
            <div className={styles.person}>
              연락처 <p>{client_phone}</p>
            </div>
          </div>
        </div>
        <div className={styles['pay-info']}>
          <h3 className={styles.h3}>결제 정보</h3>

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
        <div className={styles.divider}></div>
        <div>
          <p className={styles.total}>
            총 결제 금액{' '}
            <span className={styles.price}>{fee.toLocaleString()}원 </span>
          </p>
        </div>
        <button className={styles['confirm-btn']} onClick={() => onClose()}>
          확인
        </button>
      </div>
    </>
  );
};

export default ReservationDetailModal;
