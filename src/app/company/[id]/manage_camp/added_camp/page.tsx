'use client';
import { supabase } from '@/app/api/db';
import { useQuery } from '@tanstack/react-query';
import styles from './_styles/Camp.module.css';
import React from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import EmptyCampIllustSvg from './_svg/EmptyCampIllustSvg';
import RightArrowSvg from './_svg/RightArrowSvg';
import PreviewSvg from './_svg/PreviewSvg';

const ManageAddedCamp = () => {
  const router = useRouter();
  const params = useParams();

  const companyUserId = params.id;

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['camp_id', companyUserId],
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
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div>
          <h1 className={styles.h1}>캠핑장 운영 및 관리</h1>
          {data?.length === 0 ? (
            <div className={styles.emptyCampContainer}>
              <p className={styles.p}>등록된 캠핑장이 없습니다.</p>
              <EmptyCampIllustSvg />
              <button
                onClick={() => {
                  router.push(`/company/${companyUserId}/manage_camp/add_camp`);
                }}
                className={styles.button}
              >
                캠핑장 등록하기
                <RightArrowSvg />
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
                      <div className={styles.campImg}>
                        <Image
                          src={item.camp_pic[0]?.photo_url}
                          alt='캠핑장 이미지'
                          width='0'
                          height='0'
                          sizes='100vw'
                          style={{ width: '100%', height: '100vh' }}
                          priority
                        />
                      </div>
                      <div className={styles.campNameWrap}>
                        <h1 className={styles.campName}>{item.name}</h1>
                        <button
                          onClick={() => handleGoToCampDetail(item.id)}
                          className={styles.preview}
                        >
                          <span>미리보기</span>
                          <PreviewSvg />
                        </button>
                      </div>
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
        </div>
      )}
    </>
  );
};

export default ManageAddedCamp;
