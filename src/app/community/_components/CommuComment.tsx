import CommuComments from './CommuComments';
import CommuCreateComment from './CommuCreateComment';

import styles from '../_styles/CommuDetailModal.module.css';

type Props = {
  postId: string;
  userId: string;
};

export default function CommuComment({ postId, userId }: Props) {
  return (
    <div className={styles.commentWrap}>
      <CommuComments postId={postId} />
      <CommuCreateComment postId={postId} userId={userId} />
    </div>
  );
}
