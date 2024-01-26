'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/app/api/db';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import CloseSvg from '../_svg/CloseSvg';
import { Database } from '@/types/supabase';

import styles from '../_styles/CommuEditModal.module.css';
import CommuPicSvg from '../_svg/CommuPicSvg';

type Props = {
  onClose: () => void;
  postId: string;
};
type PostHashTag = Database['public']['Tables']['post_hashtag']['Row'];
type PostPic = Database['public']['Tables']['post_pic']['Row'];

export default function CommuEditModal({ onClose, postId }: Props) {
  const [contentEdit, setContentEdit] = useState<string>('');
  const [postPicEdit, setPostPicEdit] = useState<PostPic[]>([]);
  const [inputHashTagEdit, setInputHashTagEdit] = useState<string>('');
  const [hashTagsEdit, setHashTagsEdit] = useState<PostHashTag[]>([]);

  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      try {
        const { data: post, error } = await supabase
          .from('post')
          .select('*,post_pic(*),post_hashtag(*),user(id,nickname,profile_url)')
          .eq('id', postId)
          .single();

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

  useEffect(() => {
    if (data) {
      setContentEdit(data!.content);
      setHashTagsEdit(data!.post_hashtag);
      setPostPicEdit(data!.post_pic);
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      // 1. content를 업데이트합니다.
      await supabase
        .from('post')
        .update({
          content: contentEdit,
        })
        .eq('id', postId);

      // 2. post_pic을 업데이트 또는 추가합니다.
      for (const pic of postPicEdit) {
        await supabase
          .from('post_pic')
          .upsert([
            {
              id: pic.id, // 기존의 id가 있다면 업데이트, 없다면 추가됨
              post_id: postId,
              photo_url: pic.photo_url,
            },
          ])
          .eq('id', pic.id); // 해당 id가 있다면 업데이트
      }

      // 3. post_hashtag을 업데이트 또는 추가합니다.
      for (const tag of hashTagsEdit) {
        await supabase
          .from('post_hashtag')
          .upsert([
            {
              id: tag.id, // 기존의 id가 있다면 업데이트, 없다면 추가됨
              post_id: postId,
              tag: tag.tag,
            },
          ])
          .eq('id', tag.id); // 해당 id가 있다면 업데이트
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post,post_pic,post_hashtag'],
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
      const newElement = {
        id: 'some-id',
        photo_url: 'some-url',
        post_id: 'some-post-id',
      }; // 실제 데이터로 교체
      return [...prev, newElement];
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

    if (isEmptyValue(newHashTag)) return;

    setHashTagsEdit((prevHashTags) => {
      const uniqueHashTags = new Set([...prevHashTags, newHashTag]);
      return Array.from(uniqueHashTags) as {
        id: string;
        post_id: string;
        tag: string;
      }[];
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
    setHashTagsEdit(
      hashTagsEdit.filter((item) => {
        return item.tag !== hashTag;
      }),
    );
  };

  // 사용자가 폼을 제출할 때 이 함수를 호출합니다.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 데이터베이스의 게시글을 업데이트합니다.
    try {
      updateMutation.mutate();
    } catch (error) {}

    onClose();
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

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
                  src={data!.user!.profile_url}
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
