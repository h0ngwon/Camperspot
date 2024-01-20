'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import plusBtn from '../../../../../../asset/ph_plus.png';
import CampAreaModal from './_components/CampAreaModal';
import styles from './_styles/CampAreaForm.module.css';
import { supabase } from '@/app/api/db';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const AddCampArea = () => {
  const [isCampAreaModal, setCampAreaModal] = useState(false);

  const params = useParams();

  // camp id는 이 페이지를 클릭하고 들어올 때 정해짐
  const campId = params.camp_id;

  const deleteCampArea = useMutation({
    mutationFn: async () => {
      await supabase.from('camp_area').delete().eq('camp_id', campId);
    },
  });

  const handleDeleteCampArea = () => {
    deleteCampArea.mutate();
  };

  // campId에 맞는 camp area를 들고 와서 map으로 뿌려주는 로직
  const { data, isLoading, isError } = useQuery({
    queryKey: ['camp_area'],
    queryFn: async () => {
      const { data: campAreaInfo } = await supabase
        .from('camp_area')
        .select('*')
        .eq('camp_id', campId);

      return campAreaInfo;
    },
  });
  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div className={styles.backWidth}>
      <div className={styles.campAreaWrap}>
        {data?.map((camparea) => {
          return (
            <div className={styles.addCampArea} key={camparea.id}>
              <div>
                <h3>{camparea.name}</h3>
                <button onClick={handleDeleteCampArea}>x</button>
              </div>
              <img />
              <div>
                <div>
                  <p>최대 수용인원</p>
                  <p>{camparea.max_people}</p>
                </div>
                <div>
                  <p>금액</p>
                  <p>{camparea.price}원</p>
                </div>
              </div>
            </div>
          );
        })}
        <div
          onClick={() => {
            setCampAreaModal(true);
          }}
          className={styles.addCampArea}
        >
          <Image src={plusBtn} alt='캠핑존 추가하기 버튼' />
          <p>캠핑존 추가하기</p>
        </div>
        {isCampAreaModal && (
          <div className={styles.modalUP}>
            <CampAreaModal setCampAreaModal={setCampAreaModal} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCampArea;
