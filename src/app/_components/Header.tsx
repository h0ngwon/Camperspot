'use client';
import React from 'react';
import styles from '../_styles/Header.module.css';
import logo from '@/asset/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';
import { signOut, useSession } from 'next-auth/react';
import logOut from '@/asset/logOut.png';
import CommunitySvg from '@/components/CommunitySvg';
import MyProfileSvg from '@/components/MyProfileSvg';
const Header = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
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
                <Link href={`/company/${session.user.id}/manage_reservation`}>
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
              <button onClick={() => signOut()} className={styles.logOutBtn}>
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
  );
};

export default Header;
