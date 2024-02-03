import CommuComments from './CommuComments';
import CommuCreateComment from './CommuCreateComment';

type Props = {
  postId: string;
  userId: string;
};

export default function CommuComment({ postId, userId }: Props) {
  return (
    <>
      <CommuComments />
      <CommuCreateComment postId={postId} userId={userId} />
    </>
  );
}
