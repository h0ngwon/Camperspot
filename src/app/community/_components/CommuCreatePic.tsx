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
  postPic: string[];
  handleDeleteCampImg: (index: number) => void;
  handleChangeInputImageFile(e: ChangeEvent<HTMLInputElement>): void;
};

export default function CommuCreatePic({
  postPic,
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
      {postPic.map((item, index) => (
        <div key={index}>
          <div className={styles.slideWrap}>
            <Image
              src={item}
              alt={`이미지`}
              fill
              priority
              className={styles['preview-img']}
              sizes='(min-width: 900px) 450px, 100vw'
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
