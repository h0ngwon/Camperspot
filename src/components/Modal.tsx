import styles from '../styles/Modal.module.css'

interface Props {
	onClose: () => void;
  children: React.ReactNode
}

const Modal = ({ children, onClose }: Props) => {
	return (
		<div>
			<div className={styles['modal-overlay']} onClick={onClose}></div>
			<div className={styles['modal-content-container']}>
				<div className={styles['modal-content']}>
					<h1>모달테스트</h1>
          {children}
					<button
						onClick={onClose}
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