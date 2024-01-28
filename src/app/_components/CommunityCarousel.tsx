'use client';
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../_components/CommunityCarousel.module.css';
import Image from 'next/image';

type Props = {
  pics: { camp_id: string; id: string; photo_url: string }[];
  rtl: boolean;
};
export default class CommunityCarousel extends Component<Props> {
  state = {
    display: true,
    width: 20,
  };
  render() {
    const { pics, rtl } = this.props;

    var settings = {
      infinite: true,
      slidesToShow: 8.5,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 0,
      arrows: false,
      rtl: rtl,
    };
    return (
      <div className={styles.box}>
        <Slider {...settings}>
          {pics.map((pic) => {
            return (
              <div key={pic.id} className={styles.card}>
                <figure className={styles.photoWrap}>
                  <Image
                    src={pic.photo_url}
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