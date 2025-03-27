import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
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
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
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
    max: 100,
  },
};

const dayData = [
  { name: 'Total Profit', data: [15, 20, 18, 25, 37, 15, 19] },
  { name: 'Total Capital Invested', data: [30, 42, 36, 60, 48, 54, 45] },
];

const weekData = [
  { name: 'Total Profit', data: [20, 30, 40, 50, 60, 45, 55] },
  { name: 'Total Capital Invested', data: [50, 60, 70, 80, 90, 85, 95] },
];

const monthData = [
  { name: 'Total Profit', data: [50, 60, 80, 90, 100, 110, 120] },
  { name: 'Total Capital Invested', data: [120, 140, 160, 180, 200, 220, 250] },
];

const categories = {
  day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  week: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
};

const ChartOne: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<'day' | 'week' | 'month'>(
    'day'
  );
  const [series, setSeries] = useState(dayData);
  const [xAxisCategories, setXAxisCategories] = useState(categories.day);

  const handleRangeChange = (range: 'day' | 'week' | 'month') => {
    setSelectedRange(range);
    if (range === 'day') {
      setSeries(dayData);
      setXAxisCategories(categories.day);
    } else if (range === 'week') {
      setSeries(weekData);
      setXAxisCategories(categories.week);
    } else {
      setSeries(monthData);
      setXAxisCategories(categories.month);
    }
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
            <button
              onClick={() => handleRangeChange('week')}
              className={`rounded py-1 px-3 text-xs font-medium ${selectedRange === 'week'
                  ? 'bg-white text-black shadow-card dark:bg-boxdark dark:text-white'
                  : 'text-black dark:text-white'
                }`}
            >
              Week
            </button>
            <button
              onClick={() => handleRangeChange('month')}
              className={`rounded py-1 px-3 text-xs font-medium ${selectedRange === 'month'
                  ? 'bg-white text-black shadow-card dark:bg-boxdark dark:text-white'
                  : 'text-black dark:text-white'
                }`}
            >
              Month
            </button>
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
