'use client';
import logOut from '@/asset/logOut.png';
import logo from '@/asset/logo.png';
import CommunitySvg from '@/components/CommunitySvg';
import MyProfileSvg from '@/components/MyProfileSvg';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../_styles/Header.module.css';
import SearchBar from './SearchBar';
import { usePathname } from 'next/navigation';
const Header = () => {
  const pathname = usePathname();
  const conditions = pathname.startsWith('/auth');
  // console.log(pathname);
  // console.log(conditions);
  const { data: session } = useSession();
  // console.log(session);

  return (
    <div>
      {conditions ? (
        <div></div>
      ) : (
        <div className={styles.container}>
          <header className={styles.header}>
            <Link href={'/'}>
              <figure className={styles.img}>
                <Image src={logo} alt='' />
              </figure>
            </Link>
            <SearchBar />
            <div className={styles.linkBox}>
              <Link href={'/community'} className={styles.community}>
                <CommunitySvg />
              </Link>
              {session ? (
                <>
                  {session.user.role === 'company' ? (
                    <Link
                      href={`/company/${session.user.id}/manage_reservation`}
                    >
                      <MyProfileSvg />
                    </Link>
                  ) : (
                    <Link href={`/profile/${session.user.id}`}>
                      <Image
                        src={session.user.image!}
                        alt=''
                        width={50}
                        height={50}
                        className={styles.profileImg}
                      />
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className={styles.logOutBtn}
                  >
                    <Image src={logOut} alt='' width={50} height={50} />
                  </button>
                </>
              ) : (
                <>
                  <Link href={'/auth/signin'} className={styles.my}>
                    <MyProfileSvg />
                  </Link>
                </>
              )}
            </div>
          </header>
        </div>
      )}
    </div>
  );
};

export default Header;
