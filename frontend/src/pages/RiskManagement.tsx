import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableFour from '../components/Tables/TableFour';

const RiskManagement = () => {
    return (
      <>
        <Breadcrumb pageName="Risk Management" />
  
        <div className="flex flex-col gap-10">
          <TableFour />
        </div>
      </>
    );
  };
  
  export default RiskManagement;