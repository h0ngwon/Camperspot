import React from 'react';
import CommuLikeBtn from './CommuLikeBtn';

import styles from '../_styles/CommuBtn.module.css';
import CommentSvg from '../_svg/CommentSvg';

type Props = {
  postId: string;
  userId: string;
};

export default function CommuBtns({ userId, postId }: Props) {
  return (
    <div className={styles.btns}>
      <CommuLikeBtn userId={userId} postId={postId} />
      <CommentSvg />
    </div>
  );
}
