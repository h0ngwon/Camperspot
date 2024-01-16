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

export default function DetailPage() {
  const params = useParams() as { id: string };

  const { isLoading, isError, data } = useQuery({
    queryKey: ['camp', params.id],
    queryFn: async () => {
      try {
        const { data: camp, error } = await supabase
          .from('camp')
          .select(
            '*,camp_pic(photo_url),hashtag(tag),camp_facility(facility(*)),camp_area(*),review(*)',
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
      let sum = star.reduce((acc, item) => acc + item.rating, 0);
      let average = sum / star.length;
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
    <>
      <DetailImg campPic={data?.camp_pic} />
      <p>{data?.name}</p>
      <p>{data?.address}</p>
      <p>
        ★{avg().toFixed(1)}({data?.review.length})
      </p>
      <DetailHashtag campHashtag={data?.hashtag} />
      <p>{data?.content}</p>
      <DetailLikeBtn />
      <DetailShareBtn />
      <h4>시설정보</h4>

      <h4>캠핑존</h4>
      <DetailCampZone campArea={data} />
      <h4>위치</h4>
      <KakaoMap />
      <p>리뷰</p>
      <DetailReview review={data?.review} />
    </>
  );
}
