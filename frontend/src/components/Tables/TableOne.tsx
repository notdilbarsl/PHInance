interface TableOneProps {
  stocks: {
    name: string;
    ticker: string;
    curr_price: number;
    is_watchlisted: boolean;
  }[];
  onAddToWatchlist: (ticker: string) => void;
}

const TableOne: React.FC<TableOneProps> = ({ stocks, onAddToWatchlist }) => {
  return (
    <div className="space-y-4">
      {stocks.map(stock => (
        <div key={stock.ticker} className="flex items-center gap-6 bg-white p-4 rounded shadow">
          <div className="w-1/3 font-semibold">{stock.name}</div>
          <div className="w-1/3 text-gray-600">{stock.ticker}</div>
          <div className="w-1/3 text-green-600">₹ {stock.curr_price}</div>
          <button
            onClick={() => onAddToWatchlist(stock.ticker)}
            disabled={stock.is_watchlisted}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              stock.is_watchlisted
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-700 text-white'
            }`}
          >
            {stock.is_watchlisted ? '✓' : '+'}
          </button>
        </div>
      ))}
    </div>
  );
};


export default TableOne