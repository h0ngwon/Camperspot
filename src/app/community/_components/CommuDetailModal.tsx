'use client';

import CommuUser from './CommuUsers';
import CommuPhotos from './CommuPhotos';
import CommuBtns from './CommuBtns';
import CommuHashTags from './CommuHashTags';

import styles from '../_styles/CommuDetailModal.module.css';
import { useEffect } from 'react';

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
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // 클릭이 모달 외부에서 발생한 경우 확인
      const modalWrap = document.querySelector(`.${styles.modalWrap}`);
      if (modalWrap && !modalWrap.contains(event.target as Node)) {
        onClose();
      }
    };

    // 컴포넌트가 마운트될 때 이벤트 리스너 추가
    document.addEventListener('mousedown', handleOutsideClick);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div onClick={onClose} className={styles.modalWrap}>
      <div className={styles.modal}>
        <CommuUser user={data.user} data={data} />
        <CommuPhotos photo={data.post_pic} />
        <CommuBtns data={data} userId={userId} />
        <p>{data.content}</p>
        <CommuHashTags hashTag={data.post_hashtag} />
      </div>
    </div>
  );
}
