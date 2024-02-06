import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import styles from '../_styles/ProfileDropDown.module.css';

type Props = {
  session: Session;
};

const ProfileDropDown = ({ session }: Props) => {
  return (
    <div className={styles.dropDownBox}>
      {session.user.role === 'company' ? (
        <>
          <Link
            href={`/company/${session.user.id}/manage_company_user_info`}
            className={styles.dropDownItem}
          >
            <p>계정관리</p>
          </Link>
          <Link
            href={`/company/${session.user.id}/manage_reservation`}
            className={styles.dropDownItem}
          >
            <p>예약현황</p>
          </Link>
        </>
      ) : (
        <>
          <Link
            href={`/profile/${session.user.id}`}
            className={styles.dropDownItem}
          >
            <p>계정관리</p>
          </Link>
          <Link
            href={`/profile/${session.user.id}/reservation`}
            className={styles.dropDownItem}
          >
            <p>예약현황</p>
          </Link>
        </>
      )}
      <div onClick={() => signOut()} className={styles.dropDownItem}>
        <p>로그아웃</p>
      </div>
    </div>
  );
};

export default ProfileDropDown;
