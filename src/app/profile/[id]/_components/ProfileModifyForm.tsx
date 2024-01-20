'use client';
import { UserType } from '@/types/auth';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import styles from '../_styles/ProfileModifyForm.module.css';
import { useState } from 'react';

const ProfileModifyForm = () => {
  const { data } = useQuery<UserType>({ queryKey: ['mypage', 'profile'] });
  const [prevImage, setPrevImage] = useState<string | undefined>();
  const [file, setFile] = useState<File | undefined>();

  const prevImg = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const imgFile: File | null = fileInput.files[0];
      setFile(imgFile);
      // make preview url
      const imageUrl: string = URL.createObjectURL(imgFile);
      setPrevImage(imageUrl);
      console.log(file)
      console.log(prevImage)
    }
  };
  return (
    <form className={styles.container}>
      <label>
        <div>
          <Image
            src={prevImage ?? data?.profile_url as string}
            width={116}
            height={115}
            alt='profile'
          />
        </div>
        <input type='file' className={styles.hidden} onChange={prevImg}/>
      </label>
      <input type='text' accept='image/*' defaultValue={data?.nickname} />
      <button>완료</button>
    </form>
  );
};

export default ProfileModifyForm;
