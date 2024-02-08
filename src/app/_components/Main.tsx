import Spacer from '@/components/Spacer';
import Carousel from './Carousel';
import PopularCamp from './PopularCamp';
import PopularCommunity from './PopularCommunity';
import RegionCarousel from './RegionCarousel';

import styles from '../_styles/Main.module.css';

const Main = () => {
  return (
    <div className={styles.container}>
      <Carousel />
      <Spacer y={142} />

      <PopularCamp />
      <Spacer y={142} />
      <RegionCarousel />
      <Spacer y={142} />
      <PopularCommunity />
    </div>
  );
};

export default Main;
