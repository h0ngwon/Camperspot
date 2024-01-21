import Spacer from '@/components/Spacer';
import styles from '../_styles/Camp.module.css';
import CampFilter from '../_components/CampFilter';
import { supabase } from '@/app/api/db';
import CampList from '../_components/CampList';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const SearchPage = async ({ searchParams }: Props) => {
  // console.log(
  //   searchParams.keyword,
  //   searchParams.check_in,
  //   searchParams.check_out,
  //   searchParams.people,
  //   searchParams.region,
  // );
  // const page = Number(searchParams.page) || 1; // 기본값 1
  // const perPage = 9;
  // const startRange = (page - 1) * perPage;
  // const endRange = startRange + perPage - 1;
  // const pageTitle = `검색 결과${}건`;
  const pageTitle = `검색 결과`;
  const query = supabase.from('camp').select(
    `
  id,
  name,
    created_at,
    address,
 
    camp_area(id,price),
    camp_pic(id,photo_url),
    hashtag(tag)
    `,
  );
  console.log(searchParams.region);
  if (searchParams.region) {
    query.ilike('region', `%${searchParams.region}%`);
  }

  const { data: camp, error } = await query;
  console.log(camp);
  console.log(error);
  // .range(startRange, endRange);
  return (
    <>
      <Spacer y={50} />
      <div className={styles.mainWrapper}>
        <div className={styles.mainHeader}>
          <h1 className={styles.title}>{pageTitle}</h1>
          <CampFilter />
        </div>
        <div className={styles.listWrapper}>
          <div className={styles.camplList}>
            {/* <CampList data={camp!} /> */}
          </div>
        </div>
        <Spacer y={50} />

        {/* <PageController
      hasNextPage={end < camp!.length}
      hasPrevPage={start > 0}
    /> */}
        <Spacer y={50} />
      </div>
    </>
  );
};

export default SearchPage;
/**
 * const query = supabase.from('camp')
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
  .order('created_at', {
    ascending: searchParams.sort === '인기순' ? false : true,
  });

// Keyword가 있는 경우
if (searchParams.keyword) {
  query.ilike('name', `%${searchParams.keyword}%`);
}

// People이 있는 경우
if (searchParams.people) {
  query.range('people_column', { lte: searchParams.people });
}

const result = await query.range(startRange, endRange);

 * 
 */
