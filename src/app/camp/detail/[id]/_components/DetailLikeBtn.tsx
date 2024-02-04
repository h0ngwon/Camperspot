'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/api/db';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import HeartSvg from '../_svg/HeartSvg';

import styles from '../_styles/Like.module.css';
import { toast } from 'react-toastify';

type Props = {
  campId: string;
  showCount: boolean;
};

export default function DetailLikeBtn({ campId, showCount }: Props) {
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const { data: session } = useSession();
  const userId = session?.user.id as string;

  const { isLoading, isError, data } = useQuery({
    queryKey: ['like', campId],
    queryFn: async () => {
      try {
        const { data: camp, error } = await supabase
          .from('camp')
          .select('id, like(user_id)')
          .eq('id', campId)
          .single();

        return camp;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (user_id: string) => {
      await supabase.from('like').delete().match({ user_id, camp_id: campId });
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
          user_id: userId,
          camp_id: campId,
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
    const fetchData = async () => {
      try {
        const { data: camp, error } = await supabase
          .from('camp')
          .select('id, like(user_id)')
          .eq('id', campId)
          .single();

        if (camp) {
          const result = camp.like?.some((item) => item.user_id === userId);
          setLiked(!!result);
          setLikeCount(camp.like?.length);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // 함수 호출 추가
  }, [data, campId, userId]); // data 대신 campId와 userId를 의존성 배열에 추가

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  const handleLikeBtn = async () => {
    if (!userId) return toast.error('로그인 후 이용해 주세요.');
    try {
      if (liked) {
        // 이미 좋아요를 눌렀다면 취소
        deleteMutation.mutate(userId);
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
        <HeartSvg isLiked={liked} />
      </button>
      {showCount && <p key={data?.id}>{likeCount}</p>}
    </div>
  );
}
