'use client';
import styles from '../_styles/Reservation.module.css';
import type { CompanyReservationInfo } from '@/types/reservation';
import ConfirmModal from '@/app/camp/detail/[id]/_components/ConfirmModal';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCompanyReservation } from '../_lib/reservation';
import useModalStore from '@/store/modal';
import { ReservationDetail } from '@/app/profile/[id]/_components/ReservationDetail';
import ReservationDetailModal from '@/app/profile/[id]/_components/ReservationDetailModal';
import ModalPortal from '@/components/ModalPortal';
import Modal from '@/components/Modal';

const Reservation = ({
  reservation,
}: {
  reservation: CompanyReservationInfo;
}) => {
  const queryClient = useQueryClient();
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [isShowDetail, setIsShowDetail] = useState<string | null>();
  const { show, toggleModal } = useModalStore();
  const currentDate = new Date();
  const {
    id,
    created_at,
    client_name,
    client_phone,
    check_in_date,
    check_out_date,
    people,
  } = reservation;
  const { name: camp_name } = reservation.camp_area?.camp!;
  const { name: camp_area_name } = reservation.camp_area!;
  const { id: companyId } = reservation.camp_area?.camp?.company_user!;

  const deleteReservationMutaion = useMutation({
    mutationFn: () => deleteCompanyReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['company', 'reservation', companyId],
      });
    },
  });
  const handleDelete = () => {
    deleteReservationMutaion.mutate();
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
        {/* <td className={styles.td}>
          {new Date(created_at)
            .toLocaleString('ko', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .replace(/\.$/, '')}
        </td> */}
        <td className={styles.td}>
          {check_in_date}/{check_out_date}{' '}
        </td>
        <td className={styles.td}>{client_name}</td>
        <td className={styles.td}>
          {camp_name}/{camp_area_name}
        </td>
        <td className={styles.td}>{people}명</td>
        <td className={styles.td}>
          <div className={styles.phone}>
            {client_phone}
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
      <ConfirmModal
        title='예약을 취소하시겠습니까?'
        open={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        onConfirm={handleDelete}
      />
      {show && isShowDetail === id && (
        <ModalPortal>
          <Modal>
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
