'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { supabase } from '@/app/api/db';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

type Props = {
  onClose: () => void;
  postId: string;
};

export default function CommuEditModal({ onClose, postId }: Props) {
  const [contentEdit, setContentEdit] = useState<string>('');

  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      try {
        const { data: post, error } = await supabase
          .from('post')
          .select('*,post_pic(*),post_hashtag(*),user(id,nickname,profile_url)')
          .eq('id', postId)
          .single();

        if (error) {
          throw error;
        }

        return post;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  useEffect(() => {
    setContentEdit(data!.content);
  }, []);

  const updateMutation = useMutation({
    mutationFn: async () => {
      await supabase
        .from('post')
        .update({ content: contentEdit })
        .eq('id', postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
    onError: (error) => {
      console.error('뮤테이션 에러:', error);
    },
  });

  // 사용자가 폼을 제출할 때 이 함수를 호출합니다.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 데이터베이스의 게시글을 업데이트합니다.
    try {
      updateMutation.mutate();
    } catch (error) {}
    onClose();
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label></label>
      </div>
      <div>
        <div>
          <Image src={data!.user!.profile_url} alt='' width={32} height={32} />
          <p>{data!.user!.nickname}</p>
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={contentEdit}
            onChange={(e) => setContentEdit(e.target.value)}
            placeholder='문구를 입력하세요'
          />
        </div>
      </div>
      <button type='button' onClick={() => onClose()}>
        취소
      </button>
      <button type='submit'>글 수정하기</button>
    </form>
  );
}
