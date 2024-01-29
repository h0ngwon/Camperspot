'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getUserLikeCamp } from '../_lib/getUserLikeCamp';
import styles from '../_styles/BookmarkCamp.module.css';
import { LikeCampType } from '@/types/profile';

const BookmarkCamp = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['mypage', 'bookmark', params.id as string],
    queryFn: () => getUserLikeCamp(params.id as string)
  });

  if (isLoading) {
    <p>로딩중...</p>;
  }
  console.log('data==============', data);
  return (
    <div className={styles.container}>
      <div className={styles['bookmark-header']}>찜 목록</div>
      <div className={styles['bookmark-wrapper']}></div>
    </div>
  );
};

export default BookmarkCamp;
