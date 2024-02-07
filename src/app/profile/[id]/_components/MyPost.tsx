'use client';
import Loading from '@/app/loading';
import { useMyPostQuery } from '@/hooks/useMyPostQuery';
import styles from '../_styles/MyPost.module.css';
import MyPostContent from './MyPostContent';

const MyPost = () => {
  const { myPost, isMyPostLoading } = useMyPostQuery();

  if (isMyPostLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles['bookmark-header']}>나의 캠핑톡</div>
      <div className={styles['bookmark-wrapper']}>
        {myPost?.map((content, idx) => (
          <MyPostContent key={`post_${idx}`} post={content} />
        ))}
      </div>
    </div>
  );
};

export default MyPost;
