'use client';
import React, { useEffect } from 'react';
import styles from '../_styles/CampList.module.css';
import { FaStar } from 'react-icons/fa';
import Hashtag from './Hashtag';
import Link from 'next/link';
import Photo from './Photo';
import Spacer from '@/components/Spacer';
import DetailLikeBtn from '../detail/[id]/_components/DetailLikeBtn';
import type { ParamsCamp, SearchCamp } from '@/types/campList';

type Props = {
  campList: SearchCamp | ParamsCamp;
};
const CampList = ({ campList }: Props) => {
  return (
    <>
      {campList?.map((camp) => {
        const camp_pic = camp.camp_pic as Array<{
          id: string;
          photo_url: string;
        }>;
        // const camp_area_price = camp.camp_area_price;
        const hashtag = (camp.hashtag as Array<{ tag: string }>)?.map(
          (tag) => tag.tag,
        );
        return (
          <div className={styles.cardWrap} key={camp.id}>
            <Link href={`/camp/detail/${camp.id}`}>
              <div className={styles.photoAndLike}>
                <Photo photos={camp_pic} />
              </div>
              <Spacer y={30} />
              <div className={styles.cardMiddle}>
                <div className={styles.campInfoBox1}>
                  <p>{camp.name}</p>
                  {/* <p>
                    {camp_area_price === 0
                      ? '무료'
                      : `${camp_area_price?.toLocaleString()}원~`}
                  </p> */}
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
            <DetailLikeBtn campId={camp.id} />
            <ul className={styles.cardTag}>
              <Hashtag tags={hashtag} />
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default CampList;
