import styles from '@/styles/CarouselBtn.module.css';

type Props = {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  customStyle: boolean;
};

export default function NextArrow({
  className,
  style,
  onClick,
  customStyle,
}: Props) {
  const dynamicStyle = customStyle
    ? { ...style, right: '-10px' }
    : { ...style, right: '10px' };
  const dynamicClassNames = `${className} ${
    customStyle ? styles.mainSlick : styles.slickNext
  }`;

  return (
    <div className={dynamicClassNames} style={dynamicStyle} onClick={onClick} />
  );
}
