import CommunityCarousel from './CommunityCarousel';
import CommunityCarouselReverse from './CommunityCarouselReverse';
import styles from '../_styles/PopularCommunity.module.css';
import Link from 'next/link';
import Image from 'next/image';
import rightArrow from '@/asset/icon_arrow_right.svg';
import Spacer from '@/components/Spacer';

const PopularCommunity = async () => {
  return (
    <>
      <div
        style={{
          width: '1200px',
          height: '500px',
          fontSize: '50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className={styles.carouselBox}>
          <div className={styles.carouselLeft}>
            <CommunityCarousel />
          </div>
          <div>
            <CommunityCarouselReverse />
          </div>
        </div>
        <Link href={'/community'} className={styles.linkCommu}>
          <p className={styles.linkText}>캠핑톡 바로가기</p>
          <Image src={rightArrow} alt='' width={20} height={20} />
        </Link>
      </div>
      <Spacer y={50} />
    </>
  );
};

export default PopularCommunity;
