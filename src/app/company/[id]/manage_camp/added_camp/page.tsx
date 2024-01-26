'use client';
import { supabase } from '@/app/api/db';
import { useQuery } from '@tanstack/react-query';
import styles from './_styles/Camp.module.css';
import React from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import emptycampImg from '@/asset/ico_empty_camp.png';
import arrow from '@/asset/ico_right_arrow.png';

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

  const handleGoToCampDetail = (campId: string) => {
    router.push(`/camp/detail/${campId}`);
  };

  const goToUpdateCampPage = (campId: string) => {
    router.push(`/company/${companyUserId}/manage_camp/${campId}/update_camp`);
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
          {data?.map((item) => {
            return (
              <div className={styles.campBox} key={item.id}>
                <h1>{item.name}</h1>
                <p>{item.address}</p>
                <p>{item.phone}</p>
                <p>{item.content}</p>
                {item.camp_facility.map((facility, index) => {
                  return (
                    <div key={index}>
                      <p>{String(facility.facility?.option)}</p>
                    </div>
                  );
                })}
                <Image
                  src={item.layout}
                  alt='배치이미지'
                  width={100}
                  height={100}
                />
                {item.camp_pic.map((campPic) => {
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
                })}
                {item.hashtag.map((tag) => {
                  return (
                    <div key={tag.tag}>
                      <p>#{tag.tag}</p>
                    </div>
                  );
                })}
                <button onClick={() => handleGoToCampDetail(item.id)}>
                  캠핑장 상세
                </button>
                <button onClick={() => goToUpdateCampPage(item.id)}>
                  캠핑장수정
                </button>
                <button>캠핑장삭제</button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ManageAddedCamp;
