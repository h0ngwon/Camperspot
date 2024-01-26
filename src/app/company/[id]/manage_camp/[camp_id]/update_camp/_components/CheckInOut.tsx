import React from 'react';

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
  // 시간 옵션 생성 함수
  const generateTimeOptions = () => {
    const hours = Array.from({ length: 24 }, (_, index) =>
      String(index).padStart(2, '0'),
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
    <div>
      <h3>체크인 시간</h3>
      <select
        value={check_in}
        onChange={(e) => {
          handleCheck_in(e.target.value);
        }}
        required
      >
        <option value=''>시간 선택</option>
        {generateTimeOptions().map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      <h3>체크아웃 시간</h3>
      <select
        value={check_out}
        onChange={(e) => {
          handleCheck_out(e.target.value);
        }}
        required
      >
        <option value=''>시간 선택</option>
        {generateTimeOptions().map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CheckInOut;