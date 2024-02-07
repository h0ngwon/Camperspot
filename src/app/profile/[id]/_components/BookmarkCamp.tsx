'use client';
import Loading from '@/app/loading';
import { useLikeCampQuery } from '@/hooks/useLikeCampQuery';
import styles from '../_styles/BookmarkCamp.module.css';
import BookmarkCampContent from './BookmarkCampContent';

const BookmarkCamp = () => {
  const { likeCampData, isLikeCampLoading } = useLikeCampQuery();

  if (isLikeCampLoading) {
    <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles['bookmark-header']}>찜 목록</div>
      <div className={styles['bookmark-wrapper']}>
        {likeCampData?.map((item) => (
          <BookmarkCampContent key={`camp_${item.camp.id}`} camp={item.camp} />
        ))}
      </div>
    </div>
  );
};

export default BookmarkCamp;
