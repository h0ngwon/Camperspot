import React from 'react';
import styles from '../_styles/CampList.module.css';
import { FaStar } from 'react-icons/fa';
import Hashtag from './Hashtag';
import Link from 'next/link';
import Photo from './Photo';
import Spacer from '@/components/Spacer';

type Props = {
  data: {
    id: string;
    name: string;
    created_at: string;
    address: string;
    camp_area: { price: number; id: string }[];
    camp_pic: { id: string; photo_url: string }[];
    hashtag: { tag: string | null }[];
  }[];
};

const CampList = (data: Props) => {
  // data.data?.forEach((d, i) => console.log(i, d.hashtag));
  // console.log(data.data?.[9].hashtag);
  // console.log(data.data);
  //++++++++++++++++++++++++메타태그심어주기
  console.log(data.data[0]?.camp_pic);
  return (
    <>
      {data.data.map((camp) => {
        return (
          <div className={styles.cardWrap} key={camp.id}>
            <Link href={`http://localhost:3000/camp/detail/${camp.id}`}>
              <div className={styles.photoAndLike}>
                <Photo photos={camp.camp_pic} />
              </div>
              <Spacer y={30} />
              <div className={styles.cardMiddle}>
                <div className={styles.campInfoBox1}>
                  <p>{camp.name}</p>
                  <p>
                    {camp.camp_area[0]?.price === 0
                      ? '무료'
                      : `${camp.camp_area[0]?.price.toLocaleString()}원~`}
                  </p>
                </div>
              </div>
              <div className={styles.cardMiddle}>
                <div className={styles.campInfoBox2}>
                  <p>
                    <FaStar size='15' color='#fff384' /> 평점(리뷰수)
                  </p>
                  <p>{camp.address}</p>
                </div>
              </div>
            </Link>
            <ol className={styles.cardTag}>
              <Hashtag tags={camp.hashtag} />
            </ol>
          </div>
        );
      })}
    </>
  );
};

export default CampList;
