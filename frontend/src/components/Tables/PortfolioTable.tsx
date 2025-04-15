import React, { useEffect, useState, useMemo } from "react";
import { API_BASE_URL } from "../../config";
import Header from "../Header";

// Define Stock Purchase History Data Type
type StockHistory = {
  date: string;
  qty: number;
  rate: number;
  amount: number;
};

// Define Main Stock Data Type
type STOCK = {
  name: string;
  quantity: number;
  avgPrice: number;
  marketPrice: number;
  returns: number;
  returnsPct: string;
  currentValue: number;
  history: StockHistory[];
};

// Portfolio Summary Data
const PortfolioDashboard = () => {
  const [stocks, setStocks] = useState<STOCK[]>([]);
  const [livePrices, setLivePrices] = useState<{ [key: string]: number }>({});
  const [openStock, setOpenStock] = useState<string | null>(null); // State for tracking dropdown visibility

  // Fetch Portfolio Data
  useEffect(() => {
    const fetchPort = async () => {
      const resp = await fetch(`${API_BASE_URL}/user/portfolio`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      });

      if (!resp.ok) {
        console.error("Failed to fetch portfolio data");
        return;
      }

      const portfolioData = await resp.json();

      // Map API response to the required format
      const updatedStocks: STOCK[] = portfolioData.stocks.map((stock: any) => {
        const stockTransactions = portfolioData.transactions.filter(
          (transaction: any) => transaction.ticker_id === stock.ticker_id
        );

        const history: StockHistory[] = stockTransactions.map((transaction: any) => ({
          date: new Date(transaction.CreatedAt).toISOString().split("T")[0],
          qty: transaction.quantity,
          rate: transaction.price,
          amount: transaction.quantity * transaction.price,
        }));

        const avgPrice = calculateAvgPrice(history);

        return {
          name: stock.ticker_id,
          quantity: stock.quantity,
          avgPrice: avgPrice,
          marketPrice: 0, // Initially set to 0, will update later with live data
          returns: 0, // Placeholder for now, will calculate later
          returnsPct: "0%", // Placeholder for now, will calculate later
          currentValue: 0, // Placeholder for now, will calculate later
          history,
        };
      });

      // Update state with fetched data
      setStocks(updatedStocks);
      fetchStockPrices(updatedStocks);
    };

    fetchPort();
  }, []);

  // Calculate Average Price from History
  const calculateAvgPrice = (history: StockHistory[]): number => {
    const totalAmount = history.reduce((sum, entry) => sum + entry.amount, 0);
    const totalQuantity = history.reduce((sum, entry) => sum + entry.qty, 0);
    return totalQuantity > 0 ? totalAmount / totalQuantity : 0;
  };

  // Fetch Live Stock Prices
  const fetchStockPrices = async (stocks: STOCK[]) => {
    try {
      const newStockData: { [key: string]: number } = {};

      const fetches = stocks.map(async (stock) => {
        try {
          const resp = await fetch(`https://yfinance-bcyb.onrender.com/price/${stock.name}`);
          const data = await resp.text();
          newStockData[stock.name] = parseFloat(data);
        } catch {
          newStockData[stock.name] = 0; // Default to 0 if error fetching price
        }
      });

      await Promise.all(fetches);
      setLivePrices(newStockData);
    } catch (error) {
      console.error("Failed to fetch stock prices");
    }
  };

  // Calculate Holdings Summary Dynamically
  const holdingsSummary = useMemo(() => {
    const summary = stocks.reduce(
      (summary, stock) => {
        const livePrice = livePrices[stock.name] || 0;
        const invested = stock.avgPrice * stock.quantity;
        const current = livePrice * stock.quantity;
        const returns = current - invested;

        summary.investedValue += invested;
        summary.currentValue += current;
        summary.totalReturns += returns;

        return summary;
      },
      {
        investedValue: 0,
        currentValue: 0,
        totalReturns: 0,
        totalReturnsPct: 0,
        oneDayReturns: 0, // Placeholder for now
        oneDayReturnsPct: 0, // Placeholder for now
      }
    );

    summary.totalReturnsPct =
      summary.investedValue > 0
        ? parseFloat(((summary.totalReturns / summary.investedValue) * 100).toFixed(2))
        : 0;

    return summary;
  }, [stocks, livePrices]);

  // Toggle dropdown visibility for stock history
  const toggleDropdown = (stockName: string) => {
    setOpenStock(openStock === stockName ? null : stockName);
  };

  // Return JSX with the dynamic portfolio values
  return (
    <div className="w-full h-screen px-12 py-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Holdings Summary Section */}
        <div className="flex justify-between items-center pb-4 border-b">
          <div>
            <h2 className="text-4xl font-bold">₹{holdingsSummary.currentValue.toLocaleString()}</h2>
            <p className="text-gray-500">Current value</p>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-semibold">Holdings ({stocks.length})</h2>
          </div>

          <div className="text-right space-y-2">
            <p className="text-gray-500">
              Invested Value <span className="font-semibold text-black">₹{holdingsSummary.investedValue.toLocaleString()}</span>
            </p>
            <p className={`font-semibold ${holdingsSummary.totalReturns >= 0 ? "text-green-500" : "text-red-500"}`}>
              Total Returns {holdingsSummary.totalReturns >= 0 ? "+" : ""}
              ₹{holdingsSummary.totalReturns.toLocaleString()} ({holdingsSummary.totalReturnsPct}%)
            </p>
          </div>
        </div>

        {/* Stock Holdings Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border border-gray-300 text-left text-sm bg-white">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="px-6 py-4">COMPANY</th>
                <th className="px-6 py-4">MARKET PRICE</th>
                <th className="px-6 py-4">RETURNS (%)</th>
                <th className="px-6 py-4">CURRENT</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => {
                const livePrice = livePrices[stock.name] || 0;
                const currentValue = stock.quantity * livePrice;
                const returns = currentValue - stock.avgPrice * stock.quantity;
                const returnsPct = stock.avgPrice > 0 ? ((returns / (stock.avgPrice * stock.quantity)) * 100).toFixed(2) : "0.00%";

                return (
                  <React.Fragment key={stock.name}>
                    <tr className="border-b">
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{stock.name}</div>
                            <div className="text-xs text-gray-500">
                              QTY {stock.quantity} • AVG. ₹{stock.avgPrice.toFixed(2)}
                            </div>
                          </div>
                          <button
                            onClick={() => toggleDropdown(stock.name)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            {openStock === stock.name ? "▲" : "▼"}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-lg">₹{livePrice.toFixed(2)}</td>
                      <td className={`px-6 py-4 font-semibold text-lg ${returns >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {returns >= 0 ? "+" : ""}
                        ₹{returns.toFixed(2)} ({returnsPct}%)
                      </td>
                      <td className="px-6 py-4 text-lg">₹{currentValue.toFixed(2)}</td>
                    </tr>

                    {/* Stock History Dropdown */}
                    {openStock === stock.name && (
                      <tr>
                        <td colSpan={4} className="px-6 py-3 bg-gray-50">
                          <h3 className="font-semibold mb-2">HISTORY</h3>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="px-4 py-2">DATE</th>
                                <th className="px-4 py-2">QTY</th>
                                <th className="px-4 py-2">RATE</th>
                                <th className="px-4 py-2">AMOUNT</th>
                              </tr>
                            </thead>
                            <tbody>
                              {stock.history.map((entry, index) => (
                                <tr key={index} className="border-b">
                                  <td className="px-4 py-2">{entry.date}</td>
                                  <td className="px-4 py-2">{entry.qty}</td>
                                  <td className="px-4 py-2">₹{entry.rate}</td>
                                  <td className="px-4 py-2">₹{entry.amount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
