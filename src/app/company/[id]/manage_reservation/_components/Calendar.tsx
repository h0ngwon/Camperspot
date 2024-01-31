import React, { useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import svg from '@/asset/Calendar.svg';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('ko', ko);

interface Props {
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

const Calendar = ({ onStartDateChange, onEndDateChange }: Props) => {
  const [startDate, setStartDate] = useState<Date>(new Date(2024, 0, 1));
  const [endDate, setEndDate] = useState<Date>(new Date(2024, 0, 31));

  const onStartChange = (date: Date) => {
    onStartDateChange(date);
    setStartDate(new Date(new Date(date).setHours(0, 0, 0, 0)));
  };

  const onEndChange = (date: Date) => {
    onEndDateChange(date);
    setEndDate(new Date(new Date(date).setHours(0, 0, 0, 0)));
  };

  return (
    <>
      <ReactDatePicker
        selected={startDate}
        dateFormat={'yyyy/MM/dd'}
        startDate={startDate}
        endDate={endDate}
        maxDate={endDate}
        selectsStart
        onChange={onStartChange}
        icon={svg}
      />
      <ReactDatePicker
        selected={endDate}
        dateFormat={'yyyy/MM/dd'}
        startDate={startDate}
        endDate={endDate}
        selectsEnd
        onChange={onEndChange}
        icon={svg}
      />
    </>
  );
};

export default Calendar;
