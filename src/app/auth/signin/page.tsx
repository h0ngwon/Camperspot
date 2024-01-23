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
        <Image src={logo} width={0} height={0} alt='lgoo' />
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
      <span>업체회원이라면?</span>
      <SigninForm />
      <span>
        <Link href='/auth/signup'>업체회원이 되고싶으신가요? 회원가입하기</Link>
      </span>
    </div>
  );
};

export default SigninPage;
