import React from 'react';
import Photo from './Photo';
import styles from './campList.module.css';
import { FaStar } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import Hashtag from './Hashtag';
import Like from './Like';

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
  return (
    <>
      {data.data.map((d) => {
        return (
          <div className={styles.cardWrap} key={d.id}>
            <div className={styles.photoAndLike}>
              <Like />
              <Photo />
            </div>
            {/**<section> 요소를 일반 컨테이너로 사용하지 마세요. 특히 단순한 스타일링이 목적이라면 <div> (en-US) 요소를 사용해야 합니다. */}
            <div className={styles.cardMiddle}>
              <p>{d.name}</p>
              <p>{d.camp_area[0]?.price}</p>
            </div>
            <div className={styles.cardMiddle}>
              <p>
                <FaStar size='15' color='#fff384' /> 평점(리뷰수)
              </p>
              <p>{d.address}</p>
            </div>
            <ol className={styles.cardTag}>
              {/* <Hashtag tags={d.hashtag} /> */}
            </ol>
          </div>
        );
      })}
    </>
  );
};

export default CampList;
