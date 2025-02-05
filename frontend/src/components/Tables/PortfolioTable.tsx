import React, { useState } from "react";

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
  marketPrice: number;
  returns: number;
  returnsPct: string;
  currentValue: number;
  graphUrl: string;
  history: StockHistory[];
};

// Portfolio Summary Data
const holdingsSummary = {
  currentValue: 8340,
  investedValue: 8422,
  totalReturns: -82,
  totalReturnsPct: -0.98,
  oneDayReturns: 15,
  oneDayReturnsPct: 0.18,
};

// Stocks Data
const stocks: STOCK[] = [
  {
    name: "Zomato",
    quantity: 21,
    marketPrice: 238.20,
    returns: 498.96,
    returnsPct: "11.08%",
    currentValue: 5002.20,
    graphUrl: "/graphs/zomato.png",
    history: [
      { date: "2024-01-15", qty: 10, rate: 200, amount: 2000 },
      { date: "2024-02-10", qty: 5, rate: 220, amount: 1100 },
      { date: "2024-03-05", qty: 6, rate: 230, amount: 1380 },
    ],
  },
  {
    name: "SBI",
    quantity: 3,
    marketPrice: 760.95,
    returns: -292.35,
    returnsPct: "11.35%",
    currentValue: 2282.85,
    graphUrl: "/graphs/sbi.png",
    history: [
      { date: "2023-12-20", qty: 1, rate: 850, amount: 850 },
      { date: "2024-01-10", qty: 2, rate: 870, amount: 1740 },
    ],
  },
  {
    name: "Tata Steel",
    quantity: 8,
    marketPrice: 131.82,
    returns: -288.96,
    returnsPct: "21.51%",
    currentValue: 1054.56,
    graphUrl: "/graphs/tata_steel.png",
    history: [
      { date: "2023-11-05", qty: 4, rate: 160, amount: 640 },
      { date: "2023-12-18", qty: 4, rate: 175, amount: 700 },
    ],
  },
];

// Function to Calculate Average Price from History
const calculateAvgPrice = (history: StockHistory[]): number => {
  const totalAmount = history.reduce((sum, entry) => sum + entry.amount, 0);
  const totalQuantity = history.reduce((sum, entry) => sum + entry.qty, 0);
  return totalQuantity > 0 ? totalAmount / totalQuantity : 0;
};

export default function PortfolioDashboard() {
  const [openStock, setOpenStock] = useState<string | null>(null);

  const toggleDropdown = (stockName: string) => {
    setOpenStock(openStock === stockName ? null : stockName);
  };

  return (
    <div className="w-full h-screen px-12 py-6">
      {/* Holdings Summary Section */}
      <div className="flex justify-between items-center pb-6 border-b">
        {/* Left: Current Value */}
        <div>
          <h2 className="text-4xl font-bold">₹{holdingsSummary.currentValue.toLocaleString()}</h2>
          <p className="text-gray-500">Current value</p>
        </div>

        {/* Right: Summary Details */}
        <div className="text-right">
          <p className="text-gray-500">
            Invested value <span className="font-semibold text-black">₹{holdingsSummary.investedValue.toLocaleString()}</span>
          </p>
          <p className={`font-semibold ${holdingsSummary.totalReturns >= 0 ? "text-green-500" : "text-red-500"}`}>
            Total returns {holdingsSummary.totalReturns >= 0 ? "+" : ""}
            ₹{holdingsSummary.totalReturns.toLocaleString()} ({holdingsSummary.totalReturnsPct}%)
          </p>
          <p className={`font-semibold ${holdingsSummary.oneDayReturns >= 0 ? "text-green-500" : "text-red-500"}`}>
            1D returns {holdingsSummary.oneDayReturns >= 0 ? "+" : ""}
            ₹{holdingsSummary.oneDayReturns.toLocaleString()} ({holdingsSummary.oneDayReturnsPct}%)
          </p>
        </div>
      </div>

      {/* Stock Holdings Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border border-gray-300 text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Graph</th>
              <th className="px-6 py-4">Mkt Price</th>
              <th className="px-6 py-4">Returns (%)</th>
              <th className="px-6 py-4">Current</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => {
              const avgPrice = calculateAvgPrice(stock.history);
              return (
                <React.Fragment key={stock.name}>
                  <tr className="border-b">
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{stock.name}</div>
                          <div className="text-xs text-gray-500">
                            Qty {stock.quantity} • Avg. ₹{avgPrice.toFixed(2)}
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
                    <td className="px-6 py-4">
                      <img src={stock.graphUrl} alt={`${stock.name} trend`} className="w-40 h-14 object-contain" />
                    </td>
                    <td className="px-6 py-4 text-lg">₹{stock.marketPrice.toFixed(2)}</td>
                    <td className={`px-6 py-4 font-semibold text-lg ${stock.returns >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {stock.returns >= 0 ? "+" : ""}
                      ₹{stock.returns.toFixed(2)} ({stock.returnsPct})
                    </td>
                    <td className="px-6 py-4 text-lg">₹{stock.currentValue.toFixed(2)}</td>
                  </tr>

                  {openStock === stock.name && (
                    <tr>
                      <td colSpan={5} className="px-6 py-3 bg-gray-50">
                        <h3 className="font-semibold mb-2">History</h3>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="px-4 py-2">Date</th>
                              <th className="px-4 py-2">Qty</th>
                              <th className="px-4 py-2">Rate</th>
                              <th className="px-4 py-2">Amount</th>
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
  );
}
