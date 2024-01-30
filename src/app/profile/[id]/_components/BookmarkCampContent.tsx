'use client'
import AddressSvg from '@/components/AddressSvg';
import Card from '@/components/Card';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../_styles/BookmarkCampContent.module.css';

type Props = {
  camp: {
    id: string;
    name: string;
    address: string;
    camp_area: { price: number }[];
    camp_pic: { id: string; photo_url: string }[];
  };
};

const BookmarkCampContent = ({ camp }: Props) => {
  return (
    <Card>
      <Link href={`/camp/detail/${camp.id}`}>
        <div className={styles.container}>
          <div className={styles['img-wrapper']}>
            <Image
              src={camp.camp_pic[0]?.photo_url}
              width={174}
              height={174}
              alt='캠핑장 사진'
              className={styles.img}
            />
          </div>
          <div className={styles['camp-info-container']}>
            <div className={styles['camp-name']}>{camp.name}</div>

            <div className={styles['camp-address']}>
              <AddressSvg width='15' height='15' />
              {camp.address}
            </div>
          </div>

          <p className={styles.price}>
            {camp.camp_area[0]?.price === 0
              ? '무료'
              : `${camp.camp_area[0]?.price.toLocaleString()}원~`}
          </p>
        </div>
      </Link>
    </Card>
  );
};

export default BookmarkCampContent;
