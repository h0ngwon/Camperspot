import React from 'react';
import Carousel from './Carousel';
import PopularCamp from './PopularCamp';
import RegionFiltter from './RegionFiltter';
import PopularCommunity from './PopularCommunity';
import Spacer from '@/components/Spacer';

const Main = () => {
  return (
    <>
      <Carousel />
      <PopularCamp />
      <RegionFiltter />
      <PopularCommunity />
      <Spacer y={300} />
    </>
  );
};

export default Main;
