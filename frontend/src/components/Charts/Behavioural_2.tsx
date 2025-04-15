import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ProfitLossChart: React.FC = () => {
  const [series, setSeries] = useState([
    {
      name: 'Profit/Loss ($)',
      data: [0, 0, 0, 0, 0, 0, 0], // Sample profit/loss values
    },
  ]);

  const options: ApexOptions = {
    chart: {
      type: 'line',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
      toolbar: {
        show: true,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      categories: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue'],
    },
    yaxis: {
      title: { text: 'Profit/Loss ($)' },
    },
    tooltip: {
      enabled: true,
    },
    colors: ['#3C50E0'],
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default">
      <h5 className="text-xl font-semibold text-black dark:text-white">Profit & Loss Trend</h5>
      <ReactApexChart options={options} series={series} type="line" height={300} />
    </div>
  );
};

export default ProfitLossChart;
