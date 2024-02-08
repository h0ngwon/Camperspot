'use client';
import Card from '@/components/Card';
import { MyPostType } from '@/types/profile';
import Image from 'next/image';
import icon_comment from '../../../../asset/icon_comment.svg';
import icon_like from '../../../../asset/icon_like.svg';
import styles from '../_styles/MyPostContent.module.css';

type Props = {
  post: MyPostType[number];
};

const MyPostContent = ({ post }: Props) => {
  return (
    <Card large='large'>
      <div className={styles['container']}>
        <div className={styles['img-wrapper']}>
          <Image
            src={post.post_pic[0].photo_url}
            width={381}
            height={381}
            alt='커뮤니티 사진'
            priority
          />
        </div>
        <div className={styles['mics']}>
          <div className={styles['like']}>
            <Image src={icon_like} width={20} height={20} alt='좋아요_아이콘' />
            {post.like.length}
          </div>
          <div className={styles['comment']}>
            <Image
              src={icon_comment}
              width={20}
              height={20}
              alt='댓글_아이콘'
            />
            {post.comment.length}
          </div>
        </div>
        <div className={styles['content']}>{post.content}</div>
        <div className={styles['tags']}>
          {post.post_hashtag.map((item, idx) => {
            return <span key={`post_id_${idx}`}>#{item.tag}</span>;
          })}
        </div>
      </div>
    </Card>
  );
};

export default MyPostContent;
