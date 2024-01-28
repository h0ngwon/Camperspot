'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { supabase } from '@/app/api/db';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Database } from '@/types/supabase';

import styles from '../_styles/CommuEditModal.module.css';
import CloseSvg from '../_svg/CloseSvg';
import CommuPicSvg from '../_svg/CommuPicSvg';

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
type PostHashTag = Database['public']['Tables']['post_hashtag']['Row'];
type PostPic = Database['public']['Tables']['post_pic']['Row'];

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

  const updateMutation = useMutation({
    mutationFn: async () => {
      // 게시글 내용 업데이트
      await supabase
        .from('post')
        .update({
          content: contentEdit,
        })
        .eq('id', postId);

      // 기존 post_pic 레코드 삭제
      await supabase.from('post_pic').delete().eq('post_id', postId);

      // 새로운 post_pic 레코드 upsert
      await supabase.from('post_pic').upsert(
        postPicEdit.map((pic) => ({
          id: pic.id,
          post_id: postId,
          photo_url: pic.photo_url,
        })),
      );

      // 기존 post_hashtag 레코드 삭제
      await supabase.from('post_hashtag').delete().eq('post_id', postId);

      // 새로운 post_hashtag 레코드 upsert
      await supabase.from('post_hashtag').upsert(
        hashTagsEdit.map((tag) => ({
          id: tag.id,
          post_id: postId,
          tag: tag.tag,
        })),
      );
    },
    onSuccess: async () => {
      // 'post' 쿼리 전체를 무효화시키는 대신, 업데이트된 데이터를 가져오기 위해 데이터를 다시 가져옵니다.
      const { data, error } = await supabase
        .from('post')
        .select()
        .order('created_at', { ascending: true });
      if (error) {
        console.error('업데이트된 데이터 가져오기 에러:', error);
        return;
      }

      queryClient.setQueryData(['post'], data);

      // 선택적으로 필요한 경우 특정 게시물 데이터를 다시 가져올 수 있습니다.
      queryClient.invalidateQueries({
        queryKey: ['post', postId],
      });
    },
    onError: (error) => {
      console.error('뮤테이션 에러:', error);
    },
  });

  // 캠핑장 이미지 업로드
  function handleChangeInputImageFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const newElement = {
        id: 'some-id',
        photo_url: URL.createObjectURL(file),
        post_id: 'some-post-id',
      }; // 실제 데이터로 교체
      setPostPicEdit((prev) => [...prev, newElement]);
    }
  }

  // 버튼 클릭시 이미지 삭제
  const handleDeleteCampImg = (index: number) => {
    setPostPicEdit((prev) => {
      const updatedPostPics = [...prev];
      updatedPostPics.splice(index, 1); // 해당 인덱스의 이미지 삭제
      return updatedPostPics;
    });
  };

  const isEmptyValue = (value: string | any[]) => {
    if (!value.length) {
      return true;
    }
    return false;
  };

  const addHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedCommand = ['Comma', 'Enter', 'Space', 'NumpadEnter'];
    if (!allowedCommand.includes(e.code)) return;

    if (isEmptyValue(e.currentTarget.value.trim())) {
      return setInputHashTagEdit('');
    }

    let newHashTag = e.currentTarget.value.trim();
    const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    if (regExp.test(newHashTag)) {
      newHashTag = newHashTag.replace(regExp, '');
    }
    if (newHashTag.includes(',')) {
      newHashTag = newHashTag.split(',').join('');
    }

    if (isEmptyValue(newHashTag) || hashTagsEdit.length >= 10) {
      return setInputHashTagEdit('');
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

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    e.preventDefault();

    const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
    if (!regExp.test(e.currentTarget.value)) {
      setInputHashTagEdit('');
    }
  };

  const changeHashTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputHashTagEdit(e.target.value);
  };

  const handleDeleteHashtag = (hashTag: string) => {
    setHashTagsEdit((prevHashTags) => {
      const updatedHashTags = prevHashTags.filter(
        (item) => item.tag !== hashTag,
      );
      return updatedHashTags;
    });
  };

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

  return (
    <div className={styles.modalWrap}>
      <div className={styles.modal}>
        <form onSubmit={handleSubmit}>
          <div className={styles.btn}>
            <button type='button' onClick={() => onClose()}>
              취소
            </button>
            <p>커뮤니티 수정</p>
            <button type='submit'>완료</button>
          </div>
          <div className={styles.edit}>
            <div>
              <input
                type='file'
                accept='image/*'
                id='file_upload'
                className={styles.upload}
                onChange={handleChangeInputImageFile}
              />
              <label htmlFor='file_upload'>
                <div className={styles.uploadPic}>
                  <CommuPicSvg />
                  <p>업로드</p>
                </div>
              </label>
              {/* 이미지 미리보기 및 삭제 버튼 */}
              <ul className={styles.postPics}>
                {postPicEdit.map((item, index) => (
                  <li key={item.id} className={styles.postPic}>
                    <Image
                      src={item.photo_url}
                      alt={`이미지`}
                      className={styles.Pic}
                      width={100}
                      height={100}
                    />
                    <button
                      type='button'
                      onClick={() => handleDeleteCampImg(index)}
                    >
                      <CloseSvg />
                    </button>
                  </li>
                ))}
              </ul>
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
                  id='hashTagInput'
                  value={inputHashTagEdit}
                  onChange={(e) => changeHashTagInput(e)}
                  onKeyUp={(e) => addHashTag(e)}
                  onKeyDown={(e) => keyDownHandler(e)}
                  placeholder='#해시태그를 등록해보세요. (최대 10개)'
                />
                {hashTagsEdit.length > 0 &&
                  hashTagsEdit.map((item) => {
                    return (
                      <span key={item.id}>
                        # {item.tag}
                        <button
                          type='button'
                          onClick={() => handleDeleteHashtag(item.tag)}
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
    </div>
  );
}
