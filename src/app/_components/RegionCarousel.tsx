'use client';
import Link from 'next/link';
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../_styles/RegionFiltter.module.css';
import Spacer from '@/components/Spacer';
import { regions } from '../_lib/regions';
import Image from 'next/image';

export default class RegionCarousel extends Component {
  render() {
    const settings = {
      className: 'center',
      infinite: false,
      centerPadding: '60px',
      slidesToShow: 4,
      slidesToScroll: 4,

      speed: 500,
      rows: 2,
      slidesPerRow: 1,
    };
    return (
      <div className={styles.container}>
        <p>지역별 캠핑장</p>
        <Spacer y={20} />

        <Slider {...settings}>
          {regions.map((region) => {
            return (
              <Link href={`/camp/search?region=${region}`} key={region.name}>
                <div className={styles.regionCard}>
                  <figure>
                    <Image
                      src={region.pic}
                      width={250}
                      height={200}
                      alt=''
                      className={styles.pic}
                    />
                  </figure>
                  <p>{region.name}</p>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    );
  }
}
