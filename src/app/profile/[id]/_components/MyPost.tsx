'use client';
import { useParams } from 'next/navigation';
import styles from '../_styles/MyPost.module.css';
import MyPostContent from './MyPostContent';
import { useQuery } from '@tanstack/react-query';
import { getUserPost } from '../_lib/profile';
import { MyPostType } from '@/types/profile';

const MyPost = () => {
  const params = useParams();
  const userId = params.id as string;
  const { data } = useQuery<MyPostType>({
    queryKey: ['mypage', 'bookmark', 'post', userId],
    queryFn: getUserPost,
    refetchOnWindowFocus: true
  });
  return (
    <div className={styles.container}>
      <div className={styles['bookmark-header']}>나의 캠핑톡</div>
      <div className={styles['bookmark-wrapper']}>
        {data?.map((content, idx) => (
          <MyPostContent key={`post_${idx}`} post={content} />
        ))}
      </div>
    </div>
  );
};

export default MyPost;
