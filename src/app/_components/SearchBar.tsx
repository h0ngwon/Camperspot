'use client';
import React, { useEffect, useState } from 'react';
import styles from '../_styles/SearchBar.module.css';
import Calendar from './Calendar';
import People from './People';
import formatDate from '../_utils/date';
import Link from 'next/link';
import SearchSvg from '@/components/SearchSvg';
import { useRouter, useSearchParams } from 'next/navigation';
import { formattedDate } from '../camp/_lib/formattedDate';
const SearchBar = () => {
  const [searchedCamp, setSearchedCamp] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  ]);
  const router = useRouter();
  const [count, setCount] = useState<number>(2);
  const [startDate, endDate] = dateRange;
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  const params = useSearchParams();
  useEffect(() => {
    if (
      params.has('keyword') &&
      params.has('check_in') &&
      params.has('check_out') &&
      params.has('people')
    ) {
      const keyword = params.get('keyword');
      const check_in = params.get('check_in');
      const check_out = params.get('check_out');
      const people = Number(params.get('people'));
      setSearchedCamp(keyword ? keyword : '');
      if (check_in && check_out) {
        setDateRange([new Date(check_in), new Date(check_out)]);
      }
      setCount(people);
    } else {
      const date = formattedDate();
      setSearchedCamp('');
      setDateRange([new Date(date[0]), new Date(date[1])]);
      setCount(2);
    }
  }, [params]);
  const onHandleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.trim() === '') return;
    if (e.key === 'Enter') {
      return router.push(
        `/camp/search?keyword=${searchedCamp}&check_in=${start}&check_out=${end}&people=${count}&page=1`,
      );
    }
  };
  return (
    <div className={styles.searchBar}>
      <div className={styles.regionSearchBox}>
        <div className={styles.regionSearch}>
          <label htmlFor='search' className={styles.regionSearchText}>
            캠핑장 검색
          </label>
          <input
            id='search'
            type='text'
            value={searchedCamp}
            onChange={(e) => setSearchedCamp(e.target.value)}
            onKeyUp={(e) => onHandleSearchSubmit(e)}
            className={styles.regionSearchInput}
            placeholder='지역이나 키워드를 검색해 주세요'
          />
        </div>
      </div>
      <div className={styles.regionSearchBox}>
        <label htmlFor='date' className={styles.regionSearchText}>
          날짜
        </label>
        <Calendar dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      <div className={styles.regionSearchBox}>
        <span className={styles.regionSearchText}>인원</span>
        <People count={count} setCount={setCount} />
      </div>
      {searchedCamp ? (
        <Link
          href={`/camp/search?keyword=${searchedCamp}&check_in=${start}&check_out=${end}&people=${count}&page=1`}
          className={`${styles.searchBtn} ${styles.active}`}
        >
          <SearchSvg />
        </Link>
      ) : (
        <div className={`${styles.searchBtn} ${styles.inactive}`}>
          <SearchSvg />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
