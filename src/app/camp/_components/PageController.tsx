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
  console.log(pathname);
  console.log(params.toString());

  const page = Number(searchParams.get('page')) ?? '1';
  const per_page = Number(searchParams.get('per_page')) || 5;

  const onClickPrevPage = () => {
    const newPage = Math.max(1, page - 1);
    params.set('page', String(newPage));

    router.push(`${pathname}/?${params.toString()}`);
  };
  const onClickNextPage = () => {
    const newPage = page + 1;

    params.set('page', String(newPage));

    router.push(`${pathname}/?${params.toString()}`);
  };
  return (
    <div className={styles.controllerBox}>
      <button disabled={!hasPrevPage} onClick={onClickPrevPage}>
        이전 페이지
      </button>

      <div>{page}</div>

      <button disabled={!hasNextPage} onClick={onClickNextPage}>
        다음 페이지
      </button>
    </div>
  );
}

export default PageController;
