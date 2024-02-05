import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from '../_styles/CommuPhotos.module.css';
import PrevArrow from '@/components/PrevArrow';
import NextArrow from '@/components/NextArrow';

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
    nextArrow: <NextArrow customStyle={false} />,
    prevArrow: <PrevArrow customStyle={false} />,
    appendDots: (dots: React.ReactNode[]) => (
      <div
        style={{
          bottom: '16px',
        }}
      >
        <ul style={{ margin: '0px' }}>{dots} </ul>
      </div>
    ),
  };

  return (
    <Slider {...settings}>
      {photo.map((pic) => (
        <div key={pic.id} className={styles.slideCon}>
          <Image
            src={pic.photo_url}
            alt={`이미지`}
            layout='fill'
            objectFit='cover'
          />
        </div>
      ))}
    </Slider>
  );
}
