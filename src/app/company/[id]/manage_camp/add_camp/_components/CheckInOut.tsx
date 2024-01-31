import React from 'react';
import styles from '../_styles/CampForm.module.css';

type Props = {
  check_in: string;
  handleCheck_in: React.Dispatch<React.SetStateAction<string>>;
  check_out: string;
  handleCheck_out: React.Dispatch<React.SetStateAction<string>>;
};

const CheckInOut = ({
  check_in,
  handleCheck_in,
  check_out,
  handleCheck_out,
}: Props) => {
  // // 시간 옵션 생성 함수
  // const generateTimeOptions = () => {
  //   const hours = Array.from({ length: 24 }, (_, index) =>
  //     String(index).padStart(2, '00'),
  //   );
  //   const minutes = ['00', '30'];
  //   const timeOptions: string[] = [];

  //   hours.forEach((hour) => {
  //     minutes.forEach((minute) => {
  //       const time = `${hour}:${minute}`;
  //       timeOptions.push(time);
  //     });
  //   });

  //   return timeOptions;
  // };

  // 시간 옵션 생성 함수 (오전 8시부터 오후 8시까지)
  const generateTimeOptions = () => {
    const hours = Array.from({ length: 13 }, (_, index) =>
      String(index + 8).padStart(2, '00'),
    );
    const minutes = ['00', '30'];
    const timeOptions: string[] = [];

    hours.forEach((hour) => {
      minutes.forEach((minute) => {
        const time = `${hour}:${minute}`;
        timeOptions.push(time);
      });
    });

    return timeOptions;
  };

  return (
    <div className={styles.checkInOutFlexWrap}>
      <div className={styles.checkInOutFlex}>
        <h3>체크인 시간</h3>
        <select
          value={check_in}
          onChange={(e) => {
            handleCheck_in(e.target.value);
          }}
          required
          className={styles.checkOption}
        >
          <option value=''>시간 선택</option>
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.checkInOutFlex}>
        <h3>체크아웃 시간</h3>
        <select
          value={check_out}
          onChange={(e) => {
            handleCheck_out(e.target.value);
          }}
          required
          className={styles.checkOption}
        >
          <option value=''>시간 선택</option>
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CheckInOut;
