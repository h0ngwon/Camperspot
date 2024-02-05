import CompanyHeader from './_components/CompanyHeader';
import styles from './_styles/CompanyLayout.module.css';
import RightArrowSvg from './_svg/RightArrowSvg';

type Props = {
  children: React.ReactNode;
};

const CompanyPageLayout = ({ children }: Props) => {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.tabTitle}>
        <span>메인</span>
        <RightArrowSvg />
        <span>마이페이지</span>
      </h1>
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
