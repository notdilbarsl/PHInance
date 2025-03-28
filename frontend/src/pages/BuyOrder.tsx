import React, { useState ,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const BuyOrder = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    // Redirect if token is missing
    if (!token) {
      navigate('/auth/signin');
      return;
    }

    try {
      // Decode token to check expiration
      const decoded = jwtDecode<{ exp: number }>(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      
      // Redirect if token is expired
      if (isExpired) {
        localStorage.removeItem('authToken');
        navigate('/auth/signin');
      }
    } catch (error) {
      // Handle invalid token
      localStorage.removeItem('authToken');
      navigate('/auth/signin');
    }
  }, [navigate]); 
  const [shares, setShares] = useState<string>("");
  const [limitPrice, setLimitPrice] = useState<number>(1746.50);
  const [orderType, setOrderType] = useState<"LIMIT" | "MARKET">("LIMIT");
  const [tradeType, setTradeType] = useState<"DELIVERY" | "INTRADAY">("DELIVERY");
  const [stopLossEnabled, setStopLossEnabled] = useState<boolean>(false);
  const [triggerPrice, setTriggerPrice] = useState<number | "">("");
  const [marketPrice, setMarketPrice] = useState<number>(1746.50);

  return (
    <div className="flex w-full p-5">
      {/* Left Side - Stock Dashboard */}
      <div className="w-2/3 pr-5">

        {/* Stock Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HDFC Bank Ltd (NSE: HDFCBANK)</h1>
          
          {/* Price + Percentage Change */}
          <div className="flex items-center space-x-2">
            <p className="text-black text-2xl font-semibold">₹1,746.50</p>
            <span className="px-2 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-md flex items-center">
              ▲ 0.50%
            </span>
            <p className="text-green-600 font-medium text-sm">+8.70 Today</p>
          </div>
        </div>

        {/* Stock Chart Placeholder */}
        <div className="h-60 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center text-gray-500">
          Stock Chart Placeholder
        </div>

        {/* Price Data */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow">
            <p className="text-sm text-gray-500">Previous Close</p>
            <p className="font-semibold">₹1,737.80</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow">
            <p className="text-sm text-gray-500">Day Range</p>
            <p className="font-semibold">₹1,724.00 - ₹1,749.00</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow">
            <p className="text-sm text-gray-500">Year Range</p>
            <p className="font-semibold">₹1,363.55 - ₹1,880.00</p>
          </div>
        </div>


        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow">
            <p className="text-sm text-gray-500">Market Cap</p>
            <p className="font-semibold">₹13.34T INR</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow">
            <p className="text-sm text-gray-500">Avg Volume</p>
            <p className="font-semibold">10.65M</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow">
            <p className="text-sm text-gray-500">P/E Ratio</p>
            <p className="font-semibold">19.19</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow">
            <p className="text-sm text-gray-500">Dividend yield</p>
            <p className="font-semibold">1.12%</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow">
            <p className="text-sm text-gray-500">Primary Exchange</p>
            <p className="font-semibold">NSE</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow">
            <p className="text-sm text-gray-500">Sentiment</p>
            <p className="font-semibold">Bullish</p>
          </div>
        </div>



        {/* Recent News Section */}
        <div className="mt-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recent News</h2>
          <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow mb-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              HDFC Bank's CSR initiatives empowering aspirational districts with tofu manufacturing and honey selling projects
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow mb-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              HDFC Bank Parivartan Start-Up Grants to support over 50 startups with Rs 20 crore
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              HDFC Bank Parivartan impacts over 65.28+ lakh lives in Maharashtra
            </p>
          </div>
        </div>
      </div>


      {/* Right Side - Buy Order Panel */}
      <div className="w-1/3 p-5 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        {/* Exchange Selector */}
        <div className="flex space-x-2 mb-4">
          <button className="px-4 py-1 border rounded-md bg-gray-200 text-gray-700">NSE</button>
          <button className="px-4 py-1 border rounded-md bg-green-600 text-white">BSE</button>
        </div>

        {/* Order Type Selector (Delivery / Intraday) */}
        <div className="flex space-x-2 mb-4">
          <button
            className={`flex-1 py-2 rounded-md font-semibold ${
              tradeType === "DELIVERY" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setTradeType("DELIVERY")}
          >
            DELIVERY
          </button>
          <button
            className={`flex-1 py-2 rounded-md font-semibold ${
              tradeType === "INTRADAY" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setTradeType("INTRADAY")}
          >
            INTRADAY
          </button>
        </div>
        {/* Input for No. of Shares */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-white font-medium">No. of Shares</label>
          <input
            type="number"
            className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
          />
        </div>

        {/* Limit Price Selector */}
        <div className="flex items-center space-x-2 mb-4">
          <button
            className="p-2 bg-gray-200 rounded-md"
            onClick={() => setLimitPrice((prev) => Math.max(prev - 1, 1))}
          >
            -
          </button>
          <input
            type="text"
            className="w-24 text-center border rounded-md p-2"
            value={limitPrice.toFixed(2)}
            readOnly
          />
          <button
            className="p-2 bg-gray-200 rounded-md"
            onClick={() => setLimitPrice((prev) => prev + 1)}
          >
            +
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold ${
              orderType === "LIMIT" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setOrderType("LIMIT")}
          >
            LIMIT
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold ${
              orderType === "MARKET" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setOrderType("MARKET")}
          >
            MARKET
          </button>
        </div>
      {/* Stop Loss Order Section */}
      <div className="mb-4 p-3 border rounded-md">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-700">Stop Loss Order</p>
          <input
            type="checkbox"
            checked={stopLossEnabled}
            onChange={() => setStopLossEnabled(!stopLossEnabled)}
            className="w-5 h-5"
          />
        </div>
        {stopLossEnabled && (
          <div className="mt-3">
            <p className="text-gray-600">Price Range: ₹1,570.25 - ₹1,919.15</p>

            {/* Trigger Price */}
            <div className="mt-3">
              <label className="block text-gray-700 font-medium">Trigger Price</label>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 bg-gray-200 rounded-md"
                  onClick={() => setTriggerPrice((prev) => (prev ? Math.max(prev - 1, 1) : 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-24 text-center border rounded-md p-2"
                  value={triggerPrice}
                  onChange={(e) => setTriggerPrice(e.target.value === "" ? "" : parseFloat(e.target.value))}
                />
                <button
                  className="p-2 bg-gray-200 rounded-md"
                  onClick={() => setTriggerPrice((prev) => (prev ? prev + 1 : 1))}
                >
                  +
                </button>
              </div>
            </div>

            {/* Market Price */}
            <div className="mt-3">
              <label className="block text-gray-700 font-medium">Market Price</label>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 bg-gray-200 rounded-md"
                  onClick={() => setMarketPrice((prev) => Math.max(prev - 1, 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-24 text-center border rounded-md p-2"
                  value={marketPrice}
                  onChange={(e) => setMarketPrice(parseFloat(e.target.value))}
                />
                <button
                  className="p-2 bg-gray-200 rounded-md"
                  onClick={() => setMarketPrice((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Margin & Cash Available */}
      <div className="flex justify-between text-gray-700 dark:text-white mb-4">
        <p>Margin Required: <span className="font-semibold">₹5239.5</span></p>
        <p>Available Cash: <span className="font-semibold">₹8370.25</span></p>
      </div>

      {/* Buy Button */}
      <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-md">
        PLACE BUY ORDER
      </button>
      </div>
    </div>
  );
};

export default BuyOrder;
