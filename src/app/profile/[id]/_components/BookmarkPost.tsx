'use client';
import { useParams } from 'next/navigation';
import styles from '../_styles/BookmarkPost.module.css';
import BookmarkPostContent from './BookmarkPostContent';
import { useQuery } from '@tanstack/react-query';
import { getUserLikePost } from '../_lib/profile';
import { LikePostType } from '@/types/profile';

const BookmarkPost = () => {
  const params = useParams();
  const userId = params.id as string;
  const { data } = useQuery<LikePostType>({
    queryKey: ['mypage', 'bookmark', 'post', userId],
    queryFn: getUserLikePost,
    refetchOnWindowFocus: true
  });
  return (
    <div className={styles.container}>
      <div className={styles['bookmark-header']}>찜 캠핑톡</div>
      <div className={styles['bookmark-wrapper']}>
        {data?.map((content, idx) => (
          <BookmarkPostContent key={`post_${idx}`} post={content.post} />
        ))}
      </div>
    </div>
  );
};

export default BookmarkPost;
