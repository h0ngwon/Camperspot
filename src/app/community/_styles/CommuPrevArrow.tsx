type Props = {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export default function CommuPrevArrow({ className, style, onClick }: Props) {
  return (
    <div
      className={className}
      style={{ ...style, left: 0, zIndex: 1 }}
      onClick={onClick}
    />
  );
}
