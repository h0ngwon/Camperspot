type Props = {
  review:
    | {
        id: string;
        title: string;
        rating: number;
        camp_id: string;
        content: string;
        user_id: string;
        created_at: string;
      }[]
    | undefined;
};

export default function DetailReview({ review }: Props) {
  return (
    <>
      {review?.map((item) => {
        return (
          <div key={item?.id}>
            <p>{item?.content}</p>
            <p>★{item?.rating}</p>
            <p>{item?.created_at}</p>
          </div>
        );
      })}
    </>
  );
}
