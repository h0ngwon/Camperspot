'use client';
import React, { Component } from 'react';
import Slider from 'react-slick';
import styles from '../_styles/Photo.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import NextArrow from '@/components/NextArrow';
import PrevArrow from '@/components/PrevArrow';

type PhotoProps = {
  photos: { id: string; photo_url: string }[];
};

export default class Photo extends Component<PhotoProps> {
  render() {
    const { photos } = this.props;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow customStyle={false} />,
      prevArrow: <PrevArrow customStyle={false} />,
    };

    return (
      <>
        <Slider {...settings}>
          {photos.map((photo, idx) => (
            <div className={styles.picWrap} key={idx}>
              <Image
                src={photo.photo_url}
                alt={`Photo`}
                fill
                sizes='(min-width: 900px) 450px, 100vw'
                className={styles.pic}
              />
            </div>
          ))}
        </Slider>
      </>
    );
  }
}
