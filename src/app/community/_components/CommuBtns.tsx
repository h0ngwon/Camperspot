'use client';

import React, { useEffect, useState } from 'react';
import CommuLikeBtn from './CommuLikeBtn';

import styles from '../_styles/CommuBtn.module.css';
import CommentSvg from '../_svg/CommentSvg';
import CommuDetailModal from './CommuDetailModal';

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
};

const CommuBtns = ({ data, userId }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onClose = () => {
    setModalVisible(false);
  };

  const toggleBodyOverflow = (overflow: 'hidden' | 'auto') => {
    document.body.style.overflow = overflow;
  };

  useEffect(() => {
    if (isModalVisible) {
      toggleBodyOverflow('hidden');
    } else {
      toggleBodyOverflow('auto');
    }
  }, [isModalVisible]);

  return (
    <div className={styles.btns}>
      <CommuLikeBtn userId={userId} postId={data.id} />
      <CommentSvg onClick={toggleModal} />

      {isModalVisible && (
        <CommuDetailModal data={data} userId={userId} onClose={onClose} />
      )}
    </div>
  );
};

export default CommuBtns;
