export default function formatDate(date: Date | null) {
  if (date) {
    const year = date.getFullYear().toString().slice();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
}
