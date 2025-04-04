import { API_BASE_URL } from '../../config';
import React, { useState, useEffect } from 'react';
interface StockData {
  name: string;
  ticker: string;
  curr_price: number | 0;
  is_watchlisted: Boolean;
  code: string;
}

const StockTable = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    console.log(token)
    const fetchprice = async (ticker: string) => {
      try {
        const response = await fetch(`https://yfinance-bcyb.onrender.com/price/${ticker}`)
        const data = await response.json()
        return data.datasets[0].values[0][1]

      }
      catch {
        return 145.8
      }
    }
    const fetchAllPrices = async () => {
      const response = await fetch(`${API_BASE_URL}/user/dashboard`, { method: 'GET', headers: { "Authorization": `Bearer ${token}` } })
      const data: StockData[] = await response.json()
      console.log(data)
      for (let index = 0; index < data.length; index++) {
        const el = data[index];
        const price = await fetchprice(el.ticker)
        setTimeout(() => {
          console.log("After 2 seconds delay");
        }, 200);
        data[index].curr_price = price
      }
      console.log(data)
      // const ndata = data.filter((s) => !s.is_watchlisted)
      setStocks(data)
    };

    fetchAllPrices();
  }, []);

  const addToWatchlist = async (ticker: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/watchlist/${ticker}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
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
                {(stock.is_watchlisted) ? (
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
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTable;
