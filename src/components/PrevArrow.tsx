import styles from '@/styles/CarouselBtn.module.css';

type Props = {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  customStyle: boolean;
};

export default function PrevArrow({
  className,
  style,
  onClick,
  customStyle,
}: Props) {
  const dynamicStyle = customStyle
    ? { ...style, left: '-30px' }
    : { ...style, left: '10px', zIndex: 1 };
  const dynamicClassNames = `${className} ${
    customStyle ? styles.mainSlick : styles.slickPrev
  }`;

  return (
    <div className={dynamicClassNames} style={dynamicStyle} onClick={onClick} />
  );
}
