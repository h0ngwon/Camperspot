'use client';
import { supabase } from '@/app/api/db';
import useInput from '@/hooks/useInput';
import type { TablesInsert } from '@/types/supabase';
import React, { FormEvent, useEffect, useState } from 'react';
import styles from './_components/campForm.module.css';
import Head from 'next/head';
import AddressModal from '@/app/company/[id]/manage_camp/add/_components/AddressModal';
import { Address } from 'react-daum-postcode';

const addCampPage = () => {
  const [name, handleName] = useInput();
  const [content, handleContent] = useInput();
  const [region, handleRegion] = useInput();
  // zustand를 왜 했냐 지금, 이 address 상태값을 컴포넌트가 멀리 있다. 그래서 전역 상태로 만들었다.
  // 왜 썻냐? address 상태값을 공유해야한다(add page와 daum 주소 찾기 컴포넌트, 연결이 안돼있다. -> 전역상태를 만듬
  // 현재는 밑에 있어서 바로 접근이 가능함 -> 그래서 zustand를 사용할 이유가 없다.
  const [address, setAddress] = useState('');
  const [addressDetail, handleAddressDetail] = useInput();
  const [phone, handlePhone] = useInput();
  const [check_in, handleCheck_in] = useInput();
  const [check_out, handleCheck_out] = useInput();
  const [layout, handleLayout] = useInput();
  const [isAddressModal, setAddressModal] = useState(false);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO : company_id는 나중에 가져온느 로직을 작성해야 한다.
    const companyId = '1fc2b9ca-341a-490c-b995-370eb36e1d5d';

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        // const like = await supabase
        //   .from('like')
        //   .select('user(nickname),camp(name)');
        // console.log(like);
        const { data, error } = await supabase
          .from('camp')
          .insert({
            name,
            content,
            company_id: companyId,
            address,
            region,
            phone,
            check_in,
            check_out,
            layout,
          })
          .select();
        if (data) {
          alert('등록되었습니다');
        } else if (error) {
          alert(error.message);
        }
      });
    }
  };

  const handleCompleteAddress = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setAddressModal(false);
  };

  return (
    <>
      <Head>
        <script src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'></script>
      </Head>
      <form onSubmit={handleForm} className={styles.formLayout}>
        <input
          value={name}
          onChange={handleName}
          className={styles.gridItem}
          placeholder='캠핑장 이름을 입력해주세요'
          required
        />

        <div>
          <button
            onClick={() => {
              setAddressModal(true);
            }}
            type='button'
          >
            캠핑장 주소찾기
          </button>
          <input
            value={address}
            placeholder='캠핑장 주소찾기를 클릭해주세요'
            required
          />
          {/* <input
            value={addressDetail}
            onChange={handleAddressDetail}
            placeholder='상세주소를 입력해주세요'
            required
          /> */}
        </div>
        <input
          value={content}
          onChange={handleContent}
          className={styles.gridItem}
          placeholder='캠핑장을 소개해주세요'
        />
        <input
          value={region}
          onChange={handleRegion}
          className={styles.gridItem}
          placeholder='캠핑장 지역을 입력해주세요'
        />
        <input
          value={phone}
          onChange={handlePhone}
          type='number'
          className={styles.gridItem}
          placeholder='캠핑장 전화번호를 입력해주세요'
        />
        <input
          value={check_in}
          onChange={handleCheck_in}
          className={styles.gridItem}
          placeholder='체크인 날짜를 입력해주세요'
        />
        <input
          value={check_out}
          onChange={handleCheck_out}
          className={styles.gridItem}
          placeholder='체크아웃 날짜를 입력해주세요'
        />
        <input
          value={layout}
          onChange={handleLayout}
          className={styles.gridItem}
          placeholder='캠핑장 구조를 입력해주세요'
        />
        <button type='submit' className={styles.gridItem}>
          등록
        </button>
      </form>
      {isAddressModal && (
        <div>
          <AddressModal handleCompleteAddress={handleCompleteAddress} />
        </div>
      )}
    </>
  );
};

export default addCampPage;
