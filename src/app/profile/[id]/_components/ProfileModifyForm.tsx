'use client';
import ModalCloseSvg from '@/components/ModalCloseSvg';
import useInput from '@/hooks/useInput';
import useModalStore from '@/store/modal';
import { UserType } from '@/types/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { modifyUserData } from '../_lib/modifyUserData';
import styles from '../_styles/ProfileModifyForm.module.css';

const ProfileModifyForm = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params.id as string;
  const { toggleModal } = useModalStore();
  const { data } = useQuery<UserType>({
    queryKey: ['mypage', 'profile', params.id],
  });
  const [prevImage, setPrevImage] = useState<string | undefined>();
  const [file, setFile] = useState<File | string | undefined>();
  const [nickname, nicknameHandler] = useInput(data?.nickname);
  const mutation = useMutation({
    mutationFn: modifyUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mypage', 'profile', params.id],
      });
    },
  });

  const prevImg = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const imgFile: File | null = fileInput.files[0];
      setFile(imgFile);
      // make preview url
      const imageUrl: string = URL.createObjectURL(imgFile);
      setPrevImage(imageUrl);
    }
  };
  //route handler -> post -> storage upload -> db 수정
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (nickname.trim().length === 0) {
      toast.error('닉네임은 공백이 될 수 없습니다.');
      return;
    }

    if (nickname === data?.nickname && file === undefined) {
      toast.error('변경사항이 없습니다!');
      return;
    }

    formData.append('nickname', nickname);

    if (file) {
      formData.append('file', file as File, 'profile_pic');
    }

    mutation.mutate({ id, formData });
    toast.success('프로필 변경 완료!');
  };

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <button className={styles['close-btn']} onClick={() => {
        toggleModal();
        document.body.style.overflow = 'auto';
      }}>
        <ModalCloseSvg />
      </button>
      <div className={styles['profile-header']}>프로필 설정</div>
      <div className={styles['profile-container']}>
        <label>
          <div className={styles['img-wrapper']}>
            <Image
              src={prevImage ?? (data?.profile_url as string)}
              width={120}
              height={120}
              alt='profile'
            />
          </div>
          <input
            name='file'
            type='file'
            className={styles.hidden}
            onChange={prevImg}
          />
        </label>
      </div>
      <div className={styles['nickname-container']}>
        <label>닉네임</label>
        <input
          name='nickname'
          type='text'
          accept='image/*'
          defaultValue={data?.nickname}
          maxLength={12}
          onChange={nicknameHandler}
          required
        />
      </div>
      <button className={styles['submit-btn']}>완료</button>
    </form>
  );
};

export default ProfileModifyForm;
