import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableFive from '../components/Tables/TableFive';

const StockScreener = () => {
  return (
    <>
      <Breadcrumb pageName="Stock Screener" />

      <div className="flex flex-col gap-10">
        <TableFive />
      </div>
    </>
  );
};

export default StockScreener;
