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
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<boolean>(false);
  const handleCopy = (address: string) => {
    copy(address);
    toast.success('클립보드에 복사되었습니다');
  };
  return (
    <>
      {reservations &&
        reservations?.map((reservation) => {
          const { id, created_at, check_in_date, check_out_date } = reservation;
          const { name: campAreaName } = reservation.camp_area!;
          const {
            id: campId,
            name: campName,
            address,
          } = reservation.camp_area?.camp!;
          console.log('campId', campId);
          return (
            <li className={styles.li} key={id}>
              <p className={styles.date}>
                {new Date(created_at).toLocaleDateString('ko', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </p>
              <p>{campName}</p>
              <p>{campAreaName}</p>
              <p className={styles.date}>{`${new Date(
                check_in_date,
              ).toLocaleDateString('ko', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
              })} - ${new Date(check_out_date).toLocaleDateString('ko', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
              })}`}</p>
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
                onClick={() => setIsOpenDetailModal(true)}
              >
                상세 보기
              </button>
              {isOpenDetailModal && (
                <ReservationDetailModal
                  reservation={reservation}
                  onClose={() => setIsOpenDetailModal(false)}
                />
              )}
            </li>
          );
        })}
    </>
  );
};

export default ReservationList;
