'use client';
import { supabase } from '@/app/api/db';
import styles from '../_styles/ReservationModal.module.css';
import ReservationForm from './ReservationForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReservationInfo } from '@/types/reservation';

const ReservationModal = () => {
  const [reservation, setReservation] = useState<ReservationInfo>();
  const router = useRouter();
  useEffect(() => {
    const fetchReservation = async () => {
      const { data, error } = await supabase
        .from('reservation')
        .select(
          `people,check_in_date,check_out_date,fee,camp_area(id,name,camp(name))`,
        );
      setReservation(data!);
    };
    fetchReservation();
  }, []);
  if (!reservation) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <button onClick={() => router.back()} className={styles.closeBtn}>
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
        <h1 className={styles.h1}>예약 및 결제</h1>
        <h3 className={styles.h3}>예약 정보</h3>
        <p>
          캠핑장 이름 <span>{reservation[0].camp_area?.camp?.name}</span>
        </p>
        <p>
          객실 <span>{reservation[0].camp_area?.name}</span>
        </p>
        <p>
          인원 <span> {reservation[0].people}</span>
        </p>
        <div>
          <p>
            일시
            <span>
              {new Date(reservation[0].check_in_date).toLocaleDateString('ko', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
              ~ 체크아웃{' '}
              {new Date(reservation[0].check_out_date).toLocaleDateString(
                'ko',
                {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                },
              )}
            </span>
          </p>
          <p>
            예약 금액 <span>{reservation[0].fee}원</span>
          </p>
          <p>
            총 결제 금액 <span>{reservation[0].fee}원</span>
          </p>
        </div>
        <ReservationForm reservation={reservation} />
      </div>
    </div>
  );
};

export default ReservationModal;
