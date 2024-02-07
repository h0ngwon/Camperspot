'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../_styles/Header.module.css';
import SearchBar from './SearchBar';
import ProfileDivider from './ProfileDivider';
import LogoSvg from '../_Svg/LogoSvg';
import CommunitySvg from '../_Svg/CommunitySvg';
import MyProfileSvg from '../_Svg/MyProfileSvg';
const Header = () => {
  const pathname = usePathname();
  const conditions = pathname.startsWith('/auth');
  const { data: session } = useSession();

  if (conditions) {
    return <div></div>;
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <header className={styles.header}>
            <Link href={'/'} className={styles.logo}>
              <LogoSvg x={154} y={22} />
            </Link>
            <SearchBar />
            <div className={styles.navBox}>
              <Link href={'/community'}>
                <CommunitySvg />
                <p>커뮤니티</p>
              </Link>
              {session ? (
                <>
                  <ProfileDivider session={session} />
                </>
              ) : (
                <>
                  <Link href={'/auth/signin'} className={styles.my}>
                    <MyProfileSvg />
                    <p>로그인</p>
                  </Link>
                </>
              )}
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
