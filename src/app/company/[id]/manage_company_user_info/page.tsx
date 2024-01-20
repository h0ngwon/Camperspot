'use client';
import { supabase } from '@/app/api/db';
import { Tables } from '@/types/supabase';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useState } from 'react';

type Props = {};

const ManageCompanyInfo = (props: Props) => {
  const { data: session } = useSession();
  const [companyUserInfo, setCompanyUserInfo] =
    useState<Tables<'company_user'>[]>();
  const [isNameUpdate, setIsNameUpdate] = useState(false);

  const [updateCompanyUserName, setUpdateCompanyUserName] = useState<string>();

  const getSessionUserId = session?.user.id;

  console.log(getSessionUserId);

  const getSupabaseCompanyUserId = async () => {
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
  getSupabaseCompanyUserId();

  const handleUpdateName = () => {
    setIsNameUpdate(true);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateCompanyUserName(e.target.value);
  };

  const handleCompleteUpdateName = async () => {
    const { data: UpdateCompanyUserInfo, error } = await supabase
      .from('company_user')
      .update({ name: updateCompanyUserName })
      .eq('id', getSessionUserId as string);
    console.log(UpdateCompanyUserInfo);
    setIsNameUpdate(false);
  };
  return (
    <>
      <h1>회원정보관리</h1>

      {companyUserInfo?.map((item) => {
        return (
          <div key={item.id}>
            {isNameUpdate ? (
              <div>
                <input
                  value={updateCompanyUserName}
                  onChange={handleChangeName}
                />
                <button onClick={() => handleCompleteUpdateName()}>
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
