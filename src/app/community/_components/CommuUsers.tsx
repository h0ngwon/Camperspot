import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/api/db';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

import styles from '../_styles/CommuUser.module.css';
import MoreSvg from '../_svg/MoreSvg';
import CommuEditModal from './CommuEditModal';

type Props = {
  user: { id: string; nickname: string; profile_url: string | null } | null;
  data: {
    content: string;
    created_at: string;
    id: string;
    user_id: string;
    post_pic: { id: string; photo_url: string; post_id: string }[];
    post_hashtag: { id: string; post_id: string; tag: string }[];
    user: { id: string; nickname: string; profile_url: string | null } | null;
  };
};

export default function CommuUser({ user, data }: Props) {
  const [isMoreBtn, setIsMoreBtn] = useState<boolean>(false);
  const [isCommuEditModal, setIsCommuEditModal] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data: session } = useSession();
  const userId = session?.user.id as string;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (user) {
        await supabase
          .from('post')
          .delete()
          .eq('user_id', userId)
          .match({ id: data.id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });

  const handleOnClick = () => {
    if (user?.id === userId) {
      setIsMoreBtn(!isMoreBtn);
    }
  };

  const handleDeletedBtn = () => {
    try {
      if (user?.id === userId) {
        deleteMutation.mutate();
      } else {
        console.warn('삭제할 수 있는 권한이 없습니다.');
      }
    } catch (error) {
      console.error('커뮤니티게시글 삭제 중 오류 발생', error);
    }
  };

  const handleCancelBtn = () => {
    setIsMoreBtn(false);
  };

  const toggleBodyOverflow = (overflow: 'hidden' | 'auto') => {
    document.body.style.overflow = overflow;
  };

  useEffect(() => {
    if (isCommuEditModal || isMoreBtn) {
      toggleBodyOverflow('hidden');
    } else {
      toggleBodyOverflow('auto');
    }
  }, [isCommuEditModal, isMoreBtn]);

  return (
    <div className={styles.userWrap}>
      <div className={styles.user}>
        <Image src={user?.profile_url!} alt='' width={32} height={32} />
        <p>{user?.nickname}</p>
      </div>
      <div className={styles.more}>
        <button onClick={handleOnClick}>
          <MoreSvg />
        </button>
        {isMoreBtn ? (
          <div onClick={handleCancelBtn} className={styles.btnsWrap}>
            <div className={styles.btns}>
              <button onClick={() => setIsCommuEditModal(true)}>수정</button>
              <button onClick={handleDeletedBtn}>삭제</button>
              <button onClick={handleCancelBtn}>취소</button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      {isCommuEditModal && (
        <CommuEditModal
          onClose={() => setIsCommuEditModal(false)}
          allClose={handleCancelBtn}
          postId={data.id}
          data={data}
        />
      )}
    </div>
  );
}
