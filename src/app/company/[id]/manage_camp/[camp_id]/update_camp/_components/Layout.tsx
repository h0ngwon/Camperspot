import React, { ChangeEvent, useRef } from 'react';
import styles from '../_styles/CampForm.module.css';
import Image from 'next/image';

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
  // const handleDeleteCampLayoutImg = () => {
  //   setLayout('');
  // };

  return (
    <div>
      <h3>캠핑장 배치사진 등록</h3>
      <input
        type='file'
        onChange={handleChangeInputLayoutImageFile}
        ref={imgRef}
      />
      {layout && (
        <div>
          <Image
            alt='등록된 캠핑장 배치 이미지'
            src={layout}
            width={200}
            height={200}
          />
          {/* <button type='button' onClick={() => handleDeleteCampLayoutImg()}>
            이미지 삭제
          </button> */}
        </div>
      )}
    </div>
  );
};

export default Layout;
