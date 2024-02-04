'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import styles from '../_styles/DetailCampZone.module.css';
import ClockSvg from '../_svg/ClockSvg';
import useModalStore from '@/store/modal';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

type Props = {
  campArea:
    | {
        address: string;
        check_in: string;
        check_out: string;
        company_id: string;
        content: string;
        created_at: string;
        id: string;
        layout: string | undefined;
        name: string;
        phone: string;
        region: string;
        camp_pic:
          | {
              photo_url: string;
            }[]
          | undefined;
        hashtag:
          | {
              tag: string | null;
            }[]
          | undefined;
        camp_facility:
          | {
              facility: {
                id: number;
                option: string | null;
              } | null;
            }[]
          | undefined;
        camp_area:
          | {
              camp_id: string;
              id: string;
              max_people: number;
              name: string;
              photo_url: string;
              price: number;
            }[]
          | undefined;
        review:
          | {
              camp_id: string;
              content: string;
              created_at: string;
              id: string;
              rating: number;
              user_id: string;
            }[]
          | undefined;
      }
    | null
    | undefined;
};

export default function DetailCampZone({ campArea }: Props) {
  const params = useParams();
  const { layout } = campArea!;
  const { toggleModal } = useModalStore();
  const campPrice = (price: number) => {
    return price.toLocaleString();
  };
  const { data: session } = useSession();
  const openReservationModal = () => {
    if (!session) return toast.error('로그인 후 이용해 주세요.');
    if (session?.user.role === 'company') {
      return toast.error('업체회원은 예약할 수 없습니다.', { autoClose: 3000 });
    }
    toggleModal();
  };

  return (
    <>
      <Image src={campArea!.layout!} alt='' width={1200} height={340} />
      <ul className={styles.zoneWrap}>
        {campArea?.camp_area?.map((area) => {
          return (
            <li key={area.id}>
              <Image src={area?.photo_url} alt='' width={220} height={220} />
              <div className={styles.zoneCon}>
                <h5>{area.name}</h5>
                <div className={styles.clock}>
                  <ClockSvg />
                  <p>
                    입실: <span>{campArea.check_in}</span>시
                  </p>
                  ~
                  <p>
                    퇴실: <span>{campArea.check_out}</span>시
                  </p>
                </div>
                <p className={styles.people}>최대인원: {area.max_people}명</p>
                <p className={styles.price}>{campPrice(area.price)}원</p>
                <div className={styles.reservation}>
                  <Link
                    legacyBehavior
                    href={{
                      pathname: `/camp/detail/${params.id}/reservation`,
                      query: { id: area.id },
                    }}
                  >
                    <a id='link' onClick={openReservationModal}>
                      예약하기
                    </a>
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
