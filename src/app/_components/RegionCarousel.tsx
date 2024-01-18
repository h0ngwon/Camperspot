'use client';
import Link from 'next/link';
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../_styles/RegionFiltter.module.css';

export default class RegionCarousel extends Component {
  render() {
    const regions = [
      '서울',
      '대전',
      '대구',
      '부산',
      '경기',
      '충북',
      '전북',
      '경북',
      '인천',
      '광주',
      '울산',
      '제주',
      '강원',
      '충남',
      '전남',
      '경남',
    ];
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
        <Slider {...settings}>
          {regions.map((region) => {
            return (
              <Link
                href={`/camp/search?region=${region}`}
                key={region}
                className={styles.regionCard}
              >
                <div>{region}</div>
              </Link>
            );
          })}
        </Slider>
      </div>
    );
  }
}
