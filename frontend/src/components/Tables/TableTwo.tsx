import React, { useState, useEffect } from 'react';
import { BRAND } from '../../types/brand';

interface WatchlistStock {
  name: string;
  ticker: string;
  price: number;
}

const TableTwo = () => {
  const [watchlistStocks, setWatchlistStocks] = useState<WatchlistStock[]>([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/watchlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch watchlist');
        const data = await response.json();
        setWatchlistStocks(data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    fetchWatchlist();
  }, []);

  const removeFromWatchlist = async (ticker: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/watchlist/${ticker}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to remove from watchlist');
      setWatchlistStocks(watchlistStocks.filter(stock => stock.ticker !== ticker));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  return (
    <div className="w-100 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Watchlist
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Company
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Market Price
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Remove
            </h5>
          </div>
        </div>

        {watchlistStocks.map((stock, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${
              key === watchlistStocks.length - 1
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
              <p className="text-meta-3">₹{stock.price}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <button
                onClick={() => removeFromWatchlist(stock.ticker)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center"
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableTwo;
