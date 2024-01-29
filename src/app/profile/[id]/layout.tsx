import Sidebar from './_components/Sidebar';
import styles from './_styles/MypageLayout.module.css';

type Props = {
  children: React.ReactNode;
};

const MypageLayout = ({ children }: Props) => {
  return (
    <div className={styles.outer}>
      <div className={styles.wrapper}>
        <div className={styles['status-container']}>메인 {'>'} 마이페이지</div>
        <div className={styles.container}>
          <div className={styles['content-container']}>
            <aside>
              <Sidebar />
            </aside>
            <main>
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageLayout;
