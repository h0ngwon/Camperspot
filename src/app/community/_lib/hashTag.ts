export const isEmptyValue = (value: string | any[]) => {
  if (!value.length) {
    return true;
  }
  return false;
};

export const sanitizeHashTag = (tag: string) =>
  tag
    .trim()
    .replace(/[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, '')
    .replace(/,/g, '');
