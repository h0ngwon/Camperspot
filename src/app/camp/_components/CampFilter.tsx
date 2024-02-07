'use client';
import Drop from '@/components/Drop';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../_styles/CampFilter.module.css';

const CampFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('예약순');
  const onHandleOpenDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const sortRef = useRef<HTMLDivElement | null>(null);

  const handleSelectItem = (list: string) => {
    setSelectedItem(list);
    setIsOpen(false);
    params.set('sort', list);
    replace(`${pathname}?${params.toString()}`);
  };
  const sortList = [
    '예약순',
    '평점순',
    '과거순',
    '최신순',
    '낮은가격순',
    '높은가격순',
  ];
  const handleClickOutside = (event: MouseEvent) => {
    if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
      setTimeout(() => {
        setIsOpen(false);
      }, 0);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropDownBtnBox} ref={sortRef}>
      <button onClick={onHandleOpenDropdown} className={styles.dropDownBtn}>
        <p className={styles.filterText}>{selectedItem}</p>
        <Drop />
      </button>
      {isOpen && (
        <ul className={styles.filterList}>
          {sortList.map((list) => {
            return (
              <li
                key={list}
                onClick={() => handleSelectItem(list)}
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
