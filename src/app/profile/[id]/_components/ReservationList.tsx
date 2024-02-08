'use client';
import Modal from '@/components/Modal';
import ModalPortal from '@/components/ModalPortal';
import ReservationArrowSvg from '@/components/ReservationArrowSvg';
import useModalStore from '@/store/modal';
import { ReviewInfo, UserReservationInfo } from '@/types/reservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import copy from 'clipboard-copy';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteUserReservation } from '../_lib/deleteUserReservation';
import styles from '../_styles/ReservationList.module.css';
import CoordiateSvg from '../_svg/CoordiateSvg';
import ReservationCancelCompleteModal from './ReservationCancelCompleteModal';
import ReservationCancelConfirmModal from './ReservationCancelConfirmModal';
import ReservationDetailModal from './ReservationDetailModal';
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
  const [isOpenReservationConfirm, setIsOpenReservationComfirm] = useState<
    string | null
  >();
  const [isOpenReservationComplete, setIsOpenReservationComplete] = useState<
    string | null
  >();
  const queryClient = useQueryClient();
  const deleteReservationMutaion = useMutation({
    mutationFn: () => deleteUserReservation(isOpenReservationComplete!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mypage', 'profile', 'reservation'],
      });
    },
  });
  const handleDelete = () => {
    deleteReservationMutaion.mutate();
    // setIsOpenComplete(null);
  };
  const { show, toggleModal } = useModalStore();

  const handleCopy = (address: string) => {
    copy(address);
    toast.success('클립보드에 복사되었습니다');
  };

  const handleOpenReservationModal = (index: number) => {
    setIsOpenDetailModal(index);
    toggleModal();
  };
  const handleCloseReservationModal = () => {
    setIsOpenDetailModal(null);
    toggleModal();
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
          const { id, check_in_date, check_out_date } = reservation;
          const { name: campAreaName, photo_url } = reservation.camp_area!;
          const {
            id: campId,
            name: campName,
            check_in,
            check_out,
            address,
          } = reservation.camp_area?.camp!;
          const reservationInfo: ReviewInfo = {
            campId,
            campName,
            campAreaName,
            check_in_date,
            check_out_date,
            photo_url,
          };
          return (
            <React.Fragment key={id}>
              <li className={styles.li}>
                <Link href={`/camp/detail/${campId}`}>
                  <Image
                    src={photo_url}
                    width={120}
                    height={120}
                    alt='camping'
                    priority
                    style={{ borderRadius: '8px' }}
                  />
                </Link>
                <div className={styles['camp-info']}>
                  <p className={styles['camp-name']}>
                    {campName}{' '}
                    <span className={styles['camp-area-name']}>
                      {campAreaName}
                    </span>
                  </p>
                  {isPlanned && (
                    <div className={styles['address-info']}>
                      <CoordiateSvg />
                      <p className={styles.address}>{address}</p>
                      <div className={styles.div}>
                        <span
                          className={styles.copy}
                          onClick={() => handleCopy(address)}
                        >
                          {' '}
                          복사하기
                        </span>
                      </div>
                    </div>
                  )}
                  <div className={styles.div}>
                    {!isPlanned && (
                      <button
                        className={styles.button}
                        onClick={() => handleOpenReviewModal(idx)}
                      >
                        리뷰작성
                      </button>
                    )}
                    <button
                      className={`${styles.button} ${
                        isPlanned ? styles.highlight : ''
                      }`}
                      onClick={() => handleOpenReservationModal(idx)}
                    >
                      상세보기
                    </button>
                    {isPlanned && (
                      <button
                        className={styles.button}
                        onClick={() => setIsOpenReservationComfirm(id)}
                      >
                        취소하기
                      </button>
                    )}
                    {!isPlanned && (
                      <button
                        className={styles.button}
                        onClick={() => router.push(`/camp/detail/${campId}`)}
                      >
                        다시예약
                      </button>
                    )}
                  </div>
                </div>

                {!isPlanned && (
                  <p className={styles['use-complete']}>이용 완료</p>
                )}
                {isPlanned && (
                  <div className={styles.dates}>
                    <div>
                      <p className={styles.date}>
                        {new Date(check_in_date)
                          .toLocaleString('ko', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            weekday: 'narrow',
                          })
                          .replace(/\.\s*\((.)\)$/, ' ($1)')}
                      </p>
                      <p>체크인 {check_in} ~ </p>
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
                      <p>체크아웃 ~ {check_out} </p>
                    </div>
                  </div>
                )}

                {show && isOpenReviewModal === idx ? (
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
              </li>
              {show && isOpenDetailModal === idx ? (
                <ModalPortal>
                  <Modal customWidth={450} customHeight={680}>
                    <ReservationDetailModal
                      reservation={reservations[idx]}
                      onClose={handleCloseReservationModal}
                    />
                  </Modal>
                </ModalPortal>
              ) : (
                ''
              )}
              {isOpenReservationConfirm == id && (
                <ReservationCancelConfirmModal
                  onCancel={() => {
                    setIsOpenReservationComfirm(null);
                    setIsOpenReservationComplete(id);
                  }}
                  onClose={() => setIsOpenReservationComfirm(null)}
                />
              )}
              {isOpenReservationComplete == id && (
                <ReservationCancelCompleteModal onClose={handleDelete} />
              )}
            </React.Fragment>
          );
        })}
    </>
  );
};

export default ReservationList;
