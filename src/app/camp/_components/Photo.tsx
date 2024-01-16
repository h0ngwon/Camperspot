'use client';
import Image from 'next/image';
import React from 'react';
import pic from '@/asset/abc.png';
import styles from '../_styles/Photo.module.css';

type Props = {};

const Photo = (props: Props) => {
  const onHandlePhotoBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    console.log('hi');
  };
  const url = pic;
  return (
    <figure className={styles.picWrap}>
      <Image src={url} alt='캠핑장 이미지' fill className={styles.pic} />;
      <button
        onClick={(e) => onHandlePhotoBtn(e)}
        className={styles.photoButton}
      >
        {'<'}
      </button>
      <button className={styles.photoButton}>{'>'}</button>
    </figure>
  );
};

export default Photo;
