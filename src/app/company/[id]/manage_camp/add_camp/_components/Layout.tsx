import React, { ChangeEvent, useRef } from 'react';
import styles from '../_styles/CampForm.module.css';
import Image from 'next/image';
import addImgBtn from '@/asset/addImgBtn.png';
import removePicBtn from '@/asset/ico_cancel_btn.png';

type Props = {
  campLayout: string;
  setCampLayout: React.Dispatch<React.SetStateAction<string>>;
};

const Layout = ({ campLayout, setCampLayout }: Props) => {
  const imgRef = useRef<HTMLInputElement>(null);

  // 캠핑장 배치 이미지 업로드
  async function handleChangeInputLayoutImageFile(
    e: ChangeEvent<HTMLInputElement>,
  ) {
    if (e.target.files) {
      const file = e.target.files[0];
      setCampLayout(URL.createObjectURL(file));
    }
  }
  // 버튼 클릭시 이미지 삭제
  const handleDeleteCampLayoutImg = () => {
    setCampLayout('');
  };

  return (
    <div>
      <h3 className={styles.h3}>캠핑장 배치도 등록</h3>
      <p>캠핑존 구조를 확인할 수 있는 대표 사진 1장을 등록해주세요.</p>
      {!campLayout && (
        <div className={styles.uploadLayoutImgWrap}>
          <input
            type='file'
            onChange={handleChangeInputLayoutImageFile}
            ref={imgRef}
            required
            id='layoutImg'
            className={styles.uploadLayoutImgBtn}
          />
          <label htmlFor='layoutImg' className={styles.addLayoutImgBtnWrap}>
            <Image
              src={addImgBtn}
              alt='배치 이미지 등록 버튼'
              width='0'
              height='0'
              style={{ width: '200px', height: '200px' }}
            />
          </label>
        </div>
      )}
      {campLayout && (
        <div className={styles.positionRel}>
          <Image
            alt='캠핑장 배치 이미지'
            src={campLayout}
            width='0'
            height='0'
            sizes='100vw'
            style={{
              width: '100%',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: '50% 50%',
            }}
            priority
          />
          <button
            type='button'
            onClick={() => handleDeleteCampLayoutImg()}
            className={styles.positionAbsol}
          >
            <Image
              src={removePicBtn}
              alt='이미지 삭제 버튼'
              width={20}
              height={20}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Layout;
