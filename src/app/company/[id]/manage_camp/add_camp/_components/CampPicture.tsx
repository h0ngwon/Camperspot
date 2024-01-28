import React, { ChangeEvent, useRef } from 'react';
import styles from '../_styles/CampForm.module.css';
import Image from 'next/image';
import addImgBtn from '@/asset/addImgBtn.png';

type Props = {
  campPicture: string[];
  setCampPicture: React.Dispatch<React.SetStateAction<string[]>>;
};

const CampPicture = ({ campPicture, setCampPicture }: Props) => {
  const imgRef = useRef<HTMLInputElement>(null);

  // 캠핑장 이미지 업로드
  async function handleChangeInputImageFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setCampPicture((prev) => [...prev, URL.createObjectURL(file)]);
    }
  }
  // 버튼 클릭시 이미지 삭제
  const handleDeleteCampImg = (index: number) => {
    setCampPicture(
      (prev) =>
        prev?.filter((_, idx) => {
          return index !== idx;
        }),
    );
  };
  return (
    <div>
      <h3 className={styles.h3}>캠핑장 사진 등록</h3>
      {campPicture?.map((item, index) => {
        return (
          <div key={item + index}>
            <Image src={item} alt='캠핑장이미지' width={200} height={200} />
            <button type='button' onClick={() => handleDeleteCampImg(index)}>
              이미지 삭제
            </button>
          </div>
        );
      })}
      <input
        type='file'
        onChange={handleChangeInputImageFile}
        ref={imgRef}
        required
        id='campImg'
        className={styles.uploadLayoutImgBtn}
      />
      <label htmlFor='campImg'>
        <Image
          src={addImgBtn}
          alt='캠핑장 이미지 등록 버튼'
          width={206}
          height={184}
        />
      </label>
    </div>
  );
};

export default CampPicture;
