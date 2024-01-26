import React, { useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { subDays } from 'date-fns';
import svg from '@/asset/Calendar.svg';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { getCampAreaReservation } from '@/app/company/[id]/manage_reservation/_lib/reservation';
import { useSearchParams } from 'next/navigation';
import type { CampAreaRservationInfo } from '@/types/reservation';
import { Control, Controller } from 'react-hook-form';
registerLocale('ko', ko);

type UserInfo = {
  people: number;
  name: string;
  phone: string;
  dates: [Date, Date];
};

export const Calendar = ({ control }: { control: Control<UserInfo> }) => {
  //const currentDate = new Date();
  const [excludeDates, setExcludeDates] = useState<CampAreaRservationInfo>();
  const params = useSearchParams();
  const id = params.get('id');

  useEffect(() => {
    getCampAreaReservation(id!).then((res) => setExcludeDates(res));
  }, []);

  return (
    <>
      <Controller
        name='dates'
        control={control}
        rules={{ required: 'Date is required' }}
        render={({ field: { onChange, value } }) => (
          <ReactDatePicker
            dateFormat={'yyyy-MM-dd'}
            minDate={new Date()}
            onChange={onChange} //값을 알아서 인식
            startDate={value[0]}
            endDate={value[1]}
            selectsRange
            excludeDateIntervals={excludeDates?.map((exclude) => ({
              start: subDays(new Date(exclude.check_in_date), 1),
              end: new Date(exclude.check_out_date),
            }))}
            locale='ko'
            showIcon
            icon={svg}
          />
        )}
      />
    </>
  );
};

// startDate={
//   value?.length
//     ? value[0]
//     : new Date(currentDate.setHours(0, 0, 0, 0))
// }
// endDate={
//   value?.length
//     ? value[1]
//     : new Date(
//         currentDate?.getFullYear()!,
//         currentDate?.getMonth()!,
//         currentDate?.getDate()! + 1,
//       )
// }
