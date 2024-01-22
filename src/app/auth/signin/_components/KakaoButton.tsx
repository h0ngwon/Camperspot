'use client';
import { signIn } from 'next-auth/react';
import React from 'react';
import styles from '../_styles/KakaoButton.module.css'
import ico_kakao from '../../../../asset/ico_kakao.png'
import Image from 'next/image';
const KakaoButton = () => {
  return (
      <button
        className={styles.kakao}
        onClick={() =>
          signIn(`kakao`, {
            redirect: true,
            callbackUrl: '/',
          })
        }
      >
      <Image src={ico_kakao} width={16} height={16} alt='kakao'/>
      카카오톡으로 로그인
      </button>
  );
};

export default KakaoButton;
