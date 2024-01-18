'use client';

import React, { Component } from 'react';
import Slider from 'react-slick';
import styles from '../_styles/Carousel.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class Carousel extends Component {
  render() {
    const banners = ['가', '나', '다', '라'];

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
                <div className={styles.inner} key={idx}>
                  <h3>{banner}</h3>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
}
