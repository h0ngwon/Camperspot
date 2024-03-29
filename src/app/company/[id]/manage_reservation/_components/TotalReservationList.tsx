'use client';
import { NAME_REGEX, PHONE_REGEX } from '@/app/_utils/regex';
import Loading from '@/app/loading';
import type { CompanyReservationInfo } from '@/types/reservation';
import { useState } from 'react';
import InputEraserSvg from '../../_svg/InputEraserSvg';
import ResrevationSearchSvg from '../../_svg/ResrevationSearchSvg';
import { getEndDate, getStartDate } from '../_lib/getDateRange';
import styles from '../_styles/TotalReservationList.module.css';
import Calendar from './Calendar';
import NothingReservation from './NothingReservation';
import Reservation from './Reservation';
import { useCompanyUserTotalReservationQuery } from '@/hooks/useCompanyUserTotalReservationQuery';

const TotalReservationList = () => {
  const [startDate, setStartDate] = useState<Date>(getStartDate);
  const [endDate, setEndDate] = useState<Date>(getEndDate);
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<CompanyReservationInfo[]>();
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const { isCompanyUserReservationLoading, reservations } =
    useCompanyUserTotalReservationQuery({ startDate, endDate });

  if (isCompanyUserReservationLoading) return <Loading />;

  const handleSearch = () => {
    if (!text.trim()) return;
    setIsSearch(true);
    if (NAME_REGEX.test(text)) {
      return setResult(
        reservations?.filter((reservation) => reservation.client_name === text),
      );
    }
    if (PHONE_REGEX.test(text)) {
      if (text.length === 10) {
        const formatPhone = text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        return setResult(
          reservations?.filter(
            (reservation) => reservation.client_phone === formatPhone,
          ),
        );
      }

      if (text.length === 11) {
        const formatPhone = text.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        return setResult(
          reservations?.filter(
            (reservation) => reservation.client_phone === formatPhone,
          ),
        );
      } else {
        return setResult(
          reservations?.filter(
            (reservation) => reservation.client_phone === text,
          ),
        );
      }
    } else setResult([]);
  };

  const handleUndo = () => {
    setIsSearch(false);
    setText('');
  };

  return (
    <div>
      <h3 className={styles.h3}>전체 예약 현황</h3>
      <div className={styles['total-menu']}>
        <Calendar
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        <div className={styles['search-container']}>
          <div className={styles['input-wrapper']}>
            <input
              className={styles.input}
              type='text'
              value={text}
              placeholder='예약자명, 연락처를 검색하세요'
              onChange={(e) => setText(e.target.value)}
            />
            {text && (
              <button
                className={styles['eraser-btn']}
                onClick={() => setText('')}
              >
                <InputEraserSvg />
              </button>
            )}
            <div className={styles['search-btn']} onClick={handleSearch}>
              <ResrevationSearchSvg />
            </div>
          </div>

          <button
            className={styles['cancel-btn']}
            onClick={handleUndo}
            disabled={!text}
          >
            취소
          </button>
        </div>
      </div>
      {reservations?.length ? (
        <div
          className={isSearch && !result?.length ? undefined : styles.scroll}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>체크인 날짜</th>
                <th className={styles.th}>예약자명</th>
                <th className={styles.th}>캠핑장/캠핑존</th>
                <th className={styles.th}>인원</th>
                <th className={styles.th}>예약자 연락처</th>
                <th className={styles.th}></th>
              </tr>
            </thead>

            <tbody>
              {isSearch
                ? result?.map((reservation) => (
                    <Reservation
                      key={reservation.id}
                      reservation={reservation}
                    />
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
  );
};

export default TotalReservationList;
