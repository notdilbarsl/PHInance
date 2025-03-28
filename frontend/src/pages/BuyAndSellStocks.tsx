import React, { useState, useEffect } from "react";

const BuyAndSellStocks = () => {
  React.useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/auth/signin";
    }
  }, []);


  const userStocks = [
    { name: "NSE: HDFCBANK" },
    { name: "NSE: BAJAJFINSV" },
    { name: "NSE: TCS" },
    { name: "NSE: BHARTIARTL" },
    { name: "NSE: ICICIBANK" },
    { name: "NSE: INFY" },
    { name: "NSE: ADANIPORTS" },
    { name: "NSE: JSWSTEEL" },
    { name: "NSE: WIPRO" },
    { name: "WIPRO" },
  ];

  const [stockData, setStockData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    fetchStockPrices();
  }, []);

  const fetchStockPrices = () => {
    const newStockData: { [key: string]: any } = {};
    userStocks.forEach((stock) => {
      newStockData[stock.name] = {
        currentPrice: (Math.random() * 500 + 50).toFixed(2),
      };
    });
    setStockData(newStockData);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Header */}
      <div className="mb-6 text-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Buy & Sell Stocks
        </h4>
      </div>

      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase text-black dark:text-white">Stock</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase text-black dark:text-white">Graph</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase text-black dark:text-white">Current Price (₹)</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase text-black dark:text-white">Actions</h5>
          </div>
        </div>

        {/* Table Rows */}
        {userStocks.map((stock, key) => (
          <div
            className={`grid grid-cols-4 items-center ${key === userStocks.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
              }`}
            key={stock.name}
          >
            {/* Stock Name */}
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white font-semibold">{stock.name}</p>
            </div>

            {/* Placeholder Graph */}
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
            </div>

            {/* Current Price */}
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                ₹{stockData[stock.name]?.currentPrice || "Loading..."}
              </p>
            </div>

            {/* Buy & Sell Buttons */}
            <div className="flex justify-center space-x-2 p-2.5 xl:p-5">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
                Buy
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200">
                Sell
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Refresh Button */}
      <button
        onClick={fetchStockPrices}
        className="mt-6 mb-10 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        Refresh Prices
      </button>
    </div>
  );
};

export default BuyAndSellStocks;
