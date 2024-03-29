import Spacer from '@/components/Spacer';
import { Suspense } from 'react';
import { supabase } from '../api/db';
import Loading from '../loading';
import CampFilter from './_components/CampFilter';
import CampList from './_components/CampList';
import Pagination from './_components/Pagination';
import { getPageControllerProps } from './_lib/getPageControllerProps';
import styles from './_styles/Camp.module.css';

export const revalidate = 0;

//searchParams를 통해 주소로 parameter 가져오기
const Camp = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentPage = Number(searchParams.page);
  const paramsSort = searchParams.sort || '예약순';
  const page = currentPage.toString();
  const sort = paramsSort.toString();

  const { data, error } = await supabase.rpc('camp_page_data', {
    page,
    sort,
  });
  if (error) console.error(error);
  if (!data) return;
  const perPage = searchParams['per_page'] ?? '9';
  const count = data[0].total_count || 0;
  const { hasNextPage, hasPrevPage } = getPageControllerProps({
    currentPage,
    perPage,
    count,
  });
  const pageTitle = '전국 인기 캠핑장';

  return (
    <>
      <div className={styles.container}>
        <Spacer y={30} />
        <div className={styles.mainWrapper}>
          <div className={styles.mainHeadercamp}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <div className={styles.campFilter}>
              <CampFilter />
            </div>
          </div>
          <Spacer y={20} />
          <Suspense fallback={<Loading />}>
            <div className={styles.listWrapper}>
              <div className={styles.camplList}>
                <CampList campList={data!} />
              </div>
            </div>
          </Suspense>
          <Spacer y={50} />
          <Pagination
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            count={count}
          />
          <Spacer y={50} />
        </div>
      </div>
    </>
  );
};
export default Camp;
