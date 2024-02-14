import ModalCloseSvg from '@/components/ModalCloseSvg';
import styles from '../_styles/ReservationCancelConfirmModal.module.css';

type Props = {
  onClose: () => void;
  onCancel: () => void;
  customLeft?: number;
  customTop?: number;
};

const ConfirmModal = ({ onClose, onCancel, customLeft, customTop }: Props) => {
  return (
    <div
      className={styles.div}
      style={
        customLeft && customTop
          ? { left: `${customLeft}%`, top: `${customTop}%` }
          : undefined
      }
    >
      <button className={styles['close-btn']} onClick={() => onClose()}>
        <ModalCloseSvg />
      </button>
      <h2 className={styles.h2}>예약을 취소하시겠습니까?</h2>
      <div className={styles.buttons}>
        <button className={styles['cancel-btn']} onClick={() => onCancel()}>
          취소하기
        </button>
        <button className={styles['no-cancel-btn']} onClick={() => onClose()}>
          아니요
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
