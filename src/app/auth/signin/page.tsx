'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../asset/logo.png';
import KakaoButton from './_components/KakaoButton';
import NaverButton from './_components/NaverButton';
import SigninForm from './_components/SigninForm';
import styles from './_styles/SigninPage.module.css';

const SigninPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles['img-wrapper']}>
        <Link href='/'>
          <Image src={logo} width={0} height={0} alt='lgoo' />
        </Link>
      </div>
      <div className={styles['buttons-container']}>
        <KakaoButton />
        <NaverButton />
      </div>
      <div className={styles.divider}>
        <div className={styles.bar}></div>
        또는
        <div className={styles.bar}></div>
      </div>
      <SigninForm />
      <span className={styles.signup}>
        <Link href='/auth/signup'>회원가입</Link>
      </span>
    </div>
  );
};

export default SigninPage;
