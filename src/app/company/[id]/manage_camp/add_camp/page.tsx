'use client';
import { supabase } from '@/app/api/db';
import useInput from '@/hooks/useInput';
import type { Tables, TablesInsert } from '@/types/supabase';
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './_components/campForm.module.css';
import Head from 'next/head';
import AddressModal from '@/app/company/[id]/manage_camp/add_camp/_components/AddressModal';
import { Address } from 'react-daum-postcode';
import { uuid } from 'uuidv4';
import { useSession } from 'next-auth/react';
import { blob } from 'stream/consumers';
import Script from 'next/script';

const AddCampPage = () => {
  const [name, handleName] = useInput();
  const [content, handleContent] = useInput();
  const [region, handleRegion] = useInput();
  const [address, setAddress] = useState('');
  const [addressDetail, handleAddressDetail] = useInput();
  const [phone, handlePhone] = useInput();
  const [check_in, handleCheck_in] = useState<string>('');
  const [check_out, handleCheck_out] = useState<string>('');
  const [layout, handleLayout] = useInput();
  const [isAddressModal, setAddressModal] = useState(false);
  const [facility, setFacility] = useState<Tables<'facility'>[]>();
  const [checkedFacility, setCheckedFacility] = useState<number[]>([]);
  const [campPicture, setCampPicture] = useState<string[]>([]);
  const [campLayout, setCampLayout] = useState<string>('');
  const [hashtag, setHashtag] = useInput();

  const campId = uuid();

  const imgRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();

  // facility 테이블에서 option 가져오는거
  async function fetchFacilityData() {
    const { data: facilityData } = await supabase.from('facility').select('*');
    if (facilityData) {
      setFacility(facilityData);
    }
  }

  useEffect(() => {
    fetchFacilityData();
  }, []);

  // 캠핑장 배치 이미지 업로드
  async function handleChangeInputLayoutImageFile(
    e: ChangeEvent<HTMLInputElement>,
  ) {
    if (e.target.files) {
      const file = e.target.files[0];
      setCampLayout(URL.createObjectURL(file));
    }
  }
  // 버튼 클릭시 이미지 삭제
  const handleDeleteCampLayoutImg = () => {
    setCampLayout('');
  };

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

  // 시설 정보 체크, 체크해제 로직
  const onHandleCheckFacility = (value: number) => {
    if (checkedFacility.find((item) => Number(item) === value)) {
      const filterdFacility = checkedFacility.filter((item) => {
        return Number(item) !== value;
      });
      return setCheckedFacility(filterdFacility);
    }

    setCheckedFacility([...checkedFacility, value]);
  };

  // Form Submit
  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 세션정보 이메일과 company_user정보 이메일이 같은 유저의 id를 가져오는 로직
    const companyEmail = session?.user?.email as string;
    const { data: getCompanyId } = await supabase
      .from('company_user')
      .select('id')
      .eq('email', companyEmail);
    if (!getCompanyId) {
      return;
    }
    const companyId = getCompanyId[0].id;

    // 지역정보 구분
    const regionSplit = address.split(' ');
    const regionDoGun = regionSplit[0] + ' ' + regionSplit[1];

    const { data: campData, error } = await supabase
      .from('camp')
      .insert({
        id: campId,
        name,
        content,
        company_id: companyId as string,
        address,
        region: regionDoGun,
        phone,
        check_in,
        check_out,
        layout,
      })
      .select();

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
      console.log('blob', blob);
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
      .insert({
        camp_id: campId,
        tag: hashtag,
      })
      .select();

    if (campData && camp_facility && hashtagData) {
      alert('등록되었습니다');
    } else if (error) {
      alert(error.message);
    }
  };

  // 주소 검색 로직
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
  const handleClickOutsideModal = () => {
    setAddressModal(false);
  };

  // 시간 옵션 생성 함수
  const generateTimeOptions = () => {
    const hours = Array.from({ length: 24 }, (_, index) =>
      String(index).padStart(2, '0'),
    );
    const minutes = ['00', '30'];
    const timeOptions: string[] = [];

    hours.forEach((hour) => {
      minutes.forEach((minute) => {
        const time = `${hour}:${minute}`;
        timeOptions.push(time);
      });
    });

    return timeOptions;
  };

  return (
    <>
      <Script src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'></Script>
      <h1>캠핑장 등록</h1>
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
              defaultValue={address}
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
        <div>
          <h3>시설 등록</h3>
          <div className={styles.facilityWrap}>
            {facility?.map((item, index) => {
              return (
                <div key={index} className={styles.facility}>
                  <input
                    type='checkbox'
                    id={item.id.toString()}
                    onChange={() => {
                      onHandleCheckFacility(item.id);
                    }}
                  />
                  <label htmlFor={item.id.toString()}>{item.option}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3>체크인 시간</h3>
          <select
            value={check_in}
            onChange={(e) => {
              handleCheck_in(e.target.value);
            }}
            required
          >
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <h3>체크아웃 시간</h3>
          <select
            value={check_out}
            onChange={(e) => {
              handleCheck_out(e.target.value);
            }}
            required
          >
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3>문의전화</h3>
          <input
            defaultValue={phone}
            onChange={handlePhone}
            type='tel'
            placeholder='예) 02-000-0000 / 063-000-0000'
            pattern='[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}'
            maxLength={13}
            required
          />
        </div>
        <div>
          <h3>캠핑장 배치사진 등록</h3>
          <input
            type='file'
            onChange={handleChangeInputLayoutImageFile}
            ref={imgRef}
          />
          {campLayout ? (
            <div>
              <img src={campLayout} />
              <button type='button' onClick={() => handleDeleteCampLayoutImg()}>
                이미지 삭제
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
        <div>
          <h3>캠핑장 사진 등록</h3>
          <input
            type='file'
            onChange={handleChangeInputImageFile}
            ref={imgRef}
            required
          />
          {campPicture?.map((item, index) => {
            return (
              <div key={item + index}>
                <img src={item} />
                <button
                  type='button'
                  onClick={() => handleDeleteCampImg(index)}
                >
                  이미지 삭제
                </button>
              </div>
            );
          })}
        </div>

        <div>
          <h3>해시태그 추가</h3>
          <input
            placeholder='해시태그를 추가해주세요'
            defaultValue={hashtag}
            onChange={setHashtag}
          />
        </div>

        <div>
          <button type='button'>임시저장</button>
          <button type='submit'>등록하기</button>
        </div>
      </form>
      {isAddressModal && (
        <div className={styles.modalUP} onClick={handleClickOutsideModal}>
          <AddressModal handleCompleteAddress={handleCompleteAddress} />
        </div>
      )}
    </>
  );
};

export default AddCampPage;
