'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const CampFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('예약순');
  const handleOpenDropdown = () => {
    setIsOpen(true);
  };
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  // console.log(params);
  // console.log('searchParams', searchParams);
  // console.log('pathname', pathname);

  const handleSelectItem = (list: string) => {
    //컴파일시 e의 타입은알지만 뭐가들어오는지는모르니 as로 다시 지정
    //브라우저 런타임은 as로 달아두는게 좋음
    // const a = e.target as HTMLLIElement;
    // TODO: 직접 값을 넣으면 됨
    setSelectedItem(list);
    setIsOpen(false);
    params.set('sort', list);
    replace(`${pathname}?${params.toString()}`);
  };
  const sortList = ['과거순', '최신순', '예약순', '낮은가격순', '높은가격순'];

  return (
    <div>
      <button onClick={handleOpenDropdown}>{selectedItem}</button>
      {isOpen && (
        <div>
          <ul>
            {sortList.map((list) => {
              return (
                // AS-IS
                // <li key={list} value={list} onClick={handleSelectItem}>
                //   {list}
                // </li>
                // TODO:
                <li key={list} onClick={(e) => handleSelectItem(list)}>
                  {list}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CampFilter;
