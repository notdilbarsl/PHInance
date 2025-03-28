import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import PortfolioTable from '../components/Tables/PortfolioTable';


const Portfolio = () => {
  React.useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/auth/signin";
    }
  }, []);


  return (
    <>
      <Breadcrumb pageName="Portfolio Management" />

      <div className="flex flex-col gap-10">
        <PortfolioTable />
      </div>
    </>
  );
};

export default Portfolio;
