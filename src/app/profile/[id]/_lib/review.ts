type MutateReviewType = {
  rate: number;
  review: string;
  userId: string;
  campId: string;
};

export const getReview = async (campId: string) => {
  const res = await fetch(`/api/camp/${campId}/review`, {
    method: 'GET'
  })
  const data = await res.json();
  return data;
}

export const addReview = async (data: MutateReviewType) => {
  const campId = data.campId;
  const res = await fetch(`/api/camp/${campId}/review`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const fetchData = await res.json();
  return fetchData
};

