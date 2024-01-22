import { supabase } from '../api/db';
import CampList from './_components/CampList';
import Spacer from '@/components/Spacer';
import styles from './_styles/Camp.module.css';
import CampFilter from './_components/CampFilter';
import PageController from './_components/PageController';

export const revalidate = 10;

//searchParams를 통해 주소로 parameter 가져오기
const Camp = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', searchParams);

  const page = Number(searchParams.page) || 1;
  const perPage = 9;
  const startRange = (page - 1) * perPage;
  const endRange = startRange + perPage - 1;
  const { data: camp, error } = await supabase
    .from('camp')
    .select(
      `
  id,
  name,
    created_at,
    address,
    region,

    camp_area(id,price),
    camp_pic(id,photo_url),
    hashtag(tag)
    `,
    )
    //임의로 인기순:과거순 외 최신순으로 해둠
    .order('created_at', {
      ascending: searchParams.sort === '인기순' ? false : true,
    })
    .range(startRange, endRange);
  //캐싱이 1순위
  //camp가 다른화면에서도 필요하다면 reactquery가 필요
  //디하이드레이트=>쿼리용 서버에서 newqueryclient 생성은 가능

  console.log(camp?.length);
  const per_page = searchParams['per_page'] ?? '5';

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const pageTitle = '전국 인기 캠핑장';
  return (
    <>
      <div className={styles.container}>
        <Spacer y={30} />
        <div className={styles.mainWrapper}>
          <div className={styles.mainHeader}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <CampFilter />
          </div>
          <div className={styles.listWrapper}>
            <div className={styles.camplList}>
              <CampList data={camp!} />
            </div>
          </div>
          <Spacer y={50} />

          <PageController
            hasNextPage={end < camp!.length}
            hasPrevPage={start > 0}
          />
          <Spacer y={50} />
        </div>
      </div>
    </>
  );
};
export default Camp;
