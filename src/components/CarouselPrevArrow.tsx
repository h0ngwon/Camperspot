import styles from '@/styles/CarouselBtn.module.css';

type Props = {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export default function CarouselPrevArrow({
  className,
  style,
  onClick,
}: Props) {
  return (
    <div
      className={`${className} ${styles.slickPrev}`}
      style={{ ...style, left: '10px', zIndex: 1 }}
      onClick={onClick}
    />
  );
}
