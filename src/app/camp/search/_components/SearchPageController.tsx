import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import styles from '../../_styles/Pagination.module.css';

type Props = {
  totalData: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};
const SearchPageController = ({
  totalData,
  currentPage,
  setCurrentPage,
}: Props) => {
  const totalPages = Math.ceil(totalData / 9);
  const onClickPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const onClickNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const onClickPageNumber = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedPage = e.currentTarget.textContent;
    setCurrentPage(Number(selectedPage));
  };
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );
  return (
    <div className={styles.controllerBox}>
      <button disabled={currentPage === 1} onClick={onClickPrevPage}>
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

      <button
        disabled={totalPages - currentPage === 0}
        onClick={onClickNextPage}
      >
        다음 페이지
      </button>
    </div>
  );
};
export default SearchPageController;
