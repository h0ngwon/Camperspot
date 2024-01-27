import SearchView from './_components/SearchView';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const SearchPage = async ({ searchParams }: Props) => {
  const { region, keyword, check_in, check_out, people, sort } = searchParams;

  const url = new URL('http://localhost:3000/api/camp/search');
  if (region) url.searchParams.append('region', region as string);
  if (keyword) url.searchParams.append('keyword', keyword as string);
  if (check_in) url.searchParams.append('check_in', check_in as string);
  if (check_out) url.searchParams.append('check_out', check_out as string);
  if (people) url.searchParams.append('people', people as string);
  if (sort) url.searchParams.append('sort', sort as string);
  console.log(url);
  const response = await fetch(url.toString());
  const { camp, error } = await response.json();

  // camp=>camp_area=>reservation
  // reservation - check_in_date~check_out_date 와 비교해서
  // check_in ~ check_out 기간이 check_in_date ~ check_out 기간과 겹치지 않는 데이터만 가져오기
  // Mutually exclusive to a range 활용하려면 배열로 바꿔야함
  // */

  return (
    <>
      <SearchView camp={camp} error={error} />
    </>
  );
};

export default SearchPage;
