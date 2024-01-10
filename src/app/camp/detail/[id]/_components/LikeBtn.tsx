'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/api/db';
import { useParams } from 'next/navigation';
import { Tables } from '@/types/supabase';

export default function LikeBtn() {
  const [liked, setLiked] = useState(false);
  const [campData, setCampData] = useState<any | null>([]); // camp 데이터를 저장할 상태

  const params = useParams();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행됩니다.
    const fetchCampData = async () => {
      let { data: camp, error } = await supabase
        .from('camp')
        .select('id,like(user_id)')
        .eq('id', params.id);

      if (error) {
        console.error('Error fetching camp data', error);
      } else {
        setCampData(camp);
      }
    };

    fetchCampData();
  }, [params.id]); // params.id가 변경될 때마다 실행됩니다.

  const handleLikeBtn = async () => {
    // 좋아요 버튼을 처리하는 로직을 여기에 추가합니다.
  };

  return (
    <>
      {campData?.map((item: any) => (
        <p key={item.id}>{item?.like.length}</p> // key를 추가하여 각 요소가 고유하도록 합니다.
      ))}
      <button onClick={handleLikeBtn}>좋아요</button>
    </>
  );
}
