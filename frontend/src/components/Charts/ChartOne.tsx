import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { API_BASE_URL } from '../../config';

interface Stock {
  id: number;
  ticker_id: string;
  avg_price: number;
  quantity: number;
}

const options: ApexOptions = {
  // ... [same chart config you wrote]
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: [2, 2],
    curve: 'smooth',
  },
  grid: {
    xaxis: {
      lines: { show: true },
    },
    yaxis: {
      lines: { show: true },
    },
  },
  dataLabels: { enabled: false },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
  },
  xaxis: {
    type: 'category',
    categories: [],
  },
  yaxis: {
    min: -100,
    max: 25000,
  },
};

const categories = {
  day: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'],
  week: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
};

const ChartOne: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<'day' | 'week' | 'month'>('day');
  const [series, setSeries] = useState([
    { name: 'Total Profit', data: [0, 0, 0, 0, 0, 0, 0] },
    { name: 'Total Capital Invested', data: [0, 0, 0, 0, 0, 0, 0] },
  ]);
  const [xAxisCategories, setXAxisCategories] = useState(categories.day);

  useEffect(() => {
    const fetchCapital = async () => {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      const stocks: Stock[] = data.stocks;
      const totalCapitalInvested = stocks.reduce((sum, stock) => {
        return sum + stock.avg_price * stock.quantity;
      }, 0);

      // update series with dynamic capital invested
      const newSeries = [
        { name: 'Total Profit', data: [0, 0, 0, 0, 0, 0, 0] },
        { name: 'Total Capital Invested', data: [0, 0, 0, 0, 0, 0, totalCapitalInvested] },
      ];

      setSeries(newSeries);
    };

    fetchCapital();
  }, []);

  const handleRangeChange = (range: 'day' | 'week' | 'month') => {
    setSelectedRange(range);
    if (range === 'day') {
      // Do nothing, already handled in useEffect.
    } else if (range === 'week') {
      setSeries([
        { name: 'Total Profit', data: [20, 30, 40, 50, 60, 45, 55] },
        { name: 'Total Capital Invested', data: [50, 60, 70, 80, 90, 85, 95] },
      ]);
    } else {
      setSeries([
        { name: 'Total Profit', data: [50, 60, 80, 90, 100, 110, 120] },
        { name: 'Total Capital Invested', data: [120, 140, 160, 180, 200, 220, 250] },
      ]);
    }

    setXAxisCategories(categories[range]);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Money Invested</p>
              <p className="text-sm font-medium">Last {selectedRange}</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Profit</p>
              <p className="text-sm font-medium">Last {selectedRange}</p>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              onClick={() => handleRangeChange('day')}
              className={`rounded py-1 px-3 text-xs font-medium ${selectedRange === 'day'
                ? 'bg-white text-black shadow-card dark:bg-boxdark dark:text-white'
                : 'text-black dark:text-white'
              }`}
            >
              Day
            </button>
            {/* Uncomment these if you want week/month switching */}
            {/* <button onClick={() => handleRangeChange('week')} ... >Week</button> */}
            {/* <button onClick={() => handleRangeChange('month')} ... >Month</button> */}
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={{ ...options, xaxis: { ...options.xaxis, categories: xAxisCategories } }}
            series={series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
