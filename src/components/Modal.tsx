import useModalStore from '@/store/modal';
import styles from '../styles/Modal.module.css';
import ModalCloseSvg from '@/components/ModalCloseSvg';

interface Props {
  children: React.ReactNode;
  customWidth?: number;
  customHeight?: number;
}

const Modal = ({ children, customWidth, customHeight }: Props) => {
  const { toggleModal } = useModalStore();
  return (
    <div>
      <div className={styles['modal-overlay']} onClick={toggleModal}></div>
      <div className={styles['modal-content-container']}>
        <button className={styles['close-btn']} onClick={toggleModal}>
          <ModalCloseSvg />
        </button>
        <div
          className={styles['modal-content']}
          style={
            customWidth && customHeight
              ? { width: `${customWidth}px`, height: `${customHeight}px` }
              : undefined
          }
        >
          {children}
          <button
            onClick={toggleModal}
            className={styles['modal-close-button']}
            type='button'
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
