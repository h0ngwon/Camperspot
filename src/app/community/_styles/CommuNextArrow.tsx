type Props = {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export default function CommuNextArrow({ className, style, onClick }: Props) {
  return (
    <div
      className={className}
      style={{ ...style, right: 0 }}
      onClick={onClick}
    />
  );
}
