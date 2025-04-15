import React, { useEffect, useState, useMemo } from "react";
import { API_BASE_URL } from "../../config";
import Header from "../Header";

type StockHistory = {
  date: string;
  qty: number;
  rate: number;
  amount: number;
};

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

const PortfolioDashboard = () => {
  const [stocks, setStocks] = useState<STOCK[]>([]);
  const [livePrices, setLivePrices] = useState<{ [key: string]: number }>({});
  const [openStock, setOpenStock] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPort = async () => {
      try {
        const resp = await fetch(`${API_BASE_URL}/user/portfolio`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!resp.ok) {
          console.error("Failed to fetch portfolio data");
          setLoading(false);
          return;
        }

        const portfolioData = await resp.json();

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
            avgPrice,
            marketPrice: 0,
            returns: 0,
            returnsPct: "0%",
            currentValue: 0,
            history,
          };
        });

        setStocks(updatedStocks);
        await fetchStockPrices(updatedStocks);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPort();
  }, []);

  const calculateAvgPrice = (history: StockHistory[]): number => {
    const totalAmount = history.reduce((sum, entry) => sum + entry.amount, 0);
    const totalQuantity = history.reduce((sum, entry) => sum + entry.qty, 0);
    return totalQuantity > 0 ? totalAmount / totalQuantity : 0;
  };

  const fetchStockPrices = async (stocks: STOCK[]) => {
    const newStockData: { [key: string]: number } = {};

    const fetches = stocks.map(async (stock) => {
      try {
        const resp = await fetch(`https://yfinance-bcyb.onrender.com/price/${stock.name}`);
        const data = await resp.text();
        newStockData[stock.name] = parseFloat(data);
      } catch {
        newStockData[stock.name] = 0;
      }
    });

    await Promise.all(fetches);
    setLivePrices(newStockData);
  };

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
        oneDayReturns: 0,
        oneDayReturnsPct: 0,
      }
    );

    summary.totalReturnsPct =
      summary.investedValue > 0
        ? parseFloat(((summary.totalReturns / summary.investedValue) * 100).toFixed(2))
        : 0;

    return summary;
  }, [stocks, livePrices]);

  const toggleDropdown = (stockName: string) => {
    setOpenStock(openStock === stockName ? null : stockName);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-gray-500 dark:text-gray-300 text-xl">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-12 py-6 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center pb-4 border-b dark:border-gray-700">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
              ₹{holdingsSummary.currentValue.toLocaleString()}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Current value</p>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
              Holdings ({stocks.length})
            </h2>
          </div>

          <div className="text-right space-y-2">
            <p className="text-gray-500 dark:text-gray-400">
              Invested Value{" "}
              <span className="font-semibold text-black dark:text-white">
                ₹{holdingsSummary.investedValue.toLocaleString()}
              </span>
            </p>
            <p
              className={`font-semibold ${holdingsSummary.totalReturns >= -0.1
                ? "text-green-500"
                : "text-red-500"
                }`}
            >
              Total Returns {holdingsSummary.totalReturns >= -0.1 ? "+" : "-"}
              ₹{Math.abs(holdingsSummary.totalReturns).toLocaleString()} ({holdingsSummary.totalReturnsPct}%)
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border border-gray-300 dark:border-gray-700 text-left text-sm bg-white dark:bg-gray-800">
            <thead>
              <tr className="border-b bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
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
                const returnsPct =
                  stock.avgPrice > 0
                    ? ((returns / (stock.avgPrice * stock.quantity)) * 100).toFixed(2)
                    : "0.00";

                return (
                  <React.Fragment key={stock.name}>
                    <tr className="border-b dark:border-gray-600">
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{stock.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              QTY {stock.quantity} • AVG. ₹{stock.avgPrice.toFixed(2)}
                            </div>
                          </div>
                          <button
                            onClick={() => toggleDropdown(stock.name)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none"
                          >
                            {openStock === stock.name ? "▲" : "▼"}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-lg text-gray-800 dark:text-gray-100">
                        ₹{livePrice.toFixed(2)}
                      </td>
                      <td
                        className={`px-6 py-4 font-semibold text-lg ${returns >= -0.1 ? "text-green-500" : "text-red-500"
                          }`}
                      >
                        {returns >= -0.1 ? "+" : "-"}
                        ₹{Math.abs(returns).toFixed(2)} ({Number(returnsPct)}%)
                      </td>
                      <td className="px-6 py-4 text-lg text-gray-800 dark:text-gray-100">
                        ₹{currentValue.toFixed(2)}
                      </td>
                    </tr>

                    {openStock === stock.name && (
                      <tr>
                        <td colSpan={4} className="px-6 py-3 bg-gray-50 dark:bg-gray-700">
                          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">HISTORY</h3>
                          <table className="w-full text-sm text-gray-800 dark:text-gray-200">
                            <thead>
                              <tr className="border-b dark:border-gray-600">
                                <th className="px-4 py-2">DATE</th>
                                <th className="px-4 py-2">QTY</th>
                                <th className="px-4 py-2">RATE</th>
                                <th className="px-4 py-2">AMOUNT</th>
                              </tr>
                            </thead>
                            <tbody>
                              {stock.history.map((entry, index) => (
                                <tr key={index} className="border-b dark:border-gray-600">
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
