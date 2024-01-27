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

  const isValidDate = (startDate: Date) => {
    //체크아웃 날짜가 오늘 날짜(날짜 기본값 체크인)보다 크거나 같은 경우 &&
    //체크인 날짜가 오늘 날짜(날짜 기본값 체크인)보다 크거나 같은 경우
    if (!startDate) return false;
    const data =
      excludeDates?.filter((date) => {
        const check_out_date = new Date(date.check_out_date).setHours(
          0,
          0,
          0,
          0,
        );
        const check_in_date = new Date(date.check_in_date).setHours(0, 0, 0, 0);
        const start_date = startDate.setHours(0, 0, 0, 0);
        return (
          new Date(check_out_date).getTime() >=
            new Date(start_date).getTime() &&
          new Date(start_date).getTime() >= new Date(check_in_date).getTime()
        );
      }) || [];

    // 겹치는 날짜가 없을 때만 유효하도록 설정
    return data!.length > 0 ? false : true;
  };

  useEffect(() => {
    getCampAreaReservation(id!).then((res) => setExcludeDates(res));
  }, []);

  return (
    <>
      <Controller
        name='dates'
        control={control}
        rules={{
          validate: (value) => isValidDate(value[0]),
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
                end: new Date(exclude.check_out_date),
              }))}
              locale='ko'
              showIcon
              icon={svg}
            />
            {/* invalid가 처음부터 끝까지 false로 나옴 원래 처음에는 true로 나와야함 */}
            {/* 유효하지 않을 때(이미 예약된 날짜와 겹치는 경우) 안내 문구 */}
            {value[0] && !isValidDate(value[0]) && (
              <p>이미 예약된 날짜입니다.</p>
            )}
            {(!value[0] || !value[1]) && <p>날짜를 선택해주세요.</p>}
          </>
        )}
      />
    </>
  );
};
