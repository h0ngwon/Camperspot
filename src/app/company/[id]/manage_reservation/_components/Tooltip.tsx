import styles from '../_styles/Tooltip.module.css';

const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.tooltip}>
      {children}
      <span className={styles['tooltip-text']}>{text}</span>
    </div>
  );
};

export default Tooltip;
