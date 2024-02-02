import React from 'react';
import styles from '../_styles/SearchBar.module.css';

type Props = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const People = ({ count, setCount }: Props) => {
  return (
    <div className={styles.people}>
      <button
        type='button'
        className={`${styles.countBtn} ${count < 2 && styles.disable}`}
        onClick={() => {
          setCount((prev: number) => prev - 1);
        }}
        disabled={count < 2}
      >
        -
      </button>
      <div className={styles.count}>
        {count} <span>{count > 9 ? '명 이상' : '명'}</span>
      </div>
      <button
        type='button'
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
        disabled={count > 9}
        className={`${styles.countBtn} ${count > 9 && styles.disable}`}
      >
        +
      </button>
    </div>
  );
};

export default People;
