'use client';
import styles from '../_styles/Reservation.module.css';
import type { CompanyReservationInfo } from '@/types/reservation';
import ConfirmModal from '@/app/camp/detail/[id]/_components/ConfirmModal';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCompanyReservation } from '../_lib/reservation';

const Reservation = ({
  reservation,
}: {
  reservation: CompanyReservationInfo;
}) => {
  const queryClient = useQueryClient();
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const { id, created_at, client_name, client_phone, people } = reservation;
  const { camp_name } = reservation.camp_area?.camp!;
  const { camp_area_name } = reservation.camp_area!;

  const deleteReservationMutaion = useMutation({
    mutationFn: () => deleteCompanyReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
  const handleDelete = () => {
    deleteReservationMutaion.mutate();
  };

  return (
    <>
      <li className={styles.li}>
        <p>
          {new Date(created_at).toLocaleString('ko', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </p>
        <p>{client_name}</p>
        <p>{camp_name}</p>
        <p>{camp_area_name} </p>
        <p>{people}</p>
        <p>{client_phone}</p>
        <button onClick={() => setIsOpenConfirm(true)}>예약 취소</button>
        <ConfirmModal
          title='예약을 취소하시겠습니까?'
          open={isOpenConfirm}
          onClose={() => setIsOpenConfirm(false)}
          onConfirm={handleDelete}
        />
      </li>
    </>
  );
};

export default Reservation;
