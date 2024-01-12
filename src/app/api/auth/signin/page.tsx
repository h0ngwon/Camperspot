'use client';
import React, { useEffect, useState } from 'react';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import SocialButton from './_components/SocialButton';
import styles from './_styles/SigninPage.module.css';
import SigninForm from './_components/SigninForm';

const SigninPage = () => {
  const { data: session } = useSession();
  console.log(session);

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      setProviders(res);
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
      <span>업체회원이 되고싶으신가요? 회원가입하기</span>
    </div>
  );
};

export default SigninPage;
