import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import styles from '../_styles/ProfileDropDown.module.css';

type Props = {
  session: Session;
};

const ProfileDropDown = ({ session }: Props) => {
  return (
    <div className={styles.dropDwonBox}>
      {session.user.role === 'company' ? (
        <>
          <Link href={`/company/${session.user.id}/manage_company_user_info`}>
            <p>계정관리</p>
          </Link>
          <Link href={`/company/${session.user.id}/manage_reservation`}>
            <p>예약현황</p>
          </Link>
        </>
      ) : (
        <>
          <Link href={`/profile/${session.user.id}`}>
            <p>계정관리</p>
          </Link>
          <Link href={`/profile/${session.user.id}/reservation`}>
            <p>예약현황</p>
          </Link>
        </>
      )}
      <div onClick={() => signOut()} className={styles.logOutBtn}>
        <p>로그아웃</p>
      </div>
    </div>
  );
};

export default ProfileDropDown;
