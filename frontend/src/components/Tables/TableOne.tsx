import { BRAND } from '../../types/brand';
import React, { useState, useEffect } from 'react';
interface StockData {
  name: string;
  ticker: string;
  curr_price: number | 0; // 0 for loading state
}
const brandData: BRAND[] = [
  { name: "Reliance Industries Limited", ticker: "RELIANCE", price: 0 },
  { name: "HDFC Bank Limited", ticker: "HDFCBANK", price: 0 },
  { name: "Tata Consultancy Services Limited", ticker: "TCS", price: 0 },
  { name: "Bharti Airtel Limited", ticker: "BHARTIARTL", price: 0 },
  { name: "ICICI Bank Limited", ticker: "ICICIBANK", price: 0 },
  { name: "State Bank of India", ticker: "SBIN", price: 0 },
  { name: "Infosys Limited", ticker: "INFY", price: 0 },
  { name: "Bajaj Finance Limited", ticker: "BAJFINANCE", price: 0 },
  { name: "Hindustan Unilever Limited", ticker: "HINDUNILVR", price: 0 },
  { name: "ITC Limited", ticker: "ITC", price: 0 },
  { name: "Kotak Mahindra Bank Limited", ticker: "KOTAKBANK", price: 0 },
  { name: "Larsen & Toubro Limited", ticker: "LT", price: 0 },
  { name: "HCL Technologies Limited", ticker: "HCLTECH", price: 0 },
  { name: "Maruti Suzuki India Limited", ticker: "MARUTI", price: 0 },
  { name: "Sun Pharmaceutical Industries Ltd.", ticker: "SUNPHARMA", price: 0 },
  { name: "Asian Paints Limited", ticker: "ASIANPAINT", price: 0 },
  { name: "Axis Bank Limited", ticker: "AXISBANK", price: 0 },
  { name: "Titan Company Limited", ticker: "TITAN", price: 0 },
  { name: "UltraTech Cement Limited", ticker: "ULTRACEMCO", price: 0 },
  { name: "Wipro Limited", ticker: "WIPRO", price: 0 },
  { name: "Nestlé India Limited", ticker: "NESTLEIND", price: 0 },
  { name: "Mahindra & Mahindra Limited", ticker: "M&M", price: 0 },
  { name: "Tata Motors Limited", ticker: "TATAMOTORS", price: 0 },
  { name: "HDFC Life Insurance Company Limited", ticker: "HDFCLIFE", price: 0 },
  { name: "Dr. Reddy's Laboratories Limited", ticker: "DRREDDY", price: 0 },
  { name: "Adani Green Energy Limited", ticker: "ADANIGREEN", price: 0 },
  { name: "Power Grid Corporation of India Ltd.", ticker: "POWERGRID", price: 0 },
  { name: "NTPC Limited", ticker: "NTPC", price: 0 },
  { name: "JSW Steel Limited", ticker: "JSWSTEEL", price: 0 },
  { name: "Tech Mahindra Limited", ticker: "TECHM", price: 0 },
  { name: "Adani Ports and Special Economic Zone", ticker: "ADANIPORTS", price: 0 },
  { name: "Bajaj Finserv Limited", ticker: "BAJAJFINSV", price: 0 },
  { name: "IndusInd Bank Limited", ticker: "INDUSINDBK", price: 0 },
  { name: "Hindalco Industries Limited", ticker: "HINDALCO", price: 0 },
  { name: "Grasim Industries Limited", ticker: "GRASIM", price: 0 },
  { name: "Cipla Limited", ticker: "CIPLA", price: 0 },
  { name: "Tata Steel Limited", ticker: "TATASTEEL", price: 0 },
  { name: "SBI Life Insurance Company Limited", ticker: "SBILIFE", price: 0 },
  { name: "Eicher Motors Limited", ticker: "EICHERMOT", price: 0 },
  { name: "Divi's Laboratories Limited", ticker: "DIVISLAB", price: 0 },
  { name: "Coal India Limited", ticker: "COALINDIA", price: 0 },
  { name: "Britannia Industries Limited", ticker: "BRITANNIA", price: 0 },
  { name: "Hero MotoCorp Limited", ticker: "HEROMOTOCO", price: 0 },
  { name: "Apollo Hospitals Enterprise Limited", ticker: "APOLLOHOSP", price: 0 },
  { name: "Oil & Natural Gas Corporation Ltd.", ticker: "ONGC", price: 0 },
  { name: "Adani Enterprises Limited", ticker: "ADANIENT", price: 0 },
  { name: "HDFC Asset Management Company Ltd.", ticker: "HDFCAMC", price: 0 },
  { name: "Dabur India Limited", ticker: "DABUR", price: 0 },
  { name: "Pidilite Industries Limited", ticker: "PIDILITIND", price: 0 },
  { name: "Shree Cement Limited", ticker: "SHREECEM", price: 0 }
];


const StockTable = () => {
  const [stocks, setStocks] = useState<StockData[]>(brandData);

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    console.log(token)
    const fetchAllPrices = async () => {
      const response = await fetch("https://phinance-backend.onrender.com/user/dashboard", { method: 'GET', headers: { "Authorization": `Bearer ${token}` } })
      const data = await response.json()
      console.log(data)
      setStocks(data)
    };

    fetchAllPrices();
  }, []);

  const addToWatchlist = async (ticker: string) => {
    try {
      const response = await fetch('/api/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticker }),
      });
      if (!response.ok) throw new Error('Failed to add to watchlist');
      // Handle success (e.g., show a notification)
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="w-150 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Stocks
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Company
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Ticker
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Market Price
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Add to Watchlist
            </h5>
          </div>
        </div>

        {stocks.map((stock, key) => (
          <div
            className={`grid grid-cols-4 sm:grid-cols-4 ${key === stocks.length - 1
              ? ''
              : 'border-b border-stroke dark:border-strokedark'
              }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {stock.name}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">{stock.ticker}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">₹{stock.price}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <button
                onClick={() => addToWatchlist(stock.ticker)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center"
              // disabled={addedStocks.has(stock.ticker)}
              >
                {/*           {addedStocks.has(stock.ticker) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M20 6L9 17 4 12" />
              </svg>
            ) : (
              '+'
            )}*/}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTable;
