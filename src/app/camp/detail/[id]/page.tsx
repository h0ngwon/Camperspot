'use client';

import { supabase } from '@/app/api/db';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import DetailAddress from './_components/DetailAddress';
import DetailCampZone from './_components/DetailCampZone';
import DetailFacility from './_components/DetailFacility';
import DetailHashtags from './_components/DetailHashtags';
import DetailImg from './_components/DetailImg';
import DetailLikeBtn from './_components/DetailLikeBtn';
import DetailReviews from './_components/DetailReviews';
import DetailShareBtn from './_components/DetailShareBtn';
import KakaoMap from './_components/KakaoMap';

import Loading from '@/app/loading';
import DetailAvg from './_components/DetailAvg';
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
    return <Loading />;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div className={styles.container}>
      <DetailImg campPic={data?.camp_pic} />
      <div className={styles.con}>
        <div className={styles.titleWrap}>
          <h3>{data?.name}</h3>
          <div className={styles.BtnWrap}>
            <DetailLikeBtn campId={params.id} showCount={true} />
            <DetailShareBtn />
          </div>
        </div>
        <DetailAddress address={data?.address} />
        <DetailAvg reviewAvg={data?.review} />
        <DetailHashtags campHashtag={data?.hashtag} />
      </div>
      <div className={styles.con}>
        <h4>시설정보</h4>
        <DetailFacility campFacilty={data?.camp_facility} />
      </div>
      <div className={styles.con}>
        <h4>캠핑장 소개</h4>
        <p className={styles.campInfo}>{data?.content}</p>
      </div>
      <div className={styles.con}>
        <h4>캠핑존</h4>
        <DetailCampZone campArea={data} />
      </div>
      <div className={styles.con}>
        <h4>위치</h4>
        <KakaoMap campAddress={data?.address} />
      </div>
      <h4>리뷰 및 평가</h4>
      <DetailAvg reviewAvg={data?.review} />
      <DetailReviews review={data?.review} />
    </div>
  );
}
