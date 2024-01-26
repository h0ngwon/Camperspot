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

type Dates = { dates: [Date, Date] };
type Props = {
  control: Control<Dates>;
  onChangedDate: (dates: [Date, Date], nights: number) => void;
};

export const Calendar = ({ control, onChangedDate }: Props) => {
  const currentDate = new Date();
  // const [startDate, setStartDate] = useState<Date | null>();
  // // new Date(currentDate.setHours(0, 0, 0, 0)),
  // const [endDate, setEndDate] = useState<Date | null>();
  // const [nights, setNights] = useState<number>(1);
  const [excludeDates, setExcludeDates] = useState<CampAreaRservationInfo>();
  const params = useSearchParams();
  const id = params.get('id');

  useEffect(() => {
    getCampAreaReservation(id!).then((res) => setExcludeDates(res));
  }, []);

  console.log('excludes', excludeDates);

  return (
    <>
      <Controller
        name='dates'
        control={control}
        rules={{ required: 'Date is required' }}
        render={({ field: { onChange, value } }) => (
          <ReactDatePicker
            dateFormat={'yyyy-MM-dd'}
            // selected={value[1]}
            minDate={new Date()}
            onChange={onChange} //값을 알아서 인식
            startDate={
              value?.length
                ? value[0]
                : new Date(currentDate.setHours(0, 0, 0, 0))
            }
            endDate={
              value?.length
                ? value[1]
                : new Date(
                    currentDate?.getFullYear()!,
                    currentDate?.getMonth()!,
                    currentDate?.getDate()! + 1,
                  )
            }
            selectsRange
            locale='ko'
            showIcon
            icon={svg}
          />
        )}
      />
    </>
  );
};

{
  /* <ReactDatePicker
        dateFormat='yyyy-MM-dd'
        selected={startDate}
        minDate={new Date()}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        onChange={onChange}
        excludeDateIntervals={excludeDates?.map((exclude) => ({
          start: subDays(new Date(exclude.check_in_date), 1),
          end: new Date(exclude.check_out_date),
        }))}
        locale='ko'
        showIcon
        icon={svg}
      /> */
}

// <ReactDatePicker
// dateFormat='yyyy-MM-dd'

// selected={startDate}
// minDate={new Date()}
// startDate={startDate}
// endDate={endDate}
// selectsRange
// onChange={onChange}

// excludeDateIntervals={excludeDates?.map((exclude) => ({
//   start: subDays(new Date(exclude.check_in_date), 1),
//   end: new Date(exclude.check_out_date),
// locale='ko'
// showIcon
// icon={svg}
// }))}

///>
