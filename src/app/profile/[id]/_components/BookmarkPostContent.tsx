'use client';
import Card from '@/components/Card';
import { LikePostType } from '@/types/profile';
import styles from '../_styles/BookmarkPostContent.module.css';
import Image from 'next/image';

type Props = {
  post: LikePostType[number]['post'];
};

const BookmarkPostContent = ({ post }: Props) => {
  return (
    <Card>
      <div className={styles.container}>
        <div className={styles['img-wrapper']}>
          <Image
            src={post.post_pic[0].photo_url}
            width={174}
            height={174}
            alt='커뮤니티 사진'
            priority={true}
            quality={100}
          />
        </div>
        <div className={styles['content']}>{post.content}</div>
        <div className={styles['tags']}>
          {post.post_hashtag.map((item, idx) => {
            return <span key={`post_id_${idx}`}>#{item.tag}{' '}</span>;
          })}
        </div>
      </div>
    </Card>
  );
};

export default BookmarkPostContent;
