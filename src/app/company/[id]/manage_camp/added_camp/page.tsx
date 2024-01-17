'use client';
import { supabase } from '@/app/api/db';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import styles from './_styles/Camp.module.css';
import React from 'react';
import Image from 'next/image';
import Hashtag from '@/app/camp/_components/Hashtag';

type Props = {};

const ManageAddedCamp = (props: Props) => {
  const { data: session } = useSession();
  const companyUserId = session?.user?.id;
  console.log(companyUserId);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['camp', companyUserId],
    queryFn: async ({ queryKey }) => {
      const [, companyUserId] = queryKey; // queryKey에서 companyUserId를 추출

      try {
        const { data: camp, error } = await supabase
          .from('camp')
          .select(
            '*,camp_pic(*),hashtag(tag),camp_facility(*,facility(*)),camp_area(*),review(*)',
          )
          .eq('company_id', companyUserId as string);

        if (error) {
          console.log('Supabase Error:', error);
        }

        return camp;
      } catch (error) {
        console.log('Caught an error:', error);
      }
    },
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <>
      {
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
                <button>캠핑장수정</button>
                <button>캠핑장삭제</button>
              </div>
            );
          })}
        </div>
      }
    </>
  );
};

export default ManageAddedCamp;
