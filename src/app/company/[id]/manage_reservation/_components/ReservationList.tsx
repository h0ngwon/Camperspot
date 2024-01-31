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

const ReservationList = () => {
  const params = useParams();
  const [startDate, setStartDate] = useState<Date>(new Date(2024, 0, 1));
  const [endDate, setEndDate] = useState<Date>(new Date(2024, 0, 31));
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<CompanyReservationInfo[]>();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  //이제 날짜가 바뀔 때 마다 검색을 해줘야함.
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

  console.log('startDate', startDate);
  console.log('endDate', endDate);

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
      <h3 className={styles.h3}>오늘의 예약 현황</h3>
      {filterReservation?.length ? (
        <>
          <div className={styles.div}>
            <p>예약일시</p>
            <p>예약자명</p>
            <p>캠핑명</p>
            <p>캠핑존</p>
            <p>인원</p>
            <p>예약자 연락처</p>
          </div>
          <ul>
            {filterReservation?.map((reservation) => (
              <Reservation key={reservation.id} reservation={reservation} />
            ))}
          </ul>
        </>
      ) : (
        <NothingReservation text={'오늘 예약 현황이 없습니다.'} />
      )}

      <h3 className={styles.h3}>전체 예약 현황</h3>
      <div className={styles.div2}>
        <Calendar
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <div>
          <input
            className={styles.input}
            type='text'
            value={text}
            placeholder='예약자명, 연락처를 검색하세요.'
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleSearch}>검색</button>
          <button onClick={handleUndo}>취소</button>
        </div>
      </div>
      {reservations?.length ? (
        <>
          <div className={styles.div}>
            <p>예약일시</p>
            <p>예약자명</p>
            <p>캠핑명</p>
            <p>캠핑존</p>
            <p>인원</p>
            <p>예약자 연락처</p>
          </div>
          <ul>
            {isSearch
              ? result?.map((s) => <Reservation key={s.id} reservation={s} />)
              : reservations?.map((reservation) => (
                  <Reservation key={reservation.id} reservation={reservation} />
                ))}
            {isSearch && !result?.length && (
              <p>일치하는 예약 정보가 없습니다. </p>
            )}
          </ul>
        </>
      ) : (
        <NothingReservation text={'해당되는 예약이 없습니다.'} />
      )}
    </>
  );
};

export default ReservationList;
