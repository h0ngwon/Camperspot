'use client';
import ReservationCancelCompleteModal from '@/app/profile/[id]/_components/ReservationCancelCompleteModal';
import ReservationCancelConfirmModal from '@/app/profile/[id]/_components/ReservationCancelConfirmModal';
import ReservationDetailModal from '@/app/profile/[id]/_components/ReservationDetailModal';
import Modal from '@/components/Modal';
import ModalPortal from '@/components/ModalPortal';
import useModalStore from '@/store/modal';
import type { CompanyReservationInfo } from '@/types/reservation';
import { useState } from 'react';
import styles from '../_styles/Reservation.module.css';
import { useDeleteCompanyUserReservationQuery } from '@/hooks/useDeleteCompanyUserTotalResevationQuery';

const Reservation = ({
  reservation,
}: {
  reservation: CompanyReservationInfo;
}) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [isOpenComplete, setIsOpenComplete] = useState<boolean>(false);
  const [isShowDetail, setIsShowDetail] = useState<string | null>();
  const { show, toggleModal } = useModalStore();
  const currentDate = new Date();
  const {
    id,
    client_name,
    client_phone,
    check_in_date,
    check_out_date,
    people,
  } = reservation;
  const { name: camp_name } = reservation.camp_area?.camp!;
  const { name: camp_area_name } = reservation.camp_area!;
  const { id: companyId } = reservation.camp_area?.camp?.company_user!;
  const { reservationMutate } = useDeleteCompanyUserReservationQuery(id);

  const handleDelete = () => {
    reservationMutate();
    setIsOpenComplete(false);
  };
  const handleOpenModal = () => {
    setIsShowDetail(id);
    toggleModal();
  };

  const handleCloseModal = () => {
    setIsShowDetail(null);
    toggleModal();
  };

  return (
    <>
      <tr className={styles.tr}>
        <td className={styles.td}>
          {new Date(check_in_date)
            .toLocaleString('ko', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .replace(/\.$/, '')}
        </td>
        <td className={styles.td}>{client_name}</td>
        <td className={styles.td}>
          {camp_name}/{camp_area_name}
        </td>
        <td className={styles.td}>{people}명</td>
        <td className={styles.td}>{client_phone}</td>
        <td className={styles.td}>
          <div className={styles.buttons}>
            <button
              className={styles.button}
              disabled={
                new Date(check_in_date).getTime() <=
                new Date(currentDate.setHours(9, 0, 0, 0)).getTime()
              }
              onClick={() => setIsOpenConfirm(true)}
            >
              예약 취소
            </button>
            <button className={styles.button} onClick={handleOpenModal}>
              상세보기
            </button>
          </div>
        </td>
      </tr>
      {isOpenConfirm && (
        <ReservationCancelConfirmModal
          customLeft={40}
          customTop={100}
          onClose={() => setIsOpenConfirm(false)}
          onCancel={() => {
            setIsOpenConfirm(false);
            setIsOpenComplete(true);
          }}
        />
      )}
      {isOpenComplete && (
        <ReservationCancelCompleteModal
          customLeft={40}
          customTop={100}
          onClose={handleDelete}
        />
      )}
      {show && isShowDetail === id && (
        <ModalPortal>
          <Modal customWidth={450} customHeight={680}>
            <ReservationDetailModal
              reservation={reservation}
              onClose={handleCloseModal}
            />
          </Modal>
        </ModalPortal>
      )}
    </>
  );
};

export default Reservation;
