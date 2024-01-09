export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      예약 레이아웃
      {children}
      {modal}
    </>
  );
}
