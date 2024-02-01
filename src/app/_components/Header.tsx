// 'use client';
// import logOut from '@/asset/logOut.png';
// import logo from '@/asset/logo.png';
// import CommunitySvg from '@/components/CommunitySvg';
// import MyProfileSvg from '@/components/MyProfileSvg';
// import { signOut, useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import styles from '../_styles/Header.module.css';
// import SearchBar from './SearchBar';
// import { getToken } from 'next-auth/jwt';

// const Header = () => {
//   const pathname = usePathname();
//   const conditions = pathname.startsWith('/auth');
//   const { data: session } = useSession();


//   return (
//     <div>
//       {/* AS-IS */}
//       {/* - && 연산자 -> 3항 연산자 -> 3항 연산자
//           - conditions가 없으면 아무것도 안함 -> 그냥 위로 빼기
//           - session이 있을 때와 없을 때만 구분하기 
//           - company & 일반유저는 컴포넌트로 분리하기 - ProfileLinkByRole
//        */}
//       {!conditions && (
//         <div className={styles.container}>
//           <header className={styles.header}>
//             <Link href={'/'}>
//               <figure className={styles.img}>
//                 <Image src={logo} alt='' />
//               </figure>
//             </Link>
//             <SearchBar />
//             <div className={styles.linkBox}>
//               <Link href={'/community'} className={styles.community}>
//                 <CommunitySvg />
//               </Link>
//               {session ? (
//                 <>
//                   {session.user.role === 'company' ? (
//                     <Link
//                       href={`/company/${session.user.id}/manage_reservation`}
//                     >
//                       <MyProfileSvg />
//                     </Link>
//                   ) : (
//                     <Link href={`/profile/${session.user.id}`}>
//                       <Image
//                         src={session.user.image!}
//                         alt=''
//                         width={50}
//                         height={50}
//                         className={styles.profileImg}
//                       />
//                     </Link>
//                   )}
//                   <button
//                     onClick={() => signOut()}
//                     className={styles.logOutBtn}
//                   >
//                     <Image src={logOut} alt='' width={50} height={50} />
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link href={'/auth/signin'} className={styles.my}>
//                     <MyProfileSvg />
//                   </Link>
//                 </>
//               )}
//             </div>
//           </header>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;


// 예시 코드
'use client';
import logOut from '@/asset/logOut.png';
import logo from '@/asset/logo.png';
import CommunitySvg from '@/components/CommunitySvg';
import MyProfileSvg from '@/components/MyProfileSvg';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../_styles/Header.module.css';
import SearchBar from './SearchBar';
import { Session } from 'next-auth';

const ProfileLinkByRole = ({ session }: {
  session: Session
}) => {
  return (
    <>
      {session.user.role === 'company' ? (
        <Link
          href={`/company/${session.user.id}/manage_reservation`}
        >
          <MyProfileSvg />
        </Link>
      ) : (
        <Link href={`/profile/${session.user.id}`}>
          <Image
            src={session.user.image!}
            alt=''
            width={50}
            height={50}
            className={styles.profileImg}
          />
        </Link>
      )}
    </>
  )
}

const Header = () => {
  const pathname = usePathname();
  const conditions = pathname.startsWith('/auth');
  const { data: session } = useSession();

  if (!conditions) {
    return (
      <div></div>
    )
  }

  return (
    <div>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href={'/'}>
            <figure className={styles.img}>
              <Image src={logo} alt='' />
            </figure>
          </Link>
          <SearchBar />
          <div className={styles.linkBox}>
            <Link href={'/community'} className={styles.community}>
              <CommunitySvg />
            </Link>
            {session ? (
              <>
                <ProfileLinkByRole session={session} />
                <button
                  onClick={() => signOut()}
                  className={styles.logOutBtn}
                >
                  <Image src={logOut} alt='' width={50} height={50} />
                </button>
              </>
            ) : (
              <Link href={'/auth/signin'} className={styles.my}>
                <MyProfileSvg />
              </Link>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
