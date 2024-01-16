'use client';
import React, { useEffect, useState } from 'react';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import SocialButton from './_components/SocialButton';
import styles from './_styles/SigninPage.module.css';
import SigninForm from './_components/SigninForm';
import Link from 'next/link';

const SigninPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles['buttons-container']}>
        <SocialButton provider='kakao' />
        <SocialButton provider='naver' />
        <button onClick={() => signOut()}>로그아웃</button>
      </div>
      <span>업체회원이라면?</span>
      <SigninForm />
      <span><Link href='/auth/signup'>업체회원이 되고싶으신가요? 회원가입하기</Link></span>
    </div>
  );
};

export default SigninPage;
