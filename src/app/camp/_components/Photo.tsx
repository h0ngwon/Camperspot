import Image from 'next/image';
import React from 'react';
import pic from '@/asset/abc.png';
import styles from './photo.module.css';

type Props = {};

const Photo = (props: Props) => {
  const url = pic;
  return (
    <figure className={styles.picWrap}>
      <Image src={url} alt='캠핑장 이미지' fill className={styles.pic} />;
    </figure>
  );
};

export default Photo;
