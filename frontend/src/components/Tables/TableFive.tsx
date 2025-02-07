// import { TRADE } from '../../types/trade.ts';

const tradeData = [
  {
    name: 'NSE: HDFCBANK',
    peratio: '20.5',
    marketcap: '₹9.5T',
    avgvol: '3.2M',
    divyield: '1.2%',
  },
  {
    name: 'NSE: BAJAJFINSV',
    peratio: '25.8',
    marketcap: '₹4.1T',
    avgvol: '1.5M',
    divyield: '0.6%',
  },
  {
    name: 'NSE: TCS',
    peratio: '30.2',
    marketcap: '₹13.8T',
    avgvol: '2.7M',
    divyield: '1.5%',
  },
  {
    name: 'NSE: BHARTIARTL',
    peratio: '18.3',
    marketcap: '₹6.7T',
    avgvol: '4.0M',
    divyield: '0.9%',
  },
  {
    name: 'NSE: ICICIBANK',
    peratio: '22.4',
    marketcap: '₹7.3T',
    avgvol: '3.8M',
    divyield: '1.1%',
  },
  {
    name: 'NSE: INFY',
    peratio: '27.9',
    marketcap: '₹7.9T',
    avgvol: '2.9M',
    divyield: '1.7%',
  },
  {
    name: 'NSE: ADANIPORTS',
    peratio: '35.1',
    marketcap: '₹3.5T',
    avgvol: '1.9M',
    divyield: '0.8%',
  },
  {
    name: 'NSE: JSWSTEEL',
    peratio: '15.6',
    marketcap: '₹2.8T',
    avgvol: '2.3M',
    divyield: '2.3%',
  },
];


const TableFive = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Trades
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-[2.5fr_1.5fr_1.5fr_1.5fr_1.5fr] rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Company</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">P/E Ratio</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Market Cap</h5>
          </div>

          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Avg. Volume</h5>
          </div>

          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Dividend Yield</h5>
          </div>
        </div>

        {tradeData.map((trade, key) => (
          <div
            className={`grid grid-cols-[2.5fr_1.5fr_1.5fr_1.5fr_1.5fr] ${key === tradeData.length - 1
              ? ''
              : 'border-b border-stroke dark:border-strokedark'
              }`}
            key={key}
          >
            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{trade.name}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{trade.peratio}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{trade.marketcap}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{trade.avgvol}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{trade.divyield}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableFive;
