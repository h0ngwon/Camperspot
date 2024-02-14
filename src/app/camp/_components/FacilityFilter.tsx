'use client';

import Divider from '@/app/_Svg/Divider';
import ResetSvg from '@/app/_Svg/ResetSvg';
import { facilities } from '@/app/_lib/facility';
import type { SearchCamp } from '@/types/campList';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from '../_styles/FacilityFilter.module.css';

type Props = {
  campData: SearchCamp;
  setFilteredCampData: Dispatch<SetStateAction<SearchCamp>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const FacilityFilter = ({
  campData,
  setFilteredCampData,
  setCurrentPage,
}: Props) => {
  const [filterFacility, setFilterFacility] = useState<string[]>([]);
  useEffect(() => {
    setFilterFacility([]);
    setCheckedItems({});
  }, [campData]);
  //체크박스의 항목을 boolean으로 조작
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {},
  );
  const filterCampData = useCallback(() => {
    if (!campData) return [];
    return campData.filter((camp) => {
      const facility = camp.facility_option as Array<{ option: string }>;
      return filterFacility.every(
        (selectedFacility) =>
          facility?.some((option) => option.option === selectedFacility),
      );
    });
  }, [campData, filterFacility]);
  useEffect(() => {
    const filteredData = filterCampData();
    setFilteredCampData(filteredData);
    setCurrentPage(1);
  }, [filterFacility, filterCampData, setCurrentPage, setFilteredCampData]);
  const onHandleFilterFacility = (facility: string) => {
    if (filterFacility.includes(facility)) {
      const filteredFacility = filterFacility.filter(
        (item) => item !== facility,
      );
      setFilterFacility(filteredFacility);
      setCheckedItems({
        ...checkedItems,
        [facility]: false,
      });
    } else {
      setFilterFacility([...filterFacility, facility]);
      setCheckedItems({
        ...checkedItems,
        [facility]: true,
      });
    }
  };

  const onHandleClearFacility = () => {
    setFilterFacility([]);
    setCheckedItems({});
  };
  return (
    <>
      <div className={styles.filter}>
        <button className={styles.facility} onClick={onHandleClearFacility}>
          <p>초기화</p>
          <ResetSvg />
        </button>
        <div className={styles.divider}>
          <Divider />
        </div>
        <ul className={styles.checkBox}>
          {facilities.map((facility, idx) => (
            <li key={idx}>
              <input
                type='checkbox'
                id={facility}
                checked={checkedItems[facility] || false} //체크된 facility만 true 나머지는 false
                onChange={() => onHandleFilterFacility(facility)}
              />
              <label
                htmlFor={facility}
                className={`${styles.facility}
                  ${checkedItems[facility] ? `${styles.checkedLabel}` : ''}`}
              >
                {facility}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FacilityFilter;
