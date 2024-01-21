import React, { useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { subDays } from 'date-fns';
import svg from '@/asset/Calendar.svg';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { getCampAreaReservation } from '@/app/company/[id]/manage_reservation/_lib/reservation';
import { useSearchParams } from 'next/navigation';
import type { CampAreaRservationInfo } from '@/types/reservation';
registerLocale('ko', ko);

interface Props {
  onDatesChange: (dates: [Date, Date], nights: number) => void;
}

export const Calendar = ({ onDatesChange }: Props) => {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState<Date | null>();
  // new Date(currentDate.setHours(0, 0, 0, 0)),
  const [endDate, setEndDate] = useState<Date | null>();
  // new Date(
  //   startDate?.getFullYear()!,
  //   startDate?.getMonth()!,
  //   startDate?.getDate()! + 1,
  // ),
  const [nights, setNights] = useState<number>(1);
  const [excludeDates, setExcludeDates] = useState<CampAreaRservationInfo>();
  const params = useSearchParams();
  const id = params.get('id');

  useEffect(() => {
    getCampAreaReservation(id!).then((res) => setExcludeDates(res));
  }, []);

  console.log('excludes', excludeDates);

  const onChange = (dates: [Date, Date]) => {
    onDatesChange(dates, nights);
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div>
      <ReactDatePicker
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
      />
    </div>
  );
};
