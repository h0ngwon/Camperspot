import React, { ChangeEvent, useRef } from 'react';
import styles from '../_styles/CampForm.module.css';
import Image from 'next/image';
import addImgBtn from '@/asset/addImgBtn.png';
import removePicBtn from '@/asset/ico_cancel_btn.png';

type Props = {
  layout: string;
  setLayout: React.Dispatch<React.SetStateAction<string>>;
};

const Layout = ({ layout, setLayout }: Props) => {
  const imgRef = useRef<HTMLInputElement>(null);

  // 캠핑장 배치 이미지 업로드
  async function handleChangeInputLayoutImageFile(
    e: ChangeEvent<HTMLInputElement>,
  ) {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log(file);
      const uploadFile = URL.createObjectURL(file);
      // if (uploadFile !== layout) {
      //   setLayout(uploadFile);
      // } else {
      //   setCampLayout(uploadFile);
      // }
      setLayout(uploadFile);
    }
  }
  // 버튼 클릭시 이미지 삭제
  const handleDeleteCampLayoutImg = () => {
    setLayout('');
  };

  return (
    <div>
      <h3 className={styles.h3}>캠핑장 배치도 등록</h3>
      <p>캠핑존 구조를 확인할 수 있는 대표 사진 1장을 등록해주세요.</p>

      {layout ? (
        <div className={styles.positionRel}>
          <Image
            alt='등록된 캠핑장 배치 이미지'
            src={layout}
            width={200}
            height={200}
          />
          <button
            type='button'
            className={styles.positionAbsol}
            onClick={() => handleDeleteCampLayoutImg()}
          >
            <Image
              src={removePicBtn}
              alt='이미지 삭제 버튼'
              width={20}
              height={20}
            />
          </button>
        </div>
      ) : (
        <div>
          <input
            type='file'
            onChange={handleChangeInputLayoutImageFile}
            ref={imgRef}
            id='layoutImg'
            className={styles.uploadLayoutImgBtn}
          />
          <label htmlFor='layoutImg' className={styles.addLayoutImgBtnWrap}>
            <Image
              src={addImgBtn}
              alt='배치 이미지 등록 버튼'
              width={206}
              height={184}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Layout;
