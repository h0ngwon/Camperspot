import useModalStore from '@/store/modal';
import styles from '../styles/Modal.module.css';

interface Props {
  children: React.ReactNode;
  customWidth?: number;
  customHeight?: number;
}

const Modal = ({ children, customWidth, customHeight }: Props) => {
  return (
    <div>
      <div className={styles['modal-overlay']}></div>
      <div className={styles['modal-content-container']}>
        <div
          className={styles['modal-content']}
          style={
            customWidth && customHeight
              ? { width: `${customWidth}px`, height: `${customHeight}px` }
              : undefined
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
