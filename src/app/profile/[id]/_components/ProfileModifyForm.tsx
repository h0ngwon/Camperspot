'use client';
import Loading from '@/app/loading';
import ModalCloseSvg from '@/components/ModalCloseSvg';
import useInput from '@/hooks/useInput';
import { useProfileQuery } from '@/hooks/useProfileQuery';
import useModalStore from '@/store/modal';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../_styles/ProfileModifyForm.module.css';

const ProfileModifyForm = () => {
  const params = useParams();
  const userId = params.id as string;
  const { profile, profileMutate, isProfileLoading, isProfilePending } =
    useProfileQuery();
  const { toggleModal } = useModalStore();
  const [prevImage, setPrevImage] = useState<string | undefined>();
  const [file, setFile] = useState<File | string | undefined>();
  const [nickname, nicknameHandler] = useInput(profile?.nickname);

  if (isProfileLoading) {
    return <Loading />;
  }

  if (isProfilePending) {
    return <Loading />;
  }

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (nickname.trim().length === 0) {
      toast.error('닉네임은 공백이 될 수 없습니다.');
      return;
    }

    if (nickname === profile?.nickname && file === undefined) {
      toast.error('변경사항이 없습니다!');
      return;
    }

    formData.append('nickname', nickname);

    if (file) {
      formData.append('file', file as File, 'profile_pic');
    }

    profileMutate({ userId, formData });
    toast.success('프로필 변경 완료!');
    toggleModal();
  };

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <button
        className={styles['close-btn']}
        onClick={() => {
          toggleModal();
          document.body.style.overflow = 'auto';
        }}
      >
        <ModalCloseSvg />
      </button>
      <div className={styles['profile-header']}>프로필 설정</div>
      <div className={styles['profile-container']}>
        <label>
          <div className={styles['img-wrapper']}>
            <Image
              src={prevImage ?? (profile?.profile_url as string)}
              width={120}
              height={120}
              alt='profile'
              className={styles['profile-image']}
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
          defaultValue={profile?.nickname}
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
