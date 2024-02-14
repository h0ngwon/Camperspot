'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { supabase } from '@/app/api/db';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import CommuEditPic from './CommuPic';
import { isEmptyValue, sanitizeHashTag } from '../_lib/hashTag';

import styles from '../_styles/CommuModal.module.css';
import CloseSvg from '../_svg/CloseSvg';

type Props = {
  onClose: () => void;
  allClose: () => void;
  postId: string;
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

type PostPic = {
  id: string;
  photo_url: string;
  post_id: string;
  created_at?: string;
};

type PostHashTag = {
  id: string;
  tag: string;
  post_id: string;
  created_at?: string;
};

export default function CommuEditModal({
  onClose,
  allClose,
  postId,
  data,
}: Props) {
  const [contentEdit, setContentEdit] = useState<string>('');
  const [postPicEdit, setPostPicEdit] = useState<PostPic[]>([]);
  const [inputHashTagEdit, setInputHashTagEdit] = useState<string>('');
  const [hashTagsEdit, setHashTagsEdit] = useState<PostHashTag[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      setContentEdit(data!.content);
      setPostPicEdit(data!.post_pic);
      setHashTagsEdit(data!.post_hashtag);
    }
  }, [data]);

  // 캠핑장 이미지 업로드
  async function handleChangeInputImageFile(e: ChangeEvent<HTMLInputElement>) {
    const BASE_URL =
      'https://kuxaffboxknwphgulogp.supabase.co/storage/v1/object/public/post_pic/';

    if (e.target.files) {
      const files = Array.from(e.target.files);

      try {
        // 여러 이미지를 동시에 업로드
        const uploadPromises = files.map(async (file) => {
          const { data, error } = await supabase.storage
            .from('post_pic')
            .upload(URL.createObjectURL(file), file);

          if (error) {
            console.error('이미지 업로드 오류:', error);
            throw error;
          }

          // Supabase에서 업로드된 이미지의 URL 얻기
          const photo_url = BASE_URL + data.path;

          return {
            id: uuid(),
            photo_url: photo_url,
            post_id: postId,
          };
        });

        // 여러 이미지의 업로드가 완료된 후 상태 업데이트
        const newElements = await Promise.all(uploadPromises);
        setPostPicEdit((prev) => [...prev, ...newElements]);
      } catch (error) {
        console.error('Supabase 스토리지 오류:', error);
      }
    }
  }

  // 이미지 삭제  수정
  const handleDeleteCampImg = async (index: number) => {
    // 삭제할 이미지 정보 가져오기
    const deletedImage = postPicEdit[index];

    // 이미지 삭제
    if (deletedImage) {
      try {
        // 삭제할 이미지의 id가 있는 경우에만 Supabase에서 삭제 요청
        await supabase.from('post_pic').delete().eq('id', postId);

        // 상태 업데이트: 삭제할 이미지를 제외한 나머지 이미지만 남깁니다.
        setPostPicEdit((prev) => prev.filter((_, idx) => idx !== index));
      } catch (error) {
        console.error('이미지 삭제 오류:', error);
      }
    }
  };

  // 해시태그 수정
  const handleDeleteHashtag = (hashTag: string) => {
    setHashTagsEdit((prevHashTags) => {
      const updatedHashTags = prevHashTags.filter(
        (item) => item.tag !== hashTag,
      );
      return updatedHashTags;
    });
  };

  const handleHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!['Enter', 'Space', 'NumpadEnter'].includes(e.code)) return;

    let newHashTag = sanitizeHashTag(e.currentTarget.value);

    if (isEmptyValue(e.currentTarget.value.trim())) {
      return setInputHashTagEdit('');
    }

    if (hashTagsEdit.length >= 10 || newHashTag.length > 20) {
      return;
    }

    // 중복 체크
    if (hashTagsEdit.some((tag) => tag.tag === newHashTag)) {
      return setInputHashTagEdit('');
    }

    setHashTagsEdit((prevHashTags) => {
      const uniqueHashTags = [
        ...prevHashTags,
        {
          id: uuid(),
          post_id: postId,
          tag: newHashTag,
        },
      ];
      return uniqueHashTags;
    });

    setInputHashTagEdit('');
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!['Enter', 'NumpadEnter'].includes(e.code)) return;
    e.preventDefault();

    const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
    if (!regExp.test(e.currentTarget.value)) setInputHashTagEdit('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputHashTagEdit(e.target.value);
  };

  const updateMutation = useMutation({
    mutationFn: async () => {
      try {
        // 데이터베이스의 게시글을 업데이트합니다.
        await supabase
          .from('post')
          .update({
            content: contentEdit,
          })
          .eq('id', postId);

        // 이미지 삭제
        const deletedImages = data.post_pic.filter(
          (existingPic) =>
            !postPicEdit.some((updatedPic) => updatedPic.id === existingPic.id),
        );

        await Promise.all(
          deletedImages.map(async (pic) => {
            await supabase.from('post_pic').delete().eq('id', pic.id);
          }),
        );

        // PostPic 데이터 업데이트
        for (const pic of postPicEdit) {
          await supabase.from('post_pic').upsert([
            {
              id: pic.id,
              post_id: postId,
              photo_url: pic.photo_url,
            },
          ]);
        }

        // 해시태그 삭제
        const deletedTags = data.post_hashtag.filter(
          (existingTag) =>
            !hashTagsEdit.some(
              (updatedTag) => updatedTag.tag === existingTag.tag,
            ),
        );

        await Promise.all(
          deletedTags.map(async (tag) => {
            await supabase.from('post_hashtag').delete().eq('id', tag.id);
          }),
        );

        // PostHashTag 데이터 업데이트
        for (const tag of hashTagsEdit) {
          await supabase
            .from('post_hashtag')
            .upsert([
              {
                id: tag.id,
                post_id: postId,
                tag: tag.tag,
              },
            ])
            .eq('id', tag.id);
        }

        toast.success('수정이 완료되었습니다.');
      } catch (error) {
        console.error('데이터베이스 업데이트 및 삭제 에러:', error);
        throw error;
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['post'],
      });
    },
    onError: (error) => {
      console.error('뮤테이션 에러:', error);
      toast.error('오류가 발생했습니다. 다시 시도해주세요.');
    },
  });

  // 사용자가 폼을 제출할 때 이 함수를 호출합니다.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 데이터베이스의 게시글을 업데이트합니다.
    try {
      await updateMutation.mutate();
    } catch (error) {
      console.error('데이터베이스 업데이트 에러:', error);
    }

    onClose();
    allClose();
  };

  // 모달 외부를 클릭하면 모달이 닫히도록 수정
  const handleModalBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      allClose();
    }
  };

  return (
    <>
      <div onClick={handleModalBgClick} className={styles.modalbg}></div>
      <div className={styles.modal}>
        <form onSubmit={handleSubmit}>
          <div className={styles.btn}>
            <button type='button' onClick={() => onClose()}>
              취소
            </button>
            <p>커뮤니티 수정</p>
            <button type='submit'>완료</button>
          </div>

          <div className={styles.register}>
            <div className={styles.modalSlide}>
              <CommuEditPic
                postPicEdit={postPicEdit}
                handleDeleteCampImg={handleDeleteCampImg}
                handleChangeInputImageFile={handleChangeInputImageFile}
              />
            </div>

            <div className={styles.Con}>
              <div className={styles.user}>
                <Image
                  src={data!.user!.profile_url!}
                  alt=''
                  width={32}
                  height={32}
                />
                <p>{data!.user!.nickname}</p>
              </div>

              <div className={styles.textCon}>
                <label className={styles.blind}>Content</label>
                <textarea
                  value={contentEdit}
                  onChange={(e) => setContentEdit(e.target.value)}
                  placeholder='문구를 입력하세요'
                />
              </div>

              <div className={styles.tagsCon}>
                <label className={styles.blind}>해시태그</label>
                <input
                  value={inputHashTagEdit}
                  onChange={handleChange}
                  onKeyUp={handleHashTag}
                  onKeyDown={handleEnterKey}
                  placeholder='#해시태그를 등록해보세요. (최대 10개)'
                />
                {hashTagsEdit.map((hashTag) => {
                  return (
                    <span key={hashTag.id}>
                      # {hashTag.tag}
                      <button
                        type='button'
                        onClick={() => handleDeleteHashtag(hashTag.tag)}
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
