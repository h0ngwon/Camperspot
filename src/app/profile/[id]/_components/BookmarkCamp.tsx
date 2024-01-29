'use client';

import { useQuery } from '@tanstack/react-query';
import styles from '../_styles/BookmarkCamp.module.css';
import { useParams } from 'next/navigation';

const BookmarkCamp = () => {
  const params = useParams();
  const {data} = useQuery({queryKey: ['profile', 'bookmark', ]})
  return (
    <div className={styles.container}>
      <div className={styles['bookmark-header']}>찜 목록</div>
      <div className={styles['bookmark-wrapper']}></div>
    </div>
  );
};

export default BookmarkCamp;
