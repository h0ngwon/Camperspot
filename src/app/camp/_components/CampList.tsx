'use client';
import styles from '../_styles/CampList.module.css';
import { FaStar } from 'react-icons/fa';
import Hashtag from './Hashtag';
import Link from 'next/link';
import Photo from './Photo';
import Spacer from '@/components/Spacer';
import DetailLikeBtn from '../detail/[id]/_components/DetailLikeBtn';
import type { ParamsCamp, SearchCamp } from '@/types/campList';
import { useSearchParams } from 'next/navigation';
import AddressSvg from '@/app/_svg/AddressSvg';

type Props = {
  campList: ParamsCamp | SearchCamp;
};
const CampList = ({ campList }: Props) => {
  const param = useSearchParams().get('sort');
  return (
    <>
      {campList.map((camp) => {
        const reviewAverage = Math.ceil(camp.review_average * 100) / 100;
        const camp_pic = camp.camp_pic as Array<{
          id: string;
          photo_url: string;
        }>;

        const hashtag = (camp.hashtag as Array<{ tag: string }>)?.map(
          (tag) => tag.tag,
        );
        return (
          <div className={styles.cardWrap} key={camp.id}>
            <Link href={`/camp/detail/${camp.id}`}>
              <div className={styles.photoAndLike}>
                <Photo photos={camp_pic} />
              </div>

              <div className={styles.campInfo}>
                {camp.review_count === null ? (
                  <p>
                    <FaStar size='15' color='#fff384' />
                    0(0)
                  </p>
                ) : (
                  <p>
                    <FaStar size='15' color='#fff384' /> {reviewAverage}(
                    {camp.review_count})
                  </p>
                )}
                <p className={styles.campTitle}>{camp.name}</p>
                <div className={styles.campAddress}>
                  <AddressSvg width={'16'} height={'17'} />
                  <p>{camp.address}</p>
                </div>

                {param === '높은가격순' ? (
                  <p className={styles.campPrice}>
                    {camp.camp_area_max_price === 0
                      ? '무료'
                      : `${camp.camp_area_max_price?.toLocaleString()}원~`}
                  </p>
                ) : (
                  <p className={styles.campPrice}>
                    {camp.camp_area_min_price === 0
                      ? '무료'
                      : `${camp.camp_area_min_price?.toLocaleString()}원~`}
                  </p>
                )}
              </div>
            </Link>
            <ul className={styles.cardTag}>
              <Hashtag tags={hashtag} />
            </ul>

            <div className={styles.likeWrap}>
              <DetailLikeBtn campId={camp.id} showCount={false} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CampList;
