'use client';
type Props = {
  tags: string[];
};
const Hashtag = ({ tags }: Props) => {
  const onHandleFilterBtn = async () => {};

  return (
    <>
      {tags?.map((tag, i) => {
        return (
          <li key={i} onClick={onHandleFilterBtn}>
            #{tag}
          </li>
        );
      })}
    </>
  );
};
export default Hashtag;
