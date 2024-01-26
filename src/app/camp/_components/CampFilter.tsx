'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const CampFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('인기순');
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

  const handleSelectItem = (e: React.MouseEvent<HTMLLIElement>) => {
    //컴파일시 e의 타입은알지만 뭐가들어오는지는모르니 as로 다시 지정
    //브라우저 런타임은 as로 달아두는게 좋음
    const a = e.target as HTMLLIElement;
    setSelectedItem(a.textContent!);
    setIsOpen(false);
    params.set('sort', a.textContent!);
    console.log(params.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  const sortList = ['과거순', '최신순', '별점순', '낮은가격순', '높은가격순'];

  return (
    <div>
      <button onClick={handleOpenDropdown}>{selectedItem}</button>
      {isOpen && (
        <div>
          <ul>
            {sortList.map((list) => {
              return (
                <li key={list} onClick={(e) => handleSelectItem(e)}>
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
