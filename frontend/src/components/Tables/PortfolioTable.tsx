import {STOCK} from '../../types/stock.ts';


type stocks = {
  name: string;
  quantity: number;
  avgPrice: number;
  marketPrice: number;
  dayChange: number;
  dayChangePct: string;
  returns: number;
  returnsPct: string;
  currentValue: number;
  previousValue: number;
  graphUrl: string;
};

const holdingsSummary = {
  currentValue: 8340,
  investedValue: 8422,
  totalReturns: -82,
  totalReturnsPct: -0.98,
  oneDayReturns: 15,
  oneDayReturnsPct: 0.18,
};

const stocks: STOCK[] = [
  {
    name: "Zomato",
    quantity: 21,
    avgPrice: 214.44,
    marketPrice: 238.20,
    dayChange: 1.88,
    dayChangePct: "0.80%",
    returns: 498.96,
    returnsPct: "11.08%",
    currentValue: 5002.20,
    previousValue: 4503.24,
    graphUrl: "/graphs/zomato.png",
  },
  {
    name: "SBI",
    quantity: 3,
    avgPrice: 858.40,
    marketPrice: 760.95,
    dayChange: -5.05,
    dayChangePct: "-0.66%",
    returns: -292.35,
    returnsPct: "11.35%",
    currentValue: 2282.85,
    previousValue: 2575.20,
    graphUrl: "/graphs/sbi.png",
  },
  {
    name: "Tata Steel",
    quantity: 8,
    avgPrice: 167.94,
    marketPrice: 131.82,
    dayChange: -1.15,
    dayChangePct: "-0.86%",
    returns: -288.96,
    returnsPct: "21.51%",
    currentValue: 1054.56,
    previousValue: 1343.52,
    graphUrl: "/graphs/tata_steel.png",
  },
];

export default function PortfolioDashboard() {
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
            {stocks.map((stock) => (
              <tr key={stock.name} className="border-b">
                {/* Company Name & Shares */}
                <td className="px-6 py-4">
                  <div className="font-medium">{stock.name}</div>
                  <div className="text-xs text-gray-500">
                    Qty {stock.quantity} • Avg. ₹{stock.avgPrice.toFixed(2)}
                  </div>
                </td>

                {/* Graph Column */}
                <td className="px-6 py-4">
                  <img
                    src={stock.graphUrl}
                    alt={`${stock.name} trend`}
                    className="w-40 h-14 object-contain"
                  />
                </td>

                {/* Market Price */}
                <td className="px-6 py-4 text-lg">₹{stock.marketPrice.toFixed(2)}</td>

                {/* Returns (Color-Coded) */}
                <td className={`px-6 py-4 font-semibold text-lg ${stock.returns >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {stock.returns >= 0 ? "+" : ""}
                  ₹{stock.returns.toFixed(2)} ({stock.returnsPct})
                </td>

                {/* Current Value */}
                <td className="px-6 py-4 text-lg">₹{stock.currentValue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </div>
  );
}
