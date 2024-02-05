'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../api/db';
import { toast } from 'react-toastify';
import Image from 'next/image';
import CommuPhotos from './_components/CommuPhotos';
import CommuHashTags from './_components/CommuHashTags';
import CommuUsers from './_components/CommuUsers';
import CommuBtns from './_components/CommuBtns';
import CommuCreateModal from './_components/CommuCreateModal';
import CommuDetailModal from './_components/CommuDetailModal';

import styles from './_styles/Commu.module.css';
import CampingImg from '@/asset/camping_illust.jpg';
import CreateSvg from './_svg/CreateSvg';

export default function CommunityPage() {
  const [isCommuCreateModal, setIsCommuCreateModal] = useState<boolean>(false);

  const { data: session } = useSession();
  const userId = session?.user.id as string;

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      try {
        const { data: post, error } = await supabase
          .from('post')
          .select(
            '*,post_pic(*),post_hashtag(*),user(id,nickname,profile_url),comment(id)',
          )
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

  const handleCreateModalOpen = () => {
    // 로그인 상태에서만 모달을 열도록 체크
    if (session) {
      setIsCommuCreateModal(true);
    } else {
      toast.error('로그인 후 이용해 주세요.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.createBtn} onClick={handleCreateModalOpen}>
          <CreateSvg />
        </div>
        {isCommuCreateModal && (
          <CommuCreateModal onClose={() => setIsCommuCreateModal(false)} />
        )}
        {post && post.length === 0 && (
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
          {post?.map((item) => {
            return (
              <li className={styles.card} key={item.id}>
                <CommuUsers user={item.user} data={item} />
                <CommuPhotos photo={item.post_pic} />
                <CommuBtns data={item} userId={userId} />
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
