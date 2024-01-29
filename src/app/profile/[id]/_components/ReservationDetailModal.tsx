'use client';
import { UserReservationInfo } from '@/types/reservation';
import styles from '../_styles/ReservationDetailModal.module.css';
import ReservationArrowSvg from '@/components/ReservationArrowSvg';
import useModalStore from '@/store/modal';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { deleteUserReservation } from '../_lib/deleteUserReservation';
import CompleteModal from './CompleteModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ReservationDetailModal = ({
  reservation,
}: {
  reservation: UserReservationInfo;
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
  const { toggleModal } = useModalStore();
  const today = new Date().setHours(0, 0, 0, 0);
  const [isOpenConfirm, setIsOpenComfirm] = useState<boolean>(false);
  const [isOpenComplete, setIsOpenComplete] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const deleteReservationMutaion = useMutation({
    mutationFn: () => deleteUserReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mypage', 'profile', 'reservation'],
      });
    },
  });
  const handleDelete = () => {
    deleteReservationMutaion.mutate();
    toggleModal();
  };
  console.log('today', today);
  return (
    <>
      <p className={styles.info}>예약 상세 보기</p>
      <div className={styles.modal}>
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

        {new Date(check_in_date).getTime() >= today ? (
          <div className={styles.buttons}>
            <button
              className={styles['cancel-btn']}
              onClick={() => setIsOpenComfirm(true)}
            >
              취소
            </button>
            <button className={styles['confirm-btn']} onClick={toggleModal}>
              확인
            </button>
          </div>
        ) : (
          <button className={styles['only-confirm-btn']} onClick={toggleModal}>
            확인
          </button>
        )}
        {isOpenConfirm && (
          <ConfirmModal
            title={'예약을 취소하시겠습니까?'}
            onCancel={() => {
              setIsOpenComfirm(false);
              setIsOpenComplete(true);
            }}
            onClose={() => setIsOpenComfirm(false)}
          />
        )}
        {isOpenComplete && (
          <CompleteModal
            title={'예약이 취소되었습니다'}
            onClose={handleDelete}
          />
        )}
      </div>
    </>
  );
};

export default ReservationDetailModal;
