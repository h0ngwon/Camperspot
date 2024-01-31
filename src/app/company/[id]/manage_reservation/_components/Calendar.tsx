import React, { useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import svg from '@/asset/Calendar.svg';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('ko', ko);

type Props = {
  startDate: Date;
  endDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
};

const Calendar = ({ startDate, endDate, setStartDate, setEndDate }: Props) => {
  return (
    <>
      <ReactDatePicker
        selected={startDate}
        dateFormat={'yyyy/MM/dd'}
        startDate={startDate}
        endDate={endDate}
        maxDate={endDate}
        selectsStart
        onChange={(date) => setStartDate(date!)}
        showIcon
        icon={svg}
      />
      <ReactDatePicker
        selected={endDate}
        dateFormat={'yyyy/MM/dd'}
        startDate={startDate}
        endDate={endDate}
        selectsEnd
        onChange={(date) => setEndDate(date!)}
        showIcon
        icon={svg}
      />
    </>
  );
};

export default Calendar;
