'use client';
import React from 'react';
import styles from '../_styles/SearchBar.module.css';
import SearchSvg from '@/asset/SearchSvg';
import Calendar from './Calendar';
const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <input type='text' className={styles.regionSearchInput} />
      <Calendar />
      <input type='text' className={styles.people} />
      <button className={styles.searchBtn}>
        <SearchSvg />
      </button>
    </div>
  );
};

export default SearchBar;
