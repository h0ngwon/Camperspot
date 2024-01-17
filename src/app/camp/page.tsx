import { supabase } from '../api/db';
import CampList from './_components/CampList';
import Spacer from '@/components/Spacer';
import styles from './_styles/Camp.module.css';
import CampFilter from './_components/CampFilter';
import PageController from './_components/PageController';

//supabase쿼리를통해 5개씩 가져오기는 성공, 근데 preview는 갱신이안됨..?
//그리고 데이터추가시 인기순으로는 보이고 최신순으로는 갱신이안됨
//sharp 추가

//searchParams를 통해 주소로 parameter 가져오기
const Camp = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', searchParams);

  const page = Number(searchParams.page) || 1; // 기본값 1
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
  //데이터 가져오기
  //------------------------------------------------------------------------------
  // const { data: camp, error } = await supabase
  //   .from('camp')
  //   .select(
  //     `
  // id,
  // name,
  //   created_at,
  //   address,
  //   region,

  //   camp_area(id,price),
  //   camp_pic(id,photo_url),
  //   hashtag(tag)
  //   `,
  //   )
  //   .order('created_at', {
  //     ascending: searchParams.sort === '인기순' ? false : true,
  //   });
  //------------------------------------------------------------------------------

  console.log(camp?.length);
  const per_page = searchParams['per_page'] ?? '5';

  const start = (Number(page) - 1) * Number(per_page); //0,5,10...
  const end = start + Number(per_page);

  const pageTitle = '전국 인기 캠핑장';
  //우선시 되고 보안적 이슈가 생길 거 같을때 수정!
  //가져올것!!!!1 좋아요,캠프사진,이름,가격,리뷰(평점,리뷰갯수),주소,해시태그
  //camp_area(price): 최소값 / review(평점):평균,(갯수):length
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
    </>
  );
};
export default Camp;

/*
사진 여러장을 겹쳐두고 z-index조절?
필터 : 필터 버튼(클라이언트컴포넌트)에 따라 route.ts호출? => 필터별 hanlder 다르게 구성
      서버 컴포넌트에서 처리.... 어떻게?
handler호출 시에는? query invalidate?

해시태그 : 클라이언트 컴포넌트=> route.ts호출?


쿼리사용시 = keepPreviousData

URLSearchParams
useSearchParams

    */

/**
 * URL 매개변수로 검색을 구현하면 몇 가지 이점이 있습니다:

북마크 및 공유 가능한 URL: 검색 매개변수가 URL에 있으므로 사용자는 검색 쿼리 및 필터를 포함한 애플리케이션의 현재 상태를 북마크에 추가하여 나중에 참조하거나 공유할 수 있습니다.
서버 측 렌더링 및 초기 로드: URL 매개변수를 서버에서 직접 사용하여 초기 상태를 렌더링할 수 있으므로 서버 렌더링을 더 쉽게 처리할 수 있습니다.
분석 및 추적: 검색 쿼리와 필터를 URL에 직접 넣으면 추가적인 클라이언트 측 로직 없이도 사용자 행동을 더 쉽게 추적할 수 있습니다.
 
*/
