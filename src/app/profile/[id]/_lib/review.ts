type MutateReviewType = {
  rate: number;
  review: string;
  userId: string;
  campId: string;
};

export const addReview = async (data: MutateReviewType) => {
  const res = await fetch('/api/camp/review', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return res;
};
