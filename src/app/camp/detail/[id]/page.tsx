'use client';

import { supabase } from '@/app/api/db';
import KakaoMap from './_components/KakaoMap';
import LikeBtn from './_components/LikeBtn';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DetailPage() {
  const [camp, setCamp] = useState<any>('');

  const params = useParams();

  useEffect(() => {
    supabase
      .from('camp')
      .select('*, camp_pic(photo_url), camp_area(price), hashtag(tag)')
      .eq('id', params.id)
      .single()
      .then((response: any) => setCamp(response.data));
  }, []);

  console.log(camp);

  return (
    <>
      <p>{camp.name}</p>
      <LikeBtn />
      <KakaoMap />
    </>
  );
}
