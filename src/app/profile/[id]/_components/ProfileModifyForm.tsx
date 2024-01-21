'use client';
import useInput from '@/hooks/useInput';
import { UserType } from '@/types/auth';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import styles from '../_styles/ProfileModifyForm.module.css';

type MutationType = {
  id: string;
  nickname: string;
  profile_url: string;
};

const ProfileModifyForm = () => {
  const params = useParams();
  const { data } = useQuery<UserType>({ queryKey: ['mypage', 'profile'] });
  const [prevImage, setPrevImage] = useState<string | undefined>();
  const [file, setFile] = useState<string | undefined>();
  const [nickname, nicknameHandler] = useInput(data?.nickname);
  const mutation = useMutation<Response>({
    mutationFn: async () => {
      const res = await fetch(`/api/profile/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: params.id,
          file,
          nickname,
        }),
      });
      console.log('hihihihihihihiihihi', await res.json());
      return await res.json();
    },
  });

  const prevImg = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const imgFile: File | null = fileInput.files[0];
      setFile(URL.createObjectURL(imgFile));
      // make preview url
      const imageUrl: string = URL.createObjectURL(imgFile);
      setPrevImage(imageUrl);
    }
  };
  //route handler -> post -> storage upload -> db 수정
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
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
        <input type='file' className={styles.hidden} onChange={prevImg} />
      </label>
      <input
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
