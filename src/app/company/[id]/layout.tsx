import Image from 'next/image';
import CompanyHeader from './_components/CompanyHeader';
import styles from './_styles/CompanyLayout.module.css';
import rightArrow from '@/asset/ico_right_arrow_gray.png';

type Props = {
  children: React.ReactNode;
};

const CompanyPageLayout = ({ children }: Props) => {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.tabTitle}>
        <span>메인</span>
        <Image src={rightArrow} alt='마이페이지' width={12} height={23} />
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
