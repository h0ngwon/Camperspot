import React from 'react';
import styles from '../_styles/CampCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import AddressSvg from '@/asset/AddressSvg';

type Props = {
  camp: {
    id: string;
    name: string;
    address: string;
    camp_area: { price: number }[];
    camp_pic: { id: string; photo_url: string }[];
  };
};

const CampCard = ({ camp }: Props) => {
  return (
    <Link
      href={`/camp/detail/${camp.id}`}
      className={styles.card}
      key={camp.id}
    >
      <div className={styles.campIntro}>
        <figure className={styles.photoWrap}>
          <Image
            src={camp.camp_pic[0]?.photo_url}
            fill
            alt='캠프 이미지'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className={styles.img}
          />
        </figure>
        <div className={styles.introText}>
          <p className={styles.campName}>{camp.name}</p>
          <div className={styles.addressBox}>
            <AddressSvg />
            <p className={styles.campAddress}>{camp.address}</p>
          </div>
        </div>
      </div>
      <p className={styles.price}>{camp.camp_area[0]?.price}~</p>
    </Link>
  );
};

export default CampCard;
