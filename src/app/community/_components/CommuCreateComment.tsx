'use client';

import { supabase } from '@/app/api/db';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuid } from 'uuid';

import Loading from '@/app/loading';
import styles from '../_styles/CommuDetailModal.module.css';

type Props = {
  postId: string;
  userId: string;
};

export default function CommuCreateComment({ postId, userId }: Props) {
  const [content, setContent] = useState<string>('');

  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['comment'],
    queryFn: async () => {
      try {
        const { data: comment, error } = await supabase
          .from('comment')
          .select('*');

        if (error) {
          throw error;
        }

        return comment;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async () => {
      await supabase
        .from('comment')
        .insert({
          id: uuid(),
          content,
          post_id: postId,
          user_id: userId,
          created_at: new Date().toISOString(),
        })
        .select();
    },
    onSuccess: () => {
      toast.success('댓글이 등록되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['comment'],
      });
      setContent('');
    },
  });

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setContent(e.target.value);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addCommentMutation.mutate();
    } catch (error) {
      console.error('댓글 등록 중 에러 발생:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <form className={styles.submitWrap} onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='댓글 달기...'
        value={content}
        onChange={(e) => handleChangeInput(e)}
      />
      <button type='submit' disabled={!content.trim()}>
        등록
      </button>
    </form>
  );
}
