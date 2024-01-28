'use client';
import { ReviewInfo, UserReservationInfo } from '@/types/reservation';
import styles from '../_styles/ReservationList.module.css';
import copy from 'clipboard-copy';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ReservationDetailModal from './ReservationDetailModal';
import { useRouter } from 'next/navigation';
import ModalPortal from '@/components/ModalPortal';
import Modal from '@/components/Modal';
import useModalStore from '@/store/modal';
import ReviewModal from './ReviewModal';

const ReservationList = ({
  reservations,
  isPlanned,
}: {
  reservations: UserReservationInfo[];
  isPlanned: boolean;
}) => {
  const router = useRouter();
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<number | null>();
  const [isOpenReviewModal, setIsOpenReviewModal] = useState<number | null>();
  const { show, toggleModal } = useModalStore();
  

  const handleCopy = (address: string) => {
    copy(address);
    toast.success('클립보드에 복사되었습니다');
  };

  const handleOpenModal = (index: number) => {
    setIsOpenDetailModal(index);
    toggleModal();
  };
  const handleCloseModal = () => {
    toggleModal();
    setIsOpenDetailModal(null);
  };

  const handleOpenReviewModal = (index: number) => {
    setIsOpenReviewModal(index);
    toggleModal();
  };

  const handleCloseReviewModal = () => {
    toggleModal();
    setIsOpenReviewModal(null);
  };

  return (
    <>
      {reservations &&
        reservations?.map((reservation, idx) => {
          const { id, created_at, check_in_date, check_out_date } = reservation;
          const { name: campAreaName, photo_url } = reservation.camp_area!;
          const {
            id: campId,
            name: campName,
            address,
          } = reservation.camp_area?.camp!;
          const reservationInfo: ReviewInfo = {
            campId,
            campName,
            campAreaName,
            check_in_date,
            check_out_date,
            photo_url
          }
          return (
            <tr key={id}>
              <td className={styles.td} style={{ width: '100px' }}>
                {new Date(created_at).toLocaleDateString('ko', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </td>
              <td className={styles.td} style={{ width: '100px' }}>
                {campName}
              </td>
              <td className={styles.td} style={{ width: '100px' }}>
                {campAreaName}
              </td>
              <td className={styles.td}>
                <div className={styles.date}>
                  <p>
                    {' '}
                    {`${new Date(check_in_date).toLocaleDateString('ko', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                    })} ~ `}
                  </p>
                  <p>{`${new Date(check_out_date).toLocaleDateString('ko', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                  })} `}</p>
                </div>
              </td>
              {!isPlanned && (
                <td className={styles.td}>
                  <div className={styles.div}>
                    <button
                      className={styles.button}
                      onClick={() => router.push(`/camp/detail/${campId}`)}
                    >
                      다시 예약
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => handleOpenReviewModal(idx)}
                    >
                      리뷰 쓰기
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => handleOpenModal(idx)}
                    >
                      상세 보기
                    </button>
                  </div>
                  {show && isOpenReviewModal=== idx ? (
                    <ModalPortal>
                      <Modal>
                        <ReviewModal
                          reservationInfo={reservationInfo}
                          onClose={handleCloseReviewModal}
                        />
                      </Modal>
                    </ModalPortal>
                  ) : (
                    ''
                  )}
                </td>
              )}
              {isPlanned && (
                <td className={styles.td}>
                  <div className={styles.address}>
                    {address}
                    <div className={styles.div}>
                      <span
                        className={styles.copy}
                        onClick={() => handleCopy(address)}
                      >
                        {' '}
                        복사하기
                      </span>
                      <button
                        className={styles.button}
                        onClick={() => handleOpenModal(idx)}
                      >
                        상세 보기
                      </button>
                    </div>
                  </div>
                </td>
              )}
              {isOpenDetailModal === idx ? (
                <ModalPortal>
                  <Modal customWidth={450} customHeight={650}>
                    <ReservationDetailModal
                      reservation={reservations[idx]}
                      onClose={handleCloseModal}
                    />
                  </Modal>
                </ModalPortal>
              ) : (
                ''
              )}
            </tr>
          );
        })}
    </>
  );
};

export default ReservationList;
