import { LikeCampType } from '@/types/profile';
import { QueryFunctionContext } from '@tanstack/react-query';

export const getUserLikeCamp = async ({queryKey} : QueryFunctionContext) => {
  const [_, __, userId ] = queryKey
  const res = await fetch(`/api/profile/${userId}/like/camp`, {
    method: 'GET',
  });

  const fetchData: LikeCampType = await res.json();
  return fetchData;
};
