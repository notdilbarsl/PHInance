import { TRADE } from '../../types/trade.ts';

const tradeData: TRADE[] = [
    {
      name: 'NSE: HDFCBANK',
      quantity: '137',
      buyprice: '₹1523.5',
      date: '04/02/2025',
      time: '09:49:17 AM',
      varday: '1 %',
      varmonth: '6 %',
      rrrday: '1.0 : 2.1',
      rrrmonth: '1.0 : 3.3',
    },
    {
      name: 'NSE: BAJAJFINSV',
      quantity: '263',
      buyprice: '₹2787',
      date: '04/02/2025',
      time: '10:12:43 AM',
      varday: '1.5 %',
      varmonth: '7 %',
      rrrday: '2.0 : 1.0', 
      rrrmonth: '3.5 : 1.0',  
    },
    {
      name: 'NSE: TCS',
      quantity: '49',
      buyprice: '₹904.25',
      date: '04/02/2025',
      time: '11:05:32 AM',
      varday: '2 %',
      varmonth: '8 %',
      rrrday: '1.0 : 3.5',
      rrrmonth: '1.0 : 4.7',
    },
    {
      name: 'NSE: BHARTIARTL',
      quantity: '119',
      buyprice: '₹1802',
      date: '03/02/2025',
      time: '12:22:29 PM',
      varday: '2.2 %',
      varmonth: '9 %',
      rrrday: '4.0 : 1.0', 
      rrrmonth: '5.2 : 1.0',
    },
    {
      name: 'NSE: ICICIBANK',
      quantity: '77',
      buyprice: '₹1351.5',
      date: '03/02/2025',
      time: '04:09:05 PM',
      varday: '1.8 %',
      varmonth: '7.5 %',
      rrrday: '1.0 : 2.8',
      rrrmonth: '1.0 : 3.9',
    },
    {
      name: 'NSE: INFY',
      quantity: '198',
      buyprice: '₹3198.75',
      date: '03/02/2025',
      time: '03:55:21 PM',
      varday: '2.5 %',
      varmonth: '10 %',
      rrrday: '1.0 : 5.4',
      rrrmonth: '1.1 : 6.9',
    },
    {
      name: 'NSE: ADANIPORTS',
      quantity: '154',
      buyprice: '₹2204.5',
      date: '31/01/2025',
      time: '09:11:01 AM',
      varday: '1.2 %',
      varmonth: '6.5 %',
      rrrday: '3.0 : 1.0', 
      rrrmonth: '1.6 : 1.0', 
    },
    {
      name: 'NSE: JSWSTEEL',
      quantity: '297',
      buyprice: '₹3502',
      date: '31/01/2025',
      time: '11:28:13 AM',
      varday: '1.8 %',
      varmonth: '8.2 %',
      rrrday: '1.0 : 4.2',
      rrrmonth: '1.0 : 1.5',
    },
  ];
  
  

const TableFour = () => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Trades
          </h4>
    
          <div className="flex flex-col">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr_1fr_1fr_1fr_1fr] rounded-sm bg-gray-2 dark:bg-meta-4">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Company</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Quantity</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Buy Price</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Buying Date</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Buying Time</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">1 Day VaR</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">1 Month VaR</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">1 Day RRR</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">1 Month RRR</h5>
              </div>
            </div>
    
            {tradeData.map((trade, key) => (
              <div
                className={`grid grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr_1fr_1fr_1fr_1fr] ${
                  key === tradeData.length - 1
                    ? ''
                    : 'border-b border-stroke dark:border-strokedark'
                }`}
                key={key}
              >
                <div className="flex items-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{trade.name}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{trade.quantity}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{trade.buyprice}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{trade.date}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{trade.time}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-5">{trade.varday}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-5">{trade.varmonth}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-5">{trade.rrrday}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-5">{trade.rrrmonth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
};

export default TableFour;
