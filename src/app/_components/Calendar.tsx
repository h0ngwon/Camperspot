'use client';
import ko from 'date-fns/locale/ko';
import React, { ReactNode } from 'react';
import ReactDatePicker, {
  CalendarContainer,
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../_styles/Calendar.module.css';
registerLocale('ko', ko);

type Props = {
  dateRange: [Date | null, Date | null];
  setDateRange: React.Dispatch<
    React.SetStateAction<[Date | null, Date | null]>
  >;
};

const Calendar = ({ dateRange, setDateRange }: Props) => {
  const [startDate, endDate] = dateRange;

  // 컨테이너 꾸미는 로직

  const MyContainer = ({ children }: { children: ReactNode }) => {
    return (
      <CalendarContainer className={styles.popper}>
        <div style={{ position: 'relative' }} className={styles.calendarRef}>
          {children}
        </div>
      </CalendarContainer>
    );
  };

  return (
    <ReactDatePicker
      id='date'
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      locale='ko'
      minDate={new Date()}
      dateFormat='yyyy.MM.dd'
      calendarContainer={MyContainer}
      className={styles['date-input']}
      monthsShown={2}
    />
  );
};

export default Calendar;
