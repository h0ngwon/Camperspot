'use client';

import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../_styles/RegionFiltter.module.css';
import Spacer from '@/components/Spacer';
import { regions } from '../_lib/regions';
import Image from 'next/image';
import NextArrow from '@/components/NextArrow';
import PrevArrow from '@/components/PrevArrow';

const RegionCarousel = () => {
  const settings = {
    className: 'center',
    infinite: false,
    centerPadding: '60px',
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow customStyle={true} />,
    prevArrow: <PrevArrow customStyle={true} />,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
  };

  return (
    <div className={styles.container}>
      <div className={styles.regionIntro}>
        <p>지역별 캠핑장</p>
        <p>지역별 캠핑장을 둘러보세요</p>
      </div>
      <Spacer y={20} />

      <Slider {...settings}>
        {regions.map((region) => (
          <Link
            href={`/camp/search?keyword=${region.name}&check_in=2024-01-28&check_out=2024-01-29&people=2&page=1`}
            key={region.name}
          >
            <div className={styles.regionCard}>
              <figure>
                <Image
                  src={region.pic}
                  width={285}
                  height={285}
                  alt=''
                  className={styles.pic}
                />
              </figure>
              <p>{region.name}</p>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default RegionCarousel;
