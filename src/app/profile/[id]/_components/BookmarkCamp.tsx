'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getUserLikeCamp } from '../_lib/getUserLikeCamp';
import styles from '../_styles/BookmarkCamp.module.css';
import BookmarkCampContent from './BookmarkCampContent';

const BookmarkCamp = () => {
  const params = useParams();
  const userId = params.id as string;
  const { data, isLoading } = useQuery({
    queryKey: ['mypage', 'bookmark', userId],
    queryFn: getUserLikeCamp,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    <p>로딩중...</p>;
  }
  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles['bookmark-header']}>찜 목록</div>
      <div className={styles['bookmark-wrapper']}>
        {data?.map((content) => (
          <BookmarkCampContent key={content.camp.id} camp={content.camp} />
        ))}
      </div>
    </div>
  );
};

export default BookmarkCamp;
