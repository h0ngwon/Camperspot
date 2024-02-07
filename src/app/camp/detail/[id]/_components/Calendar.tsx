import React, { ReactNode, useEffect, useState } from 'react';
import ReactDatePicker, {
  CalendarContainer,
  registerLocale,
} from 'react-datepicker';
import { subDays } from 'date-fns';
import svg from '@/asset/Calendar.svg';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { getCampAreaReservation } from '@/app/company/[id]/manage_reservation/_lib/reservation';
import { useSearchParams } from 'next/navigation';
import type { CampAreaRservationInfo } from '@/types/reservation';
import { Control, Controller } from 'react-hook-form';
import styles from '../_styles/Calendar.module.css';

registerLocale('ko', ko);

type UserInfo = {
  people: number;
  name: string;
  phone: string;
  dates: [Date, Date];
};

export const Calendar = ({ control }: { control: Control<UserInfo> }) => {
  const [excludeDates, setExcludeDates] = useState<CampAreaRservationInfo>();
  const params = useSearchParams();
  const id = params.get('id');

  const isValidDate = (dates: [Date, Date]) => {
    const [start, end] = dates;
    if (!start || !end) return false;
    const data =
      excludeDates?.filter((date) => {
        const check_out_date = new Date(date.check_out_date).setHours(
          0,
          0,
          0,
          0,
        );
        const check_in_date = new Date(date.check_in_date).setHours(0, 0, 0, 0);
        const start_date = start.setHours(0, 0, 0, 0);
        const end_date = end.setHours(0, 0, 0, 0);
        return (
          // 캘린더로 선택한 날짜가 예약된 날짜 범위에 해당되는지 확인
          new Date(check_in_date).getTime() <= new Date(start_date).getTime() &&
          new Date(check_out_date).getTime() >= new Date(end_date).getTime()
        );
      }) || [];
    // 겹치는 날짜가 없을 때만 유효하도록 설정
    return data!.length > 0 ? false : true;
  };

  useEffect(() => {
    getCampAreaReservation(id!).then((res) => setExcludeDates(res));
  }, [id]);

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
    <>
      <Controller
        name='dates'
        control={control}
        rules={{
          validate: (value) => isValidDate(value),
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <ReactDatePicker
              dateFormat={'yyyy-MM-dd'}
              minDate={new Date()}
              onChange={onChange}
              startDate={value?.[0]}
              endDate={value?.[1]}
              selectsRange
              excludeDateIntervals={excludeDates?.map((exclude) => ({
                start: subDays(new Date(exclude.check_in_date), 1),
                end: subDays(new Date(exclude.check_out_date), 1),
              }))}
              locale='ko'
              className={styles['date-input']}
              calendarContainer={MyContainer}
              popperPlacement='left-start'
            />
            {/* 유효하지 않을 때(이미 예약된 날짜와 겹치는 경우) 안내 문구 */}
            {value[0] && value[1] && !isValidDate(value) && (
              <p className={styles['date-error']}>이미 예약된 날짜입니다.</p>
            )}
            {(!value[0] || !value[1]) && (
              <p className={styles['date-error']}>날짜를 선택해주세요.</p>
            )}
          </>
        )}
      />
    </>
  );
};
