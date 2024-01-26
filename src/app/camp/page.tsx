import { supabase } from '../api/db';
import CampList from './_components/CampList';
import Spacer from '@/components/Spacer';
import styles from './_styles/Camp.module.css';
import CampFilter from './_components/CampFilter';
import PageController from './_components/PageController';

export const revalidate = 0;

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
  let orderByField = 'created_at';
  if (searchParams.sort === '과거') {
    orderByField = 'created_at';
  } else if (searchParams.sort === '별점순') {
    orderByField = 'popularity';
  } else if (searchParams.sort === '낮은가격순') {
    orderByField = 'camp_area.price';
  } else if (searchParams.sort === '높은가격순') {
    orderByField = 'camp_area.price';
  }
  const {
    data: camp,
    count,
    error,
  } = await supabase
    .from('camp')
    .select(
      `
    id, 
    name,
    created_at,
    address,
    region,

    camp_area!inner(id,price),
    camp_pic(id,photo_url),
    hashtag(tag)
    `,
      { count: 'exact' },
    )
    //좋아요, 최신순, 과거순, 랜덤, 별점순
    .order(orderByField, {
      ascending:
        searchParams.sort !== '높은가격순' &&
        searchParams.sort !== '낮은가격순' &&
        searchParams.sort !== '별점순' &&
        searchParams.sort !== '과거',
    })

    .range(startRange, endRange);
  //캐싱이 1순위
  //디하이드레이트=>쿼리용 서버에서 newqueryclient 생성은 가능

  console.log(count);
  const per_page = searchParams['per_page'] ?? '9';

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
              <CampList campList={camp!} />
            </div>
          </div>
          <Spacer y={50} />

          <PageController hasNextPage={end < count!} hasPrevPage={start > 0} />
          <Spacer y={50} />
        </div>
      </div>
    </>
  );
};
export default Camp;

// .order('created_at', {
//   ascending: searchParams.sort === '인기순' ? false : true,
// })
//
