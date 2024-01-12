import { supabase } from '../api/db';
import CampList from './_components/CampList';
import Spacer from '@/components/Spacer';
import styles from './camp.module.css';
import CampFilter from './_components/CampFilter';
import PageController from './_components/PageController';
//searchParams를 통해 주소로 parameter 가져오기
const Camp = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  //데이터 가져오기
  const { data: camp, error } = await supabase.from('camp').select(`
  id,  
  name,
    created_at,
    address,
    region,

    camp_area(id,price),
    camp_pic(id,photo_url),
    hashtag(tag)
    `);
  //한번에 모든 데이터를 가져오는건 비효율적일것,
  //searchParams로 단순히 페이지만 나누는게 아니라 페이지에 따른 데이터를 fetching
  //페이지 나누기
  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '5';

  const start = (Number(page) - 1) * Number(per_page); //0,5,10...
  const end = start + Number(per_page);
  const entiries = camp!.slice(start, end);

  //페이지네이션으로 클릭을 할 경우 주소가 변해야지 또...?
  const pageTitle = '전국 인기 캠핑장';
  //우선시 되고 보안적 이슈가 생길 거 같을때 수정!
  //가져올것!!!!1 좋아요,캠프사진,이름,가격,리뷰(평점,리뷰갯수),주소,해시태그
  //camp_area(price): 최소값 / review(평점):평균,(갯수):length
  console.log(entiries);
  return (
    <>
      <Spacer y={50} />
      {/*페이지 컴포넌트도 props로 재활용? */}
      <div>
        <h1 className={styles.title}>{pageTitle}</h1>
        <CampFilter />
      </div>
      <main>
        <CampList data={entiries} />
        <PageController
          hasNextPage={end < camp!.length}
          hasPrevPage={start > 0}
        />
      </main>
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
