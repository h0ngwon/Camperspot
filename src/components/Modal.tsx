import useModalStore from '@/store/modal';
import styles from '../styles/Modal.module.css';

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  const { toggleModal } = useModalStore();
  return (
    <div>
      <div className={styles['modal-overlay']} onClick={toggleModal}></div>
      <div className={styles['modal-content-container']}>
        <div className={styles['modal-content']}>
          <h1>모달테스트</h1>
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
