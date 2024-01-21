'use client';
type Props = {
  tags: { tag: string | null }[];
};
const Hashtag = ({ tags }: Props) => {
  const onHandleFilterBtn = async () => {};

  return (
    <>
      {tags.map((tag, i) => {
        return (
          <li key={i} onClick={onHandleFilterBtn}>
            #{tag.tag}
          </li>
        );
      })}
    </>
  );
};
export default Hashtag;
