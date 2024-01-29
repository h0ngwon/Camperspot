'use client';

import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from '../_styles/CommuPhotos.module.css';
import CarouselNextArrow from '@/components/CarouselNextArrow';
import CarouselPrevArrow from '@/components/CarouselPrevArrow';
import CommuPicSvg from '../_svg/CommuPicSvg';
import DeleteSvg from '../_svg/DeleteSvg';

type Props = {
  postPicEdit: {
    id: string;
    photo_url: string;
    post_id: string;
  }[];
  setPostPicEdit: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        photo_url: string;
        post_id: string;
      }[]
    >
  >;
};

export default function CommuEditPic({ postPicEdit, setPostPicEdit }: Props) {
  // 캠핑장 이미지 업로드
  function handleChangeInputImageFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const newElement = {
        id: 'some-id',
        photo_url: URL.createObjectURL(file),
        post_id: 'some-post-id',
      }; // 실제 데이터로 교체
      setPostPicEdit((prev) => [...prev, newElement]);
    }
  }

  // 버튼 클릭시 이미지 삭제
  const handleDeleteCampImg = (index: number) => {
    setPostPicEdit((prev) => {
      const updatedPostPics = [...prev];
      updatedPostPics.splice(index, 1); // 해당 인덱스의 이미지 삭제
      return updatedPostPics;
    });
  };

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
        <div key={item.id}>
          <div className={styles.slideWrap}>
            <Image
              src={item.photo_url}
              alt={`이미지`}
              layout='fill'
              objectFit='cover'
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
