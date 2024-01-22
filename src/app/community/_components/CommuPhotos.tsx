import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from '../_styles/CommuPhotos.module.css';
import CommuNextArrow from '../_styles/CommuNextArrow';
import CommuPrevArrow from '../_styles/CommuPrevArrow';

type Props = {
  photo: {
    id: string;
    photo_url: string;
    post_id: string;
  }[];
};

export default function CommuPhotos({ photo }: Props) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CommuNextArrow />,
    prevArrow: <CommuPrevArrow />,
  };

  return (
    <Slider {...settings}>
      {photo.map((pic, index) => (
        <div key={index} className={styles.slideCon}>
          <Image src={pic.photo_url} alt='' layout='fill' objectFit='cover' />
        </div>
      ))}
    </Slider>
  );
}
