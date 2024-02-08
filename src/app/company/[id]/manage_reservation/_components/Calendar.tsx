import svg from '@/asset/Calendar.svg';
import ko from 'date-fns/locale/ko';
import React from 'react';
import ReactDatePicker, {
  CalendarContainer,
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import QuestionMarkSvg from '../../_svg/QuestionMarkSvg';
import styles from '../_styles/Calendar.module.css';
import Tooltip from './Tooltip';
registerLocale('ko', ko);

type Props = {
  startDate: Date;
  endDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
};

const Calendar = ({ startDate, endDate, setStartDate, setEndDate }: Props) => {
  const MyContainer = ({ children }: { children: React.ReactNode }) => {
    return (
      <CalendarContainer>
        <div style={{ position: 'relative' }} className={styles.abbaccaddff}>
          {children}
        </div>
      </CalendarContainer>
    );
  };
  return (
    <div className={styles.div}>
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
        locale={ko}
        calendarContainer={MyContainer}
        className={styles.calendar}
      />
      <span className={styles.span}> - </span>
      <ReactDatePicker
        selected={endDate}
        dateFormat={'yyyy/MM/dd'}
        startDate={startDate}
        endDate={endDate}
        selectsEnd
        onChange={(date) => setEndDate(date!)}
        showIcon
        icon={svg}
        locale={ko}
        calendarContainer={MyContainer}
        className={styles.calendar}
      />
      <Tooltip text={'체크인 날짜 기준으로 검색기간 설정'}>
        <QuestionMarkSvg />
      </Tooltip>
    </div>
  );
};

export default Calendar;
