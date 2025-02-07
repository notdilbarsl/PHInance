import React, { useState, useEffect } from "react";

const AIPoweredPrediction = () => {
    const userStocks = [
      { name: "AAPL" }, // Apple Inc.
      { name: "GOOGL" }, // Alphabet Inc. (Google)
      { name: "MSFT" }, // Microsoft Corporation
      { name: "AMZN" }, // Amazon.com, Inc.
      { name: "TSLA" }, // Tesla, Inc.
  
      // National Stock Exchange (NSE) Listed Stocks
      { name: "RELIANCE" }, // Reliance Industries Limited
      { name: "TCS" }, // Tata Consultancy Services
      { name: "INFY" }, // Infosys Limited
      { name: "HDFCBANK" }, // HDFC Bank Limited
      { name: "ICICIBANK" }, // ICICI Bank Limited
      { name: "SBIN" }, // State Bank of India
      { name: "BHARTIARTL" }, // Bharti Airtel Limited
      { name: "ITC" }, // ITC Limited
      { name: "LT" }, // Larsen & Toubro Limited
      { name: "WIPRO" }, // Wipro Limited
      { name: "HINDUNILVR" }, // Hindustan Unilever Limited
      { name: "MARUTI" }, // Maruti Suzuki India Limited
      { name: "BAJAJFINSV" }, // Bajaj Finserv Limited
      { name: "BAJFINANCE" }, // Bajaj Finance Limited
      { name: "KOTAKBANK" }, // Kotak Mahindra Bank Limited
      { name: "ONGC" }, // Oil and Natural Gas Corporation Limited
      { name: "COALINDIA" }, // Coal India Limited
      { name: "HCLTECH" }, // HCL Technologies Limited
      { name: "TECHM" }, // Tech Mahindra Limited
      { name: "ADANIENT" }, // Adani Enterprises Limited
      { name: "ULTRACEMCO" }, // UltraTech Cement Limited
      { name: "SUNPHARMA" }, // Sun Pharmaceutical Industries Limited
      { name: "TITAN" }, // Titan Company Limited
      { name: "DRREDDY" }, // Dr. Reddy’s Laboratories Limited
      { name: "AXISBANK" }, // Axis Bank Limited
    ];
  

  const [stockData, setStockData] = useState<{ [key: string]: any }>({});
  const [lastPricingDate, setLastPricingDate] = useState<string>("");
  const [predictedDate, setPredictedDate] = useState<string>("");

  useEffect(() => {
    fetchStockPredictions();
  }, []);

  const fetchStockPredictions = () => {
    const newStockData: { [key: string]: any } = {};
    const today = new Date();
    setLastPricingDate(today.toDateString());

    const nextDay = new Date();
    nextDay.setDate(today.getDate() + 1);
    setPredictedDate(nextDay.toDateString());

    userStocks.forEach((stock) => {
      newStockData[stock.name] = {
        currentPrice: (Math.random() * 500 + 50).toFixed(2),
        predictedOpen: (Math.random() * 500 + 50).toFixed(2),
        predictedClose: (Math.random() * 500 + 50).toFixed(2),
        volatility: (Math.random() * 5 + 1).toFixed(2), // Mock Volatility Index
        sentiment: ["Bullish", "Neutral", "Bearish"][Math.floor(Math.random() * 3)],
        advice: Math.random() > 0.5 ? "BUY" : "SELL",
        confidence: (Math.random() * 40 + 60).toFixed(1), // 60-100%
      };
    });

    setStockData(newStockData);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Header with Dates */}
      <div className="mb-6 text-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          AI Powered Stock Predictions
        </h4>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          <strong>Last Pricing Date:</strong> {lastPricingDate} | <strong>Predicted Date:</strong> {predictedDate}
        </p>
      </div>

      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-4 sm:grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">
              Stock
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">
              Graph
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">
              Last Closing Price (₹)
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">
              Predicted Opening (₹)
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">
              Predicted Closing (₹)
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">
              Volatility
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">
              Market Sentiment
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">
              Advice / Confidence
            </h5>
          </div>
        </div>

        {/* Table Rows */}
        {userStocks.map((stock, key) => (
          <div
            className={`grid grid-cols-4 sm:grid-cols-8 ${
              key === userStocks.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
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

            {/* Current Closing Price */}
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                ₹{stockData[stock.name]?.currentPrice || "Loading..."}
              </p>
            </div>

            {/* Predicted Opening Price */}
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3 dark:text-meta-2">
                ₹{stockData[stock.name]?.predictedOpen || "Loading..."}
              </p>
            </div>

            {/* Predicted Closing Price */}
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3 dark:text-meta-2">
                ₹{stockData[stock.name]?.predictedClose || "Loading..."}
              </p>
            </div>

            {/* Volatility */}
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {stockData[stock.name]?.volatility || "Loading..."}
              </p>
            </div>

            {/* Sentiment */}
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p
                className={`font-semibold ${
                  stockData[stock.name]?.sentiment === "Bullish"
                    ? "text-green-600 dark:text-green-400"
                    : stockData[stock.name]?.sentiment === "Bearish"
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-500 dark:text-gray-300"
                }`}
              >
                {stockData[stock.name]?.sentiment || "Loading..."}
              </p>
            </div>

            {/* Advice and Confidence */}
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p
                className={`font-bold ${
                  stockData[stock.name]?.advice === "BUY"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {stockData[stock.name]?.advice || "Loading..."}
              </p>
              <span className="ml-2 text-black dark:text-white">
                ({stockData[stock.name]?.confidence || "Loading..."}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Refresh Button */}
      <button
        onClick={fetchStockPredictions}
        className="mt-6 mb-10 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        Refresh Predictions
      </button>
    </div>
  );
};

export default AIPoweredPrediction;
