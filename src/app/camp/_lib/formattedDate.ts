export const formattedDate = () => {
  const getFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formattedToday = getFormattedDate(today);
  const formattedTomorrow = getFormattedDate(tomorrow);
  return [formattedToday, formattedTomorrow];
};
