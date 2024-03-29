import Image from 'next/image';
import React, { ChangeEvent, useRef } from 'react';
import styles from '../_styles/CampForm.module.css';
import AddImgBtnSvg from '../_svg/AddImgBtnSvg';
import CancelBtnSvg from '../_svg/CancelBtnSvg';

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
      if (!file) {
        return;
      } else {
        setCampPicture((prev) => [URL.createObjectURL(file), ...prev]);
      }
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
      <p>캠핑장 전반의 사진을 등록해주세요. (여러 장 가능)</p>
      <div className={styles.uploadCampImgWrap}>
        <div className={styles.displayFlex}>
          {campPicture?.map((item, index) => {
            return (
              <div
                key={item + index}
                className={styles.uploadCampImgPositionRel}
              >
                <Image
                  src={item}
                  alt='캠핑장이미지'
                  width='0'
                  height='0'
                  sizes='100vw'
                  style={{
                    width: '100%',
                    height: '100vh',
                    objectFit: 'cover',
                    objectPosition: '50% 50%',
                  }}
                  loading='lazy'
                />
                <button
                  type='button'
                  onClick={() => handleDeleteCampImg(index)}
                  className={styles.positionAbsol}
                >
                  <CancelBtnSvg />
                </button>
              </div>
            );
          })}
          <div className={styles.uploadImgMarginTop}>
            <input
              type='file'
              onChange={handleChangeInputImageFile}
              ref={imgRef}
              id='campImg'
              className={styles.uploadLayoutImgBtn}
            />
            <label htmlFor='campImg' className={styles.addLayoutImgBtnWrap}>
              <AddImgBtnSvg />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampPicture;
