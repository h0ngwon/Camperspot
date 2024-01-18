import React from 'react';
import styles from '../_styles/RealHeader.module.css';
import logo from '@/asset/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';
import CommunitySvg from '@/asset/CommunitySvg';
import MyProfileSvg from '@/asset/MyProfileSvg';
const RealHeader = () => {
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
      </header>
    </div>
  );
};

export default RealHeader;
