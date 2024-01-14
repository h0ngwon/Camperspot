'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/api/db';
import { useParams } from 'next/navigation';
import KakaoMap from './_components/KakaoMap';
import DetailShareBtn from './_components/DetailShareBtn';
import DetailLikeBtn from './_components/DetailLikeBtn';

export default function DetailPage() {
  const [camp, setCamp] = useState<any>('');

  const params = useParams();

  useEffect(() => {
    supabase
      .from('camp')
      .select('*')
      .eq('id', params.id)
      .single()
      .then((response: any) => setCamp(response.data));
  }, []);

  // console.log(camp);

  return (
    <>
      <p>{camp.name}</p>
      <DetailLikeBtn />
      <DetailShareBtn />
      <KakaoMap />
    </>
  );
}
