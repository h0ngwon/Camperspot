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
  const formatCreatedAt = (createdAt: string): string => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // 원하는 형식으로 조합
    return `${year}.${month}.${day} ${hours}:${minutes}분`;
  };
  return (
    <>
      {review?.map((item) => {
        return (
          <div key={item?.id}>
            <p>{item?.content}</p>
            <p>★{item?.rating}</p>
            <p>{formatCreatedAt(item?.created_at)}</p>
          </div>
        );
      })}
    </>
  );
}
