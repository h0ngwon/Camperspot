import React from 'react';
import styles from '../_styles/PeopleCount.module.css';
import MinusSvg from '../_svg/MinusSvg';
import PlusSvg from '../_svg/PlusSvg';
type Props = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const PeopleCount = ({ count, setCount }: Props) => {
  const onHandleClickInside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
  };
  return (
    <div
      className={styles.countControlBox}
      onClick={(e) => onHandleClickInside(e)}
    >
      <div>
        <div className={styles.boxLeft}>
          <p>인원</p>
          <p>유아 및 아동도 포함해주세요</p>
        </div>
        <div className={styles.boxRight}>
          <div className={styles.btnBox}>
            <button
              className={`${styles.countController} ${
                count < 2 && styles.disable
              }`}
              type='button'
              onClick={() => {
                setCount((prev: number) => prev - 1);
              }}
              disabled={count < 2}
            >
              <MinusSvg />
            </button>
          </div>
          {count}
          <div className={styles.btnBox}>
            <button
              className={`${styles.countController} ${
                count > 9 && styles.disable
              }`}
              type='button'
              onClick={() => {
                setCount((prev) => prev + 1);
              }}
              disabled={count > 9}
            >
              <PlusSvg />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleCount;
