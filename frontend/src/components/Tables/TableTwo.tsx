interface TableTwoProps {
  watchlistStocks: {
    name: string;
    ticker: string;
    curr_price: number;
  }[];
  onRemoveFromWatchlist: (ticker: string) => void;
}

const TableTwo: React.FC<TableTwoProps> = ({ watchlistStocks, onRemoveFromWatchlist }) => {
  return (
    <div className="space-y-4">
      {watchlistStocks.map(stock => (
        <div key={stock.ticker} className="flex items-center gap-6 bg-white p-4 rounded shadow">
          <div className="w-1/3 font-semibold">{stock.name}</div>
          <div className="w-1/3 text-gray-600">{stock.ticker}</div>
          <div className="w-1/3 text-green-600">₹ {stock.curr_price}</div>
          <button
            onClick={() => onRemoveFromWatchlist(stock.ticker)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center"
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
};


export default TableTwo