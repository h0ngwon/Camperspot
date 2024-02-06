'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { formattedDate } from '../_lib/formattedDate';
import styles from '../_styles/CampList.module.css';

type Props = {
  tags: string[];
};
const Hashtag = ({ tags }: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const onHandleHashTagClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const keyword = e.currentTarget.textContent!.replace('#', '');
    if (
      searchParams.has('keyword') &&
      searchParams.has('check_in') &&
      searchParams.has('check_out') &&
      searchParams.has('people')
    ) {
      const check_in = searchParams.get('check_in');
      const check_out = searchParams.get('check_out');
      const people = searchParams.get('people');
      replace(
        `/camp/search?keyword=${keyword}&check_in=${check_in}&check_out=${check_out}&people=${people}&page=1`,
      );
    } else {
      const date = formattedDate();
      replace(
        `/camp/search?keyword=${keyword}&check_in=${date[0]}&check_out=${date[1]}&people=2&page=1`,
      );
    }
  };
  return (
    <>
      {tags?.map((tag, i) => {
        return (
          <li key={i} onClick={onHandleHashTagClick} className={styles.tag}>
            <p>#{tag}</p>
          </li>
        );
      })}
    </>
  );
};
export default Hashtag;
