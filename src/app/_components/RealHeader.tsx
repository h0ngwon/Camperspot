'use client';
import React from 'react';
import styles from '../_styles/RealHeader.module.css';
import logo from '@/asset/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';
import CommunitySvg from '@/asset/CommunitySvg';
import MyProfileSvg from '@/asset/MyProfileSvg';
import { useSession } from 'next-auth/react';
const RealHeader = () => {
  const { data: session } = useSession();

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
            커뮤니티
          </Link>
          <div className={styles.my}>
            <MyProfileSvg />
            마이
          </div>
        </div>
        <div>로그인 여부에 따라 보여지는 화면이</div>
      </header>
    </div>
  );
};

export default RealHeader;
