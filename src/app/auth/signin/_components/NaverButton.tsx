'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import ico_naver from '../../../../asset/ico_naver.png';
import styles from '../_styles/NaverButton.module.css';

const NaverButton = () => {
  return (
    <button
      className={styles.naver}
      onClick={() =>
        signIn(`naver`, {
          redirect: true,
          callbackUrl: '/',
        })
      }
    >
      <Image src={ico_naver} width={16} height={16} alt='naver' />
      네이버로 로그인
    </button>
  );
};

export default NaverButton;
