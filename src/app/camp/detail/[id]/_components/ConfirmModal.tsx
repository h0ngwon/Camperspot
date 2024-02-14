import ModalCloseSvg from '@/components/ModalCloseSvg';
import styles from '../_styles/ConfirmModal.module.css';

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({ title, open, onClose, onConfirm }: Props) => {
  if (!open) return <></>;
  const handleConfirm = () => {
    onClose();
    onConfirm();
  };

  return (
    <div className={styles.div}>
      <button className={styles['close-btn']} onClick={() => onClose()}>
        <ModalCloseSvg />
      </button>
      <h2 className={styles.h2}>{title}</h2>
      <div className={styles.buttons}>
        <button className={styles['confirm-btn']} onClick={handleConfirm}>
          확인
        </button>
        <button className={styles['cancel-btn']} onClick={() => onClose()}>
          취소
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
