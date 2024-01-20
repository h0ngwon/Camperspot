'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../api/db';
import CommuSearch from './_components/CommuSearch';
import CommuPhotos from './_components/CommuPhotos';
import CommuHashTags from './_components/CommuHashTags';
import { useSession } from 'next-auth/react';
import CommuUsers from './_components/CommuUsers';

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
      <CommuSearch />
      <Link href={`/community/${userId}/create`}>커뮤니티 글 등록</Link>
      <ul>
        {data?.map((item) => {
          return (
            <li key={item.id}>
              <CommuPhotos photo={item.post_pic} />
              <p>{item.content}</p>
              <CommuHashTags hashTag={item.post_hashtag} />
              <CommuUsers user={item.user} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
