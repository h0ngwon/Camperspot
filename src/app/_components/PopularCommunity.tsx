import CommunityCarousel from './CommunityCarousel';
import styles from '../_styles/PopularCommunity.module.css';
import Link from 'next/link';
import Spacer from '@/components/Spacer';
import RightArrowSvg from './RightArrowSvg';
import { supabase } from '../api/db';

const PopularCommunity = async () => {
  let { data, error } = await supabase.rpc('get_random_pic');
  if (error) console.error(error);
  if (!data) {
    return;
  }
  const half = Math.ceil(data.length / 2);

  const leftCarousel = data.slice(0, half);
  const rightCarousel = data.slice(half);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.campTalk}>
            <p>캠핑톡</p>
            <p>캠핑을 사랑하는 사람들과 소통해보세요</p>
          </div>
        </div>
        <Spacer y={20} />

        <div className={styles.carouselBox}>
          <div className={styles.carouselLeft}>
            <CommunityCarousel pics={leftCarousel} rtl={false} />
          </div>
          <div>
            <CommunityCarousel pics={rightCarousel} rtl={true} />
          </div>
        </div>
        <Spacer y={50} />
        <Link href={'/community'} className={styles.linkCommu}>
          <p className={styles.linkText}>캠핑톡 바로가기</p>
          <RightArrowSvg />
        </Link>
      </div>
      <Spacer y={50} />
    </>
  );
};

export default PopularCommunity;
