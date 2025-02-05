import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import PortfolioTable from '../components/Tables/PortfolioTable';


const Portfolio = () => {
    return (
      <>
        <Breadcrumb pageName="Holdings(3)" />
  
        <div className="flex flex-col gap-10">
          <PortfolioTable />
        </div>
      </>
    );
  };
  
  export default Portfolio;