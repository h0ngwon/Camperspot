'use client';
import { supabase } from '@/app/api/db';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

type Props = {};

const UpdateCampPage = (props: Props) => {
  const params = useParams();
  const campId = params.camp_id;
  const { data } = useQuery({
    queryKey: ['camp_id'],
    queryFn: async () => {
      const { data: campData } = await supabase
        .from('camp')
        .select('*')
        .eq('id', campId);

      return campData;
    },
  });
  console.log(data);

  return (
    <div>
      {data?.length === 1 ? (
        <>
          <div>{data[0].address}</div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default UpdateCampPage;
