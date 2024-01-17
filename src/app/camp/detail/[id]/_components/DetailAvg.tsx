import React from 'react';
import Star from '../_svg/Star';

import styles from '../_styles/DetailAvg.module.css';

type Props = {
  reviewAvg:
    | {
        camp_id: string;
        content: string;
        created_at: string;
        id: string;
        rating: number;
        title: string;
        user_id: string;
      }[]
    | undefined;
};

export default function DetailAvg({ reviewAvg }: Props) {
  const avg = () => {
    const star = reviewAvg;

    if (star && star.length > 0) {
      let average =
        star.reduce((acc, cur) => acc + cur.rating, 0) / star.length;

      return average;
    } else {
      return 0;
    }
  };

  return (
    <div className={styles.container}>
      <Star />
      {avg().toFixed(1)}
      <span>({reviewAvg?.length})</span>
    </div>
  );
}
