'use client';

import { facilities } from '@/app/_lib/facility';
import { CampLists, TCamp } from '@/types/campList';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';

type Props = {
  campData: TCamp[] | undefined;
  setCampData: Dispatch<SetStateAction<TCamp[] | undefined>>;
};

const FacilityFilter = ({ campData, setCampData }: Props) => {
  const [filterFacility, setFilterFacility] = useState<string[]>([]);
  console.log(filterFacility);

  const filterCampData = () => {
    if (!campData) return [];

    return campData.filter((camp) => {
      // 선택한 시설이 campData에 포함되어 있는지 확인
      return filterFacility.some(
        (selectedFacility) =>
          camp.camp_facility[0]?.facility.option.includes(selectedFacility),
      );
    });
  };

  useEffect(() => {
    // filterFacility가 변경될 때마다 필터링된 campData를 업데이트
    const filteredData = filterCampData();
    console.log('@@@@@@@@@@@@@@@@@@@@');
    console.log(filteredData);
    setCampData(filteredData);
  }, [filterFacility]);

  const onHandleFilterFacility = (facility: string) => {
    if (filterFacility.includes(facility)) {
      const filteredFacility = filterFacility.filter(
        (item) => item !== facility,
      );
      setFilterFacility(filteredFacility);
    } else {
      setFilterFacility([...filterFacility, facility]);
    }
  };

  // console.log(campData?.[0]?.camp_facility[0]?.facility.option);

  return (
    <ul>
      {facilities.map((facility, idx) => (
        <li key={idx}>
          <input
            type='checkbox'
            id={facility}
            onChange={() => onHandleFilterFacility(facility)}
          />
          <label htmlFor={facility}>{facility}</label>
        </li>
      ))}
    </ul>
  );
};

export default FacilityFilter;

// import { facilities } from '@/app/_lib/facility';
// import { CampLists, TCamp } from '@/types/campList';
// import { Dispatch, SetStateAction, useState } from 'react';
// type Props = {
//   campData: TCamp[] | undefined;
//   setCampData: Dispatch<SetStateAction<TCamp[] | undefined>>;
// };
// const FacilityFilter = ({ campData, setCampData }: Props) => {
//   const [filterFacility, setFilterFacility] = useState<string[]>([]);
//   console.log(filterFacility);
//   const onHandleFilterFacility = (facility: string) => {
//     if (filterFacility.find((item) => item === facility)) {
//       const filterdFacility = filterFacility.filter((item) => {
//         return item !== facility;
//       });
//       return setFilterFacility(filterdFacility);
//     }
//     setFilterFacility([...filterFacility, facility]);
//   };
//   console.log(campData?.[0].camp_facility[0].facility.option);
//   return (
//     <ul>
//       {facilities.map((facility, idx) => {
//         return (
//           <li key={idx}>
//             <input
//               type='checkbox'
//               id={facility}
//               onChange={() => onHandleFilterFacility(facility)}
//             />
//             <label htmlFor={facility}>{facility}</label>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default FacilityFilter;
