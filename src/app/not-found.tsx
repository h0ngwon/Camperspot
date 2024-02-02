import Image from 'next/image';
import emptyCamp from '../asset/ico_empty_camp.png';
import styles from '../styles/NotFound.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <Image
        src={emptyCamp}
        width={140}
        height={140}
        quality={100}
        alt='not found page'
      />
      <h1>페이지를 찾을 수 없습니다.</h1>
      
        <Link href={'/'} className={styles['main-btn']}>
          메인페이지로
        </Link>
      
    </div>
  );
};

export default NotFoundPage;
