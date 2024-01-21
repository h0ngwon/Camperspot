import React from 'react';
import Carousel from './Carousel';
import PopularCamp from './PopularCamp';
import PopularCommunity from './PopularCommunity';
import Spacer from '@/components/Spacer';
import RegionCarousel from './RegionCarousel';
// className={`${styles.carouselContainer} ${styles.aaa}`}
// className={styles['carouselContainer,carousel']}
import styles from '../_styles/Main.module.css';
import Calendar from './Calendar';
const Main = () => {
  return (
    <div className={styles.container}>
      <Carousel />
      <Spacer y={50} />

      <PopularCamp />
      <Spacer y={50} />
      <RegionCarousel />
      <Spacer y={50} />
      <PopularCommunity />
    </div>
  );
};

export default Main;
