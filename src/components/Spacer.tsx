type Props = {
  y: number;
};
const Spacer = ({ y }: Props) => {
  return (
    <div
      style={{
        height: `${y}px`,
      }}
    ></div>
  );
};

export default Spacer;
