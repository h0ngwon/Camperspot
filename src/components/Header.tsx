import Link from 'next/link';
import styles from './header.module.css';

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <Link href={`/sign-in`} className={styles.linkBtn}>
        Auth
      </Link>
      <Link href={`/company/aaa/manage_camp/add`} className={styles.linkBtn}>
        캠핑장등록
      </Link>
      <Link
        href={`/camp/detail/1173bb1c-06f0-4d06-a5c2-b81ba68e788f`}
        className={styles.linkBtn}
      >
        캠프상세
      </Link>
      <Link href={`/camp/aaa/reservation`} className={styles.linkBtn}>
        예약
      </Link>
      <Link href={`/company/aaa`} className={styles.linkBtn}>
        company
      </Link>
      <Link href={`/company/aaa/manage_reservation`} className={styles.linkBtn}>
        예약관리
      </Link>
      <Link href={`/camp`} className={styles.linkBtn}>
        캠핑장 둘러보기
      </Link>
    </>
  );
};

export default Header;
