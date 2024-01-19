'use client';
import React, { useState } from 'react';
import styles from '../_styles/Calendar.module.css';
import ReactDatePicker, {
  CalendarContainer,
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import formatDate from '../_utils/date';
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
      // renderCustomHeader={({
      //   monthDate,
      //   customHeaderCount,
      //   decreaseMonth,
      //   increaseMonth,
      // }) => (
      //   <div>
      //     <button
      //       aria-label='Previous Month'
      //       className={
      //         'react-datepicker__navigation react-datepicker__navigation--previous'
      //       }
      //       style={customHeaderCount === 1 ? { visibility: 'hidden' } : null}
      //       onClick={decreaseMonth}
      //     >
      //       <span
      //         className={
      //           'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
      //         }
      //       >
      //         {'<'}
      //       </span>
      //     </button>
      //     <span className='react-datepicker__current-month'>
      //       {monthDate.toLocaleString('en-US', {
      //         month: 'long',
      //         year: 'numeric',
      //       })}
      //     </span>
      //     <button
      //       aria-label='Next Month'
      //       className={
      //         'react-datepicker__navigation react-datepicker__navigation--next'
      //       }
      //       style={customHeaderCount === 0 ? { visibility: 'hidden' } : null}
      //       onClick={increaseMonth}
      //     >
      //       <span
      //         className={
      //           'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
      //         }
      //       >
      //         {'>'}
      //       </span>
      //     </button>
      //   </div>
      // )}

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
      icon={
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          viewBox='0 0 48 48'
        >
          <mask id='ipSApplication0'>
            <g fill='none' stroke='#fff' strokeLinejoin='round' strokeWidth='4'>
              <path strokeLinecap='round' d='M40.04 22v20h-32V22'></path>
              <path
                fill='#fff'
                d='M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z'
              ></path>
            </g>
          </mask>
          <path
            fill='currentColor'
            d='M0 0h48v48H0z'
            mask='url(#ipSApplication0)'
          ></path>
        </svg>
      }
    />
  );
};

export default Calendar;
