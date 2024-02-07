export const getPageControllerProps = ({
  currentPage,
  perPage,
  count,
}: {
  currentPage: number;
  perPage: string | string[];
  count: number;
}) => {
  const start = (Number(currentPage) - 1) * Number(perPage);
  const end = start + Number(perPage);
  return {
    hasNextPage: end < count,
    hasPrevPage: start > 0,
  };
};
