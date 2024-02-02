import Image from 'next/image';
import Link from 'next/link';
import emptyCamp from '../asset/ico_empty_camp.png';
import notFound from '../asset/404.gif'
import styles from '../styles/NotFound.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <Image
        src={notFound}
        width={300}
        height={300}
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
