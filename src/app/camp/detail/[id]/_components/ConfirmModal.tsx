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
      {/* 나중에 로고 변경될 수도 있으니 그냥 태그로 넣음 */}
      <svg
        fill='#000000'
        width='81px'
        height='81px'
        viewBox='0 -0.5 17 17'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g
          id='SVGRepo_tracerCarrier'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          <path
            fillRule='evenodd'
            d='M15.35 8c0 3.377-2.945 6.25-6.75 6.25S1.85 11.377 1.85 8 4.795 1.75 8.6 1.75 15.35 4.623 15.35 8zm1.25 0c0 4.142-3.582 7.5-8 7.5S.6 12.142.6 8C.6 3.858 4.182.5 8.6.5s8 3.358 8 7.5zM9.229 3.101l-.014 7.3-1.25-.002.014-7.3 1.25.002zm.016 9.249a.65.65 0 1 0-1.3 0 .65.65 0 0 0 1.3 0z'
          ></path>
        </g>
      </svg>

      <h2 className={styles.h2}>{title}</h2>
      <Button onClick={handleConfirm}>확인</Button>
      <Button onClick={() => onClose()}>취소</Button>
    </div>
  );
};

export default ConfirmModal;
