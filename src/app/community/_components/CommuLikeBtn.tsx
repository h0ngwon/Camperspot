'use client';

import { supabase } from '@/app/api/db';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import styles from '@/app/camp/detail/[id]/_styles/Like.module.css';
import HeartSvg from '@/app/camp/detail/[id]/_svg/HeartSvg';
import Loading from '@/app/loading';

type Props = {
  postId: string;
  userId: string;
};

export default function CommuLikeBtn({ postId, userId }: Props) {
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['like', postId],
    queryFn: async () => {
      try {
        const { data: post, error } = await supabase
          .from('post')
          .select('id, like(user_id)')
          .eq('id', postId)
          .single();

        return post;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (user_id: string) => {
      await supabase.from('like').delete().match({ user_id, post_id: postId });
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
          post_id: postId,
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
        const { data: post, error } = await supabase
          .from('post')
          .select('id, like(user_id)')
          .eq('id', postId)
          .single();

        if (post) {
          const result = post.like?.some((item) => item.user_id === userId);
          setLiked(!!result);
          setLikeCount(post.like?.length);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // 함수 호출 추가
  }, [data, postId, userId]); // data 대신 postId와 userId를 의존성 배열에 추가

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  const handleLikeBtn = async () => {
    try {
      if (!userId) {
        toast.error('로그인 후 이용해 주세요.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      if (liked) {
        // 이미 좋아요를 눌렀다면 취소
        deleteMutation.mutate(userId);
      } else {
        // 좋아요를 누르지 않았다면 추가
        addMutation.mutate();
      }
      setLiked((prevLiked) => !prevLiked);

      // 좋아요 상태 변경 후, 캠프 정보 다시 불러오기
    } catch (error) {
      console.error('좋아요 상태를 업데이트하는 중 오류 발생', error);
    }
  };

  return (
    <div className={styles.commuWrap}>
      <button className={styles.btn} onClick={handleLikeBtn}>
        <HeartSvg isLiked={liked} />
      </button>
      <p key={data?.id}>
        좋아요 <span>{likeCount}</span>개
      </p>
    </div>
  );
}
