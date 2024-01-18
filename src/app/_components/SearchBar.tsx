'use client';
import React from 'react';
import styles from '../_styles/SearchBar.module.css';
import SearchSvg from '@/asset/SearchSvg';
const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <input type='text' className={styles.regionSearchInput} />
      <input type='text' className={styles.date} />
      <input type='text' className={styles.people} />
      <button className={styles.searchBtn}>
        <SearchSvg />
      </button>
    </div>
  );
};

export default SearchBar;
