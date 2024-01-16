'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
        layout: string;
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
              title: string;
              user_id: string;
            }[]
          | undefined;
      }
    | null
    | undefined;
};

export default function DetailCampZone({ campArea }: Props) {
  const params = useParams();

  return (
    <>
      {campArea?.camp_area?.map((area) => {
        return (
          <div key={area.id}>
            <p>{area.name}</p>
            <p>{area.price}</p>
            <Image src={area?.photo_url} alt='' width={100} height={100} />
            <p>{campArea.check_in}</p>
            <p>{campArea.check_out}</p>
            <Link href={`/camp/detail/${params.id}/reservation`}>예약하기</Link>
          </div>
        );
      })}
    </>
  );
}
