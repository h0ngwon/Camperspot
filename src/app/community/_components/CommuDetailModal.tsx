'use client';

import CommuUser from './CommuUsers';
import CommuPhotos from './CommuPhotos';
import CommuBtns from './CommuBtns';
import CommuHashTags from './CommuHashTags';

import styles from '../_styles/CommuDetailModal.module.css';
import { useEffect } from 'react';
import CommuComment from './CommuComment';

type Props = {
  data: {
    content: string;
    created_at: string;
    id: string;
    user_id: string;
    post_pic: { id: string; photo_url: string; post_id: string }[];
    post_hashtag: { id: string; post_id: string; tag: string }[];
    user: { id: string; nickname: string; profile_url: string | null } | null;
  };
  userId: string;
  onClose: () => void;
};

export default function CommuDetailModal({ data, userId, onClose }: Props) {
  useEffect(() => {}, [onClose]);

  return (
    <>
      <div onClick={onClose} className={styles.modalbg}></div>
      <div className={styles.modal}>
        <div>
          <CommuUser user={data.user} data={data} />
          <CommuPhotos photo={data.post_pic} />
          <CommuBtns data={data} userId={userId} />
          <p>{data.content}</p>
          <CommuHashTags hashTag={data.post_hashtag} />
        </div>
        <CommuComment />
      </div>
    </>
  );
}
