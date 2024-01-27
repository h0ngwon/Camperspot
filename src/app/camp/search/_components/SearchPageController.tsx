import React from 'react';

type Props = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
};

const SearchPageController = ({
  itemsPerPage,
  totalItems,
  currentPage,
  totalPages,
  paginate,
}: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SearchPageController;
