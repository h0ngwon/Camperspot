'use client';
import { UserReservationInfo } from '@/types/reservation';
import styles from '../_styles/ReservationList.module.css';
import copy from 'clipboard-copy';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ReservationDetailModal from './ReservationDetailModal';
import { useRouter } from 'next/navigation';

const ReservationList = ({
  reservations,
  isPlanned,
}: {
  reservations: UserReservationInfo[];
  isPlanned: boolean;
}) => {
  const router = useRouter();
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<number | null>();
  const handleCopy = (address: string) => {
    copy(address);
    toast.success('클립보드에 복사되었습니다');
  };
  return (
    <>
      {reservations &&
        reservations?.map((reservation, idx) => {
          const { id, created_at, check_in_date, check_out_date } = reservation;
          console.log('하나의 예약', reservation);
          const { name: campAreaName } = reservation.camp_area!;
          const {
            id: campId,
            name: campName,
            address,
          } = reservation.camp_area?.camp!;
          return (
            <li className={styles.li} key={id}>
              <div className={styles.div}>
                <p className={styles.created}>
                  {new Date(created_at).toLocaleDateString('ko', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </p>
                <p>{campName}</p>
                <p>{campAreaName}</p>
                <div className={styles.date}>
                  <p>{`${new Date(check_in_date).toLocaleDateString('ko', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                  })} ~ `}</p>
                  <p>{`${new Date(check_out_date).toLocaleDateString('ko', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                  })} `}</p>
                </div>
              </div>
              {isPlanned && (
                <div className={styles.address}>
                  <p>
                    {address}
                    <span
                      className={styles.copy}
                      onClick={() => handleCopy(address)}
                    >
                      복사하기
                    </span>
                  </p>
                </div>
              )}
              {!isPlanned && (
                <button
                  className={styles.button}
                  onClick={() => router.push(`/camp/detail/${campId}`)}
                >
                  다시 예약
                </button>
              )}
              {!isPlanned && (
                <button className={styles.button}>리뷰 쓰기</button>
              )}
              <button
                className={styles.button}
                onClick={() => setIsOpenDetailModal(idx)}
              >
                상세 보기
              </button>
              {isOpenDetailModal === idx && (
                <ReservationDetailModal
                  reservation={reservations[idx]}
                  onClose={() => setIsOpenDetailModal(null)}
                />
              )}
            </li>
          );
        })}
    </>
  );
};

export default ReservationList;
