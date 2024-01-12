'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/api/db';
import { useParams } from 'next/navigation';

export default function LikeBtn() {
  const [liked, setLiked] = useState(false);
  const [campData, setCampData] = useState<any>(null); // camp 데이터를 저장할 상태

  const params = useParams();

  const user_Id = '3d5e2b35-98b2-4b85-aa9b-e0f134dfb5c9';

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

    // 사용자가 이미 해당 캠프를 좋아했는지 확인하고 liked 상태를 업데이트
    // const userLiked = camp[0]?.like.some((like) => like.user_id === user_Id);

    // setLiked(userLiked);
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행됩니다.
    fetchCampData();
  }, [params.id]); // params.id가 변경될 때마다 실행됩니다.

  const handleLikeBtn = async () => {
    try {
      if (liked) {
        // 이미 좋아요를 눌렀다면 취소
        await supabase
          .from('like')
          .delete()
          .match({ user_id: user_Id, camp_id: params.id });
      } else {
        // 좋아요를 누르지 않았다면 추가
        {
          if (typeof params.id === 'string') {
            await supabase.from('like').insert([
              {
                user_id: user_Id,
                camp_id: params.id,
              },
            ]);
          }
        }
      }
      setLiked((prevLiked) => !prevLiked);

      // 좋아요 상태 변경 후, 캠프 정보 다시 불러오기
      fetchCampData();
    } catch (error) {
      console.error('좋아요 상태를 업데이트하는 중 오류 발생', error);
    }
  };

  return (
    <>
      {campData?.map((item: any) => (
        <p key={item.id}>{item?.like.length}</p> // key를 추가하여 각 요소가 고유하도록 합니다.
      ))}
      <button onClick={handleLikeBtn}>
        {liked ? '좋아요 취소' : '좋아요'}
      </button>
    </>
  );
}
