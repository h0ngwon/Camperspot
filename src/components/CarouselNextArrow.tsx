import styles from '@/styles/CarouselBtn.module.css';
type Props = {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export default function CarouselNextArrow({
  className,
  style,
  onClick,
}: Props) {
  return (
    <div
      className={`${className} ${styles.slickNext}`}
      style={{ ...style, right: '10px' }}
      onClick={onClick}
    />
  );
}
