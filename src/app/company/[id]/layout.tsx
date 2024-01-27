import CompanyHeader from './_components/CompanyHeader';
import styles from './_styles/CompanyLayout.module.css';
type Props = {
  children: React.ReactNode;
};

const CompanyPageLayout = ({ children }: Props) => {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.tabTitle}>메인 {'>'} 마이페이지</h1>
      <div className={styles.container}>
        <aside className={styles.left}>
          <CompanyHeader />
        </aside>
        <main className={styles.right}>{children}</main>
      </div>
    </div>
  );
};

export default CompanyPageLayout;
