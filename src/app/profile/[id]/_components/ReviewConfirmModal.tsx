import Loading from '@/app/loading';
import { useReviewQuery } from '@/hooks/useReviewQuery';
import useModalStore from '@/store/modal';
import styles from '../_styles/ReviewConfirmModal.module.css';

type Props = {
  reviewId: string;
  userId: string;
  onClose: () => void;
};

const ReviewConfirmModal = ({ reviewId, userId, onClose }: Props) => {
  const { toggleModal } = useModalStore();
  const { reviewMutate, isReviewPending } = useReviewQuery();

  const deleteHandler = () => {
    reviewMutate({ reviewId, userId });
    toggleModal();
  };

  if (isReviewPending) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <span className={styles.content}>정말로 삭제하시겠습니까?</span>
      <div className={styles['btns-container']}>
        <button className={styles.confirm} onClick={deleteHandler}>
          확인
        </button>
        <button className={styles.cancel} onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  );
};

export default ReviewConfirmModal;
