'use client';
import Reservation from './Reservation';
import { useQuery } from '@tanstack/react-query';
import { getCompanyReservation } from '../_lib/reservation';
import styles from '../_styles/ReservationList.module.css';
import { useState } from 'react';
import { NAME_REGEX, PHONE_REGEX } from '@/app/_utils/regex';
import { CompanyReservationInfo } from '@/types/reservation';

const ReservationList = ({ companyId }: { companyId: string }) => {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<CompanyReservationInfo[]>();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const {
    isLoading,
    error,
    data: reservations,
  } = useQuery({
    queryKey: ['reservations'],
    queryFn: () => getCompanyReservation(companyId),
  });

  const filterReservation = reservations?.filter(
    (reservation) =>
      new Date(reservation.created_at).toDateString() ===
      new Date().toDateString(),
  );

  const handleSearch = () => {
    console.log('handleSearch실행!');
    setIsSearch(true);
    // console.log('text', text, '정규식 여부', NAME_REGEX.test(text));
    if (NAME_REGEX.test(text)) {
      // 아래 콘솔 코드를 넣으면 또 잘 작동 없애면 잘 작동 x
      console.log('text', text, '정규식 여부22', NAME_REGEX.test(text));
      setResult(
        reservations?.filter((reservation) => reservation.client_name === text),
      );
    }

    if (PHONE_REGEX.test(text)) {
      // -없이 검색한 경우 -추가해서 필터링
      console.log('text', text, '폰 정규식 여부33', PHONE_REGEX.test(text));
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!reservations?.length) return <p>예약 현황이 없습니다.</p>;

  return (
    <>
      <h3 className={styles.h3}>오늘의 예약 현황</h3>
      <div className={styles.div}>
        <p>예약일시</p>
        <p>예약자명</p>
        <p>캠핑명</p>
        <p>캠핑존</p>
        <p>인원</p>
        <p>예약자 연락처</p>
      </div>
      {!filterReservation?.length && <p>오늘 예약 현황이 없습니다.</p>}
      <ul>
        {filterReservation?.map((reservation) => (
          <Reservation key={reservation.id} reservation={reservation} />
        ))}
      </ul>
      <h3 className={styles.h3}>전체 예약 현황</h3>
      <input
        type='text'
        value={text}
        placeholder='예약자명, 연락처를 검색하세요.'
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
      <button onClick={handleUndo}>취소</button>

      <div className={styles.div}>
        <p>예약일시</p>
        <p>예약자명</p>
        <p>캠핑명</p>
        <p>캠핑존</p>
        <p>인원</p>
        <p>예약자 연락처</p>
      </div>
      <ul>
        {/* {!isSearch && */}
        {!isSearch &&
          reservations?.map((reservation) => (
            <Reservation key={reservation.id} reservation={reservation} />
          ))}
      </ul>
      {/* {isSearch && */}
      {isSearch &&
        result?.map((s) => <Reservation key={s.id} reservation={s} />)}
      {isSearch && !result?.length && <p>일치하는 예약 정보가 없습니다.</p>}
    </>
  );
};

export default ReservationList;
