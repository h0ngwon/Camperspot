import ModalCloseSvg from '@/components/ModalCloseSvg';
import styles from '../_styles/ReservationCancelCompleteModal.module.css';
type Props = { onClose: () => void; customLeft?: number; customTop?: number };

export default function ReservationCancelCompleteModal({
  onClose,
  customLeft,
  customTop,
}: Props) {
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
      <h2 className={styles.h2}>예약이 취소되었습니다.</h2>
      <button className={styles.button} onClick={() => onClose()}>
        확인
      </button>
    </div>
  );
}
