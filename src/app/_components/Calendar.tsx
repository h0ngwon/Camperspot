'use client';
import React, { useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import svg from '@/asset/Calendar.svg';
registerLocale('ko', ko);

type Props = {
  dateRange: [Date | null, Date | null];
  setDateRange: React.Dispatch<
    React.SetStateAction<[Date | null, Date | null]>
  >;
};

const Calendar = ({ dateRange, setDateRange }: Props) => {
  const [startDate, endDate] = dateRange;

  //컨테이너 꾸미는 로직
  //   const MyContainer = ({ className, children }) => {
  //     return (
  //       <div style={{ padding: '16px', background: '#216ba5', color: '#fff' }}>
  //         <CalendarContainer className={className}>
  //           <div style={{ background: '#f0f0f0' }}>
  //             What is your favorite day?
  //           </div>
  //           <div style={{ position: 'relative' }}>{children}</div>
  //         </CalendarContainer>
  //       </div>
  //     );
  //   };

  return (
    <ReactDatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      locale='ko'
      minDate={new Date()}
      dateFormat='yyyy-MM-dd'
      showIcon
      // calendarContainer={MyContainer}
      icon={svg}
    />
  );
};

export default Calendar;
