import React, { ChangeEvent, useRef } from 'react';
import styles from '../_styles/CampForm.module.css';
import Image from 'next/image';

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
      <h3>캠핑장 배치사진 등록</h3>
      <input
        type='file'
        onChange={handleChangeInputLayoutImageFile}
        ref={imgRef}
        required
      />
      {campLayout ? (
        <div>
          <Image
            alt='캠핑장 배치 이미지'
            src={campLayout}
            width={200}
            height={200}
          />
          <button type='button' onClick={() => handleDeleteCampLayoutImg()}>
            이미지 삭제
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Layout;
