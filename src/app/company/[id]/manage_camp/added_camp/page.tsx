'use client';
import { supabase } from '@/app/api/db';
import { useQuery } from '@tanstack/react-query';
import styles from './_styles/Camp.module.css';
import React from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import emptycampImg from '@/asset/ico_empty_camp.png';
import arrow from '@/asset/ico_right_arrow.png';
import preview from '@/asset/icon-preview.png';

type Props = {};

const ManageAddedCamp = (props: Props) => {
  const router = useRouter();
  const params = useParams();

  const companyUserId = params.id;

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['camp', companyUserId],
    queryFn: async ({ queryKey }) => {
      const [, companyUserId] = queryKey; // queryKey에서 companyUserId를 추출

      const { data: camp, error } = await supabase
        .from('camp')
        .select(
          '*,camp_pic(*),hashtag(tag),camp_facility(*,facility(*)),camp_area(*),review(*)',
        )
        .eq('company_id', companyUserId as string);

      if (error) {
        // console.log('Supabase Error:', error);
        throw new Error(error.message);
        // 에러를 감지해서 쿼리문에 선언된 error로 들어가진다
      }

      return camp;
    },
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    console.log(error);
    return <div>에러 발생</div>;
  }
  console.log(data?.map((item) => item.camp_pic));
  const handleGoToCampDetail = (campId: string) => {
    router.push(`/camp/detail/${campId}`);
  };

  const goToUpdateCampPage = (campId: string) => {
    router.push(`/company/${companyUserId}/manage_camp/${campId}/update_camp`);
  };
  const goToUpdateCampAreaPage = (campId: string) => {
    router.push(
      `/company/${companyUserId}/manage_camp/${campId}/manage_camp_area`,
    );
  };

  const moreAddCamp = () => {
    router.push(`/company/${companyUserId}/manage_camp/add_camp`);
  };

  return (
    <>
      <h1 className={styles.h1}>캠핑장 운영 및 관리</h1>
      {data?.length === 0 ? (
        <div className={styles.emptyCampContainer}>
          <Image
            src={emptycampImg}
            alt='등록된 캠핑장이 없습니다.'
            width={174}
            height={174}
          />
          <p className={styles.p}>등록된 캠핑장이 없습니다.</p>
          <button
            onClick={() => {
              router.push(`/company/${companyUserId}/manage_camp/add_camp`);
            }}
            className={styles.button}
          >
            캠핑장 등록하기
            <Image src={arrow} alt='캠핑장 등록하기' width={10} height={20} />
          </button>
        </div>
      ) : (
        <div className={styles.campWrap}>
          <div className={styles.campHeader}>
            <div className={styles.campHeaderLeft}>캠핑장</div>
            <div className={styles.campHeaderRight}>편집 기능</div>
          </div>
          <div className={styles.separateLine}></div>
          {data?.map((item) => {
            return (
              <div key={item.id}>
                <div className={styles.campBox}>
                  <Image
                    src={item.camp_pic[0]?.photo_url}
                    alt='캠핑장 이미지'
                    width={128}
                    height={128}
                  />
                  <div className={styles.campNameWrap}>
                    <h1 className={styles.campName}>{item.name}</h1>
                    <button
                      onClick={() => handleGoToCampDetail(item.id)}
                      className={styles.preview}
                    >
                      <span>미리보기</span>
                      <Image
                        src={preview}
                        alt='미리보기'
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                  {/* <p>{item.address}</p>
                  <p>{item.phone}</p>
                  <p>{item.content}</p>
                  {item.camp_facility.map((facility, index) => {
                    return (
                      <div key={index}>
                        <p>{String(facility.facility?.option)}</p>
                      </div>
                    );
                  })} */}
                  {/* {item.camp_pic.map((campPic) => {
                    return (
                      <div key={campPic.id}>
                        <Image
                          src={campPic.photo_url}
                          alt='캠핑장 이미지'
                          width={100}
                          height={100}
                        />
                      </div>
                    );
                  })} */}
                  {/* {item.hashtag.map((tag) => {
                    return (
                      <div key={tag.tag}>
                        <p>#{tag.tag}</p>
                      </div>
                    );
                  })} */}
                  <div className={styles.editWrap}>
                    <button onClick={() => goToUpdateCampPage(item.id)}>
                      캠핑장 정보 수정
                    </button>
                    <button onClick={() => goToUpdateCampAreaPage(item.id)}>
                      캠핑존 정보 수정
                    </button>
                  </div>
                </div>
                <div className={styles.separateLineTwo}></div>
              </div>
            );
          })}
          <button className={styles.moreAddCamp} onClick={moreAddCamp}>
            캠핑장 추가 등록
          </button>
        </div>
      )}
    </>
  );
};

export default ManageAddedCamp;
