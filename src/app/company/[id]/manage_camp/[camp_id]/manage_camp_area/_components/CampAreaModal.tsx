'use client';
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import styles from '../_styles/CampAreaForm.module.css';
import useInput from '@/hooks/useInput';
import { supabase } from '@/app/api/db';
import { useParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuid } from 'uuid';
type Props = { setCampAreaModal: Dispatch<SetStateAction<boolean>> };

const CampAreaModal = ({ setCampAreaModal }: Props) => {
  const [areaName, handleAreaName] = useInput();
  const [areaMaxPeople, handleAreaMaxPeople] = useInput();
  const [areaPrice, handleAreaPrice] = useInput();
  const [areaImg, setAreaImg] = useState<string>('');

  const id = uuid();
  const params = useParams();
  const campId = params.camp_id;

  const imgRef = useRef<HTMLInputElement>(null);

  // 캠핑존 이미지 업로드
  async function handleChangeInputCampArea(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setAreaImg(URL.createObjectURL(file));
    }
  }
  // 캠핑존 이미지 삭제
  const handleDeleteAreaImg = () => {
    setAreaImg('');
  };

  const queryClient = useQueryClient();
  // 쿼리문으로 작성한 camp_area테이블 insert
  const {
    mutate: createCampArea,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('camp_area')
        .insert({
          id,
          camp_id: campId as string,
          name: areaName,
          max_people: Number(areaMaxPeople),
          price: Number(areaPrice),
          photo_url: areaImg,
        })
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['camp_area'] });
    },
  });
  if (isError) {
    console.log(error);
    return <div>에러 발생</div>;
  }

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createCampArea();

    // 등록 눌렀을 시 캠핑존 이미지 업로드
    async function uploadStorageCampAreaData(blob: Blob | File) {
      const { data, error } = await supabase.storage
        .from('camp_area_pic')
        .upload(window.URL.createObjectURL(blob), blob);
      return { data: data, error };
    }
    // 캠핑존이미지 table에 올리는 로직
    async function uploadCampAreaTable() {
      const blob = await fetch(areaImg).then((r) => r.blob());
      const { data, error } = await uploadStorageCampAreaData(blob);
      const BASE_URL =
        'https://kuxaffboxknwphgulogp.supabase.co/storage/v1/object/public/camp_area_pic/';
      if (error) return null;
      // supabase camp table의 layout에 넣는 로직
      await supabase
        .from('camp_area')
        .update({ photo_url: BASE_URL + data?.path })
        .eq('id', id);
    }
    uploadCampAreaTable();

    if (error) {
      console.log(error);
    } else {
      alert('등록완료');
      setCampAreaModal(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <div>
        <h1>캠핑존 설정</h1>
        <button
          onClick={() => {
            setCampAreaModal(false);
          }}
        >
          x
        </button>
      </div>
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
          {areaImg ? (
            <div>
              <img src={areaImg} className={styles.addedCampAreaImg} />
              <button onClick={() => handleDeleteAreaImg()}>이미지 삭제</button>
            </div>
          ) : (
            ''
          )}
        </div>
        <div>
          <button type='submit'>등록하기</button>
        </div>
      </form>
    </div>
  );
};

export default CampAreaModal;
