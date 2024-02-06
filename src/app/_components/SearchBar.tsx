'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../_styles/SearchBar.module.css';
import Calendar from './Calendar';
import formatDate from '../_utils/date';
import SearchSvg from '@/components/SearchSvg';
import { useRouter, useSearchParams } from 'next/navigation';
import { formattedDate } from '../camp/_lib/formattedDate';
import { toast } from 'react-toastify';
import PeopleCount from './PeopleCount';
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
  const [isOpen, setIsOpen] = useState(false);
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

  const onHandleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchedCamp === '') return toast.error('키워드를 입력해 주세요.');
    if (!dateRange[1]) return toast.error('날짜를 정확히 입력해 주세요.');
    return router.push(
      `/camp/search?keyword=${searchedCamp}&check_in=${start}&check_out=${end}&people=${count}&page=1`,
    );
  };
  const onHandlekeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.trim();
    setSearchedCamp(keyword);
  };
  const onHandlePeoPleController = () => {
    setIsOpen((prev) => !prev);
  };
  //
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target as Node)
    ) {
      setTimeout(() => {
        setIsOpen(false);
      }, 0);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <form
      className={styles.searchBar}
      onSubmit={(e) => onHandleSearchSubmit(e)}
    >
      <div className={styles.searchBox}>
        <div className={styles.regionSearch}>
          <label htmlFor='search' className={styles.regionSearchText}>
            캠핑장 검색
          </label>
          <input
            id='search'
            type='text'
            value={searchedCamp}
            onChange={(e) => onHandlekeywordChange(e)}
            autoComplete='off'
            className={styles.regionSearchInput}
            placeholder='지역이나 키워드를 검색해 주세요'
          />
        </div>
      </div>
      <div className={styles.searchBox}>
        <label htmlFor='date' className={styles.regionSearchText}>
          날짜
        </label>
        <Calendar dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      <div className={styles.searchBox}>
        <div onClick={onHandlePeoPleController} ref={dropDownRef}>
          <label htmlFor='people' className={styles.regionSearchText}>
            인원
          </label>
          <div>
            <span>게스트</span> {count}
            <span>{count > 9 ? '명 이상' : '명'}</span>
          </div>
        </div>
        {isOpen && <PeopleCount count={count} setCount={setCount} />}
      </div>
      <button type='submit' className={`${styles.searchBtn} ${styles.active}`}>
        <SearchSvg />
      </button>
    </form>
  );
};

export default SearchBar;
