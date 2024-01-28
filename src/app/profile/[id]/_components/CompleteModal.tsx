import styles from '../_styles/CompleteModal.module.css';
type Props = { title: string; onClose: () => void };

export default function CompleteModal({ title, onClose }: Props) {
  return (
    <div className={styles.div}>
      <h2 className={styles.h2}>{title}</h2>
      <button onClick={onClose}>확인</button>
    </div>
  );
}
