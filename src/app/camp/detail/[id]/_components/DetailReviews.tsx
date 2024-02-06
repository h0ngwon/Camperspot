import DetailReveiwStar from './DetailReveiwStar';

import styles from '../_styles/DetailReview.module.css';
import Image from 'next/image';

type Props = {
  review:
    | {
        id: string;
        rating: number;
        camp_id: string;
        content: string;
        user_id: string;
        created_at: string;
        user: {
          nickname: string;
          profile_url: string | null;
        } | null;
      }[]
    | undefined;
};

export default function DetailReviews({ review }: Props) {
  const formatCreatedAt = (createdAt: string): string => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  return (
    <ul className={styles.wrap}>
      {review?.map((item) => (
        <li key={item?.id}>
          <div className={styles.con}>
            {item?.user?.profile_url && (
              <Image
                src={item.user.profile_url}
                alt='유저'
                width={24}
                height={24}
              />
            )}
            <span>{item?.user?.nickname}</span>
          </div>
          <div className={styles.commentWrap}>
            <DetailReveiwStar rating={item?.rating || 0} />
            <div className={styles.content}>
              <p>{item?.content}</p>
            </div>
            <span>{formatCreatedAt(item?.created_at)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
