'use client';
import Reservation from './Reservation';
import { useQuery } from '@tanstack/react-query';
import { getCompanyReservation } from '../../_lib/getCompanyUserReservation';
import styles from '../_styles/ReservationList.module.css';
import React, { useState } from 'react';
import { NAME_REGEX, PHONE_REGEX } from '@/app/_utils/regex';
import { CompanyReservationInfo } from '@/types/reservation';
import { useParams } from 'next/navigation';
import Calendar from './Calendar';
import NothingReservation from './NothingReservation';
import ResrevationSearchSvg from '../../_svg/ResrevationSearchSvg';
import { getEndDate } from '../_lib/getEndDate';

const ReservationList = () => {
  const currentDate = new Date();
  const params = useParams();
  const [startDate, setStartDate] = useState<Date>(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
  );
  const [endDate, setEndDate] = useState<Date>(getEndDate);
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<CompanyReservationInfo[]>();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const { isLoading, data: reservations } = useQuery({
    queryKey: [
      'company',
      'reservation',
      params.id,
      startDate.toISOString(),
      endDate.toISOString(),
    ],
    queryFn: () =>
      getCompanyReservation(
        params.id as string,
        startDate.toISOString(),
        endDate.toISOString(),
      ),
  });

  console.log('reservations', reservations);

  if (isLoading) return <p>Loading...</p>;

  const filterReservation = reservations?.filter(
    (reservation) =>
      new Date(reservation.created_at).toDateString() ===
      new Date().toDateString(),
  );

  const handleSearch = () => {
    if (!text.trim()) return;
    setIsSearch(true);
    if (NAME_REGEX.test(text)) {
      setResult(
        reservations?.filter((reservation) => reservation.client_name === text),
      );
    }
    if (PHONE_REGEX.test(text)) {
      if (text.length === 10) {
        const formatPhone = text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        setResult(
          reservations?.filter(
            (reservation) => reservation.client_phone === formatPhone,
          ),
        );
      }

      if (text.length === 11) {
        const formatPhone = text.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        setResult(
          reservations?.filter(
            (reservation) => reservation.client_phone === formatPhone,
          ),
        );
      } else {
        setResult(
          reservations?.filter(
            (reservation) => reservation.client_phone === text,
          ),
        );
      }
    }
  };

  const handleUndo = () => {
    setIsSearch(false);
    setText('');
  };

  return (
    <>
      <div className={styles.div}>
        <h3 className={styles.h3}>오늘의 예약 현황</h3>
        {filterReservation?.length ? (
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>예약일시</th>
                  <th className={styles.th}>예약자명</th>
                  <th className={styles.th}>캠핑장/캠핑존</th>
                  <th className={styles.th}>체크인/아웃</th>
                  <th className={styles.th}>인원</th>
                  <th className={styles.th}>예약자 연락처</th>
                </tr>
              </thead>
              <tbody>
                {filterReservation?.map((reservation) => (
                  <Reservation key={reservation.id} reservation={reservation} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NothingReservation text={'오늘 예약 현황이 없습니다.'} />
        )}
      </div>

      <div>
        <h3 className={styles.h3}>전체 예약 현황</h3>
        <div className={styles['total-menu']}>
          <Calendar
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <div className={styles['input-wrapper']}>
            <input
              className={styles.input}
              type='text'
              value={text}
              placeholder='예약자명, 연락처를 검색하세요.'
              onChange={(e) => setText(e.target.value)}
            />
            <div className={styles['search-btn']} onClick={handleSearch}>
              <ResrevationSearchSvg />
            </div>
          </div>
          {/* 취소 버튼 아이콘으로 변경할 예정 */}
          <button onClick={handleUndo}>취소</button>
        </div>
        {reservations?.length ? (
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>예약일시</th>
                  <th className={styles.th}>예약자명</th>
                  <th className={styles.th}>캠핑장/캠핑존</th>
                  <th className={styles.th}>체크인/아웃</th>
                  <th className={styles.th}>인원</th>
                  <th className={styles.th}>예약자 연락처</th>
                </tr>
              </thead>

              <tbody>
                {isSearch
                  ? result?.map((s) => (
                      <Reservation key={s.id} reservation={s} />
                    ))
                  : reservations?.map((reservation) => (
                      <Reservation
                        key={reservation.id}
                        reservation={reservation}
                      />
                    ))}
              </tbody>
            </table>

            {isSearch && !result?.length && (
              <NothingReservation text={'일치하는 예약 정보가 없습니다.'} />
            )}
          </div>
        ) : (
          <NothingReservation text={'해당되는 예약이 없습니다.'} />
        )}
      </div>
    </>
  );
};

export default ReservationList;
