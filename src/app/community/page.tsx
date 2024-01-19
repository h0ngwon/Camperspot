'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../api/db';
import CommSearch from './_components/CommSearch';
import CommPhoto from './_components/CommPhoto';
import CommHashTag from './_components/CommHashTag';
import { useSession } from 'next-auth/react';
import CommUser from './_components/CommUser';

export default function Page() {
  const { data: session } = useSession();

  const userId = session?.user.id as string;

  const { isLoading, isError, data } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      try {
        const { data: post, error } = await supabase
          .from('post')
          .select('*,post_pic(*),post_hashtag(*),user(nickname,profile_url)');

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

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <>
      <CommSearch />
      <Link href={`/community/${userId}/create`}>커뮤니티 글 등록</Link>
      <ul>
        {data?.map((item) => {
          return (
            <li key={item.id}>
              <CommPhoto photo={item.post_pic} />
              <p>{item.content}</p>
              <CommHashTag hashTag={item.post_hashtag} />
              <CommUser user={item.user} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
