import React from 'react';
import Carousel from './Carousel';
import PopularCamp from './PopularCamp';
import PopularCommunity from './PopularCommunity';
import Spacer from '@/components/Spacer';
import RegionCarousel from './RegionCarousel';

import styles from '../_styles/Main.module.css';
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
