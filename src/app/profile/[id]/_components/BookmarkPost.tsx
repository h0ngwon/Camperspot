'use client';
import { useParams } from 'next/navigation';
import styles from '../_styles/BookmarkPost.module.css';
import BookmarkPostContent from './BookmarkPostContent';
import { useQuery } from '@tanstack/react-query';

const BookmarkPost = () => {
  const params = useParams();
  const userId = params.id as string;
  const {data} = useQuery({queryKey: ['mypage','community', userId], queryFn: () => {}})
  return (
    <div className={styles.container}>
      <div className={styles['bookmark-header']}>찜 캠핑톡</div>
      <div className={styles['bookmark-wrapper']}>
        <BookmarkPostContent />
      </div>
    </div>
  );
};

export default BookmarkPost;
