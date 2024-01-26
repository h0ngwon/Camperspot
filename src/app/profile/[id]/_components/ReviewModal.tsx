import React from 'react';
import styles from '../_styles/ReviewModal.module.css';
import ModalCloseSvg from '@/components/ModalCloseSvg';

type Props = {
  campId: string;
  onClose: () => void
};

const ReviewModal = ({ campId, onClose }: Props) => {
  return (
    <div className={styles.container}>
      <button className={styles['close-btn']} onClick={() => onClose()}>
          <ModalCloseSvg />
        </button>
        {campId}
    </div>
  );
};

export default ReviewModal;
