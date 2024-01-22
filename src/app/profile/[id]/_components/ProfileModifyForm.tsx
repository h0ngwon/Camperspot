'use client';
import useInput from '@/hooks/useInput';
import { UserType } from '@/types/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { modifyUserData } from '../_lib/modifyUserData';
import styles from '../_styles/ProfileModifyForm.module.css';

const ProfileModifyForm = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params.id as string;
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
    // const blob = new Blob([JSON.stringify(file)], {
    //   type: 'application/json',
    // });

    formData.append('nickname', nickname);
    if (file) {
      formData.append('file', file as File, 'profile_pic');
    }
    mutation.mutate({ id, formData });
  };

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <label>
        <div>
          <Image
            src={prevImage ?? (data?.profile_url as string)}
            width={116}
            height={115}
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
      <input
        name='nickname'
        type='text'
        accept='image/*'
        defaultValue={data?.nickname}
        onChange={nicknameHandler}
        required
      />
      <button>완료</button>
    </form>
  );
};

export default ProfileModifyForm;
