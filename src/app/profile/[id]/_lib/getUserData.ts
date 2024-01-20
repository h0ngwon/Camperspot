import { UserType } from '@/types/auth';

export const getUserData = async (params: string) => {
  try {
    const response = await fetch(`/api/profile/${params}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const fetchData: UserType = await response.json();
    return fetchData
  } catch (error: any) {
    console.error(error.message);
  }
};