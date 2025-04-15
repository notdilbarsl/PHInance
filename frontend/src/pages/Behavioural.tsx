import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React from 'react';
import TradingBehaviorChart from '../components/Charts/Behavioural';
import ProfitLossChart from '../components/Charts/Behavioural_2';
import TradeCategoryChart from '../components/Charts/Behavioural_3';
import ChartOne from '../components/Charts/ChartOne';

const Behavioral = () => {
  React.useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/auth/signin";
    }
  }, []);


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
      {/*
      <div className="flex flex-col gap-10">
        <TradeCategoryChart />
      </div>
      */}


    </>
  );
};

export default Behavioral;
