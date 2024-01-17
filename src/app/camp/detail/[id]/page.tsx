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
import DetailAvg from './_components/DetailAvg';

import styles from './_styles/Detail.module.css';
import LocationSvg from './_svg/LocationSvg';

export default function DetailPage() {
  const params = useParams() as { id: string };

  const { isLoading, isError, data } = useQuery({
    queryKey: ['camp', params.id],
    queryFn: async () => {
      try {
        const { data: camp, error } = await supabase
          .from('camp')
          .select(
            '*,camp_pic(photo_url),hashtag(tag),camp_facility(*,facility(*)),camp_area(*),review(*,user(nickname,profile_url))',
          )
          .eq('id', params.id)
          .single();

        if (error) {
          throw error;
        }

        return camp;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

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
      <LocationSvg />
      <p>{data?.address}</p>
      <DetailAvg reviewAvg={data?.review} />
      <h4>해시태그</h4>
      <DetailHashtag campHashtag={data?.hashtag} />
      <p>{data?.content}</p>
      <h4>시설정보</h4>
      <DetailFacility campFacilty={data?.camp_facility} />
      <h4>캠핑존</h4>
      <DetailCampZone campArea={data} />
      <h4>위치</h4>
      <KakaoMap />
      <h4>리뷰 및 평가</h4>
      <DetailAvg reviewAvg={data?.review} />
      <DetailReview review={data?.review} />
    </div>
  );
}
