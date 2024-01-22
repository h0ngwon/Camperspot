'use client';
import React, { Component } from 'react';
import Slider from 'react-slick';
import styles from '../_styles/Photo.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import CarouselPrevArrow from '@/components/CarouselPrevArrow';
import CarouselNextArrow from '@/components/CarouselNextArrow';

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
      nextArrow: <CarouselNextArrow />,
      prevArrow: <CarouselPrevArrow />,
    };

    return (
      <>
        <Slider {...settings}>
          {photos.map((photo) => (
            <div className={styles.picWrap} key={photo.id}>
              <Image
                src={photo.photo_url}
                alt={`Photo ${photo.id}`}
                fill
                className={styles.pic}
              />
            </div>
          ))}
        </Slider>
      </>
    );
  }
}
