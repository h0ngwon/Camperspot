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
