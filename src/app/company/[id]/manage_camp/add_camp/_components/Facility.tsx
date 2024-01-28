import React, { useEffect } from 'react';
import type { Tables } from '@/types/supabase';
import { supabase } from '@/app/api/db';
import styles from '../_styles/CampForm.module.css';

type Props = {
  facility: Tables<'facility'>[];
  setFacility: React.Dispatch<React.SetStateAction<Tables<'facility'>[]>>;
  checkedFacility: number[];
  setCheckedFacility: React.Dispatch<React.SetStateAction<number[]>>;
};

const Facility = ({
  facility,
  setFacility,
  checkedFacility,
  setCheckedFacility,
}: Props) => {
  // facility 테이블에서 option 가져오는거
  async function fetchFacilityData() {
    const { data: facilityData } = await supabase.from('facility').select('*');
    if (facilityData) {
      setFacility(facilityData);
    }
  }

  useEffect(() => {
    fetchFacilityData();
  }, []);

  // 시설 정보 체크, 체크해제 로직
  const onHandleCheckFacility = (value: number) => {
    if (checkedFacility.find((item) => Number(item) === value)) {
      const filterdFacility = checkedFacility.filter((item) => {
        return Number(item) !== value;
      });
      return setCheckedFacility(filterdFacility);
    }

    setCheckedFacility([...checkedFacility, value]);
  };

  return (
    <div>
      <h3 className={styles.h3}>시설 등록</h3>
      <div className={styles.facilityWrap}>
        {facility?.map((item, index) => {
          return (
            <div key={index} className={styles.facility}>
              <input
                type='checkbox'
                id={item.id.toString()}
                onChange={() => {
                  onHandleCheckFacility(item.id);
                }}
              />
              <label
                htmlFor={item.id.toString()}
                className={styles.facilityLabel}
              >
                {item.option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Facility;
