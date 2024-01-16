import React from 'react';
import Photo from './Photo';
import styles from '../_styles/CampList.module.css';
import { FaStar } from 'react-icons/fa';
import Hashtag from './Hashtag';
import Like from './Like';
import Link from 'next/link';

type Props = {
  data: {
    id: string;
    name: string;
    created_at: string;
    address: string;
    region: string;
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
  return (
    <>
      {data.data.map((camp) => {
        return (
          <Link
            href={`http://localhost:3000/camp/detail/${camp.id}`}
            className={styles.cardWrap}
            key={camp.id}
          >
            <div className={styles.photoAndLike}>
              <Like />
              <Photo />
            </div>
            {/**<section> 요소를 일반 컨테이너로 사용하지 마세요. 특히 단순한 스타일링이 목적이라면 <div> 요소를 사용해야 합니다. */}
            <div className={styles.cardMiddle}>
              <div className={styles.campInfoBox1}>
                <p>{camp.name}</p>
                <p>{camp.camp_area[0]?.price}</p>
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
            <ol className={styles.cardTag}>
              {/* <Hashtag tags={camp.hashtag} /> */}
            </ol>
          </Link>
        );
      })}
    </>
  );
};

export default CampList;
