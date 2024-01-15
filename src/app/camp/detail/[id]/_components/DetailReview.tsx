'use client';

import { useEffect } from 'react';
import { supabase } from '@/app/api/db';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function DetailReview() {
  const params = useParams() as { id: string };

  const { isLoading, isError, data } = useQuery({
    queryKey: ['review'],
    queryFn: async () => {
      try {
        const { data: camp, error } = await supabase
          .from('camp')
          .select('id, review(*)')
          .eq('id', params.id)
          .single();

        return camp;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const reviewData = data?.review;

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div>
      {reviewData ? (
        reviewData.map((review) => (
          <div key={review.id}>
            <p>{review.title}</p>
            <p>{review.content}</p>
            <p>별점</p>
            <p>{review.rating}</p>
            <p>유저</p>
            <p>{review.user_id}</p>
          </div>
        ))
      ) : (
        <p>리뷰 정보 없음</p>
      )}
    </div>
  );
}
