import { UserType } from '@/types/auth';
import { LikeCampType, LikePostType } from '@/types/profile';
import { QueryFunctionContext } from '@tanstack/react-query';

export type MutationType = {
  id: string;
  formData: FormData;
};

export const getUserData = async (params: string) => {
  try {
    const response = await fetch(`/api/profile/${params}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const fetchData: UserType = await response.json();
    return fetchData;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getUserLikeCamp = async ({
  queryKey,
}: QueryFunctionContext): Promise<LikeCampType> => {
  const [_, __, ___, userId] = queryKey;
  const res = await fetch(`/api/profile/${userId}/camp/like`, {
    method: 'GET',
  });

  const fetchData = await res.json();
  console.log(fetchData);
  return fetchData;
};

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

export const modifyUserData = async ({ id, formData }: MutationType) => {
  const res = await fetch(`/api/profile/${id}`, {
    method: 'POST',
    body: formData,
  });
  return res;
};
