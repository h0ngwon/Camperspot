import CompanyHeader from './_components/CompanyHeader';
import styles from './_styles/CompanyLayout.module.css';
type Props = {
  children: React.ReactNode;
};

const CompanyPageLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <aside className={styles.left}>
        <CompanyHeader />
      </aside>
      <main className={styles.right}>{children}</main>
    </div>
  );
};

export default CompanyPageLayout;
