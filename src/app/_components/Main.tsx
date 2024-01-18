import React from 'react';
import Carousel from './Carousel';
import PopularCamp from './PopularCamp';
import PopularCommunity from './PopularCommunity';
import Spacer from '@/components/Spacer';
import RegionCarousel from './RegionCarousel';
// className={`${styles.carouselContainer} ${styles.aaa}`}
// className={styles['carouselContainer,carousel']}
import styles from '../_styles/Main.module.css';
const Main = () => {
  return (
    <div className={styles.container}>
      <Carousel />
      <PopularCamp />
      <RegionCarousel />
      <PopularCommunity />
      <Spacer y={300} />
    </div>
  );
};

export default Main;
