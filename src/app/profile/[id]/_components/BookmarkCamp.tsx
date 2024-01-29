'use client';

import { useQuery } from '@tanstack/react-query';
import styles from '../_styles/BookmarkCamp.module.css';
import { useParams } from 'next/navigation';
import { getUserLikeCamp } from '../_lib/getUserLikeCamp';

const BookmarkCamp = () => {
  const params = useParams();
  const {data} = useQuery({queryKey: ['profile', 'bookmark', params.id], queryFn: getUserLikeCamp})
  return (
    <div className={styles.container}>
      <div className={styles['bookmark-header']}>찜 목록</div>
      <div className={styles['bookmark-wrapper']}></div>
    </div>
  );
};

export default BookmarkCamp;