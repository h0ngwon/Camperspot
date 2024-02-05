'use client';
import { LikeCampType } from '@/types/profile';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getUserLikeCamp } from '../_lib/profile';
import styles from '../_styles/BookmarkCamp.module.css';
import BookmarkCampContent from './BookmarkCampContent';
import Loading from '@/app/loading';

const BookmarkCamp = () => {
  const params = useParams();
  const userId = params.id as string;
  const { data, isLoading, isError } = useQuery<LikeCampType>({
    queryKey: ['mypage', 'bookmark', 'camp', userId],
    queryFn: getUserLikeCamp,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    <Loading/>
  }

  return (
    <div className={styles.container}>
      <div className={styles['bookmark-header']}>찜 목록</div>
      <div className={styles['bookmark-wrapper']}>
        {data?.map((item) => (
          <BookmarkCampContent key={`camp_${item.camp.id}`} camp={item.camp} />
        ))}
      </div>
    </div>
  );
};

export default BookmarkCamp;
