import Spacer from '@/components/Spacer';
import styles from '../_styles/Camp.module.css';
import CampFilter from '../_components/CampFilter';
import { supabase } from '@/app/api/db';
import CampList from '../_components/CampList';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const SearchPage = async ({ searchParams }: Props) => {
  const query = supabase.from('camp').select(
    `
    id,
    name,
    created_at,
    address,
    
    camp_area!inner(id,price),
    camp_pic(id,photo_url),
    hashtag(tag)
    `,
  );
  console.log(searchParams.region);
  if (searchParams.region) {
    query.ilike('region', `%${searchParams.region}%`);
  }
  if (
    searchParams.keyword &&
    searchParams.check_in &&
    searchParams.check_out &&
    searchParams.people
  ) {
    query
      .or(
        `name.ilike.%${searchParams.keyword}%,region.ilike.%${searchParams.keyword}%`,
      )
      .gte('camp_area.max_people', `${Number(searchParams.people)}`);
  }

  const { data: camp, error } = await query;
  console.log(camp?.length);
  console.log(error);
  const pageTitle = `검색 결과 (${camp?.length}건)`;
  return (
    <>
      <div className={styles.container}>
        <Spacer y={50} />
        <div className={styles.mainWrapper}>
          <div className={styles.mainHeader}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <CampFilter />
          </div>
          <div className={styles.listWrapper}>
            <div className={styles.camplList}>
              {camp && <CampList data={camp} />}
            </div>
          </div>
          <Spacer y={50} />

          <Spacer y={50} />
        </div>
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
