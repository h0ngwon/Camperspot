'use client';

import React, { Component } from 'react';
import Slider from 'react-slick';
import styles from '../_styles/Carousel.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from '@/asset/main_banner_1.png';
import banner2 from '@/asset/main_banner_2.png';
import banner3 from '@/asset/main_banner_3.png';
import banner4 from '@/asset/main_banner_4.png';
import Image from 'next/image';
export default class Carousel extends Component {
  render() {
    const banners = [banner1, banner2, banner3, banner4];

    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      arrows: false,
    };
    return (
      <div>
        <div className={styles.carousel}>
          <Slider {...settings}>
            {banners.map((banner, idx) => {
              return (
                <figure key={idx}>
                  <Image src={banner} alt='' />
                </figure>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
}
