import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { API_BASE_URL } from "../config";
import { Chart } from "react-chartjs-2";

// Register required chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const BuyOrder = () => {
  const { stockName } = useParams<{ stockName: string }>();
  const [stockData, setStockData] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shares, setShares] = useState<string>("");
  const [limitPrice, setLimitPrice] = useState<number>(0);
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
      fetchChartData(cleanStockName);
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

  const fetchChartData = async (symbol: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/data/${symbol}/30`);
      const priceData = response.data.datasets[0].values;
      const volumeData = response.data.datasets[1].values;
      
      const formattedData = priceData.map((item: any, index: number) => ({
        date: item[0],
        price: parseFloat(item[1]),
        volume: volumeData[index] ? volumeData[index][1] : 0,
      }));
      
      setChartData(formattedData);
    } catch (err) {
      console.error("Error fetching chart data:", err);
    }
  };

  const handleBuyOrder = async () => {
    try {
      const authToken = localStorage.getItem("authToken"); // Retrieve token from local storage
      if (!authToken) {
        alert("User not authenticated. Please sign in.");
        return;
      }
  
      const orderData = {
        curr_price: limitPrice,
        ticker: stockName,
        quantity: parseInt(shares, 10),
        type: "BUY",
      };
  
      const response = await axios.post(
        "https://phinance-3.onrender.com/user/transaction",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include token
            "Content-Type": "application/json",
          },
        }
      );
  
      alert("Order placed successfully!");
    } catch (error: unknown) {
      console.error("Error placing buy order:", error);
    
      // Check if error is an instance of AxiosError
      if (axios.isAxiosError(error)) {
        alert(`Error placing buy order: ${error.response?.data?.message || "Unknown error"}`);
      } else {
        alert("An unexpected error occurred.");
      }
    }
    
  };
  

  // 📊 Chart.js Data & Options

  const combinedChartData = {
    labels: chartData.map((item) => item.date), // X-axis (dates)
    datasets: [
      {
        label: "Stock Price",
        type: "line",
        data: chartData.map((item) => item.price),
        borderColor: "#8884d8",
        backgroundColor: "rgba(136, 132, 216, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        yAxisID: "y-price",
      },
      {
        label: "Trading Volume",
        type: "bar",
        data: chartData.map((item) => item.volume),
        backgroundColor: "#82ca9d",
        yAxisID: "y-volume",
      },
    ],
  };
  
  // Chart options to manage dual y-axes
  const chartOptions = {
    responsive: true,
    scales: {
      "y-price": {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Stock Price (₹)",
        },
      },
      "y-volume": {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Trading Volume",
        },
        grid: {
          drawOnChartArea: false, // Keeps volume bars separate from price grid
        },
      },
    },
  };


  return (
    <>
    <div className="flex w-full p-5">
      {/* Graphs Section */}
      <div className="w-2/3 p-5 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-3">Stock Price & Volume</h2>
        <Chart type="bar" data={combinedChartData} options={chartOptions} />
      </div>
      
      {/* Buy Order Section */}
      {!loading && !error && (
        <div className="w-1/3 p-5 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <div className="flex space-x-2 mb-4">
            <button className={`flex-1 py-2 rounded-md font-semibold ${tradeType === "DELIVERY" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setTradeType("DELIVERY")}>
              DELIVERY
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white font-medium">No. of Shares</label>
            <input type="number" className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500" value={shares} onChange={(e) => setShares(e.target.value)} />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white font-medium">Current Price</label>
            <input type="number" value={limitPrice} onChange={(e) => setLimitPrice(parseFloat(e.target.value))} className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500" />
          </div>

          <button onClick={handleBuyOrder} className="w-full py-3 bg-green-600 text-white font-semibold rounded-md">
            PLACE BUY ORDER
          </button>
        </div>
      )}
    </div>

      {!loading && !error && (
        <div className="w-full mt-5 p-5 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{stockData?.name} ({stockName})</h1>
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
        </div>
      )}
    </>
  );
};

export default BuyOrder;