'use client';

import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import CarouselNextArrow from '@/components/CarouselNextArrow';
import CarouselPrevArrow from '@/components/CarouselPrevArrow';
import styles from '../_styles/CommuPhotos.module.css';
import CommuPicSvg from '../_svg/CommuPicSvg';
import DeleteSvg from '../_svg/DeleteSvg';

type Props = {
  postPicEdit: {
    id: string;
    photo_url: string;
    post_id: string;
  }[];
  handleDeleteCampImg: (index: number) => void;
  handleChangeInputImageFile(e: ChangeEvent<HTMLInputElement>): void;
};

export default function CommuEditPic({
  postPicEdit,
  handleDeleteCampImg,
  handleChangeInputImageFile,
}: Props) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CarouselNextArrow />,
    prevArrow: <CarouselPrevArrow />,
    appendDots: (dots: React.ReactNode[]) => (
      <div
        style={{
          bottom: '16px',
        }}
      >
        <ul style={{ margin: '10px' }}>{dots} </ul>
      </div>
    ),
  };

  return (
    <Slider {...settings}>
      {postPicEdit.map((item, index) => (
        <div key={item.id} className={styles.pics}>
          <div className={styles.slideWrap}>
            <Image
              src={item.photo_url}
              alt={`이미지`}
              fill
              quality={100}
              sizes='(min-width: 900px) 450px, 100vw'
              className={styles['slide-wrap-img']}
            />
          </div>
          <div className={styles.deleteWrap}>
            <button type='button' onClick={() => handleDeleteCampImg(index)}>
              <DeleteSvg />
            </button>
          </div>
        </div>
      ))}
      <div>
        <input
          type='file'
          accept='image/*'
          id='file_upload'
          className={styles.upload}
          onChange={handleChangeInputImageFile}
        />
        <label htmlFor='file_upload'>
          <div className={styles.uploadPic}>
            <CommuPicSvg />
            <p>업로드</p>
          </div>
        </label>
      </div>
    </Slider>
  );
}
