'use client';
import Drop from '@/components/Drop';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import styles from '../_styles/CampFilter.module.css';

const CampFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('예약순');
  const handleOpenDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleSelectItem = (e: React.MouseEvent<HTMLLIElement>) => {
    //컴파일시 e의 타입은알지만 뭐가들어오는지는모르니 as로 다시 지정
    //브라우저 런타임은 as로 달아두는게 좋음
    const a = e.target as HTMLLIElement;
    setSelectedItem(a.textContent!);
    setIsOpen(false);
    params.set('sort', a.textContent!);
    replace(`${pathname}?${params.toString()}`);
  };
  const sortList = ['예약순', '과거순', '최신순', '낮은가격순', '높은가격순'];

  return (
    <div className={styles.dropDownBtnBox}>
      <button onClick={handleOpenDropdown} className={styles.dropDownBtn}>
        <p className={styles.filterText}>{selectedItem}</p>
        <Drop />
      </button>
      {isOpen && (
        <ul className={styles.filterList}>
          {sortList.map((list) => {
            return (
              <li
                key={list}
                onClick={(e) => handleSelectItem(e)}
                className={styles.filterItem}
              >
                <p className={styles.filterText}>{list}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CampFilter;
