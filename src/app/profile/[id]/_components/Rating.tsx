import React, { Dispatch, SetStateAction } from 'react';
import styles from '../_styles/Rating.module.css';
type Props = {
  ratingIndex: number;
  setRatingIndex: Dispatch<SetStateAction<number>>;
};

const Rating = ({ ratingIndex, setRatingIndex }: Props) => {
  const arrayIndex = [5, 4, 3, 2, 1];
  return (
    <div className={styles.container}>
      <div className={styles['stars-container']}>
        <fieldset>
          {arrayIndex.map((arrayIndex, idx) => {
            return (
              <>
                <input type='radio' name='rating' id={`${arrayIndex}`}></input>
                <label
                  key={arrayIndex}
                  htmlFor={`${arrayIndex}`}
                  className={styles['stars']}
                  onClick={() => setRatingIndex(arrayIndex)}
                >
                  ⭐️
                </label>
              </>
            );
          })}
        </fieldset>
      </div>
      <div className={styles.rating}>{ratingIndex}</div>
    </div>
  );
};

export default Rating;
