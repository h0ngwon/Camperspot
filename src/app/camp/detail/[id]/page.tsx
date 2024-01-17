'use client';

import { useParams } from 'next/navigation';
import { supabase } from '@/app/api/db';
import { useQuery } from '@tanstack/react-query';
import KakaoMap from './_components/KakaoMap';
import DetailShareBtn from './_components/DetailShareBtn';
import DetailLikeBtn from './_components/DetailLikeBtn';
import DetailReview from './_components/DetailReview';
import DetailImg from './_components/DetailImg';
import DetailHashtag from './_components/DetailHashtag';
import DetailCampZone from './_components/DetailCampZone';
import DetailFacility from './_components/DetailFacility';

import styles from './_styles/Detail.module.css';

export default function DetailPage() {
  const params = useParams() as { id: string };

  const { isLoading, isError, data } = useQuery({
    queryKey: ['camp', params.id],
    queryFn: async () => {
      try {
        const { data: camp, error } = await supabase
          .from('camp')
          .select(
            '*,camp_pic(photo_url),hashtag(tag),camp_facility(*,facility(*)),camp_area(*),review(*)',
          )
          .eq('id', params.id)
          .single();

        if (error) {
          console.log(error);
        }
        return camp;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const avg = () => {
    const star = data?.review;

    if (star && star.length > 0) {
      let average =
        star.reduce((acc, cur) => acc + cur.rating, 0) / star.length;

      return average;
    } else {
      return 0;
    }
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div className={styles.container}>
      <DetailImg campPic={data?.camp_pic} />
      <div className={styles.titleWrap}>
        <h3>{data?.name}</h3>
        <div className={styles.BtnWrap}>
          <DetailLikeBtn />
          <DetailShareBtn />
        </div>
      </div>
      <p>{data?.address}</p>
      <p>
        ★{avg().toFixed(1)}({data?.review.length})
      </p>
      <h4>해시태그</h4>
      <DetailHashtag campHashtag={data?.hashtag} />
      <p>{data?.content}</p>
      <h4>시설정보</h4>
      <DetailFacility campFacilty={data?.camp_facility} />
      <h4>캠핑존</h4>
      <DetailCampZone campArea={data} />
      <h4>위치</h4>
      <KakaoMap />
      <h4>리뷰</h4>
      <DetailReview review={data?.review} />
    </div>
  );
}
