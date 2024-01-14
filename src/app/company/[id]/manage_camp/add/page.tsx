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
import AddressModal from '@/app/company/[id]/manage_camp/add/_components/AddressModal';
import { Address } from 'react-daum-postcode';
import { uuid } from 'uuidv4';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
  const [facility, setFacility] = useState<Tables<'facility'>[]>();
  const [checkedFacility, setCheckedFacility] = useState<number[]>([]);
  const [campPicture, setCampPicture] = useState<Tables<'camp_pic'>[]>();

  const campId = uuid();

  const { data: session } = useSession();

  async function fetchFacilityData() {
    // facility에서 option 가져오는거
    const { data: facilityData } = await supabase.from('facility').select('*');
    if (facilityData) {
      setFacility(facilityData);
    }
  }
  // const imgRef = useRef<HTMLInputElement>(null);

  const uploadCampPic = async (e: ChangeEvent<HTMLInputElement>) => {
    // const file = imgRef.current?.files;
    if (e.target.files) {
      const file = e.target.files[0];
      return file;
    }
  };

  async function fetchCampPicData() {
    const { data: campPictureData } = await supabase
      .from('camp_pic')
      .select('*');
    if (campPictureData) {
      setCampPicture(campPictureData);
    }
  }
  useEffect(() => {
    fetchFacilityData();
    fetchCampPicData();
  }, []);

  const onHandleCheckFacility = (value: number) => {
    if (checkedFacility.find((item) => Number(item) === value)) {
      const filterdFacility = checkedFacility.filter((item) => {
        return Number(item) !== value;
      });
      return setCheckedFacility(filterdFacility);
    }

    setCheckedFacility([...checkedFacility, value]);
  };

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //
    const companyEmail = session?.user?.email as string;
    const { data: getCompanyId } = await supabase
      .from('company_user')
      .select('id')
      .eq('email', companyEmail);
    if (!getCompanyId) {
      return;
    }
    const companyId = getCompanyId[0].id;

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

    const { data: camp_facility } = await supabase
      .from('camp_facility')
      .insert(
        checkedFacility.map((item) => {
          return { camp_id: campId, facility_id: item };
        }),
      )
      .select();

    // const avatarFile = event.target.files[0];
    // const { data: uploadData } = await supabase.storage
    //   .from('camp_pic')
    //   .upload('photo_url', avatarFile, {
    //     cacheControl: '3600',
    //     upsert: false,
    //   });

    if (campData && camp_facility) {
      alert('등록되었습니다');
    } else if (error) {
      alert(error.message);
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
  const handleClickOutsideModal = () => {
    setAddressModal(false);
  };

  return (
    <>
      <Head>
        <script src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'></script>
      </Head>

      <form onSubmit={handleForm} className={styles.formLayout}>
        <h1>캠핑장 등록</h1>
        <div>
          <h3>캠핑장 명</h3>
          <input
            defaultValue={name}
            onChange={handleName}
            placeholder='이름을 입력해주세요'
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
          <input
            defaultValue={check_in}
            onChange={handleCheck_in}
            placeholder='체크인 시간을 입력해주세요'
          />
          <h3>체크아웃 시간</h3>
          <input
            defaultValue={check_out}
            onChange={handleCheck_out}
            placeholder='체크아웃 시간을 입력해주세요'
          />
        </div>
        <div>
          <h3>문의전화</h3>
          <input
            defaultValue={phone}
            onChange={handlePhone}
            type='tel'
            placeholder='캠핑장 전화번호를 입력해주세요. 예) 02-000-0000 / 063-000-0000'
            pattern='[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}'
            maxLength={13}
          />
        </div>
        <div>
          <h3>캠핑장 배치 사진 등록</h3>
          <input
            type='file'
            onChange={uploadCampPic}
            // ref={imgRef}
          />
          {/* {campPicture?.filter((item) => {
            if (item.camp_id === campId) {
              return <img src={item.photo_url} />;
            }
          })} */}
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

export default addCampPage;
