import React from 'react';
import styles from '../_styles/CampCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
            >
              <path
                d='M9.9974 9.58268C9.44486 9.58268 8.91496 9.36319 8.52426 8.97249C8.13356 8.58179 7.91406 8.05188 7.91406 7.49935C7.91406 6.94682 8.13356 6.41691 8.52426 6.02621C8.91496 5.63551 9.44486 5.41602 9.9974 5.41602C10.5499 5.41602 11.0798 5.63551 11.4705 6.02621C11.8612 6.41691 12.0807 6.94682 12.0807 7.49935C12.0807 7.77294 12.0268 8.04385 11.9221 8.29661C11.8174 8.54937 11.664 8.77903 11.4705 8.97249C11.2771 9.16594 11.0474 9.3194 10.7947 9.4241C10.5419 9.5288 10.271 9.58268 9.9974 9.58268ZM9.9974 1.66602C8.4503 1.66602 6.96657 2.2806 5.87261 3.37456C4.77864 4.46852 4.16406 5.95225 4.16406 7.49935C4.16406 11.8743 9.9974 18.3327 9.9974 18.3327C9.9974 18.3327 15.8307 11.8743 15.8307 7.49935C15.8307 5.95225 15.2161 4.46852 14.1222 3.37456C13.0282 2.2806 11.5445 1.66602 9.9974 1.66602Z'
                fill='#ADB0B7'
              />
            </svg>
            <p className={styles.campAddress}>{camp.address}</p>
          </div>
        </div>
      </div>
      <p className={styles.price}>{camp.camp_area[0]?.price}~</p>
    </Link>
  );
};

export default CampCard;
