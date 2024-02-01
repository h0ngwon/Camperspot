'use client';

import React, { Dispatch, SetStateAction } from 'react';
import styles from '../_styles/Rating.module.css';

type Props = {
  ratingIndex: number;
  setRatingIndex: Dispatch<SetStateAction<number>>;
};

const Rating = ({ ratingIndex, setRatingIndex }: Props) => {
  const arrayIndex = [1, 2, 3, 4, 5];
  return (
    <div className={styles.container}>
      <div className={styles['stars-container']}>
        <fieldset className={styles['stars-wrapper']}>
          <input
            type='radio'
            name='rating'
            id={`${arrayIndex[4]}`}
          ></input>
          <label
            htmlFor={`${arrayIndex[4]}`}
            className={styles['stars']}
            onClick={() => setRatingIndex(arrayIndex[4])}
          >
            ⭐️
          </label>
          <input type='radio' name='rating' id={`${arrayIndex[3]}`}></input>
          <label
            htmlFor={`${arrayIndex[3]}`}
            className={styles['stars']}
            onClick={() => setRatingIndex(arrayIndex[3])}
          >
            ⭐️
          </label>
          <input type='radio' name='rating' id={`${arrayIndex[2]}`}></input>
          <label
            htmlFor={`${arrayIndex[2]}`}
            className={styles['stars']}
            onClick={() => setRatingIndex(arrayIndex[2])}
          >
            ⭐️
          </label>
          <input type='radio' name='rating' id={`${arrayIndex[1]}`}></input>
          <label
            htmlFor={`${arrayIndex[1]}`}
            className={styles['stars']}
            onClick={() => setRatingIndex(arrayIndex[1])}
          >
            ⭐️
          </label>
          <input type='radio' name='rating' id={`${arrayIndex[0]}`}></input>
          <label
            htmlFor={`${arrayIndex[0]}`}
            className={styles['stars']}
            onClick={() => setRatingIndex(arrayIndex[0])}
          >
            ⭐️
          </label>
        </fieldset>
      </div>
      <div className={styles.rating}>{ratingIndex}</div>
    </div>
  );
};

export default Rating;
