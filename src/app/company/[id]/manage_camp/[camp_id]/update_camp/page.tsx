'use client';
import { supabase } from '@/app/api/db';
import useInput from '@/hooks/useInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import SearchAddress from './_components/SearchAddress';
import Facility from './_components/Facility';
import { Tables } from '@/types/supabase';
import { Camp } from '@/types/supabaseSchema';

type Props = {};

const UpdateCampPage = (props: Props) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [content, setContent] = useState('');
  const [facility, setFacility] = useState<Tables<'facility'>[]>([]);
  const [checkedFacility, setCheckedFacility] = useState<number[]>([]);

  const params = useParams();
  const campId = params.camp_id;
  const companyId = params.id;

  const queryClient = useQueryClient();

  const router = useRouter();

  const { data: campData } = useQuery({
    queryKey: ['camp_id'],
    queryFn: async () => {
      const { data: campData } = await supabase
        .from('camp')
        .select('*,camp_facility("*")')
        .eq('id', campId)
        .returns<Camp[]>();

      return campData;
    },
  });

  useEffect(() => {
    if (!campData) {
      return;
    }
    setName(campData[0].name);
    setAddress(campData[0].address);
    setContent(campData[0].content);
    setCheckedFacility(
      campData[0].camp_facility?.map((facility) => facility.facility_id!)!,
    );
  }, [campData]);

  const [isAddressModal, setAddressModal] = useState(false);

  const {
    mutate: updateCamp,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('camp')
        .update({ name, address })
        .eq('id', campId);

      // select로 campId에 맞는 camp_facility를 불러오고
      // 만약 check된 facility id랑 camp facility의 facility_id랑 같으면
      // 그대로 두거나 insert
      // camp facility에는 있는데 check된 facility에는 없는 id면 delete
      const { data: checkFacility } = await supabase
        .from('camp_facility')
        .select('*')
        .eq('camp_id', campId);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  if (isError) {
    console.log(error);
    return <div>에러 발생</div>;
  }

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateCamp();

    alert('수정완료');
    router.push(`/company/${companyId}/manage_camp/added_camp`);
  };

  return (
    <div>
      {campData?.length === 1 ? (
        <div>
          <form onSubmit={handleForm}>
            <div>
              <h3>캠핑장 명</h3>
              <input value={name} onChange={(e) => setName(e.target.value)} />
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
                  value={address}
                  placeholder='주소검색하기를 클릭해주세요'
                  required
                />
              </div>
            </div>

            <div>
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

            <button type='submit'>수정완료</button>
          </form>
          <SearchAddress
            setAddress={setAddress}
            isAddressModal={isAddressModal}
            setAddressModal={setAddressModal}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default UpdateCampPage;
