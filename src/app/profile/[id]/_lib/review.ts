import { QueryFunctionContext } from '@tanstack/react-query';

type addMutateReviewType = {
  rate: number;
  review: string;
  userId: string;
  campId: string;
};

type deleteMutateReviewType = {
  userId: string;
  reviewId: string
}

export const getCampReview = async (campId: string) => {
  const res = await fetch(`/api/camp/${campId}/review`, {
    method: 'GET'
  })
  const data = await res.json();
  return data;
}

export const addReview = async (data: addMutateReviewType) => {
  const campId = data.campId;
  const res = await fetch(`/api/camp/${campId}/review`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const fetchData = await res.json();
  return fetchData
};

export const getUserReview = async ({queryKey} : QueryFunctionContext) => {
  const [, , ,userId] = queryKey
  const res = await fetch(`/api/profile/${userId}/review`, {
    method: 'GET'
  });
  const fetchData = await res.json();

  return fetchData;
}

export const deleteUserReview = async ({userId, reviewId} : deleteMutateReviewType) => {
  const res = await fetch(`/api/profile/${userId}/review`, {
    method: 'POST',
    body: JSON.stringify({
      reviewId: reviewId
    })
  });

  return res.json();
}