import Link from 'next/link';
import SignupForm from './_components/SignupForm';
import styles from './_styles/SignupPage.module.css';
import Image from 'next/image';
import logo from '../../../asset/logo.png';
type Props = {};

const SignupPage = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles['img-wrapper']}>
        <Link href='/'>
          <Image src={logo} width={0} height={0} alt='lgoo' />
        </Link>
      </div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
