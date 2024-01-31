import styles from '@/styles/CarouselBtn.module.css';

type Props = {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export default function CampCarouselPrevArrow({
  className,
  style,
  onClick,
}: Props) {
  return (
    <div
      className={`${className} ${styles.slickPrev}`}
      style={{ ...style, left: '-5px', zIndex: 1 }}
      onClick={onClick}
    />
  );
}
