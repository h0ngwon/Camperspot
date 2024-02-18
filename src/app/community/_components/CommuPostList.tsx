import React, { useEffect, useRef } from 'react';
import { supabase } from '@/app/api/db';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import CommuHashTags from '../_components/CommuHashTags';
import CommuPhotos from '../_components/CommuPhotos';
import CommuUsers from '../_components/CommuUsers';
import CommuBtns from '../_components/CommuBtns';
import Loading from '@/app/loading';

import styles from '../_styles/Commu.module.css';
import CampingImg from '@/asset/camping_illust.jpg';

type Props = {
  userId: string;
};

const fetchPage = async (pageParam: number) => {
  const from = pageParam * 3;
  const to = from + 2;
  try {
    const { data: post, error } = await supabase
      .from('post')
      .select(
        '*,post_pic(*),post_hashtag(*),user(id,nickname,profile_url),comment(id)',
      )
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return post;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default function CommuPostList({ userId }: Props) {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => fetchPage(pageParam),
    getNextPageParam: (lastPage, allpages) =>
      lastPage.length ? allpages.length : undefined,
    initialPageParam: 0,
  });

  const anchorRef_main = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer_main = new IntersectionObserver( // 교차로 관찰자 API
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );
    if (anchorRef_main.current) {
      observer_main.observe(anchorRef_main.current);
    }
    return () => observer_main.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, anchorRef_main]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <>
      {data && data.pages.length === 0 && (
        <div className={styles.noPosts}>
          <Image
            className={styles.img}
            src={CampingImg}
            alt='image'
            width={700}
            height={550}
          />
          <p>등록된 글이 없습니다.</p>
        </div>
      )}
      <ul>
        {data?.pages.map((page, pageIndex) =>
          page.map((item) => (
            <li className={styles.card} key={item.id}>
              <CommuUsers user={item.user} data={item} />
              <CommuPhotos photo={item.post_pic} />
              <CommuBtns data={item} userId={userId} />
              <p className={styles.content}>{item.content}</p>
              <CommuHashTags hashTag={item.post_hashtag} />
            </li>
          )),
        )}
      </ul>
      <div ref={anchorRef_main}></div>
    </>
  );
}
