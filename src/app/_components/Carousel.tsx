'use client';

import banner1 from '@/asset/main_banner_1.png';
import banner2 from '@/asset/main_banner_2.png';
import banner3 from '@/asset/main_banner_3.png';
import banner4 from '@/asset/main_banner_4.png';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from '../_styles/Carousel.module.css';

const Carousel = () => {
  const banners = [banner1, banner2, banner3, banner4];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    centerPadding: '360px',

    // className: 'center',
    // centerMode: true,
  };

  return (
    <div>
      <div className={styles.carousel}>
        <Slider {...settings}>
          {banners.map((banner, idx) => (
            <figure key={idx}>
              <Image src={banner} alt='' priority />
            </figure>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
