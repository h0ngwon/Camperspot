'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import plusBtn from '../../../../../../asset/ph_plus.png';
import CampAreaModal from './_components/CampAreaModal';
import styles from './_styles/CampAreaForm.module.css';
import { supabase } from '@/app/api/db';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import removeBtn from '@/asset/ico_removePicBtn.png';
import { toast } from 'react-toastify';

const AddCampArea = () => {
  const [isCampAreaModal, setCampAreaModal] = useState(false);
  const [isDeleteCampArea, setIsDeleteCampArea] = useState(false);

  const params = useParams();

  const queryClient = useQueryClient();

  // camp id는 이 페이지를 클릭하고 들어올 때 정해짐
  const campId = params.camp_id;

  const deleteCampArea = useMutation({
    mutationFn: async (campareaId: string) => {
      await supabase.from('camp_area').delete().eq('id', campareaId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleCheckingBeforeDeleteCampArea = async (id: string) => {
    const { data: reservation, error: reservationError } = await supabase
      .from('reservation')
      .select('*');
    const filteredCampAreaId = reservation
      ?.filter((item) => {
        return item.camp_area_id === id;
      })
      .map((item) => item.camp_area_id);

    if (filteredCampAreaId?.length !== 0) {
      toast.error('예약현황이 있어 삭제할 수 없습니다');
    } else {
      setIsDeleteCampArea(true);
    }
  };

  const handleDeleteCampArea = (id: string) => {
    deleteCampArea.mutate(id);
  };

  const handleCancelBtn = () => {
    setIsDeleteCampArea(false);
  };

  // campId에 맞는 camp area를 들고 와서 map으로 뿌려주는 로직
  const { data, isLoading, isError } = useQuery({
    queryKey: ['camp_area'],
    queryFn: async () => {
      const { data: campAreaInfo } = await supabase
        .from('camp_area')
        .select('*,camp(check_in,check_out)')
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
    <div>
      <h1 className={styles.h1}>캠핑존 관리</h1>
      <div className={styles.backWidth}>
        <div className={styles.campAreaWrap}>
          {data?.map((camparea) => {
            return (
              <div className={styles.campArea} key={camparea.id}>
                <div className={styles.areaHead}>
                  <h3 className={styles.h3}>{camparea.name}</h3>
                  <button
                    onClick={() =>
                      handleCheckingBeforeDeleteCampArea(camparea.id)
                    }
                    className={styles.deleteCardBtn}
                  >
                    <Image src={removeBtn} alt='삭제버튼' width={17} />
                  </button>
                </div>
                <Image
                  src={camparea.photo_url}
                  alt='캠핑존 이미지'
                  width={150}
                  height={150}
                  className={styles.img}
                />
                <div className={styles.textBox}>
                  <div>
                    <p className={styles.textAlign}>최대 수용인원</p>
                    <p>{camparea.max_people}명</p>
                  </div>
                  <div>
                    <p className={styles.textAlign}>체크인 시간</p>
                    <p>{camparea.camp?.check_in}</p>
                  </div>
                  <div>
                    <p className={styles.textAlign}>체크아웃 시간</p>
                    <p>{camparea.camp?.check_out}</p>
                  </div>
                  <div>
                    <p className={styles.textAlign}>금액</p>
                    <p>
                      {camparea.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      원
                    </p>
                  </div>
                </div>
                {isDeleteCampArea && (
                  <div
                    onClick={handleCancelBtn}
                    className={styles.deleteCampAreaModalUp}
                  >
                    <div className={styles.confirm}>
                      <p>정말 삭제하시겠습니까?</p>
                      <div className={styles.btns}>
                        <button
                          onClick={() => handleDeleteCampArea(camparea.id)}
                        >
                          삭제
                        </button>
                        <button onClick={handleCancelBtn}>취소</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div
            onClick={() => {
              setCampAreaModal(true);
            }}
            className={styles.addCampArea}
          >
            <div className={styles.btnWrap}>
              <Image src={plusBtn} alt='캠핑존 추가하기 버튼' />
              <p>캠핑존 추가하기</p>
            </div>
          </div>
          {isCampAreaModal && (
            <div className={styles.modalUP}>
              <CampAreaModal setCampAreaModal={setCampAreaModal} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCampArea;
