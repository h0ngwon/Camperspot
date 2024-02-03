'use client';

import React from 'react';
import { supabase } from '@/app/api/db';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export default function CommuComments() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['comment'],
    queryFn: async () => {
      try {
        const { data: comment, error } = await supabase
          .from('comment')
          .select('*,user(*)');

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

  const formatCreatedAt = (createdAt: string): string => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <ul>
      {data?.map((item) => {
        return (
          <li key={item.id}>
            {item?.user?.profile_url && (
              <Image
                src={item.user.profile_url}
                alt=''
                width={12}
                height={12}
              />
            )}
            <span>{item?.user?.nickname}</span>
            <p>{item.content}</p>
            <span>{formatCreatedAt(item.created_at)}</span>
          </li>
        );
      })}
    </ul>
  );
}
