'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent, useEffect, useState } from 'react';
import styles from '../_styles/Pagination.module.css';

interface Props {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
}

function Pagination({ hasNextPage, hasPrevPage, count }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<string>('1');
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const totalPages = Math.ceil(count / 9);
    setTotalPages(totalPages);
  }, [count]);
  useEffect(() => {
    const currentPage = searchParams.get('page');
    setCurrentPage(currentPage!);
  }, [searchParams]);
  const page = Number(searchParams.get('page')) ?? '1';

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );
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
  const onClickPageNumber = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedPage = e.currentTarget.textContent;
    params.set('page', selectedPage!);
    router.push(`${pathname}/?${params.toString()}`);
  };
  return (
    <div className={styles.controllerBox}>
      <button disabled={!hasPrevPage} onClick={onClickPrevPage}>
        이전 페이지
      </button>
      {pageNumbers.map((page) => {
        return (
          <ol key={page}>
            <li>
              <button
                onClick={(e) => onClickPageNumber(e)}
                disabled={page === +currentPage}
                className={styles.pageBtn}
              >
                {page}
              </button>
            </li>
          </ol>
        );
      })}

      <button disabled={!hasNextPage} onClick={onClickNextPage}>
        다음 페이지
      </button>
    </div>
  );
}

export default Pagination;
