import Spacer from '@/components/Spacer';
import styles from '../_styles/Camp.module.css';
import CampFilter from '../_components/CampFilter';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const SearchPage = ({ searchParams }: Props) => {
  console.log(
    searchParams.keyword,
    searchParams.check_in,
    searchParams.check_out,
    searchParams.people,
  );
  const page = Number(searchParams.page) || 1; // 기본값 1
  const perPage = 9;
  const startRange = (page - 1) * perPage;
  const endRange = startRange + perPage - 1;
  return (
    <>
      <Spacer y={50} />
      <div className={styles.mainWrapper}>
        <div className={styles.mainHeader}>
          {/* <h1 className={styles.title}>{pageTitle}</h1> */}
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

// const Camp = async ({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) => {
//   console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', searchParams);

//   const { data: camp, error } = await supabase
//     .from('camp')
//     .select(
//       `
//   id,
//   name,
//     created_at,
//     address,
//     region,

//     camp_area(id,price),
//     camp_pic(id,photo_url),
//     hashtag(tag)
//     `,
//     )
//     //임의로 인기순:과거순 외 최신순으로 해둠
//     .order('created_at', {
//       ascending: searchParams.sort === '인기순' ? false : true,
//     })
//     .range(startRange, endRange);

//   console.log(camp?.length);
//   const per_page = searchParams['per_page'] ?? '5';

//   const start = (Number(page) - 1) * Number(per_page); //0,5,10...
//   const end = start + Number(per_page);

//   const pageTitle = '전국 인기 캠핑장';
