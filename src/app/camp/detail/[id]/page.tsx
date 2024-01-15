'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/api/db';
import { useParams } from 'next/navigation';
import KakaoMap from './_components/KakaoMap';
import DetailShareBtn from './_components/DetailShareBtn';
import DetailLikeBtn from './_components/DetailLikeBtn';
import DetailReview from './_components/DetailReview';

export default function DetailPage() {
  const [camp, setCamp] = useState<any>('');

  const params = useParams();

  useEffect(() => {
    supabase
      .from('camp')
      .select('name')
      .eq('id', params.id)
      .single()
      .then((response: any) => setCamp(response.data));
  }, []);

  return (
    <>
      <p>{camp?.name}</p>
      <DetailLikeBtn />
      <DetailShareBtn />
      <KakaoMap />
      <p>리뷰</p>
      <DetailReview />
    </>
  );
}
