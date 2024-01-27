'use client';
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../_components/CommunityCarousel.module.css';
import { regions } from '../_lib/regions';
import Image from 'next/image';
const a = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
export default class CommunityCarouselReverse extends Component {
  state = {
    display: true,
    width: 20,
  };
  render() {
    var settings = {
      infinite: true,
      slidesToShow: 8.5,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 0,
      arrows: false,
      rtl: true,
    };
    return (
      <div className={styles.box}>
        <Slider {...settings}>
          {regions.map((region) => {
            return (
              <div key={region.name} className={styles.card}>
                <figure className={styles.photoWrap}>
                  <Image
                    src={region.pic}
                    width={133}
                    height={133}
                    alt=''
                    className={styles.pic}
                  />
                </figure>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
