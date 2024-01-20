import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from '../_styles/CommuPhotos.module.css';
import NextArrowSvg from '../_svg/NextArrowSvg';
import PrevArrowSvg from '../_svg/PrevArrowSvg';

type Props = {
  photo: {
    id: string;
    photo_url: string | null;
    post_id: string;
  }[];
};

function SampleNextArrow(props: any) {
  const { onClick } = props;

  return (
    <div className={styles.nextArrow} onClick={onClick}>
      <NextArrowSvg />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;

  return (
    <div className={styles.prevArrow} onClick={onClick}>
      <PrevArrowSvg />
    </div>
  );
}

export default function CommuPhotos({ photo }: Props) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Slider {...settings}>
      {photo.map((pic) => (
        <div key={pic.id} className={styles.slide}>
          <div className={styles.slideCon}>
            <Image
              src={pic.photo_url || '/default-image.jpg'}
              alt=''
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}
