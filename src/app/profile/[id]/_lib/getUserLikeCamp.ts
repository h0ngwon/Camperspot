import { LikeCampType } from '@/types/profile';
import { QueryFunctionContext } from '@tanstack/react-query';

export const getUserLikeCamp = async ({ queryKey }: QueryFunctionContext): Promise<LikeCampType> => {
  const [_, __, ___, userId] = queryKey;
  const res = await fetch(`/api/profile/${userId}/camp/like`, {
    method: 'GET',
  });

  const fetchData = await res.json();
  console.log(fetchData)
  return fetchData;
};
