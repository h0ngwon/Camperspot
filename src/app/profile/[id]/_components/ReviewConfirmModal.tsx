import useModalStore from '@/store/modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteUserReview } from '../_lib/review';
import styles from '../_styles/ReviewConfirmModal.module.css';
type Props = {
  reviewId: string;
  userId: string
};

const ReviewConfirmModal = ({ reviewId, userId }: Props) => {
  const { toggleModal } = useModalStore();
  const queryClient = useQueryClient();
  const deleteReview = useMutation({
    mutationFn: deleteUserReview,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('리뷰가 삭제되었습니다!');
    },
  });

  const deleteHandler = () => {
    deleteReview.mutate({reviewId, userId});
    toggleModal();
  }

  return (
    <div className={styles.container}>
      <span className={styles.content}>정말로 삭제하시겠습니까?</span>
      <div className={styles['btns-container']}>
        <button className={styles.confirm} onClick={deleteHandler}>확인</button>
        <button className={styles.cancel} onClick={toggleModal}>취소</button>
      </div>
    </div>
  );
};

export default ReviewConfirmModal;
