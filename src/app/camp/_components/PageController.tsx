'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from '../_styles/PageController.module.css';
interface Props {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

function PageController({ hasNextPage, hasPrevPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const pathname = usePathname();
  console.log(params.toString());

  const page = Number(searchParams.get('page')) ?? '1';
  const per_page = Number(searchParams.get('per_page')) || 5;

  const onClickPrevPage = () => {
    // const newPage = String(Number(page) - 1);
    const newPage = Math.max(1, page - 1);
    params.set('page', String(newPage));

    // params.set('page', newPage);
    router.push(`/camp/?${params.toString()}`);
  };
  const onClickNextPage = () => {
    const newPage = page + 1;

    // const newPage = String(Number(page) + 1);
    // params.set('page', newPage);
    params.set('page', String(newPage));

    router.push(`/camp/?${params.toString()}`);
  };
  return (
    <div className={styles.controllerBox}>
      <button
        disabled={!hasPrevPage}
        onClick={onClickPrevPage}
        // onClick={() => {
        //   router.push(
        //     `/camp/?${params.toString()}&page=${
        //       Number(page) - 1
        //     }&per_page=${per_page}`,
        //   );
        // }}
      >
        prev page
      </button>

      <div>{page}</div>

      <button
        // disabled={!hasNextPage}
        onClick={onClickNextPage}
      >
        next page
      </button>
    </div>
  );
}

export default PageController;
