'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../api/db';
import CommuPhotos from './_components/CommuPhotos';
import CommuHashTags from './_components/CommuHashTags';
import CommuUsers from './_components/CommuUsers';
import CommuLikeBtn from './_components/CommuLikeBtn';

import styles from './_styles/Commu.module.css';
import CreateSvg from './_svg/CreateSvg';

export default function CommunityPage() {
  const { data: session } = useSession();
  const userId = session?.user.id as string;

  const { isLoading, isError, data } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      try {
        const { data: post, error } = await supabase
          .from('post')
          .select('*,post_pic(*),post_hashtag(*),user(id,nickname,profile_url)')
          .order('created_at', { ascending: false });

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
      <div className={styles.container}>
        <div className={styles.createBtn}>
          <Link href={`/community/${userId}/create`}>
            <CreateSvg />
          </Link>
        </div>
        <ul>
          {data?.map((item) => {
            return (
              <li className={styles.card} key={item.id}>
                <CommuUsers user={item.user} postId={item.id} data={item} />
                <CommuPhotos photo={item.post_pic} />
                <CommuLikeBtn postId={item.id} />
                <p className={styles.content}>{item.content}</p>
                <CommuHashTags hashTag={item.post_hashtag} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
