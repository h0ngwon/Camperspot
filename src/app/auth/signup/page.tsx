import LogoSvg from '@/app/_Svg/LogoSvg';
import Link from 'next/link';
import SignupForm from './_components/SignupForm';
import styles from './_styles/SignupPage.module.css';


const SignupPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles['img-wrapper']}>
        <Link href='/'>
          <LogoSvg x={294} y={42} />
        </Link>
      </div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
