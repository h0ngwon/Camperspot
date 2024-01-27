import { supabase } from '@/app/api/db';
import SearchView from './_components/SearchView';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export const revalidate = 0;

const SearchPage = async ({ searchParams }: Props) => {
  const _check_in = searchParams.check_in!.toString();
  const _check_out = searchParams.check_out!.toString();
  const _keyword = searchParams.keyword!.toString();
  const _people = searchParams.people!.toString();
  let { data, error } = await supabase.rpc('search_camp_data', {
    _check_in,
    _check_out,
    _keyword,
    _people,
  });
  if (error) console.error(error);
  else console.log(data);

  return (
    <>
      <SearchView camp={data!} error={error} />
    </>
  );
};

export default SearchPage;

// const url = new URL('http://localhost:3000/api/camp/search');
// const { region, keyword, check_in, check_out, people } = searchParams;
// if (region) url.searchParams.append('region', region as string);
// if (keyword) url.searchParams.append('keyword', keyword as string);
// if (check_in) url.searchParams.append('check_in', check_in as string);
// if (check_out) url.searchParams.append('check_out', check_out as string);
// if (people) url.searchParams.append('people', people as string);
// console.log(url);
// const response = await fetch(url.toString());
// const { data, error } = await response.json();
