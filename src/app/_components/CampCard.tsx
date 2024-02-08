import AddressSvg from '@/components/AddressSvg';
import { TopReservedCamp } from '@/types/campList';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../_styles/CampCard.module.css';

type Props = {
  camp: TopReservedCamp;
};

const CampCard = ({ camp }: Props) => {
  const camp_pic = camp.camp_pic as Array<{
    id: string;
    photo_url: string;
  }>;
  return (
    <Link
      href={`/camp/detail/${camp.id}`}
      className={styles.card}
      key={camp.id}
    >
      <div className={styles.campIntro}>
        <figure className={styles.photoWrap}>
          <Image
            src={camp_pic[0]?.photo_url}
            fill
            loading='lazy'
            placeholder='blur'
            blurDataURL={camp_pic[0]?.photo_url}
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
      <p className={styles.price}>
        {camp.camp_area_min_price === 0
          ? '무료'
          : `${camp.camp_area_min_price.toLocaleString()}원~`}
      </p>
    </Link>
  );
};

export default CampCard;
