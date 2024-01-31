import { supabase } from '../api/db';
import CampList from './_components/CampList';
import Spacer from '@/components/Spacer';
import styles from './_styles/Camp.module.css';
import CampFilter from './_components/CampFilter';
import Pagination from './_components/Pagination';

export const revalidate = 0;

//searchParams를 통해 주소로 parameter 가져오기
const Camp = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentPage = Number(searchParams.page);

  const page = searchParams.page!.toString();
  const sort = searchParams.sort!.toString();

  let { data, error } = await supabase.rpc('get_params_camp_data', {
    page,
    sort,
  });
  if (error) console.error(error);

  const per_page = searchParams['per_page'] ?? '9';

  const start = (Number(currentPage) - 1) * Number(per_page);
  const end = start + Number(per_page);
  const count = data?.[0].total_count;
  const pageTitle = '전국 인기 캠핑장';
  return (
    <>
      <div className={styles.container}>
        <Spacer y={30} />
        <div className={styles.mainWrapper}>
          <div className={styles.mainHeader}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <div className={styles.campFilter}>
              <CampFilter />
            </div>
          </div>
          <Spacer y={20} />
          <div className={styles.listWrapper}>
            <div className={styles.camplList}>
              <CampList campList={data!} />
            </div>
          </div>
          <Spacer y={50} />

          <Pagination
            hasNextPage={end < count!}
            hasPrevPage={start > 0}
            count={count!}
          />
          <Spacer y={50} />
        </div>
      </div>
    </>
  );
};
export default Camp;

//
