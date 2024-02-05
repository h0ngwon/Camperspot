import MyProfileSvg from '@/components/MyProfileSvg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../_styles/Header.module.css';
import { Session } from 'next-auth';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../profile/[id]/_lib/profile';
import { signOut } from 'next-auth/react';

type Props = {
  session: Session;
};

const ProfileDivider = ({ session }: Props) => {
  const { data } = useQuery({
    queryKey: ['mypage', 'profile', session?.user.id],
    queryFn: getUserData,
  });
  return (
    <>
      {session.user.role === 'company' ? (
        <Link href={`/company/${session.user.id}/manage_reservation`}>
          <MyProfileSvg />
          <p>company</p>
        </Link>
      ) : (
        <Link href={`/profile/${session.user.id}`}>
          <Image
            src={data?.profile_url!}
            alt=''
            width={36}
            height={36}
            className={styles.profileImg}
          />
          <p>마이</p>
        </Link>
      )}
      {/* <div style={{width: 118, height: 182, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
  <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', display: 'flex'}}>
    <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
      <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex'}}>
        <div style={{width: 36, height: 36, position: 'relative'}}>
          <div style={{width: 30, height: 29, left: 3, top: 3, position: 'absolute', background: 'black'}}></div>
        </div>
      </div>
      <div style={{color: 'black', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word'}}>사장님</div>
    </div>
    <div style={{width: 118, height: 127, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
      <div style={{width: 118, paddingLeft: 24, paddingRight: 24, paddingTop: 10, paddingBottom: 10, background: 'white', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div style={{color: 'black', fontSize: 14, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word'}}>계정관리</div>
      </div>
      <div style={{width: 118, paddingLeft: 24, paddingRight: 24, paddingTop: 10, paddingBottom: 10, background: 'white', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div style={{color: 'black', fontSize: 14, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word'}}>캠핑장 이용</div>
      </div>
      <div style={{width: 118, paddingLeft: 24, paddingRight: 24, paddingTop: 10, paddingBottom: 10, background: 'white', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div style={{color: 'black', fontSize: 14, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word'}}>로그아웃</div>
      </div>
    </div>
  </div>
</div>z
      <button onClick={() => signOut()} className={styles.logOutBtn}>
        a
      </button> */}
    </>
  );
};

export default ProfileDivider;
