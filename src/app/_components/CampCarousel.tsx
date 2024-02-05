'use client';
import React from 'react';
import Slider from 'react-slick';
import CampCard from './CampCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../_styles/CampCarousel.module.css';
import NextArrow from '@/components/NextArrow';
import PrevArrow from '@/components/PrevArrow';
import { TopReservedCamp } from '@/types/campList';

type Props = {
  camp: TopReservedCamp[];
};

const CampCarousel = ({ camp }: Props) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    touchMove: true,
    nextArrow: <NextArrow customStyle={true} />,
    prevArrow: <PrevArrow customStyle={true} />,
  };
  return (
    <ul>
      <Slider {...settings}>
        {camp?.map((item, index) => (
          <li key={index}>
            <div className={styles.card}>
              <CampCard camp={item} />
            </div>
          </li>
        ))}
      </Slider>
    </ul>
  );
};

export default CampCarousel;
