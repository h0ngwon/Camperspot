'use client';

import React, { Component } from 'react';
import Slider from 'react-slick';
import CampCard from './CampCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../_styles/CampCarousel.module.css';
import CarouselNextArrow from '@/components/CarouselNextArrow';
import CarouselPrevArrow from '@/components/CarouselPrevArrow';
type Props = {
  camp:
    | {
        id: string;
        name: string;
        address: string;
        camp_area: { price: number }[];
        camp_pic: { id: string; photo_url: string }[];
      }[]
    | null;
};

export default class CampCarousel extends Component<Props> {
  render() {
    const { camp } = this.props;

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      touchMove: true,
      nextArrow: <CarouselNextArrow />,
      prevArrow: <CarouselPrevArrow />,
    };
    return (
      <ul>
        <Slider {...settings}>
          {camp!.map((item, index) => (
            <li key={index}>
              <div className={styles.card}>
                <CampCard camp={item} />
              </div>
            </li>
          ))}
        </Slider>
      </ul>
    );
  }
}
