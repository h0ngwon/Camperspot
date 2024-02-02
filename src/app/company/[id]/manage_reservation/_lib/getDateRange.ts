const currentDate = new Date();

export const getStartDate = () => {
  // supabase에 저장된 'yyyy-mm-dd' 날짜 데이터 형식이 오전 9시로 설정되어 있어 동일하게 맞춰줌.
  return new Date(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).setHours(
      9,
      0,
      0,
      0,
    ),
  );
};

export const getEndDate = () => {
  return new Date(
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).setHours(
      9,
      0,
      0,
      0,
    ),
  );
};
