import React, { useState, useEffect } from 'react';

interface Stock {
  id: number;
  ticker_id: string;
  avg_price: number;
  quantity: number;
}

interface VaRData {
  ticker: string;
  avgPrice: number;
  quantity: number;
  var1Day: number;
  var1Month: number;
}

const NIFTY_VOLATILITY = 0.01;
const CONFIDENCE_Z_SCORE = 1.65;
const TRADING_DAYS_MONTH = 21;

const TableFour = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateVaR = (avgPrice: number, quantity: number) => {
    const investment = avgPrice * quantity;
    const dailyVaR = investment * CONFIDENCE_Z_SCORE * NIFTY_VOLATILITY;
    const monthlyVaR = dailyVaR * Math.sqrt(TRADING_DAYS_MONTH);

    return {
      dailyVaR,
      monthlyVaR
    };
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch('https://phinance-backend.onrender.com/user/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }

        const data = await response.json();
        setStocks(data.stocks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading risk analysis...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  const varData: VaRData[] = stocks.map(stock => {
    const varValues = calculateVaR(stock.avg_price, stock.quantity);
    return {
      ticker: stock.ticker_id,
      avgPrice: stock.avg_price,
      quantity: stock.quantity,
      var1Day: varValues.dailyVaR,
      var1Month: varValues.monthlyVaR
    };
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Portfolio Risk Analysis
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-[2fr_1.5fr_1.2fr_1.5fr_1.5fr] rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Ticker</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Avg Price</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Quantity</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">1-Day VaR (95%)</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">1-Month VaR (95%)</h5>
          </div>
        </div>

        {varData.map((stock, key) => (
          <div
            className={`grid grid-cols-[2fr_1.5fr_1.2fr_1.5fr_1.5fr] ${key === varData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
              }`}
            key={key}
          >
            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white font-medium">
                {stock.ticker}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                ₹{stock.avgPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {stock.quantity}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-5">
                ₹{stock.var1Day.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-5">
                ₹{stock.var1Month.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableFour;
