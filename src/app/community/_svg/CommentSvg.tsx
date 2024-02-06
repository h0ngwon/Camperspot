type Props = {
  onClick: () => void;
};

export default function CommentSvg({ onClick }: Props) {
  return (
    <svg
      onClick={onClick}
      aria-label='댓글 달기'
      width='22'
      height='22'
      role='img'
      viewBox='0 0 24 24'
    >
      <title>댓글 달기</title>
      <path
        d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
        fill='none'
        stroke='#121212'
        strokeWidth='2'
      ></path>
    </svg>
  );
}
