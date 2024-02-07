'use client';
import { supabase } from '@/app/api/db';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import SearchAddress from './_components/SearchAddress';
import Facility from './_components/Facility';
import { Tables } from '@/types/supabase';
import { Camp } from '@/types/supabaseSchema';
import CheckInOut from './_components/CheckInOut';
import Layout from './_components/Layout';
import CampPicture from './_components/CampPicture';
import Hashtag from './_components/Hashtag';
import styles from './_styles/CampForm.module.css';
import { toast } from 'react-toastify';
import Loading from '@/app/loading';
import { pattern } from './_lib/validation';

const UpdateCampPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [content, setContent] = useState('');
  const [facility, setFacility] = useState<Tables<'facility'>[]>([]);
  const [checkedFacility, setCheckedFacility] = useState<number[]>([]);
  const [check_in, handleCheck_in] = useState('');
  const [check_out, handleCheck_out] = useState('');
  const [phone, setPhone] = useState('');
  const [isRightNumber, setIsRightNumber] = useState(false);
  const [layout, setLayout] = useState('');
  const [campPicture, setCampPicture] = useState<string[]>([]);
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [inputHashTag, setInputHashTag] = useState('');

  const [isDeleteCamp, setIsDeleteCamp] = useState(false);

  const params = useParams();
  const campId = params.camp_id;
  const companyId = params.id;

  const queryClient = useQueryClient();

  const router = useRouter();

  // 캠핑장 삭제
  const {
    mutate: deleteCamp,
    isPending: isPendingDeleteCamp,
    error: deleteCampError,
  } = useMutation({
    mutationFn: async () => {
      await supabase.from('camp').delete().eq('id', campId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['camp_id'] });
    },
  });

  const handleDeleteCamp = async () => {
    const { data: campAreaData } = await supabase
      .from('camp_area')
      .select('*')
      .eq('camp_id', campId);

    if (campAreaData?.length !== 0) {
      toast.error('캠핑존 데이터가 있어 삭제할 수 없습니다.');
      return;
    } else {
      setIsDeleteCamp(true);
    }
  };

  const handleDeleteComplete = () => {
    deleteCamp();
    if (isPendingDeleteCamp) {
      return <Loading />;
    }
    if (deleteCampError) {
      console.log(deleteCampError);
      return;
    }
    router.push(`/company/${companyId}/manage_camp/added_camp`);
  };

  const handleCancelBtn = () => {
    setIsDeleteCamp(false);
  };

  const { data: campData, isLoading } = useQuery({
    queryKey: ['camp_id'],
    queryFn: async () => {
      const { data: campData } = await supabase
        .from('camp')
        .select('*,camp_facility("*"),camp_pic("*"),hashtag("*")')
        .eq('id', campId)
        .returns<Camp[]>();

      return campData;
    },
  });

  useEffect(() => {
    if (!campData?.length) {
      return;
    }
    setName(campData[0].name);
    setAddress(campData[0].address);
    setContent(campData[0].content);
    setCheckedFacility(
      campData[0].camp_facility?.map((facility) => facility.facility_id!)!,
    );
    handleCheck_in(campData[0].check_in);
    handleCheck_out(campData[0].check_out);
    setPhone(campData[0].phone);
    if (pattern.test(campData[0].phone)) {
      setIsRightNumber(true);
    }
    setLayout(campData[0].layout);
    setCampPicture(campData[0].camp_pic?.map((picture) => picture.photo_url!)!);
    setHashTags(campData[0].hashtag?.map((hashtag) => hashtag.tag!)!);
  }, [campData]);

  const [isAddressModal, setAddressModal] = useState(false);

  // 등록 눌렀을 시 캠핑장 이미지 업로드
  async function uploadStorageCampPicData(blob: Blob | File) {
    // const {data:campPicData} =await supabase.storage.from("camp_pic").getPublicUrl()
    const { data, error } = await supabase.storage
      .from('camp_pic')
      .upload(window.URL.createObjectURL(blob), blob);
    return { data: data, error };
  }

  // 지역정보 구분
  const regionSplit = address.split(' ');
  const regionDoGun = regionSplit[0] + ' ' + regionSplit[1];

  // 전화번호 유효성 검사
  const checkRightNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (pattern.test(e.target.value)) {
      setIsRightNumber(true);
      return setPhone(e.target.value);
    } else {
      setIsRightNumber(false);
      return;
    }
  };

  const {
    mutate: updateCamp,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      try {
        // 수정된 input value들을 update
        const { data, error } = await supabase
          .from('camp')
          .update({
            name,
            content,
            address,
            region: regionDoGun,
            check_in,
            check_out,
            phone,
            layout,
          })
          .eq('id', campId);

        // select로 campId에 맞는 camp_facility를 불러오고
        const { data: checkedFacilityData, error: selectError } = await supabase
          .from('camp_facility')
          .select('*')
          .eq('camp_id', campId);

        // checkedFacilityData에 이미 있는 facility데이터를 지우고
        const facilityIds = checkedFacilityData?.map(
          (item) => item.facility_id,
        );
        const { data: checkedFacilityDataRemove, error: deleteError } =
          await supabase
            .from('camp_facility')
            .delete()
            .eq('camp_id', campId)
            .in('facility_id', facilityIds as number[]);

        // 다시 체크된 facility만 insert
        const { data: checkedFacilityDataInsert, error: insertError } =
          await supabase
            .from('camp_facility')
            .insert(
              checkedFacility.map((item) => {
                return { camp_id: campId as string, facility_id: item };
              }),
            )
            .select();

        // camp_pic 데이터 삭제
        const { data: deleteCampPicData, error: deleteCampPicError } =
          await supabase.from('camp_pic').delete().eq('camp_id', campId);

        // 여러개 사진 table에 올리는 로직
        // for of로 리팩터링
        // campPicture.forEach(async (item) => {
        //   const blob = await fetch(item).then((r) => r.blob());
        //   const { data, error } = await uploadStorageCampPicData(blob);
        //   const BASE_URL =
        //     'https://kuxaffboxknwphgulogp.supabase.co/storage/v1/object/public/camp_pic/';
        //   if (error) return null;
        //   // supabase table에 올리는 로직
        //   await supabase.from('camp_pic').upsert([
        //     {
        //       camp_id: campId as string,
        //       photo_url: BASE_URL + data?.path,
        //     },
        //   ]);
        // });
        for (const item of campPicture) {
          const blob = await fetch(item).then((r) => r.blob());
          const { data, error } = await uploadStorageCampPicData(blob);
          const BASE_URL =
            'https://kuxaffboxknwphgulogp.supabase.co/storage/v1/object/public/camp_pic/';

          if (error) {
            // Handle error if needed
            console.error(error);
            continue;
          }

          // supabase table에 올리는 로직
          await supabase.from('camp_pic').upsert([
            {
              camp_id: campId as string,
              photo_url: BASE_URL + data?.path,
            },
          ]);
        }

        // hashtag 데이터 삭제
        const { data: deleteHashtagData, error: deleteHashtagDataError } =
          await supabase.from('hashtag').delete().eq('camp_id', campId);

        // hashtag 데이터 insert
        const { data: insertHashtagData, error: insertHashtagDataError } =
          await supabase.from('hashtag').insert(
            hashTags.map((item) => {
              return { camp_id: campId as string, tag: item };
            }),
          );

        if (
          error ||
          selectError ||
          deleteError ||
          insertError ||
          deleteCampPicError ||
          deleteHashtagDataError ||
          insertHashtagDataError
        ) {
          throw new Error(
            error?.message ||
              selectError?.message ||
              deleteError?.message ||
              insertError?.message ||
              deleteCampPicError?.message ||
              deleteHashtagDataError?.message ||
              insertHashtagDataError?.message,
          );
        }
        return {
          data,
          checkedFacilityData,
          checkedFacilityDataRemove,
          checkedFacilityDataInsert,
          deleteCampPicData,
          deleteHashtagData,
          insertHashtagData,
        };
      } catch (error) {
        console.error('An error occurred:', error);
        throw error; // 다시 던져서 상위 레벨로 전파
      }
    },
    onSuccess: async (data) => {
      console.log('data', data);
      await queryClient.invalidateQueries({ queryKey: ['camp_id'] });
      // await queryClient.refetchQueries({ queryKey: ['camp_id'] });
      router.push(`/company/${companyId}/manage_camp/added_camp`);
    },
    onError: (error) => {
      console.error('뮤테이션 에러:', error);
      toast.error('오류가 발생했습니다. 다시 시도해주세요.');
    },
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    console.log(error);
    return <div>에러 발생</div>;
  }

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (campPicture.length < 5) {
      // todo : campPicture가 없을 때 로직 처리해야함
      toast.error('캠핑장 이미지 다섯 장 이상 등록');
      return;
    }

    updateCamp();

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
      const blob = await fetch(layout).then((r) => r.blob());
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

    if (error) {
      console.log(error);
      toast.error('에러 발생');
    } else {
      toast.success('수정 완료!');
    }
  };

  return (
    <>
      <h1 className={styles.h1}>캠핑장 수정</h1>
      {isLoading ? (
        <div>로딩중입니다.</div>
      ) : (
        campData?.length === 1 && (
          <div>
            <form onSubmit={handleForm} className={styles.formLayout}>
              <div className={styles.campNameWrap}>
                <h3>캠핑장 명</h3>
                <input
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
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
                    required
                    className={styles.addressSearchInput}
                  />
                </div>
              </div>

              <div className={styles.campContentWrap}>
                <h3>캠핑장 소개</h3>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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
                  onChange={checkRightNumber}
                  type='tel'
                  placeholder='예) 02-000-0000 / 063-000-0000'
                  pattern='[0-9]{2,4}-[0-9]{3,4}-[0-9]{4}'
                  maxLength={13}
                  required
                  className={styles.requestCallInput}
                />
                {isRightNumber ? (
                  ''
                ) : (
                  <p className={styles.isRightNumber}>형식을 맞춰주세요</p>
                )}
              </div>

              <Layout layout={layout} setLayout={setLayout} />

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
                {/* <button>수정취소</button> */}
                <button type='submit'>수정완료</button>
                <button type='button' onClick={handleDeleteCamp}>
                  삭제하기
                </button>
              </div>
            </form>
            <SearchAddress
              setAddress={setAddress}
              isAddressModal={isAddressModal}
              setAddressModal={setAddressModal}
            />
          </div>
        )
      )}

      {isDeleteCamp && (
        <div onClick={handleCancelBtn} className={styles.deleteCampModalUp}>
          <div className={styles.confirm}>
            <p>정말 삭제하시겠습니까?</p>
            <div className={styles.delbtns}>
              <button onClick={handleDeleteComplete}>삭제</button>
              <button onClick={handleCancelBtn}>취소</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateCampPage;
