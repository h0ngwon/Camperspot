'use client';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import styles from './_components/campAreaForm.module.css';
import useInput from '@/hooks/useInput';
import { supabase } from '@/app/api/db';
type Props = {};

const addCampAreaPage = (props: Props) => {
  const [areaName, handleAreaName] = useInput();
  const [areaMaxPeople, handleAreaMaxPeople] = useInput();
  const [areaPrice, handleAreaPrice] = useInput();
  const [areaImg, setAreaImg] = useState<string>('');

  const imgRef = useRef<HTMLInputElement>(null);

  // camp_id 가져오는 로직 필요 << 팀원들과 상의
  const campId = 'd88d1256-6202-469d-81e8-b8d12f629206';

  // 캠핑존 이미지 업로드
  async function handleChangeInputCampArea(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setAreaImg(URL.createObjectURL(file));
    }
  }

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: campAreaData, error } = await supabase
      .from('camp_area')
      .insert({
        camp_id: campId,
        name: areaName,
        max_people: Number(areaMaxPeople),
        price: Number(areaPrice),
        photo_url: areaImg,
      });

    if (campAreaData) {
      alert('등록되었습니다');
    } else if (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <h1>캠핑존 설정</h1>
      <form onSubmit={handleForm} className={styles.formLayout}>
        <div>
          <h3>캠핑존 이름</h3>
          <input
            defaultValue={areaName}
            onChange={handleAreaName}
            placeholder='이름을 입력해주세요'
          />
        </div>
        <div>
          <h3>최대 수용인원</h3>
          <input
            defaultValue={areaMaxPeople}
            onChange={handleAreaMaxPeople}
            type='number'
          />
        </div>
        <div>
          <h3>금액</h3>
          <input defaultValue={areaPrice} onChange={handleAreaPrice} />
          <span>원</span>
        </div>
        <div>
          <h3>캠핑존 사진 등록</h3>
          <input
            type='file'
            onChange={handleChangeInputCampArea}
            ref={imgRef}
          />
          <img src={areaImg} />
        </div>
        <button type='submit'>등록하기</button>
      </form>
    </>
  );
};

export default addCampAreaPage;
