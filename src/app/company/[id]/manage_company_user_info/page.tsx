'use client';
import { supabase } from '@/app/api/db';
import { Tables } from '@/types/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getSession, useSession } from 'next-auth/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './_styles/ManageCompanyUserInfo.module.css';

type Props = {};

const ManageCompanyInfo = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const [companyUserInfo, setCompanyUserInfo] =
    useState<Tables<'company_user'>[]>();
  const [isNameUpdate, setIsNameUpdate] = useState(false);

  const [updateCompanyUserName, setUpdateCompanyUserName] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const sessionData = await getSession();
      const getSessionUserId = sessionData?.user.id;

      const { data: getCompanyUserInfo, error } = await supabase
        .from('company_user')
        .select('*')
        .eq('id', getSessionUserId as string);

      if (getCompanyUserInfo) {
        setCompanyUserInfo(getCompanyUserInfo);
      } else if (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [session]);

  const handleUpdateName = () => {
    setIsNameUpdate(true);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateCompanyUserName(e.target.value);
  };

  const {
    mutate: updateCompanyUserInfo,
    isError,
    error,
  } = useMutation({
    mutationFn: async (companyuserid: string) => {
      // const sessionData = await getSession();
      // const getSessionUserId = sessionData?.user.id;
      const { data, error } = await supabase
        .from('company_user')
        .update({ name: updateCompanyUserName })
        .eq('id', companyuserid);

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
    return <div>에러발생</div>;
  }

  const handleCompleteUpdateName = (companyuserid: string) => {
    updateCompanyUserInfo(companyuserid);

    setIsNameUpdate(false);
  };

  return (
    <>
      <h1 className={styles.h1}>회원정보관리</h1>

      {companyUserInfo?.map((item) => {
        return (
          <div key={item.id}>
            {isNameUpdate ? (
              <div>
                <input
                  value={updateCompanyUserName}
                  onChange={handleChangeName}
                  required
                />
                <button onClick={() => handleCompleteUpdateName(item.id)}>
                  수정완료
                </button>
              </div>
            ) : (
              <div>
                <p>{item.name}</p>
                <button onClick={handleUpdateName}>이름수정</button>
              </div>
            )}
            <p>{item.email}</p>
            <p>{item.password}</p>
          </div>
        );
      })}
    </>
  );
};

export default ManageCompanyInfo;
