'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { supabase } from '@/app/api/db';
import { v4 as uuid } from 'uuid';
import { toast, ToastContainer } from 'react-toastify';
import { isEmptyValue, sanitizeHashTag } from '../_lib/hashTag';
import CommuCreatePic from './CommuCreatePic';

import styles from '../_styles/CommuModal.module.css';
import CloseSvg from '../_svg/CloseSvg';
import 'react-toastify/dist/ReactToastify.css';

import type { Tables } from '@/types/supabase';

type Props = {
  onClose: () => void;
};

export default function CommuCreateModal({ onClose }: Props) {
  const [post, setPost] = useState<Tables<'post'>[]>();
  const [content, setContent] = useState<string>('');
  const [postPic, setPostPic] = useState<string[]>([]);
  const [inputHashTag, setInputHashTag] = useState<string>('');
  const [hashTags, setHashTags] = useState<string[]>([]);

  const postId = uuid();
  const { data: session } = useSession();

  const userEmail = session?.user?.email as string;
  const userImg = session?.user?.image as string;

  const MAX_HASHTAG_LENGTH = 20;

  // post 테이블에서 option 가져오는거
  async function fetchPostData() {
    const { data: post } = await supabase.from('post').select('*');
    if (post) {
      setPost(post);
    }
  }

  useEffect(() => {
    fetchPostData();
  }, []);

  function handleChangeInput(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.currentTarget.value);
  }

  // 캠핑장 이미지 업로드
  function handleChangeInputImageFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setPostPic((prev) => [...prev, URL.createObjectURL(file)]);
    }
  }

  // 버튼 클릭시 이미지 삭제
  const handleDeleteCampImg = (index: number) => {
    setPostPic(
      (prev) =>
        prev?.filter((_, idx) => {
          return index !== idx;
        }),
    );
  };

  // 해시태그
  const handleHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!['Enter', 'Space', 'NumpadEnter'].includes(e.code)) return;

    let newHashTag = sanitizeHashTag(e.currentTarget.value);

    if (hashTags.length >= 10 || newHashTag.length > MAX_HASHTAG_LENGTH) {
      return;
    }

    if (!isEmptyValue(newHashTag) && !hashTags.includes(newHashTag)) {
      setHashTags((prevHashTags) =>
        Array.from(new Set([...prevHashTags, newHashTag])),
      );
      setInputHashTag('');
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!['Enter', 'NumpadEnter'].includes(e.code)) return;
    e.preventDefault();

    const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
    if (!regExp.test(e.currentTarget.value)) setInputHashTag('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputHashTag(e.target.value);
  };

  const handleDeleteHashtag = (hashTag: string) => {
    setHashTags(
      hashTags.filter((item) => {
        return item !== hashTag;
      }),
    );
  };

  // 이미지 업로드 및 supabase에 저장
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // content가 비어있을 때
    if (!content.trim()) {
      toast.error('내용을 입력하세요.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // 이미지가 선택되지 않았을 때
    if (postPic.length === 0) {
      toast.error('이미지를 등록하세요.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const { data: user } = await supabase
      .from('user')
      .select('id')
      .eq('email', userEmail);
    if (!user) {
      return;
    }

    const userId = session?.user.id;

    try {
      // user_id를 가져오는 부분 수정
      const { data: user } = await supabase
        .from('user')
        .select('id')
        .eq('email', userEmail);

      if (!user || !user.length) {
        console.error('사용자 정보를 찾을 수 없습니다.');
        return;
      }

      // Supabase에 게시물 등록
      const { data: post } = await supabase
        .from('post')
        .insert({ id: postId, content, user_id: userId || '' }) // 기본값 설정
        .select();

      // 여러개 사진 table에 올리는 로직
      for (const item of postPic) {
        const blob = await fetch(item).then((r) => r.blob());
        const { data, error } = await supabase.storage
          .from('post_pic')
          .upload(window.URL.createObjectURL(blob), blob);

        if (error) {
          console.error('이미지 업로드 중 에러 발생:', error);
          return;
        }

        // Supabase 테이블에 이미지 정보 저장
        const BASE_URL =
          'https://kuxaffboxknwphgulogp.supabase.co/storage/v1/object/public/post_pic/';
        await supabase
          .from('post_pic')
          .insert({ post_id: postId, photo_url: BASE_URL + data?.path })
          .select();
      }

      // Supabase 테이블에 해시태그 정보 저장
      const { data: post_hashtag } = await supabase
        .from('post_hashtag')
        .insert(
          hashTags.map((item) => {
            return { post_id: postId, tag: item };
          }),
        )
        .select();

      if (post && post_hashtag) {
        // 성공적으로 등록되었을 때 알림
        toast.success('게시물이 성공적으로 등록되었습니다.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => setTimeout(() => window.location.reload(), 0),
        });
      }
    } catch (error) {
      console.error('폼 제출 중 에러 발생:', error);

      // 에러 발생 시 알림
      toast.error('게시물 등록 중 에러가 발생했습니다.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div onClick={onClose} className={styles.modalbg}></div>
      <div className={styles.modal}>
        <form onSubmit={handleSubmit}>
          <div className={styles.btn}>
            <button type='button' onClick={() => onClose()}>
              취소
            </button>
            <p>커뮤니티 등록</p>
            <button type='submit'>등록</button>
          </div>

          <div className={styles.register}>
            <div className={styles.modalSlide}>
              <CommuCreatePic
                postPic={postPic}
                handleDeleteCampImg={handleDeleteCampImg}
                handleChangeInputImageFile={handleChangeInputImageFile}
              />
            </div>

            <div className={styles.Con}>
              <div className={styles.user}>
                <Image src={userImg} alt='' width={32} height={32} />
                <p>{session!.user!.name}</p>
              </div>

              <div className={styles.textCon}>
                <label className={styles.blind}>Content</label>
                <textarea
                  value={content}
                  onChange={(e) => handleChangeInput(e)}
                  placeholder='문구를 입력하세요'
                />
              </div>

              <div className={styles.tagsCon}>
                <label className={styles.blind}>해시태그</label>
                <input
                  value={inputHashTag}
                  onChange={handleChange}
                  onKeyUp={handleHashTag}
                  onKeyDown={handleEnterKey}
                  placeholder='#해시태그를 등록해보세요. (최대 10개)'
                />
                {hashTags.map((hashTag) => {
                  return (
                    <span key={hashTag}>
                      # {hashTag}
                      <button
                        type='button'
                        onClick={() => handleDeleteHashtag(hashTag)}
                      >
                        <CloseSvg />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
