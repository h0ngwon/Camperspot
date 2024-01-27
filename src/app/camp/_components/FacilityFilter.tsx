'use client';

import { facilities } from '@/app/_lib/facility';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import type { TCamp } from '@/types/campList';

type Props = {
  campData: TCamp[] | undefined;
  setFilteredCampData: Dispatch<SetStateAction<TCamp[]>>;
};

const FacilityFilter = ({ campData, setFilteredCampData }: Props) => {
  const [filterFacility, setFilterFacility] = useState<string[]>([]);

  const filterCampData = () => {
    if (!campData) return [];

    return campData.filter((camp) => {
      return filterFacility.every(
        (selectedFacility) =>
          camp.camp_facility?.some((campFacility) =>
            campFacility.facility.option.includes(selectedFacility),
          ),
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
    } else {
      setFilterFacility([...filterFacility, facility]);
    }
  };

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
