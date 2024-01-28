import Button from '@/app/camp/detail/[id]/_components/Button';
import styles from '../_styles/ConfirmModal.module.css';
type Props = { title: string; onClose: Function; onCancel: Function };

const ConfirmModal = ({ title, onClose, onCancel }: Props) => {
  return (
    <div className={styles.div}>
      <h2 className={styles.h2}>{title}</h2>
      <Button onClick={() => onClose()}>아니요</Button>
      <Button onClick={() => onCancel()}>취소하기</Button>
    </div>
  );
};

export default ConfirmModal;
