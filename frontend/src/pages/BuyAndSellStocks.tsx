import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config.ts";

const BuyAndSellStocks = () => {
  const navigate = useNavigate();

  const [userStocks, setUserStocks] = useState<{ name: string }[]>([]);
  const [stockData, setStockData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/auth/signin";
    } else {
      fetchUserStocks(authToken);
    }
  }, []);

  const fetchUserStocks = async (authToken: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/dashboard`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming each element has a `ticker` key like { ticker: "TCS" }
        const stocks = data.map((element: any) => ({
          name: element.ticker,
        }));

        setUserStocks(stocks);
        fetchStockPrices(stocks);
      } else {
        toast.error(data.message || "Failed to fetch stocks");
      }
    } catch (error) {
      toast.error("Error fetching user stocks");
    }
  };

  const fetchStockPrices = async (stocks: { name: string }[]) => {
    try {
      const newStockData: { [key: string]: any } = {};

      const fetches = stocks.map(async (stock) => {
        try {
          const resp = await fetch(`https://yfinance-bcyb.onrender.com/price/${stock.name}`);
          const data = await resp.text();
          newStockData[stock.name] = {
            currentPrice: parseFloat(data).toFixed(2),
          };
        } catch {
          newStockData[stock.name] = { currentPrice: "N/A" };
        }
      });

      await Promise.all(fetches);
      setStockData(newStockData);
    } catch (error) {
      toast.error("Failed to fetch stock prices");
    }
  };

  const handleBuyClick = (stockName: string) => {
    navigate(`/buy/${encodeURIComponent(stockName)}`);
  };

  const handleSellClick = (stockName: string) => {
    navigate(`/sell/${encodeURIComponent(stockName)}`);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-6 text-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">Buy & Sell Stocks</h4>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase text-black dark:text-white">Stock</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase text-black dark:text-white">Price (₹)</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase text-black dark:text-white">Actions</h5>
          </div>
        </div>

        {userStocks.length === 0 ? (
          <div className="text-center mt-4 text-gray-500">No stocks found in your portfolio.</div>
        ) : (
          userStocks.map((stock, key) => (
            <div
              key={stock.name}
              className={`grid grid-cols-3 items-center ${key === userStocks.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
                }`}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="text-black dark:text-white font-semibold">{stock.name}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  ₹{stockData[stock.name]?.currentPrice || "Loading..."}
                </p>
              </div>
              <div className="flex justify-center space-x-2 p-2.5 xl:p-5">
                <button
                  onClick={() => handleBuyClick(stock.name)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                >
                  Buy
                </button>
                <button
                  onClick={() => handleSellClick(stock.name)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                >
                  Sell
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => fetchStockPrices(userStocks)}
        className="mt-6 mb-10 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        Refresh Prices
      </button>
    </div>
  );
};

export default BuyAndSellStocks;

