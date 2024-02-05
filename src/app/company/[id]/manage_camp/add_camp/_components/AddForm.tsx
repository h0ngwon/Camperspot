'use client';
import { supabase } from '@/app/api/db';
import { v4 as uuid } from 'uuid';
import useInput from '@/hooks/useInput';
import type { Tables } from '@/types/supabase';
import React, { FormEvent, useState } from 'react';
import styles from '../_styles/CampForm.module.css';
import Facility from './Facility';
import Layout from './Layout';
import CampPicture from './CampPicture';
import Hashtag from './Hashtag';
import SearchAddress from './SearchAddress';
import CheckInOut from './CheckInOut';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AddForm = () => {
  const [name, handleName] = useInput();
  const [content, handleContent] = useInput();
  const [address, setAddress] = useState('');
  const [isAddressModal, setAddressModal] = useState(false);
  const [phone, handlePhone] = useInput();
  const [check_in, handleCheck_in] = useState<string>('');
  const [check_out, handleCheck_out] = useState<string>('');
  // const [layout, handleLayout] = useInput();
  const [facility, setFacility] = useState<Tables<'facility'>[]>([]);
  const [checkedFacility, setCheckedFacility] = useState<number[]>([]);
  const [campLayout, setCampLayout] = useState<string>('');
  const [campPicture, setCampPicture] = useState<string[]>([]);
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [inputHashTag, setInputHashTag] = useState('');

  const router = useRouter();
  const params = useParams();

  const queryClient = useQueryClient();

  const campId = uuid();

  // const companyUserId = session?.user.id;
  const companyUserId = params.id;

  // 지역정보 구분
  const regionSplit = address.split(' ');
  const regionDoGun = regionSplit[0] + ' ' + regionSplit[1];

  // 쿼리문으로 작성한 camp테이블 insert
  const {
    mutate: createCamp,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('camp')
        .insert({
          id: campId,
          name,
          content,
          company_id: companyUserId as string,
          address,
          region: regionDoGun,
          phone,
          check_in,
          check_out,
          layout: campLayout,
        })
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['camp_id'] });
      router.push(
        `/company/${companyUserId}/manage_camp/${campId}/manage_camp_area`,
      );
    },
  });
  if (isError) {
    console.log(error);
    return <div>에러 발생</div>;
  }

  // Form Submit
  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (campPicture.length < 5) {
      // todo : campPicture가 없을 때 로직 처리해야함
      toast.error('캠핑장 이미지 다섯 장 이상 등록');
      return;
    }

    createCamp();

    // supabase에 체크된 시설정보만 등록하는 로직
    const { data: camp_facility } = await supabase
      .from('camp_facility')
      .insert(
        checkedFacility.map((item) => {
          return { camp_id: campId, facility_id: item };
        }),
      )
      .select();

    // 등록 눌렀을 시 storage에 캠핑장 배치 이미지 업로드
    async function uploadStorageLayoutData(blob: Blob | File) {
      // const {data:campPicData} =await supabase.storage.from("camp_pic").getPublicUrl()
      const { data, error } = await supabase.storage
        .from('camp_layout')
        .upload(window.URL.createObjectURL(blob), blob);
      return { data: data, error };
    }
    // 배치 이미지 table에 올리는 로직
    async function uploadLayoutToCampTable() {
      const blob = await fetch(campLayout).then((r) => r.blob());
      const { data, error } = await uploadStorageLayoutData(blob);
      const BASE_URL =
        'https://kuxaffboxknwphgulogp.supabase.co/storage/v1/object/public/camp_layout/';
      if (error) return null;
      // supabase camp table의 layout에 넣는 로직
      await supabase
        .from('camp')
        .update({ layout: BASE_URL + data?.path })
        .eq('id', campId);
    }

    uploadLayoutToCampTable();

    // 등록 눌렀을 시 캠핑장 이미지 업로드
    async function uploadStorageCampPicData(blob: Blob | File) {
      // const {data:campPicData} =await supabase.storage.from("camp_pic").getPublicUrl()
      const { data, error } = await supabase.storage
        .from('camp_pic')
        .upload(window.URL.createObjectURL(blob), blob);
      return { data: data, error };
    }

    // 여러개 사진 table에 올리는 로직
    campPicture.forEach(async (item) => {
      const blob = await fetch(item).then((r) => r.blob());
      const { data, error } = await uploadStorageCampPicData(blob);
      const BASE_URL =
        'https://kuxaffboxknwphgulogp.supabase.co/storage/v1/object/public/camp_pic/';
      if (error) return null;
      // supabase table에 올리는 로직
      await supabase
        .from('camp_pic')
        .insert({ camp_id: campId, photo_url: BASE_URL + data?.path })
        .select();
    });

    const { data: hashtagData } = await supabase
      .from('hashtag')
      .insert(
        hashTags.map((item) => {
          return { camp_id: campId, tag: item };
        }),
      )
      .select();

    if (error) {
      console.log(error);
      toast.error('에러 발생');
    } else {
      toast.success('등록 완료!');
      return { camp_facility, hashtagData };
    }
  };

  return (
    <>
      <form onSubmit={handleForm} className={styles.formLayout}>
        <div className={styles.campNameWrap}>
          <h3>캠핑장 명</h3>
          <input
            value={name}
            onChange={handleName}
            placeholder='캠핑장 이름을 입력해주세요'
            required
            className={styles.campNameInput}
          />
        </div>

        <div className={styles.campAddressWrap}>
          <h3>주소</h3>
          <div className={styles.addressSearchWrap}>
            <div>
              <button
                onClick={() => {
                  setAddressModal(true);
                  document.body.style.overflow = 'hidden';
                }}
                type='button'
                className={styles.addressSearchBtn}
              >
                주소 검색하기
              </button>
            </div>
            <input
              defaultValue={address}
              placeholder='주소검색하기를 클릭해주세요'
              className={styles.addressSearchInput}
            />
          </div>
        </div>

        <div className={styles.campContentWrap}>
          <h3>캠핑장 소개</h3>
          <textarea
            value={content}
            onChange={handleContent}
            placeholder='캠핑장을 소개해주세요'
            required
          ></textarea>
        </div>

        <Facility
          facility={facility}
          setFacility={setFacility}
          checkedFacility={checkedFacility}
          setCheckedFacility={setCheckedFacility}
        />

        <CheckInOut
          check_in={check_in}
          handleCheck_in={handleCheck_in}
          check_out={check_out}
          handleCheck_out={handleCheck_out}
        />

        <div className={styles.requestCallWrap}>
          <h3>문의전화</h3>
          <input
            value={phone}
            onChange={handlePhone}
            type='tel'
            placeholder='예) 02-000-0000 / 063-000-0000'
            pattern='[0-9]{2,4}-[0-9]{3,4}-[0-9]{4}'
            maxLength={13}
            required
            className={styles.requestCallInput}
          />
        </div>

        <Layout campLayout={campLayout} setCampLayout={setCampLayout} />

        <CampPicture
          campPicture={campPicture}
          setCampPicture={setCampPicture}
        />

        <Hashtag
          hashTags={hashTags}
          setHashTags={setHashTags}
          inputHashTag={inputHashTag}
          setInputHashTag={setInputHashTag}
        />

        <div className={styles.btns}>
          {/* <button type='button'>임시저장</button> */}
          <button type='submit' className={styles.addCampBtn}>
            등록하기
          </button>
        </div>
      </form>
      <SearchAddress
        setAddress={setAddress}
        isAddressModal={isAddressModal}
        setAddressModal={setAddressModal}
      />
    </>
  );
};

export default AddForm;
