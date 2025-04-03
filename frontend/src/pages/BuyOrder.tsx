import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BuyOrder = () => {
  const { stockName } = useParams<{ stockName: string }>();
  const [stockData, setStockData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shares, setShares] = useState<string>("");
  const [limitPrice, setLimitPrice] = useState<number>(0);
  const [orderType, setOrderType] = useState<"LIMIT" | "MARKET">("LIMIT");
  const [tradeType, setTradeType] = useState<"DELIVERY" | "INTRADAY">("DELIVERY");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/auth/signin";
    }
  }, []);

  useEffect(() => {
    if (stockName) {
      const decodedStockName = decodeURIComponent(stockName);
      const cleanStockName = decodedStockName.replace("NSE:", "");
      fetchStockData(cleanStockName);
    }
  }, [stockName]);

  const fetchStockData = async (symbol: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://yfinance-bcyb.onrender.com/${symbol}`);
      const data = response.data;

      if (data && Object.keys(data).length > 0) {
        setStockData(data);
        setLimitPrice(data.currentPrice);
      } else {
        throw new Error("No data available for this stock.");
      }
    } catch (err) {
      console.error("Error fetching stock data:", err);
      setError("Failed to fetch stock data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full p-5">
      <div className="w-2/3 pr-5">
        {loading ? (
          <p className="text-xl font-semibold text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-xl font-semibold text-red-500">{error}</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {stockData?.name} ({stockName})
            </h1>
            <p className="text-black text-2xl font-semibold">₹{stockData?.currentPrice?.toFixed(2)}</p>
            <div className="grid grid-cols-3 gap-4 mt-5">
              {stockData &&
                [
                  "previousClose", "open", "dayLow", "dayHigh", "marketCap", "volume", "dividendYield", "bookValue",
                  "priceToBook", "earningsQuarterlyGrowth", "netIncomeToCommon", "trailingEps", "forwardEps", "targetHighPrice",
                  "targetLowPrice", "targetMeanPrice", "totalRevenue", "profitMargins"
                ].map((key) => (
                  <div key={key} className="p-3 bg-white dark:bg-gray-900 rounded-md shadow">
                    <p className="text-sm text-gray-500">{key.replace(/([A-Z])/g, " $1").toUpperCase()}</p>
                    <p className="font-semibold">{stockData[key] ?? "N/A"}</p>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>

      {!loading && !error && (
        <div className="w-1/3 p-5 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <div className="flex space-x-2 mb-4">
            <button className={`flex-1 py-2 rounded-md font-semibold ${tradeType === "DELIVERY" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setTradeType("DELIVERY")}>
              DELIVERY
            </button>
            <button className={`flex-1 py-2 rounded-md font-semibold ${tradeType === "INTRADAY" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setTradeType("INTRADAY")}>
              INTRADAY
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white font-medium">No. of Shares</label>
            <input type="number" className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500" value={shares} onChange={(e) => setShares(e.target.value)} />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white font-medium">Limit Price</label>
            <input type="number" value={limitPrice} onChange={(e) => setLimitPrice(parseFloat(e.target.value))} className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500" />
          </div>

          <button onClick={() => alert(`Placed order for ${shares} shares of ${stockData?.name} at ₹${limitPrice}`)} className="w-full py-3 bg-green-600 text-white font-semibold rounded-md">
            PLACE BUY ORDER
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyOrder;
