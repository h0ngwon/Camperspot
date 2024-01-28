import Button from './Button';
import styles from '../_styles/ConfirmModal.module.css';

type Props = {
  title: string;
  open: boolean;
  onClose: Function;
  onConfirm: Function;
};
const ConfirmModal = ({ title, open, onClose, onConfirm }: Props) => {
  if (!open) return <></>;
  const handleConfirm = () => {
    onClose();
    onConfirm();
  };

  return (
    <div className={styles.div}>
      <h2 className={styles.h2}>{title}</h2>
      <Button onClick={handleConfirm}>확인</Button>
      <Button onClick={() => onClose()}>취소</Button>
    </div>
  );
};

export default ConfirmModal;
