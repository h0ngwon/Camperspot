import Content from './_components/Content';
import Sidebar from './_components/Sidebar';
import styles from './_styles/MypageLayout.module.css';

type Props = {
  children: React.ReactNode
};

const MypageLayout = ({children}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles['status-container']}>홈 {'>'} 마이페이지</div>
        <div className={styles['content-container']}>
          <aside>
            <Sidebar />
          </aside>
          <main>
            <Content>{children}</Content>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MypageLayout;
