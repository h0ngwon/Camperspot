'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { supabase } from '@/app/api/db';
import { useMutation, useQuery } from '@tanstack/react-query';
import HeartSvg from '@/app/camp/detail/[id]/_svg/HeartSvg';

import styles from '../_styles/Like.module.css';

export default function CommLikeBtns() {
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const params = useParams() as { id: string };

  const { data: session } = useSession();
  const user_Id = '3d5e2b35-98b2-4b85-aa9b-e0f134dfb5c9';

  const { isLoading, isError, data } = useQuery({
    queryKey: ['like'],
    queryFn: async () => {
      try {
        const { data: post, error } = await supabase
          .from('post')
          .select('id, like(user_id)')
          .eq('id', params.id)
          .single();

        return post;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (user_id: string) => {
      await supabase
        .from('like')
        .delete()
        .match({ user_id, post_id: params.id });
    },
    onSuccess: () => {
      setLikeCount((prev) => prev - 1);
    },
    onError: (error) => {
      console.error('뮤테이션 에러:', error);
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      try {
        await supabase.from('like').insert({
          user_id: user_Id,
          post_id: params.id,
        });
      } catch (error) {
        console.error('좋아요 추가 중 에러 발생:', error);
      }
    },
    onSuccess: () => {
      setLikeCount((prev) => prev + 1);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (data) {
      const result = data.like?.some((item) => item.user_id === user_Id);
      setLiked(!!result);
      setLikeCount(data.like?.length);
    }
  }, [data]);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  const handleLikeBtn = async () => {
    try {
      if (liked) {
        // 이미 좋아요를 눌렀다면 취소
        deleteMutation.mutate(user_Id);
      } else {
        // 좋아요를 누르지 않았다면 추가
        addMutation.mutate();
      }
      setLiked((prevLiked) => !prevLiked);

      // 좋아요 상태 변경 후, 캠프 정보 다시 불러오기
      // fetchCampData();
    } catch (error) {
      console.error('좋아요 상태를 업데이트하는 중 오류 발생', error);
    }
  };

  return (
    <div className={styles.wrap}>
      <button className={styles.btn} onClick={handleLikeBtn}>
        <HeartSvg filled={liked} strokeColor='#eee' fillColor='#FF0000' />
      </button>
      <p key={data?.id}>{likeCount}</p>
    </div>
  );
}
