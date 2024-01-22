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
  /**
camp=>camp_area=>reservation 
reservation - check_in_date~check_out_date 와 비교해서 
check_in ~ check_out 기간이 check_in_date ~ check_out 기간과 겹치지 않는 데이터만 가져오기
Mutually exclusive to a range 활용하려면 배열로 바꿔야함
*/

  const { data: camp, error } = await query;
  //에러 핸들링은 어떻게?
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
