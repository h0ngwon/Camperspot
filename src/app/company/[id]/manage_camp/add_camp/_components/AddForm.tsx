'use client';
import { supabase } from '@/app/api/db';
import useInput from '@/hooks/useInput';
import type { Tables } from '@/types/supabase';
import React, { FormEvent, useState } from 'react';
import styles from '../_styles/CampForm.module.css';
import { uuid } from 'uuidv4';
import { useSession } from 'next-auth/react';
import Facility from './Facility';
import Layout from './Layout';
import CampPicture from './CampPicture';
import Hashtag from './Hashtag';
import SearchAddress from './SearchAddress';
import CheckInOut from './CheckInOut';
import { useMutation } from '@tanstack/react-query';

const AddForm = () => {
  const [name, handleName] = useInput();
  const [content, handleContent] = useInput();
  const [address, setAddress] = useState('');
  const [phone, handlePhone] = useInput();
  const [check_in, handleCheck_in] = useState<string>('');
  const [check_out, handleCheck_out] = useState<string>('');
  const [layout, handleLayout] = useInput();
  const [isAddressModal, setAddressModal] = useState(false);
  const [facility, setFacility] = useState<Tables<'facility'>[]>([]);
  const [checkedFacility, setCheckedFacility] = useState<number[]>([]);
  const [campLayout, setCampLayout] = useState<string>('');
  const [campPicture, setCampPicture] = useState<string[]>([]);
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [inputHashTag, setInputHashTag] = useState('');

  const campId = uuid();

  const { data: session } = useSession();

  const companyUserId = session?.user.id;

  // 지역정보 구분
  const regionSplit = address.split(' ');
  const regionDoGun = regionSplit[0] + ' ' + regionSplit[1];

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
          layout,
        })
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
  if (isError) {
    console.log(error);
    return <div>에러 발생</div>;
  }

  // Form Submit
  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    // 등록 눌렀을 시 캠핑장 배치 이미지 업로드
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

    if (camp_facility && hashtagData) {
      alert('등록되었습니다');
    }
  };

  return (
    <>
      <form onSubmit={handleForm} className={styles.formLayout}>
        <div>
          <h3>캠핑장 명</h3>
          <input
            defaultValue={name}
            onChange={handleName}
            placeholder='이름을 입력해주세요'
            required
          />
        </div>
        <div>
          <h3>캠핑장 주소</h3>
          <div>
            <div>
              <button
                onClick={() => {
                  setAddressModal(true);
                }}
                type='button'
              >
                주소 검색하기
              </button>
            </div>
            <input
              value={address}
              placeholder='주소검색하기를 클릭해주세요'
              required
            />
          </div>
        </div>
        <div>
          <h3>캠핑장 소개</h3>
          <textarea
            defaultValue={content}
            onChange={handleContent}
            className={styles.gridItemTextArea}
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
        <div>
          <h3>문의전화</h3>
          <input
            defaultValue={phone}
            onChange={handlePhone}
            type='tel'
            placeholder='예) 02-000-0000 / 063-000-0000'
            pattern='[0-9]{2,4}-[0-9]{3,4}-[0-9]{4}'
            maxLength={13}
            required
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
        <div>
          <button type='button'>임시저장</button>
          <button type='submit'>등록하기</button>
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
