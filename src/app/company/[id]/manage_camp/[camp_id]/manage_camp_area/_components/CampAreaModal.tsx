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
import Image from 'next/image';
import { toast } from 'react-toastify';
import RemoveBtnSvg from '../_svg/RemoveBtnSvg';
import CancelBtnSvg from '../_svg/CancelBtnSvg';
import AddImgBtnSvg from '../_svg/AddImgBtnSvg';

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

  const queryClient = useQueryClient();

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
          price: Number(String(areaPrice.replace(/[^\d]+/g, ''))),
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
      toast.error('에러 발생');
    } else {
      toast.success('등록 완료!');
      setCampAreaModal(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.addCampAreaHeader}>
        <h1 className={styles.campAreaH1}>캠핑존 설정</h1>
        <button
          onClick={() => {
            setCampAreaModal(false);
          }}
          className={styles.closeBtn}
        >
          <RemoveBtnSvg />
        </button>
      </div>
      <form onSubmit={handleForm} className={styles.formLayout}>
        <div className={styles.campAreaNameWrap}>
          <h3 className={styles.campAreaH3}>캠핑존 이름</h3>
          <input
            value={areaName}
            onChange={handleAreaName}
            placeholder='이름을 입력해주세요'
            required
          />
        </div>
        <div className={styles.campAreaMaxPeople}>
          <h3 className={styles.campAreaH3}>최대 수용인원</h3>
          <input
            value={areaMaxPeople}
            onChange={handleAreaMaxPeople}
            type='number'
            required
          />
        </div>
        <div className={styles.campAreaPriceWrap}>
          <h3 className={styles.campAreaH3}>금액</h3>
          <input
            value={Number(areaPrice.replaceAll(',', '')).toLocaleString(
              'ko-KR',
            )}
            onChange={handleAreaPrice}
            required
          />
          <span>원</span>
        </div>
        <div>
          <h3 className={styles.campAreaH3}>캠핑존 사진 등록</h3>

          {areaImg ? (
            <div className={styles.addedCampAreaImgWrap}>
              <Image
                src={areaImg}
                alt='추가된 캠핑존 이미지'
                width={286}
                height={256}
              />
              <button
                onClick={() => handleDeleteAreaImg()}
                className={styles.removeImgBtn}
              >
                <CancelBtnSvg />
              </button>
            </div>
          ) : (
            <div className={styles.uploadCampAreaImgWrap}>
              <input
                type='file'
                onChange={handleChangeInputCampArea}
                ref={imgRef}
                className={styles.displayNone}
                id='campAreaImg'
                required
              />
              <label htmlFor='campAreaImg' className={styles.uploadCampAreaImg}>
                <AddImgBtnSvg />
              </label>
            </div>
          )}
        </div>
        <div className={styles.addCampAreaBtnWrap}>
          <button type='submit' className={styles.addCampAreaBtn}>
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampAreaModal;
