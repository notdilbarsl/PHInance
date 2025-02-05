import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import TradingBehaviorChart from '../components/Charts/Behavioural';
import ProfitLossChart from '../components/Charts/Behavioural_2';
import TradeCategoryChart from '../components/Charts/Behavioural_3';
import ChartOne from '../components/Charts/ChartOne';

const Behavioral = () => {
    return (
      <>
        <Breadcrumb pageName="Behavioural Analytics" />
  
        
        
        <div className="flex flex-col gap-10">
          <ChartOne />
        </div>
        <div className="flex flex-col gap-10">
          <TradingBehaviorChart />
        </div>

        <div className="flex flex-col gap-10">
          <ProfitLossChart />
        </div>
        <div className="flex flex-col gap-10">
          <TradeCategoryChart />
        </div>
       
        
      </>
    );
  };
  
  export default Behavioral;