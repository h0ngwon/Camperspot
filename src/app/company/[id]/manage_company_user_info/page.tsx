'use client';
import { supabase } from '@/app/api/db';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSession, useSession } from 'next-auth/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './_styles/ManageCompanyUserInfo.module.css';
import EditPencilSvg from './_svg/EditPencilSvg';

const ManageCompanyInfo = () => {
  const queryClient = useQueryClient();
  // const session = useSession();
  // const [companyUserInfo, setCompanyUserInfo] =
  //   useState<Tables<'company_user'>[]>();
  const [isNameUpdate, setIsNameUpdate] = useState(false);

  const [updateCompanyUserName, setUpdateCompanyUserName] = useState<string>();

  const { data: getCompanyUserInfoData, error } = useQuery({
    queryKey: ['company_user'],
    queryFn: async () => {
      const sessionData = await getSession();
      const getSessionUserId = sessionData?.user.id;

      const { data: getCompanyUserInfo, error } = await supabase
        .from('company_user')
        .select('*')
        .eq('id', getSessionUserId as string);

      if (error) {
        throw new Error(error.message);
      } else {
        return getCompanyUserInfo;
      }
    },
  });
  if (error) {
    console.log(error);
  }
  // 초반 데이터 불러오는 방식 << 지우지 말아주세요
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const sessionData = await getSession();
  //     const getSessionUserId = sessionData?.user.id;

  //     const { data: getCompanyUserInfo, error } = await supabase
  //       .from('company_user')
  //       .select('*')
  //       .eq('id', getSessionUserId as string);

  //     if (getCompanyUserInfo) {
  //       setCompanyUserInfo(getCompanyUserInfo);
  //     } else if (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   fetchData();
  // }, [session]);

  useEffect(() => {
    if (!getCompanyUserInfoData) {
      return;
    }
    setUpdateCompanyUserName(getCompanyUserInfoData[0].name);
  }, [getCompanyUserInfoData]);

  const handleUpdateName = () => {
    setIsNameUpdate(true);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateCompanyUserName(e.target.value);
  };

  const {
    mutate: updateCompanyUserInfo,
    isError,
    error: updateError,
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
      queryClient.invalidateQueries({ queryKey: ['company_user'] });
    },
  });
  if (isError) {
    console.log(updateError);
    return <div>에러발생</div>;
  }

  const handleCompleteUpdateName = (companyuserid: string) => {
    updateCompanyUserInfo(companyuserid);

    setIsNameUpdate(false);
  };

  return (
    <>
      <h1 className={styles.h1}>회원정보관리</h1>

      {getCompanyUserInfoData?.map((item) => {
        return (
          <div key={item.id} className={styles.infoWrap}>
            {isNameUpdate ? (
              <div className={styles.UpdateName}>
                <h3 className={styles.h3}>업체회원명</h3>
                <input
                  value={updateCompanyUserName}
                  onChange={handleChangeName}
                  required
                />
                <button
                  onClick={() => handleCompleteUpdateName(item.id)}
                  className={styles.completeUpdateBtn}
                >
                  수정완료
                </button>
              </div>
            ) : (
              <div className={styles.UpdateName}>
                <h3 className={styles.h3}>업체회원명</h3>
                <p>{item.name}</p>
                <button onClick={handleUpdateName}>
                  <EditPencilSvg />
                </button>
              </div>
            )}
            <div className={styles.emailWrap}>
              <h3 className={styles.h3}>계정정보</h3>
              <p>{item.email}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ManageCompanyInfo;
