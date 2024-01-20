import CompanyHeader from './_components/CompanyHeader';

type Props = {
  children: React.ReactNode;
};

const CompanyPageLayout = ({ children }: Props) => {
  return (
    <div>
      <CompanyHeader />
      <main>{children}</main>
    </div>
  );
};

export default CompanyPageLayout;
