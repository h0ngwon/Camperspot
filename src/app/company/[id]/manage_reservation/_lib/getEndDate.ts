export const getEndDate = () => {
  const currentDate = new Date();
  return new Date(
    currentDate.setDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
      ).getDate(),
    ),
  );
};
