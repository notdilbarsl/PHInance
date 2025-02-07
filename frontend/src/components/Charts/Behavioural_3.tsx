import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const TradeCategoryChart: React.FC = () => {
  const [state, setState] = useState({
    series: [45, 25, 15, 15], // Example data for stocks, crypto, forex, options
  });

  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: ['Stocks', 'Crypto', 'Forex', 'Options'],
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
    tooltip: {
      enabled: true,
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '16px', // Increased font size
        fontWeight: 'bold',
        colors: ['#FFFFFF'], // ✅ White text inside the pie chart
      },
      background: {
        enabled: false, // Removes default background if interfering
      },
      dropShadow: {
        enabled: false, // Removes shadow effects
      },
    },
    legend: {
      labels: {
        colors: '#000000', // Black legend text for better contrast
      },
      fontSize: '14px',
      position: 'right',
    },
    theme: {
      mode: 'light', // Ensure the chart works well in light/dark mode
    },
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default">
      <h5 className="text-xl font-semibold text-black dark:text-white">Trade Category Distribution</h5>
      <ReactApexChart options={options} series={state.series} type="pie" height={300} />
    </div>
  );
};

export default TradeCategoryChart;
