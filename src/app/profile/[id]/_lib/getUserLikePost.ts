import { LikePostType } from '@/types/profile';
import { QueryFunctionContext } from '@tanstack/react-query';

export const getUserLikePost = async ({
  queryKey,
}: QueryFunctionContext): Promise<LikePostType> => {
  const [_, __, ___, userId] = queryKey;
  const res = await fetch(`/api/profile/${userId}/community/like`, {
    method: 'GET',
  });

  const data = await res.json();
  return data;
};
