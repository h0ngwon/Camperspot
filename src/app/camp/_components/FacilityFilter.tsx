'use client';

import { facilities } from '@/app/_lib/facility';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import styles from '../_styles/FacilityFilter.module.css';
import type { SearchCamp, TCamp } from '@/types/campList';

type Props = {
  campData: SearchCamp;
  setFilteredCampData: Dispatch<SetStateAction<SearchCamp>>;
};

const FacilityFilter = ({ campData, setFilteredCampData }: Props) => {
  const [filterFacility, setFilterFacility] = useState<string[]>([]);
  console.log(filterFacility);
  useEffect(() => {
    setFilterFacility([]);
    setCheckedItems({});
  }, [campData]);
  //체크박스의 항목을 boolean으로 조작
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {},
  );
  const filterCampData = () => {
    if (!campData) return [];
    return campData.filter((camp) => {
      const facility = camp.facility_option as Array<{ option: string }>;
      return filterFacility.every(
        (selectedFacility) =>
          facility?.some((option) => option.option === selectedFacility),
      );
    });
  };
  useEffect(() => {
    const filteredData = filterCampData();
    setFilteredCampData(filteredData);
  }, [filterFacility]);
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

  return (
    <ul className={styles.checkBox}>
      {facilities.map((facility, idx) => (
        <li key={idx}>
          <input
            type='checkbox'
            id={facility}
            checked={checkedItems[facility] || false} //체크된 facility만 true 나머지는 false
            onChange={() => onHandleFilterFacility(facility)}
          />
          <label htmlFor={facility}>{facility}</label>
        </li>
      ))}
    </ul>
  );
};

export default FacilityFilter;
