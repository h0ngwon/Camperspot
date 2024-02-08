'use client';
import Link from 'next/link';
// import logo from '../../../asset/logo.png';
import LogoSvg from '@/app/_Svg/LogoSvg';
import KakaoButton from './_components/KakaoButton';
import NaverButton from './_components/NaverButton';
import SigninForm from './_components/SigninForm';
import styles from './_styles/SigninPage.module.css';

const SigninPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles['img-wrapper']}>
        <Link href='/'>
          <LogoSvg x={294} y={42} />
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
