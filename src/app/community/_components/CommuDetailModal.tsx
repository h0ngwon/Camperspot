'use client';

import { useEffect } from 'react';
import CommuBtns from './CommuBtns';
import CommuComment from './CommuComment';
import CommuHashTags from './CommuHashTags';
import CommuPhotos from './CommuPhotos';
import CommuUser from './CommuUsers';

import styles from '../_styles/CommuDetailModal.module.css';

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
        <div className={styles.modalFlex}>
          <div className={styles.modalSlid}>
            <CommuUser user={data.user} data={data} />
            <div className={styles.scroll}>
              <CommuPhotos photo={data.post_pic} />
              <CommuBtns data={data} userId={userId} />
              <p>{data.content}</p>
              <CommuHashTags hashTag={data.post_hashtag} />
            </div>
          </div>
          <CommuComment postId={data.id} userId={userId} />
        </div>
      </div>
    </>
  );
}
