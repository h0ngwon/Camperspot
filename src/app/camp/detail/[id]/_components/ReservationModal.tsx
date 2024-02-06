'use client';
import { supabase } from '@/app/api/db';
import styles from '../_styles/ReservationModal.module.css';
import ReservationForm from './ReservationForm';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { ReservationInfo } from '@/types/reservation';
import { useRouter } from 'next/navigation';
import useModalStore from '@/store/modal';
import ModalCloseSvg from '@/app/_svg/ModalCloseSvg';

const ReservationModal = () => {
  const [reservation, setReservation] = useState<ReservationInfo>();
  const params = useSearchParams();
  const campAreaId = params.get('id');
  const { toggleModal } = useModalStore();
  const router = useRouter();

  useEffect(() => {
    const fetchReservation = async () => {
      const { data, error } = await supabase
        .from('camp_area')
        .select(`id,max_people,price,name,camp!inner(name,check_in,check_out)`)
        .eq('id', campAreaId!)
        .single();
      setReservation(data!);
    };
    fetchReservation();
  }, [campAreaId]);
  if (!reservation) return null;

  return (
    <>
      <div className={styles.title}>예약 및 결제</div>
      <div className={styles.modal}>
        <button
          className={styles['close-btn']}
          onClick={() => {
            toggleModal();
            router.back();
          }}
        >
          <ModalCloseSvg />
        </button>
        <div className={styles.div}>
          <div className={styles['camp-info']}>
            <h3 className={styles.h3}>예약 정보</h3>
            <p>
              <span className={styles['camping-zone']}>캠핑존 </span>{' '}
              <span className={styles['camp-name']}>
                {reservation.camp?.name}
              </span>
              <span className={styles['camp-area-name']}>
                {reservation.name}
              </span>
            </p>
          </div>
          <ReservationForm reservation={reservation} />
        </div>
      </div>
    </>
  );
};

export default ReservationModal;
