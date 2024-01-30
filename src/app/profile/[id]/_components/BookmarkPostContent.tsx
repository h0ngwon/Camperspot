'use client';
import Card from '@/components/Card';
import { LikePostType } from '@/types/profile';
import styles from '../_styles/BookmarkPostContent.module.css';

type Props = {
  post: LikePostType[number]['post'];
};

const BookmarkPostContent = ({ post }: Props) => {
  return (
    <Card>
      <div className={styles.container}>{post?.id}</div>
    </Card>
  );
};

export default BookmarkPostContent;
