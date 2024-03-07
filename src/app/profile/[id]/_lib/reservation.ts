import { QueryFunctionContext } from '@tanstack/react-query';

type Props = { userId: string; reservationId: string };

export const getUserReservation = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [, , userId] = queryKey;
  const res = await fetch(`/api/profile/${userId}/camp/reservation`, {
    method: 'GET',
  });
  const fetchData = await res.json();
  return fetchData;
};

export const deleteUserReservation = async ({
  userId,
  reservationId,
}: Props) => {
  const res = await fetch(`/api/profile/${userId}/camp/reservation`, {
    method: 'POST',
    body: JSON.stringify({ reservationId }),
  });
  return res.json();
};
