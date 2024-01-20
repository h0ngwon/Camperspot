import React, { useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('ko', ko);

interface Props {
  onDatesChange: (dates: [Date, Date], nights: number) => void;
}

export const Calendar = ({ onDatesChange }: Props) => {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(currentDate.setHours(0, 0, 0, 0)),
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(
      startDate?.getFullYear()!,
      startDate?.getMonth()!,
      startDate?.getDate()! + 1,
    ),
  );

  const onChange = (dates: [Date, Date], nights: number) => {
    onDatesChange(dates, nights);
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div>
      <ReactDatePicker
        dateFormat='yyyy/MM/dd'
        selected={startDate}
        minDate={new Date()}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        onChange={onChange}
        locale='ko'
        showIcon
      />
    </div>
  );
};
