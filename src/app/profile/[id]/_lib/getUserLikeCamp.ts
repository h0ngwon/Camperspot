export const getUserLikeCamp = async (userId: string) => {
  const res = await fetch(`/api/profile/${userId}/like/camp`, {
    method: 'GET',
  });

  const fetchData = await res.json();
  return fetchData;
};
