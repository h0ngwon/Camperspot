export type FormReviewType = {
  rating: number;
  review: string;
};

export type ReviewType = {
  id: string,
  camp: {
    name: string;
  }
  created_at: string;
  rating: number;
  content: string
}[];