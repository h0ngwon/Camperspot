import styles from '../_styles/ConfirmModal.module.css';
type Props = { title: string; onClose: () => void; onCancel: () => void };

const ConfirmModal = ({ title, onClose, onCancel }: Props) => {
  return (
    <div className={styles.div}>
      <h2 className={styles.h2}>{title}</h2>
      <div className={styles.buttons}>
        <button className={styles['no-cancel-btn']} onClick={() => onClose()}>
          아니요
        </button>
        <button className={styles['cancel-btn']} onClick={() => onCancel()}>
          취소하기
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
