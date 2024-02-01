import { supabase } from '../api/db';
import CampList from './_components/CampList';
import Spacer from '@/components/Spacer';
import styles from './_styles/Camp.module.css';
import CampFilter from './_components/CampFilter';
import PageController from './_components/PageController';

export const revalidate = 0;

const getPageControllerProps = ({ currentPage, perPage, count }: {
  currentPage: number,
  perPage: string | string[] // 이것도 숫자로 처음부터 바꾸던지 하면 좋을 듯
  count: number,
}) => {
  const start = (Number(currentPage) - 1) * Number(perPage);
  const end = start + Number(perPage);
  return {
    hasNextPage: end < count!, // ! 는 없는 게 좋은 듯
    hasPrevPage: start > 0,
  }
}

//searchParams를 통해 주소로 parameter 가져오기
const Camp = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', searchParams);

  const currentPage = Number(searchParams.page) || 1;
  // TODO: 불필요하네요
  // const perPage = 9;
  // const startRange = (currentPage - 1) * perPage;
  // const endRange = startRange + perPage - 1; 

  // AS-IS
  // const page = searchParams.page!.toString();

  // TODO:
  const page = currentPage.toString();
  // TODO: ! 대신 없으면 기본값을 설정하자
  const sort = searchParams.sort!.toString();

  let { data, error } = await supabase.rpc('params_sorted_camp_data', {
    page,
    sort,
  });
  if (error) console.error(error);
  else console.log(data);

  console.log(data![0].reservation_count);
  // console.log(data![0].hashtag);
  // console.log(data![0].camp_pic);

  // let pic = (data![0].camp_pic as Array<{ photo_url: string }>).map(
  //   (pic) => pic.photo_url,
  // );
  // console.log(pic);
  // let area = (data![0].camp_area as Array<{ price: string }>).map(
  //   (area) => area.price,
  // );
  // console.log('@@@@@@@@@@@@@', area);
  // let tag = (data![0].hashtag as Array<{ tag: string }>).map((a) => a.tag);

  console.log(error);
  const per_page = searchParams['per_page'] ?? '9';
  const { hasNextPage, hasPrevPage } = getPageControllerProps({ currentPage, perPage: per_page, count: data?.[0].total_count || 0 })

  // const start = (Number(currentPage) - 1) * Number(per_page);
  // const end = start + Number(per_page);
  // const count = data?.[0].total_count;
  // console.log(count);
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
              <CampList campList={data!} />
            </div>
          </div>
          <Spacer y={50} />

          <PageController hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} />
          <Spacer y={50} />
        </div>
      </div>
    </>
  );
};
export default Camp;

//
